<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\DetailNailArt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PesananController extends Controller
{
    public function storeNailArt(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',

            'tanggal_pesanan' => 'required|date',

            'jam_pesanan' => 'required',

            'gambar_inspo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'bagian_kuku' => 'required|string',

            'layanan_tambahan' => 'nullable|string',

            'catatan' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {

            // upload gambar
            $pathGambar = null;

            if ($request->hasFile('gambar_inspo')) {
                $pathGambar = $request
                    ->file('gambar_inspo')
                    ->store('gambar-inspo', 'public');
            }

            // generate kode pesanan
            $kodePesanan =
                'ORD-' .
                now()->format('YmdHis');

            // simpan pesanan
            $pesanan = Pesanan::create([
                'kode_pesanan' => $kodePesanan,

                'id_pengguna' => $request->user()->id_pengguna,

                'id_layanan' => $request->id_layanan,

                'tanggal_pesanan' => $request->tanggal_pesanan,

                'jam_pesanan' => $request->jam_pesanan,

                'status' => 'menunggu_konfirmasi',
            ]);

            // simpan detail nail art
            DetailNailArt::create([
                'id_pesanan' => $pesanan->id_pesanan,

                'gambar_inspo' => $pathGambar,

                'bagian_kuku' => $request->bagian_kuku,

                'layanan_tambahan' => $request->layanan_tambahan,

                'catatan' => $request->catatan,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking nail art berhasil',
                'data' => $pesanan->load([
                    'detailNailArt',
                    'layanan',
                    'pengguna'
                ]),
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Booking gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user(); // otomatis dari token Sanctum

        // Ambil semua pesanan milik user tersebut
        $pesanan = Pesanan::with([
            'layanan',
            'detailNailArt',
            'pembayaran',
        ])
        ->where('id_pengguna', $user->id_pengguna)
        ->orderBy('created_at', 'desc')
        ->get(); // gunakan get(), bukan paginate()

        return response()->json([
            'message' => 'Daftar pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    // pesanan masuk admin
    public function pesananMasukAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'pembayaran',
        ])
        ->where('status', 'menunggu_konfirmasi')
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar pesanan masuk berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'harga_final' => 'required',
            'catatan_admin' => 'nullable|string',
        ]);

        $pesanan = Pesanan::with('pembayaran')
        ->find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        $statusMap = [
            'Terjadwal' => 'terjadwal',
            'Diproses' => 'diproses',
            'Dibatalkan' => 'dibatalkan',
            'Selesai' => 'selesai',
        ];

        $statusDatabase =
            $statusMap[$request->status]
            ?? $request->status;
        
        $pesanan->update([
            'status' => $statusDatabase,
            'harga_final' => $request->harga_final,
            'tanggal_konfirmasi' => now(),
            'dikonfirmasi_oleh' => $request->user()->id_pengguna,
            'catatan_admin' => $request->catatan_admin,
        ]);

        if ($pesanan->pembayaran) {
            $pesanan->pembayaran->update([
                'status_verifikasi' => 'terverifikasi',
                'tanggal_verifikasi' => Carbon::now(),
            ]);
        }

        return response()->json([
            'message' => 'Status pesanan berhasil diperbarui',
            'data' => $pesanan->load([
                'pengguna',
                'layanan',
                'detailNailArt',
                'pembayaran',
            ]),
        ]);
    }

    // pesanan aktif admin
    public function pesananAktifAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'pembayaran',
        ])
        ->whereIn('status', ['terjadwal', 'diproses'])
        ->orderBy('tanggal_konfirmasi', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar pesanan aktif berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    public function updateStatusAktif(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'catatan_admin' => 'nullable|string',
        ]);

        $pesanan = Pesanan::find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        $statusMap = [
            'Terjadwal' => 'terjadwal',
            'Diproses' => 'diproses',
            'Dibatalkan' => 'dibatalkan',
            'Selesai' => 'selesai',
        ];

        $statusDatabase =
            $statusMap[$request->status]
            ?? $request->status;
        
        $pesanan->update([
            'status' => $statusDatabase,
            'catatan_admin' => $request->catatan_admin,
        ]);

        return response()->json([
            'message' => 'Status pesanan aktif berhasil diperbarui',
            'data' => $pesanan->load([
                'pengguna',
                'layanan',
                'detailNailArt',
                'pembayaran',
            ]),
        ]);
    }


    // riwayat pesanan admin
    public function riwayatPesananAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'pembayaran',
        ])
        ->whereIn('status', ['selesai', 'dibatalkan'])
        ->orderBy('updated_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar riwayat pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    public function show($id)
    {
        $pesanan = Pesanan::with([
            'user',
            'layanan',
            'detailNailArt',
        ])->find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }
}