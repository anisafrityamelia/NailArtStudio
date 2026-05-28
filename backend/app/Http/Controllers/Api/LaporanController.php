<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
         $statusAktif = [
            'menunggu_konfirmasi',
            'terjadwal',
            'diproses',
            'siap_diambil',
            'selesai',
        ];

        $statusBelumLunas = [
            'menunggu_konfirmasi',
            'terjadwal',
            'diproses',
            'siap_diambil',
        ];
    
        $baseQuery = Pesanan::with([
            'pengguna',
            'layanan',
            'pembayaran',
        ]);

        if ($request->filled('tanggal_mulai')) {
            $baseQuery->whereDate(
                DB::raw('COALESCE(tanggal_pesanan, created_at)'),
                '>=',
                $request->tanggal_mulai
            );
        }

        if ($request->filled('tanggal_sampai')) {
            $baseQuery->whereDate(
                DB::raw('COALESCE(tanggal_pesanan, created_at)'),
                '<=',
                $request->tanggal_sampai
            );
        }

        // filter layanan
        if ($request->filled('layanan')) {
            $baseQuery->whereHas('layanan', function ($q) use ($request) {
                $q->where('nama_layanan', $request->layanan);
            });
        }

        $pesananStatistik = (clone $baseQuery)
            ->whereIn('status', $statusAktif)
            ->get();

        $pesanan = (clone $baseQuery)
            ->where('status', 'selesai')
            ->orderByRaw("COALESCE(tanggal_pesanan, created_at) DESC")
            ->get();

        // format data tabel
        $data = $pesanan->map(function ($item) {

            $hargaFinal =
                $item->harga_final ?? 0;

            $dp = $item->pembayaran &&
                $item->pembayaran->status_verifikasi === 'terverifikasi'
                    ? $item->pembayaran->nominal_pembayaran
                    : 0;

            $pelunasan = $item->status === 'selesai'
                ? max($hargaFinal - $dp, 0)
                : 0;

            return [
                'id' => $item->id_pesanan,

                'kodePesanan' => $item->kode_pesanan,

                'tanggal' => $item->tanggal_pesanan
                    ? Carbon::parse($item->tanggal_pesanan)->format('d-M-y')
                    : Carbon::parse($item->created_at)->format('d-M-y'),

                'pelanggan' =>
                    $item->pengguna?->nama_pengguna ?? '-',

                'layanan' =>
                    $item->layanan?->nama_layanan ?? '-',

                'hargaFinal' => 'Rp' . number_format($hargaFinal, 0, ',', '.'),
                'dp' => 'Rp' . number_format($dp, 0, ',', '.'),
                'pelunasan' => 'Rp' . number_format($pelunasan, 0, ',', '.'),

                'status' => ucwords(str_replace('_', ' ', $item->status)),
            ];
        });

        $totalPesanan = $pesananStatistik->count();

        $pesananSelesai = $pesananStatistik
            ->where('status', 'selesai')
            ->count();

        $persenSelesai = $totalPesanan > 0
            ? round(($pesananSelesai / $totalPesanan) * 100)
            : 0;

        $pembayaranTerverifikasi = $pesananStatistik->filter(function ($item) {
            return $item->pembayaran &&
                $item->pembayaran->status_verifikasi === 'terverifikasi';
        });

        $totalDp = $pembayaranTerverifikasi->sum(function ($item) {
            return $item->pembayaran->nominal_pembayaran ?? 0;
        });

        $jumlahDpTerverifikasi = $pembayaranTerverifikasi->count();

        $totalHargaFinal = $pesananStatistik->sum(function ($item) {
            return $item->harga_final ?? 0;
        });

        $totalPelunasanMasuk = $pesananStatistik
            ->where('status', 'selesai')
            ->sum(function ($item) {
                $hargaFinal = $item->harga_final ?? 0;

                $dp = $item->pembayaran &&
                    $item->pembayaran->status_verifikasi === 'terverifikasi'
                        ? $item->pembayaran->nominal_pembayaran
                        : 0;

                return max($hargaFinal - $dp, 0);
            });

        $totalUangMasuk = $totalDp + $totalPelunasanMasuk;

        $sisaPelunasan = $pesananStatistik
            ->whereIn('status', $statusBelumLunas)
            ->sum(function ($item) {
                $hargaFinal = $item->harga_final ?? 0;

                $dp = $item->pembayaran &&
                    $item->pembayaran->status_verifikasi === 'terverifikasi'
                        ? $item->pembayaran->nominal_pembayaran
                        : 0;

                return max($hargaFinal - $dp, 0);
            });

        $jumlahBelumLunas = $pesananStatistik
            ->whereIn('status', $statusBelumLunas)
            ->filter(function ($item) {
                $hargaFinal = $item->harga_final ?? 0;

                $dp = $item->pembayaran &&
                    $item->pembayaran->status_verifikasi === 'terverifikasi'
                        ? $item->pembayaran->nominal_pembayaran
                        : 0;

                return max($hargaFinal - $dp, 0) > 0;
            })
            ->count();

        $groupLayanan = $pesanan
            ->groupBy(function ($item) {
                return $item->layanan?->nama_layanan ?? 'Lainnya';
            })
            ->map(function ($items, $namaLayanan) {
                return [
                    'nama' => $namaLayanan,
                    'jumlah' => $items->count(),
                ];
            })
            ->sortByDesc('jumlah')
            ->values();

        $jumlahTerbanyak = $groupLayanan->max('jumlah') ?? 0;

        $layananTerlaris = $groupLayanan->map(function ($item, $index) use ($jumlahTerbanyak) {
            return [
                'id' => $index + 1,
                'nama' => $item['nama'],
                'total' => $item['jumlah'] . ' Pesanan',
                'persen' => $jumlahTerbanyak > 0
                    ? round(($item['jumlah'] / $jumlahTerbanyak) * 100)
                    : 0,
            ];
        });

        $periodeLaporan = 'Semua periode';

        if ($request->filled('tanggal_mulai') && $request->filled('tanggal_sampai')) {

            $mulai = Carbon::parse($request->tanggal_mulai)
                ->translatedFormat('M Y');

            $sampai = Carbon::parse($request->tanggal_sampai)
                ->translatedFormat('M Y');

            $periodeLaporan = "Akumulasi dari {$mulai} - {$sampai}";
        }

        $statistik = [
            [
                'id' => 1,
                'judul' => 'Total Pesanan',
                'nilai' => $totalPesanan,
                'keterangan' => $periodeLaporan,
            ],
            [
                'id' => 2,
                'judul' => 'Pesanan Selesai',
                'nilai' => $pesananSelesai,
                'keterangan' => $persenSelesai . '% dari total pesanan',
            ],
            [
                'id' => 3,
                'judul' => 'DP Masuk',
                'nilai' => 'Rp' . number_format($totalDp, 0, ',', '.'),
                'keterangan' => $jumlahDpTerverifikasi . ' pembayaran tervalidasi',
            ],
            [
                'id' => 4,
                'judul' => 'Total Uang Masuk',
                'nilai' => 'Rp' . number_format($totalUangMasuk, 0, ',', '.'),
                'keterangan' => 'DP + pelunasan pesanan selesai',
            ],
            [
                'id' => 5,
                'judul' => 'Nilai Pesanan',
                'nilai' => 'Rp' . number_format($totalHargaFinal, 0, ',', '.'),
                'keterangan' => 'Dari harga final pesanan aktif',
            ],
            [
                'id' => 6,
                'judul' => 'Sisa Pelunasan',
                'nilai' => 'Rp' . number_format($sisaPelunasan, 0, ',', '.'),
                'keterangan' => $jumlahBelumLunas . ' pesanan belum lunas',
            ],
        ];

        return response()->json([
            'message' => 'Data laporan berhasil diambil',
            'data' => $data,
            'layananTerlaris' => $layananTerlaris,
            'statistik' => $statistik,
        ]);
    }
}