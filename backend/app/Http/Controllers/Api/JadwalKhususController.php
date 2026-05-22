<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JadwalKhusus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JadwalKhususController extends Controller
{
    public function index()
    {
        $jadwal = JadwalKhusus::orderBy('tanggal', 'asc')->get();

        return response()->json([
            'message' => 'Data jadwal khusus berhasil diambil',
            'data' => $jadwal,
        ]);
    }

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

    public function destroy($id)
    {
        $jadwal = JadwalKhusus::findOrFail($id);
        $jadwal->delete();

        return response()->json([
            'message' => 'Jadwal khusus berhasil dihapus',
        ]);
    }
}
