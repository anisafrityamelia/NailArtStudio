<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManajemenPenggunaController extends Controller
{
    /**
     * Menampilkan daftar pengguna.
     *
     * Endpoint ini digunakan oleh admin untuk mengambil seluruh data pengguna
     * yang terdaftar pada sistem Alia Oye Studio, baik pengguna dengan peran
     * admin maupun pelanggan.
     */
    public function index()
    {
        $pengguna = User::orderBy('id_pengguna', 'desc')->get();

        return response()->json([
            'message' => 'Data pengguna berhasil diambil',
            'data' => $pengguna,
        ]);
    }

    /**
     * Menambahkan pengguna baru.
     *
     * Endpoint ini digunakan oleh admin untuk membuat akun pengguna baru.
     * Admin dapat menentukan peran pengguna sebagai admin atau pelanggan.
     * Password awal akan dibuat secara otomatis menggunakan password default.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_pengguna' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'no_hp' => 'required|string|max:20',
            'role' => 'required|in:admin,pelanggan',
        ]);

        $pengguna = User::create([
            'nama_pengguna' => $request->nama_pengguna,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'password' => Hash::make('123456'),
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'Pengguna berhasil ditambahkan',
            'data' => $pengguna,
        ], 201);
    }

    /**
     * Memperbarui data pengguna.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah informasi akun pengguna,
     * seperti nama pengguna, email, dan nomor handphone. Perubahan hanya dapat
     * dilakukan pada akun yang diperbolehkan oleh sistem.
     */
    public function update(Request $request, $id)
    {
        $pengguna = User::find($id);

        if (! $pengguna) {
            return response()->json([
                'message' => 'Pengguna tidak ditemukan',
            ], 404);
        }

        if ($pengguna->role === 'pelanggan') {
            return response()->json([
                'message' => 'Data pelanggan tidak dapat diedit',
            ], 403);
        }

        $request->validate([
            'nama_pengguna' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $pengguna->id_pengguna . ',id_pengguna',
            'no_hp' => 'required|string|max:20',
        ]);

        $pengguna->update([
            'nama_pengguna' => $request->nama_pengguna,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
        ]);

        return response()->json([
            'message' => 'Pengguna berhasil diperbarui',
            'data' => $pengguna,
        ]);
    }

    /**
     * Mereset password pengguna.
     *
     * Endpoint ini digunakan oleh admin untuk mengembalikan password pengguna
     * ke password default yang telah ditentukan sistem. Fitur ini digunakan
     * ketika pengguna mengalami kendala saat masuk ke akun.
     */
    public function resetPassword($id)
    {
        $pengguna = User::find($id);

        if (! $pengguna) {
            return response()->json([
                'message' => 'Pengguna tidak ditemukan',
            ], 404);
        }

        $pengguna->update([
            'password' => Hash::make('123456'),
        ]);

        return response()->json([
            'message' => 'Password berhasil direset',
            'password_default' => '123456',
        ]);
    }

    /**
     * Menghapus pengguna.
     *
     * Endpoint ini digunakan oleh admin untuk menghapus akun pengguna dari sistem.
     * Setelah akun dihapus, pengguna tidak lagi dapat mengakses layanan maupun
     * fitur yang tersedia pada aplikasi.
     */
    public function destroy($id)
    {
        $pengguna = User::find($id);

        if (! $pengguna) {
            return response()->json([
                'message' => 'Pengguna tidak ditemukan',
            ], 404);
        }

        $pengguna->delete();

        return response()->json([
            'message' => 'Pengguna berhasil dihapus',
        ]);
    }
}