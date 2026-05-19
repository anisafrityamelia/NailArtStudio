<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KategoriHargaLayanan;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KategoriHargaLayananController extends Controller
{
    public function store(Request $request, $id_layanan)
    {
        $layanan = Layanan::find($id_layanan);

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        $request->validate([
            'nama_kategori' => 'required|string|max:100',
            'deskripsi_kategori' => 'nullable|string',
            'estimasi_harga' => 'required|integer|min:0',
            'gambar_kategori' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'urutan' => 'nullable|integer|min:0',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $pathGambar = null;

        if ($request->hasFile('gambar_kategori')) {
            $pathGambar = $request
                ->file('gambar_kategori')
                ->store('kategori-harga-layanan', 'public');
        }

        $kategori = KategoriHargaLayanan::create([
            'id_layanan' => $id_layanan,
            'nama_kategori' => $request->nama_kategori,
            'deskripsi_kategori' => $request->deskripsi_kategori,
            'estimasi_harga' => $request->estimasi_harga,
            'gambar_kategori' => $pathGambar,
            'urutan' => $request->urutan ?? 0,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Kategori harga berhasil ditambahkan',
            'data' => $kategori,
        ], 201);
    }

    public function update(Request $request, $id_kategori_harga)
    {
        $kategori = KategoriHargaLayanan::find($id_kategori_harga);

        if (! $kategori) {
            return response()->json([
                'message' => 'Kategori harga tidak ditemukan',
            ], 404);
        }

        $request->validate([
            'nama_kategori' => 'required|string|max:100',
            'deskripsi_kategori' => 'nullable|string',
            'estimasi_harga' => 'required|integer|min:0',
            'gambar_kategori' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'urutan' => 'nullable|integer|min:0',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        if ($request->hasFile('gambar_kategori')) {
            if ($kategori->gambar_kategori) {
                Storage::disk('public')->delete($kategori->gambar_kategori);
            }

            $kategori->gambar_kategori = $request
                ->file('gambar_kategori')
                ->store('kategori-harga-layanan', 'public');
        }

        $kategori->update([
            'nama_kategori' => $request->nama_kategori,
            'deskripsi_kategori' => $request->deskripsi_kategori,
            'estimasi_harga' => $request->estimasi_harga,
            'urutan' => $request->urutan ?? 0,
            'status' => $request->status,
            'gambar_kategori' => $kategori->gambar_kategori,
        ]);

        return response()->json([
            'message' => 'Kategori harga berhasil diperbarui',
            'data' => $kategori,
        ]);
    }

    public function destroy($id_kategori_harga)
    {
        $kategori = KategoriHargaLayanan::find($id_kategori_harga);

        if (! $kategori) {
            return response()->json([
                'message' => 'Kategori harga tidak ditemukan',
            ], 404);
        }

        if ($kategori->gambar_kategori) {
            Storage::disk('public')->delete($kategori->gambar_kategori);
        }

        $kategori->delete();

        return response()->json([
            'message' => 'Kategori harga berhasil dihapus',
        ]);
    }
}