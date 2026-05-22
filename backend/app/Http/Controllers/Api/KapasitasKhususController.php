<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KapasitasKhusus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class KapasitasKhususController extends Controller
{
    public function index()
    {
        $kapasitas = KapasitasKhusus::orderBy('tanggal', 'asc')->get();

        return response()->json([
            'message' => 'Data kapasitas khusus berhasil diambil',
            'data' => $kapasitas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date|unique:kapasitas_khusus,tanggal',
            'jumlah_karyawan' => 'required|integer|min:1',
            'catatan' => 'nullable|string',
        ]);

        $kapasitas = KapasitasKhusus::create([
            'tanggal' => $request->tanggal,
            'jumlah_karyawan' => $request->jumlah_karyawan,
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'message' => 'Kapasitas khusus berhasil ditambahkan',
            'data' => $kapasitas,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $kapasitas = KapasitasKhusus::findOrFail($id);

        $request->validate([
            'tanggal' => [
                'required',
                'date',
                Rule::unique('kapasitas_khusus', 'tanggal')->ignore($kapasitas->id_kapasitas, 'id_kapasitas'),
            ],
            'jumlah_karyawan' => 'required|integer|min:1',
            'catatan' => 'nullable|string',
        ]);

        $kapasitas->update([
            'tanggal' => $request->tanggal,
            'jumlah_karyawan' => $request->jumlah_karyawan,
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'message' => 'Kapasitas khusus berhasil diperbarui',
            'data' => $kapasitas,
        ]);
    }

    public function destroy($id)
    {
        $kapasitas = KapasitasKhusus::findOrFail($id);
        $kapasitas->delete();

        return response()->json([
            'message' => 'Kapasitas khusus berhasil dihapus',
        ]);
    }
}
