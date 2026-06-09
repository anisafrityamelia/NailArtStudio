<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JadwalKhusus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JadwalKhususController extends Controller
{
    /**
     * Menampilkan daftar jadwal khusus.
     *
     * Endpoint ini digunakan untuk mengambil seluruh data jadwal khusus yang telah
     * ditentukan oleh admin. Jadwal khusus digunakan untuk mengatur perubahan
     * operasional studio pada tanggal tertentu, seperti hari libur atau perubahan
     * jam operasional.
     */
    public function index()
    {
        $jadwal = JadwalKhusus::orderBy('tanggal', 'asc')->get();

        return response()->json([
            'message' => 'Data jadwal khusus berhasil diambil',
            'data' => $jadwal,
        ]);
    }

    /**
     * Menambahkan jadwal khusus.
     *
     * Endpoint ini digunakan oleh admin untuk membuat jadwal khusus pada tanggal
     * tertentu. Admin dapat menentukan apakah studio buka atau tutup serta
     * mengatur jam operasional khusus yang berbeda dari pengaturan default.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date|after_or_equal:today|unique:jadwal_khusus,tanggal',
            'status_buka' => 'required|in:Buka,Tutup',
            'jam_buka' => 'nullable|required_if:status_buka,Buka|date_format:H:i',
            'jam_tutup' => 'nullable|required_if:status_buka,Buka|date_format:H:i|after:jam_buka',
            'catatan' => 'nullable|string',
        ]);

        $jadwal = JadwalKhusus::create([
            'tanggal' => $request->tanggal,
            'status_buka' => $request->status_buka,
            'jam_buka' => $request->status_buka === 'Buka' ? $request->jam_buka : null,
            'jam_tutup' => $request->status_buka === 'Buka' ? $request->jam_tutup : null,
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'message' => 'Jadwal khusus berhasil ditambahkan',
            'data' => $jadwal,
        ], 201);
    }

    /**
     * Memperbarui jadwal khusus.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah data jadwal khusus yang
     * sudah ada, termasuk tanggal, status buka atau tutup, jam operasional,
     * serta catatan tambahan.
     */
    public function update(Request $request, $id)
    {
        $jadwal = JadwalKhusus::findOrFail($id);

        $request->validate([
            'tanggal' => [
                'required',
                'date',
                'after_or_equal:today',
                Rule::unique('jadwal_khusus', 'tanggal')->ignore($jadwal->id_jadwal, 'id_jadwal'),
            ],
            'status_buka' => 'required|in:Buka,Tutup',
            'jam_buka' => 'nullable|required_if:status_buka,Buka|date_format:H:i',
            'jam_tutup' => 'nullable|required_if:status_buka,Buka|date_format:H:i|after:jam_buka',
            'catatan' => 'nullable|string',
        ]);

        $jadwal->update([
            'tanggal' => $request->tanggal,
            'status_buka' => $request->status_buka,
            'jam_buka' => $request->status_buka === 'Buka' ? $request->jam_buka : null,
            'jam_tutup' => $request->status_buka === 'Buka' ? $request->jam_tutup : null,
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'message' => 'Jadwal khusus berhasil diperbarui',
            'data' => $jadwal,
        ]);
    }

    /**
     * Menghapus jadwal khusus.
     *
     * Endpoint ini digunakan oleh admin untuk menghapus jadwal khusus berdasarkan
     * ID jadwal. Setelah dihapus, sistem akan kembali menggunakan pengaturan
     * operasional default pada tanggal tersebut.
     */
    public function destroy($id)
    {
        $jadwal = JadwalKhusus::findOrFail($id);
        $jadwal->delete();

        return response()->json([
            'message' => 'Jadwal khusus berhasil dihapus',
        ]);
    }
}
