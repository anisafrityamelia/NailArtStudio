<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\DetailNailArt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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