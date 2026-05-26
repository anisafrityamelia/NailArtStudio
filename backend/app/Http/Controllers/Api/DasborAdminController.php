<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Pesanan;

class DasborAdminController extends Controller
{
    public function statistik()
    {
        $jumlahPelanggan = User::where('role', 'pelanggan')->count();

        $pesananAktif = Pesanan::whereIn('status', [
            'menunggu_konfirmasi',
            'terjadwal',
            'diproses',
            'siap_diambil',
        ])->count();

        $pesananSelesai = Pesanan::where('status', 'selesai')->count();

        return response()->json([
            'message' => 'Statistik dasbor berhasil diambil',
            'data' => [
                'jumlah_pelanggan' => $jumlahPelanggan,
                'pesanan_aktif' => $pesananAktif,
                'pesanan_selesai' => $pesananSelesai,
            ],
        ]);
    }

    public function jadwalBulanan()
    {
        $bulan = request()->query('bulan');
        $tahun = request()->query('tahun');

        $jadwal = Pesanan::with(['pengguna', 'layanan'])
            ->where('status', 'terjadwal')
            ->whereMonth('tanggal_pesanan', $bulan)
            ->whereYear('tanggal_pesanan', $tahun)
            ->orderBy('tanggal_pesanan', 'asc')
            ->orderBy('jam_pesanan', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'kode' => $item->kode_pesanan,
                    'pelanggan' => $item->pengguna?->nama_pengguna,
                    'layanan' => $item->layanan?->nama_layanan,
                    'tanggal' => $item->tanggal_pesanan,
                    'jam' => substr($item->jam_pesanan, 0, 5),
                ];
            });

        return response()->json([
            'message' => 'Jadwal bulanan berhasil diambil',
            'data' => $jadwal,
        ]);
    }
}