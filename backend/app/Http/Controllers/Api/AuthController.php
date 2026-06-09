<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /**
     * Registrasi akun pelanggan.
     *
     * Endpoint ini digunakan untuk membuat akun pelanggan baru pada sistem
     * Alia Oye Studio. Setelah registrasi berhasil, sistem akan menghasilkan
     * token autentikasi yang dapat digunakan untuk mengakses endpoint yang
     * memerlukan login.
     */
    public function register(Request $request)
    {
        $request->validate([
            'nama_pengguna' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'no_hp' => 'nullable|string|max:20',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'nama_pengguna' => $request->nama_pengguna,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'password' => Hash::make($request->password),
            'role' => 'pelanggan',
        ]);

        $token = $user->createToken('nailea-token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    /**
     * Login pengguna.
     *
     * Endpoint ini digunakan untuk melakukan autentikasi pengguna menggunakan
     * email dan password. Jika data valid, sistem akan menghasilkan token
     * autentikasi baru dan mengembalikan informasi pengguna.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $user->tokens()->delete();

        $token = $user->createToken('nailea-token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Menampilkan data pengguna yang sedang login.
     *
     * Endpoint ini digunakan untuk mengambil informasi akun pengguna yang sedang
     * terautentikasi berdasarkan token yang dikirim pada request.
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Memperbarui profil pengguna.
     *
     * Endpoint ini digunakan untuk mengubah informasi profil pengguna yang sedang
     * login, seperti nama pengguna, email, dan nomor handphone.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'nama_pengguna' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id_pengguna, 'id_pengguna'),
            ],
            'no_hp' => 'nullable|string|max:20',
        ]);

        $user->update([
            'nama_pengguna' => $request->nama_pengguna,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
        ]);

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'user' => $user->fresh(),
        ]);
    }

    /**
     * Memperbarui foto profil pengguna.
     *
     * Endpoint ini digunakan untuk mengunggah dan mengganti foto profil pengguna.
     * Jika pengguna sebelumnya telah memiliki foto profil, maka foto lama akan
     * dihapus dari penyimpanan sebelum foto baru disimpan.
     */
    public function updateFotoProfil(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'profil_foto' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if (
            $user->profil_foto &&
            Storage::disk('public')->exists($user->profil_foto)
        ) {
            Storage::disk('public')->delete($user->profil_foto);
        }

        $path = $request->file('profil_foto')->store('foto-profil', 'public');

        $user->update([
            'profil_foto' => $path,
        ]);

        return response()->json([
            'message' => 'Foto profil berhasil diperbarui',
            'user' => $user->fresh(),
            'url_foto' => asset('storage/' . $path),
        ]);
    }

    /**
     * Logout pengguna.
     *
     * Endpoint ini digunakan untuk mengakhiri sesi pengguna yang sedang login
     * dengan menghapus token autentikasi yang sedang digunakan.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    /**
     * Mengubah kata sandi pengguna.
     *
     * Endpoint ini digunakan untuk memperbarui kata sandi akun pengguna.
     * Pengguna harus memasukkan kata sandi lama yang sesuai sebelum dapat
     * mengganti kata sandi dengan yang baru.
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'sandi_lama' => 'required|string',
            'sandi_baru' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        // cek password lama
        if (!Hash::check($request->sandi_lama, $user->password)) {
            return response()->json([
                'message' => 'Sandi lama tidak sesuai'
            ], 422);
        }

        // update password baru
        $user->password = Hash::make($request->sandi_baru);
        $user->save();

        return response()->json([
            'message' => 'Kata sandi berhasil diubah',
        ]);
    }
}