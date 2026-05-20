<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\GambarLayananController;
use App\Http\Controllers\Api\ManajemenPenggunaController;
use App\Http\Controllers\Api\PesananController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\KategoriHargaLayananController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Ini dashboard admin'
            ]);
        });
        Route::get('/layanan', [LayananController::class, 'index']);
        Route::post('/layanan', [LayananController::class, 'store']);
        Route::put('/layanan/{id}', [LayananController::class, 'update']);
        Route::delete('/layanan/{id}', [LayananController::class, 'destroy']);
        
        Route::post('/layanan/{id_layanan}/gambar', [GambarLayananController::class, 'store']);
        Route::post('/gambar-layanan/{id_gambar}/replace', [GambarLayananController::class, 'replace']);
        Route::delete('/gambar-layanan/{id_gambar}', [GambarLayananController::class, 'destroy']);

        Route::post('/layanan/{id_layanan}/kategori-harga', [KategoriHargaLayananController::class, 'store']);
        Route::post('/kategori-harga-layanan/{id_kategori_harga}', [KategoriHargaLayananController::class, 'update']);
        Route::delete('/kategori-harga-layanan/{id_kategori_harga}', [KategoriHargaLayananController::class, 'destroy']);

        Route::get('/pengguna', [ManajemenPenggunaController::class, 'index']);
        Route::post('/pengguna', [ManajemenPenggunaController::class, 'store']);
        Route::put('/pengguna/{id}', [ManajemenPenggunaController::class, 'update']);
        Route::post('/pengguna/{id}/reset-password', [ManajemenPenggunaController::class, 'resetPassword']);
        Route::delete('/pengguna/{id}', [ManajemenPenggunaController::class, 'destroy']);

        Route::get('/pesanan/aktif', [PesananController::class, 'pesananAktifAdmin']);
        Route::put('/pesanan/{id}/status-aktif', [PesananController::class, 'updateStatusAktif']);

        Route::get('/pesanan/riwayat', [PesananController::class, 'riwayatPesananAdmin']);
    });

    Route::middleware('role:pelanggan')->prefix('pelanggan')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Ini dashboard pelanggan'
            ]);
        });

        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/profile/foto', [AuthController::class, 'updateFotoProfil']);
        Route::post('/pesanan/nail-art', [PesananController::class, 'storeNailArt']);
        Route::post('/pesanan/press-on', [PesananController::class, 'storePressOn']);
        Route::post('/pesanan/eyelash', [PesananController::class, 'storeEyelash']);
        Route::post('/pembayaran', [PembayaranController::class, 'store']);
        Route::get('/pesanan', [PesananController::class, 'index']);
        Route::get('/pesanan/{id}', [PesananController::class, 'show']);
    });
});

Route::get('/layanan', [LayananController::class, 'aktif']);
Route::get('/layanan/kategori/{kategori}', [LayananController::class, 'showByKategori']);
Route::get('/layanan/{id}', [LayananController::class, 'show']);