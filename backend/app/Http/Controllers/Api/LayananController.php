<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\Request;

class LayananController extends Controller
{
    public function index()
    {
        $layanan = Layanan::with('gambar')
            ->orderBy('id_layanan', 'desc')
            ->get();

        return response()->json([
            'message' => 'Data layanan berhasil diambil',
            'data' => $layanan,
        ]);
    }

    public function aktif()
    {
        $layanan = Layanan::with('gambar')
            ->where('status_layanan', 'aktif')
            ->orderBy('id_layanan', 'desc')
            ->get();

        return response()->json([
            'message' => 'Data layanan aktif berhasil diambil',
            'data' => $layanan,
        ]);
    }

    public function show($id)
    {
        $layanan = Layanan::with('gambar')->find($id);

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail layanan berhasil diambil',
            'data' => $layanan,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'harga_dasar' => 'required|integer|min:0',
            'deskripsi_layanan' => 'nullable|string',
            'kategori_layanan' => 'required|string|max:100',
            'durasi_menit' => 'required|integer|min:1',
            'status_layanan' => 'required|in:aktif,nonaktif',
        ]);

        $layanan = Layanan::create([
            'nama_layanan' => $request->nama_layanan,
            'harga_dasar' => $request->harga_dasar,
            'deskripsi_layanan' => $request->deskripsi_layanan,
            'kategori_layanan' => $request->kategori_layanan,
            'durasi_menit' => $request->durasi_menit,
            'status_layanan' => $request->status_layanan,
        ]);

        return response()->json([
            'message' => 'Layanan berhasil ditambahkan',
            'data' => $layanan,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $layanan = Layanan::find($id);

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'harga_dasar' => 'required|integer|min:0',
            'deskripsi_layanan' => 'nullable|string',
            'kategori_layanan' => 'required|string|max:100',
            'durasi_menit' => 'required|integer|min:1',
            'status_layanan' => 'required|in:aktif,nonaktif',
        ]);

        $layanan->update([
            'nama_layanan' => $request->nama_layanan,
            'harga_dasar' => $request->harga_dasar,
            'deskripsi_layanan' => $request->deskripsi_layanan,
            'kategori_layanan' => $request->kategori_layanan,
            'durasi_menit' => $request->durasi_menit,
            'status_layanan' => $request->status_layanan,
        ]);

        return response()->json([
            'message' => 'Layanan berhasil diperbarui',
            'data' => $layanan,
        ]);
    }

    public function destroy($id)
    {
        $layanan = Layanan::find($id);

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        $layanan->delete();

        return response()->json([
            'message' => 'Layanan berhasil dihapus',
        ]);
    }

    public function showByKategori($kategori)
    {
        $layanan = Layanan::with('gambar')
            ->where('kategori_layanan', $kategori)
            ->where('status_layanan', 'aktif')
            ->first();

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail layanan berhasil diambil',
            'data' => $layanan,
        ]);
    }
}