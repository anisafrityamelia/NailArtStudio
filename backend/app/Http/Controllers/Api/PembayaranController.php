<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
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

        return response()->json([
            'message' => 'Pembayaran berhasil dikirim',
            'data' => $pembayaran,
        ], 201);
    }
}