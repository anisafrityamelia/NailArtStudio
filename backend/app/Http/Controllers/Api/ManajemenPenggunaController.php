<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManajemenPenggunaController extends Controller
{
    public function index()
    {
        $pengguna = User::orderBy('id_pengguna', 'desc')->get();

        return response()->json([
            'message' => 'Data pengguna berhasil diambil',
            'data' => $pengguna,
        ]);
    }

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
}