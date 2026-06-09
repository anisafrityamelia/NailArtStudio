<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\Ulasan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UlasanController extends Controller
{
    /**
     * Menampilkan daftar ulasan pelanggan.
     *
     * Endpoint ini digunakan oleh pelanggan untuk mengambil daftar pesanan yang
     * sudah selesai dan dapat diberi ulasan. Data yang ditampilkan mencakup
     * informasi layanan dan ulasan yang sudah diberikan jika tersedia.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $pesanan = Pesanan::with([
            'layanan',
            'ulasan',
        ])
        ->where('id_pengguna', $user->id_pengguna)
        ->where('status', 'selesai')
        ->orderBy('updated_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar ulasan berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    /**
     * Menampilkan ulasan pada landing page.
     *
     * Endpoint ini digunakan untuk mengambil ulasan pelanggan yang ditampilkan
     * pada landing page. Data ulasan diambil secara acak dan hanya menampilkan
     * ulasan yang memiliki status ditampilkan.
     */
    public function landing()
    {
        $ulasan = Ulasan::with([
            'pengguna',
            'pesanan.layanan',
        ])
        ->whereNotNull('ulasan')
        ->where('ulasan', '!=', '')
        ->where('status_tampil', 'ditampilkan')
        ->inRandomOrder()
        ->get()
        ->map(function ($item) {
            return [
                'id_ulasan' => $item->id_ulasan,
                'rating' => $item->rating,
                'ulasan' => $item->ulasan,

                'nama_pelanggan' => $item->pengguna?->nama_pengguna ?? 'pelanggan alia oye',

                'foto_profil_url' => $item->pengguna?->url_profil_foto,

                'gambar_ulasan_url' => $item->url_gambar_ulasan,
            ];
        });

        return response()->json([
            'message' => 'Ulasan landing berhasil diambil',
            'data' => $ulasan,
        ]);
    }

    /**
     * Menampilkan daftar ulasan untuk admin.
     *
     * Endpoint ini digunakan oleh admin untuk mengambil seluruh data ulasan
     * pelanggan. Data yang ditampilkan mencakup kode pesanan, nama pelanggan,
     * nama layanan, rating, isi ulasan, gambar ulasan, dan status tampil.
     */
    public function adminIndex()
    {
        $ulasan = Ulasan::with([
            'pengguna',
            'pesanan.layanan',
        ])
        ->latest()
        ->get()
        ->map(function ($item) {
            return [
                'id_ulasan' => $item->id_ulasan,
                'kode_pesanan' => $item->pesanan?->kode_pesanan ?? '-',
                'nama_pelanggan' => $item->pengguna?->nama_pengguna ?? '-',
                'nama_layanan' => $item->pesanan?->layanan?->nama_layanan ?? '-',
                'rating' => $item->rating,
                'ulasan' => $item->ulasan,
                'gambar_ulasan_url' => $item->url_gambar_ulasan,
                'status_tampil' => $item->status_tampil,
            ];
        });

        return response()->json([
            'message' => 'Daftar ulasan admin berhasil diambil',
            'data' => $ulasan,
        ]);
    }

    /**
     * Memperbarui status tampil ulasan.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah status ulasan menjadi
     * ditampilkan atau disembunyikan. Status ini menentukan apakah ulasan
     * pelanggan akan muncul pada landing page.
     */
    public function ubahStatusTampil(Request $request, $id)
    {
        $request->validate([
            'status_tampil' => 'required|in:ditampilkan,disembunyikan',
        ]);

        $ulasan = Ulasan::find($id);

        if (! $ulasan) {
            return response()->json([
                'message' => 'Ulasan tidak ditemukan',
            ], 404);
        }

        $ulasan->update([
            'status_tampil' => $request->status_tampil,
        ]);

        return response()->json([
            'message' => 'Status tampil ulasan berhasil diperbarui',
            'data' => $ulasan,
        ]);
    }

    /**
     * Menambahkan ulasan pelanggan.
     *
     * Endpoint ini digunakan oleh pelanggan untuk memberikan ulasan pada pesanan
     * yang sudah selesai. Data ulasan mencakup rating, isi ulasan, dan gambar
     * ulasan opsional. Setiap pesanan hanya dapat diberi satu ulasan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_pesanan' => 'required|exists:pesanan,id_pesanan',
            'rating' => 'required|integer|min:1|max:5',
            'ulasan' => 'required|string',
            'gambar_ulasan' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $request->user();

        $pesanan = Pesanan::where('id_pesanan', $request->id_pesanan)
            ->where('id_pengguna', $user->id_pengguna)
            ->first();

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        if ($pesanan->status !== 'selesai') {
            return response()->json([
                'message' => 'Ulasan hanya bisa diberikan untuk pesanan yang sudah selesai',
            ], 422);
        }

        $sudahAdaUlasan = Ulasan::where('id_pesanan', $pesanan->id_pesanan)->exists();

        if ($sudahAdaUlasan) {
            return response()->json([
                'message' => 'Pesanan ini sudah pernah diberi ulasan',
            ], 422);
        }

        $pathGambar = null;

        if ($request->hasFile('gambar_ulasan')) {
            $pathGambar = $request
                ->file('gambar_ulasan')
                ->store('ulasan', 'public');
        }

        $ulasan = Ulasan::create([
            'id_pesanan' => $pesanan->id_pesanan,
            'id_pengguna' => $user->id_pengguna,
            'rating' => $request->rating,
            'ulasan' => $request->ulasan,
            'gambar_ulasan' => $pathGambar,
        ]);

        return response()->json([
            'message' => 'Ulasan berhasil disimpan',
            'data' => $ulasan,
        ], 201);
    }

    /**
     * Memperbarui ulasan pelanggan.
     *
     * Endpoint ini digunakan oleh pelanggan untuk mengubah ulasan yang sudah
     * pernah diberikan, meliputi rating, isi ulasan, dan gambar ulasan. Jika
     * pelanggan mengunggah gambar baru, maka gambar lama akan diganti.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'ulasan' => 'required|string',
            'gambar_ulasan' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $request->user();

        $ulasan = Ulasan::where('id_ulasan', $id)
            ->where('id_pengguna', $user->id_pengguna)
            ->first();

        if (! $ulasan) {
            return response()->json([
                'message' => 'Ulasan tidak ditemukan',
            ], 404);
        }

        $pathGambar = $ulasan->gambar_ulasan;

        if ($request->hasFile('gambar_ulasan')) {
            if ($ulasan->gambar_ulasan) {
                Storage::disk('public')->delete($ulasan->gambar_ulasan);
            }

            $pathGambar = $request
                ->file('gambar_ulasan')
                ->store('ulasan', 'public');
        }

        $ulasan->update([
            'rating' => $request->rating,
            'ulasan' => $request->ulasan,
            'gambar_ulasan' => $pathGambar,
        ]);

        return response()->json([
            'message' => 'Ulasan berhasil diperbarui',
            'data' => $ulasan,
        ]);
    }

    /**
     * Menghapus ulasan pelanggan.
     *
     * Endpoint ini digunakan oleh pelanggan untuk menghapus ulasan miliknya.
     * Jika ulasan memiliki gambar yang tersimpan, maka file gambar tersebut
     * juga akan dihapus dari penyimpanan server.
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        $ulasan = Ulasan::where('id_ulasan', $id)
            ->where('id_pengguna', $user->id_pengguna)
            ->first();

        if (! $ulasan) {
            return response()->json([
                'message' => 'Ulasan tidak ditemukan',
            ], 404);
        }

        if ($ulasan->gambar_ulasan) {
            Storage::disk('public')->delete($ulasan->gambar_ulasan);
        }

        $ulasan->delete();

        return response()->json([
            'message' => 'Ulasan berhasil dihapus',
        ]);
    }
}