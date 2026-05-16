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

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

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

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

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