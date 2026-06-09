<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\Request;

class LayananController extends Controller
{
    /**
     * Menampilkan semua data layanan.
     *
     * Endpoint ini digunakan untuk mengambil seluruh data layanan yang tersedia
     * pada sistem Alia Oye Studio, termasuk gambar layanan dan kategori harga.
     */
    public function index()
    {
        $layanan = Layanan::with(['gambar', 'kategoriHarga'])
            ->orderBy('id_layanan', 'asc')
            ->get();

        return response()->json([
            'message' => 'Data layanan berhasil diambil',
            'data' => $layanan,
        ]);
    }

    /**
     * Menampilkan data layanan aktif.
     *
     * Endpoint ini digunakan untuk mengambil daftar layanan yang memiliki status aktif.
     * Data ini biasanya ditampilkan pada halaman pelanggan atau landing page agar
     * pelanggan hanya melihat layanan yang tersedia untuk dipesan.
     */
    public function aktif()
    {
        $layanan = Layanan::with(['gambar', 'kategoriHarga'])
            ->where('status_layanan', 'aktif')
            ->orderBy('id_layanan', 'asc')
            ->get();

        return response()->json([
            'message' => 'Data layanan aktif berhasil diambil',
            'data' => $layanan,
        ]);
    }

    /**
     * Menampilkan detail layanan berdasarkan ID.
     *
     * Endpoint ini digunakan untuk mengambil detail satu layanan berdasarkan ID layanan,
     * termasuk data gambar layanan dan kategori harga. Jika layanan tidak ditemukan,
     * sistem akan mengembalikan response 404.
     */
    public function show($id)
    {
        $layanan = Layanan::with(['gambar', 'kategoriHarga'])->find($id);

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

    /**
     * Menambahkan data layanan baru.
     *
     * Endpoint ini digunakan oleh admin untuk menambahkan layanan baru ke dalam sistem
     * Alia Oye Studio. Data yang dikirim meliputi nama layanan, harga dasar, deskripsi,
     * kategori layanan, durasi layanan, dan status layanan.
     */
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

    /**
     * Memperbarui data layanan.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah data layanan berdasarkan ID layanan.
     * Data yang dapat diperbarui meliputi nama layanan, harga dasar, deskripsi layanan,
     * kategori layanan, durasi layanan, dan status layanan.
     */
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

    /**
     * Menghapus data layanan.
     *
     * Endpoint ini digunakan oleh admin untuk menghapus data layanan berdasarkan ID layanan.
     * Jika layanan tidak ditemukan, sistem akan mengembalikan response 404.
     */
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

    /**
     * Menampilkan detail layanan berdasarkan kategori.
     *
     * Endpoint ini digunakan untuk mengambil detail layanan aktif berdasarkan kategori layanan,
     * seperti nail art, press on, eyelash, remove, atau kursus. Data yang ditampilkan
     * mencakup informasi layanan, gambar layanan, dan kategori harga.
     */
    public function showByKategori($kategori)
    {
        $layanan = Layanan::with(['gambar', 'kategoriHarga'])
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