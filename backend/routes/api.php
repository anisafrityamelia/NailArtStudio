<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\GambarLayananController;
use App\Http\Controllers\Api\ManajemenPenggunaController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

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

        Route::get('/pengguna', [ManajemenPenggunaController::class, 'index']);
        Route::post('/pengguna', [ManajemenPenggunaController::class, 'store']);
    });

    Route::middleware('role:pelanggan')->prefix('pelanggan')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Ini dashboard pelanggan'
            ]);
        });
    });
});

Route::get('/layanan', [LayananController::class, 'aktif']);
Route::get('/layanan/kategori/{kategori}', [LayananController::class, 'showByKategori']);
Route::get('/layanan/{id}', [LayananController::class, 'show']);