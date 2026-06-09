<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KapasitasKhusus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class KapasitasKhususController extends Controller
{
    /**
     * Menampilkan daftar kapasitas khusus.
     *
     * Endpoint ini digunakan untuk mengambil seluruh data kapasitas khusus yang
     * telah ditentukan oleh admin. Data ini digunakan untuk menyesuaikan jumlah
     * karyawan yang tersedia pada tanggal tertentu sehingga kapasitas pemesanan
     * dapat dihitung dengan lebih akurat.
     */
    public function index()
    {
        $kapasitas = KapasitasKhusus::orderBy('tanggal', 'asc')->get();

        return response()->json([
            'message' => 'Data kapasitas khusus berhasil diambil',
            'data' => $kapasitas,
        ]);
    }

    /**
     * Menambahkan kapasitas khusus.
     *
     * Endpoint ini digunakan oleh admin untuk menetapkan jumlah karyawan yang
     * tersedia pada tanggal tertentu. Pengaturan ini dapat digunakan ketika
     * terjadi penambahan atau pengurangan staf yang memengaruhi kapasitas layanan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date|after_or_equal:today|unique:kapasitas_khusus,tanggal',
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

    /**
     * Memperbarui kapasitas khusus.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah data kapasitas khusus yang
     * telah dibuat sebelumnya, termasuk tanggal, jumlah karyawan yang tersedia,
     * dan catatan tambahan.
     */
    public function update(Request $request, $id)
    {
        $kapasitas = KapasitasKhusus::findOrFail($id);

        $request->validate([
            'tanggal' => [
                'required',
                'date',
                'after_or_equal:today',
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

    /**
     * Menghapus kapasitas khusus.
     *
     * Endpoint ini digunakan oleh admin untuk menghapus pengaturan kapasitas
     * khusus pada tanggal tertentu. Setelah dihapus, sistem akan menggunakan
     * jumlah karyawan dari pengaturan booking default.
     */
    public function destroy($id)
    {
        $kapasitas = KapasitasKhusus::findOrFail($id);
        $kapasitas->delete();

        return response()->json([
            'message' => 'Kapasitas khusus berhasil dihapus',
        ]);
    }
}
