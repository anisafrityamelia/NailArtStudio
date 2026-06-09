<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GambarLayanan;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GambarLayananController extends Controller
{
    /**
     * Menambahkan gambar layanan.
     *
     * Endpoint ini digunakan oleh admin untuk mengunggah gambar baru yang
     * akan dikaitkan dengan suatu layanan. Gambar yang berhasil diunggah
     * akan disimpan pada penyimpanan server dan dicatat pada database.
     */
    public function store(Request $request, $id_layanan)
    {
        $layanan = Layanan::find($id_layanan);

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        $request->validate([
            'gambar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $path = $request->file('gambar')->store('gambar-layanan', 'public');

        $gambar = GambarLayanan::create([
            'id_layanan' => $id_layanan,
            'path_gambar' => $path,
        ]);

        return response()->json([
            'message' => 'Gambar layanan berhasil ditambahkan',
            'data' => $gambar,
            'url_gambar' => asset('storage/' . $path),
        ], 201);
    }

    /**
     * Mengganti gambar layanan.
     *
     * Endpoint ini digunakan oleh admin untuk memperbarui gambar layanan yang
     * sudah ada. Jika sebelumnya terdapat file gambar lama, maka file tersebut
     * akan dihapus dari penyimpanan sebelum gambar baru disimpan.
     */
    public function replace(Request $request, $id_gambar)
    {
        $gambar = GambarLayanan::find($id_gambar);

        if (! $gambar) {
            return response()->json([
                'message' => 'Gambar layanan tidak ditemukan',
            ], 404);
        }

        $request->validate([
            'gambar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if (
            $gambar->path_gambar &&
            Storage::disk('public')->exists($gambar->path_gambar)
        ) {
            Storage::disk('public')->delete($gambar->path_gambar);
        }

        $path = $request->file('gambar')->store('gambar-layanan', 'public');

        $gambar->update([
            'path_gambar' => $path,
        ]);

        return response()->json([
            'message' => 'Gambar layanan berhasil diganti',
            'data' => $gambar,
            'url_gambar' => asset('storage/' . $path),
        ]);
    }

    /**
     * Menghapus gambar layanan.
     *
     * Endpoint ini digunakan oleh admin untuk menghapus gambar layanan berdasarkan
     * ID gambar. File gambar yang tersimpan pada server juga akan dihapus secara
     * otomatis untuk menjaga konsistensi data dan penyimpanan.
     */
    public function destroy($id_gambar)
    {
        $gambar = GambarLayanan::find($id_gambar);

        if (! $gambar) {
            return response()->json([
                'message' => 'Gambar layanan tidak ditemukan',
            ], 404);
        }

        if ($gambar->path_gambar && Storage::disk('public')->exists($gambar->path_gambar)) {
            Storage::disk('public')->delete($gambar->path_gambar);
        }

        $gambar->delete();

        return response()->json([
            'message' => 'Gambar layanan berhasil dihapus',
        ]);
    }
}