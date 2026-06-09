<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use App\Services\FonnteService;

class PembayaranController extends Controller
{
    
    /**
     * Mengirim pembayaran DP pesanan.
     *
     * Endpoint ini digunakan oleh pelanggan untuk mengunggah bukti pembayaran
     * uang muka (DP) pada pesanan yang telah dibuat. Setelah pembayaran berhasil
     * dikirim, sistem akan membuat data pembayaran, mengubah status pesanan
     * menjadi menunggu konfirmasi, serta mengirimkan notifikasi kepada admin
     * melalui WhatsApp agar pesanan dapat segera diverifikasi.
     *
     * Nominal DP yang digunakan pada sistem adalah Rp50.000 untuk setiap pesanan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_pesanan' => 'required|exists:pesanan,id_pesanan',
            'bukti_pembayaran' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $pesanan = Pesanan::find($request->id_pesanan);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        // upload bukti pembayaran
        $path = $request->file('bukti_pembayaran')
            ->store('bukti-pembayaran', 'public');

        // generate kode pembayaran
        $lastId = Pembayaran::max('id_pembayaran') + 1;

        $kodePembayaran = 'DP' . str_pad($lastId, 4, '0', STR_PAD_LEFT);

        $pembayaran = Pembayaran::create([
            'id_pesanan' => $pesanan->id_pesanan,
            'kode_pembayaran' => $kodePembayaran,
            'nominal_pembayaran' => 50000,
            'bukti_pembayaran' => $path,
            'tanggal_pembayaran' => now(),
            'status_verifikasi' => 'menunggu_verifikasi',
        ]);

        $pesanan->update([
            'status' => 'menunggu_konfirmasi',
        ]);

        $pesanan->load(['pengguna', 'layanan']);

        $pesanAdmin =
            "📢 Pesanan Baru Masuk\n\n" .
            "Kode Pesanan: {$pesanan->kode_pesanan}\n" .
            "Pelanggan: " . ($pesanan->pengguna->nama_pengguna ?? '-') . "\n" .
            "No HP: " . ($pesanan->pengguna->no_hp ?? '-') . "\n" .
            "Layanan: " . ($pesanan->layanan->nama_layanan ?? '-') . "\n" .
            "Status: Menunggu Konfirmasi\n\n" .
            "Silakan cek dashboard admin.";

        FonnteService::sendMessage(
            env('FONNTE_ADMIN_NUMBER'),
            $pesanAdmin
        );

        return response()->json([
            'message' => 'Pembayaran berhasil dikirim',
            'data' => $pembayaran,
        ], 201);
    }
}