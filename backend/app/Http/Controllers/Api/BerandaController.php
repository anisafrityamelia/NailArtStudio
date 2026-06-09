<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Beranda;
use App\Models\BerandaGaleri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BerandaController extends Controller
{
    private function getOrCreateBeranda()
    {
        return Beranda::firstOrCreate(
            ['id_beranda' => 1],
            [
                'deskripsi' => '',
                'alamat_studio' => '',
                'link_lokasi' => '',
                'jam_buka' => '',
                'akun_ig' => '',
                'akun_tiktok' => '',
                'no_wa' => '',
            ]
        );
    }

    /**
     * Menampilkan data beranda.
     *
     * Endpoint ini digunakan untuk mengambil seluruh informasi yang ditampilkan
     * pada halaman beranda, seperti deskripsi studio, alamat, jam operasional,
     * media sosial, kontak WhatsApp, dan galeri studio.
     */
    public function show()
    {
        $beranda = $this->getOrCreateBeranda()->load('galeri');

        return response()->json([
            'message' => 'Data beranda berhasil diambil',
            'data' => $beranda,
        ]);
    }

    /**
     * Memperbarui data beranda.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah informasi yang ditampilkan
     * pada halaman beranda, seperti deskripsi studio, alamat, link lokasi,
     * jam operasional, akun media sosial, dan nomor WhatsApp.
     */
    public function update(Request $request)
    {
        $beranda = $this->getOrCreateBeranda();

        $validated = $request->validate([
            'deskripsi' => 'nullable|string',
            'alamat_studio' => 'nullable|string',
            'link_lokasi' => 'nullable|string',
            'jam_buka' => 'nullable|string|max:255',
            'akun_ig' => 'nullable|string|max:255',
            'akun_tiktok' => 'nullable|string|max:255',
            'no_wa' => 'nullable|string|max:255',
        ]);

        $beranda->update($validated);

        return response()->json([
            'message' => 'Data beranda berhasil diperbarui',
            'data' => $beranda->load('galeri'),
        ]);
    }

    /**
     * Mengunggah atau memperbarui gambar galeri.
     *
     * Endpoint ini digunakan oleh admin untuk menambahkan atau mengganti gambar
     * galeri yang ditampilkan pada halaman beranda. Setiap gambar memiliki urutan
     * tampil yang digunakan untuk mengatur posisi galeri pada landing page.
     */
    public function uploadGaleri(Request $request)
    {
        $beranda = $this->getOrCreateBeranda();

        $validated = $request->validate([
            'gambar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'urutan_tampil' => 'required|integer|min:1',
        ]);

        $galeri = BerandaGaleri::where('id_beranda', $beranda->id_beranda)
            ->where('urutan_tampil', $validated['urutan_tampil'])
            ->first();

        $path = $request->file('gambar')->store('beranda/galeri', 'public');

        if ($galeri) {
            if ($galeri->path_gambar && Storage::disk('public')->exists($galeri->path_gambar)) {
                Storage::disk('public')->delete($galeri->path_gambar);
            }

            $galeri->update([
                'path_gambar' => $path,
            ]);
        } else {
            $galeri = BerandaGaleri::create([
                'id_beranda' => $beranda->id_beranda,
                'path_gambar' => $path,
                'urutan_tampil' => $validated['urutan_tampil'],
            ]);
        }

        return response()->json([
            'message' => 'Gambar galeri berhasil diperbarui',
            'data' => $galeri,
        ]);
    }

    /**
     * Menghapus gambar galeri.
     *
     * Endpoint ini digunakan oleh admin untuk menghapus gambar galeri berdasarkan
     * ID galeri. File gambar yang tersimpan pada penyimpanan server juga akan
     * dihapus secara otomatis.
     */
    public function deleteGaleri($id_galeri)
    {
        $galeri = BerandaGaleri::findOrFail($id_galeri);

        if ($galeri->path_gambar && Storage::disk('public')->exists($galeri->path_gambar)) {
            Storage::disk('public')->delete($galeri->path_gambar);
        }

        $galeri->delete();

        return response()->json([
            'message' => 'Gambar galeri berhasil dihapus',
        ]);
    }
}