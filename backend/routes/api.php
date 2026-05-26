<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\GambarLayananController;
use App\Http\Controllers\Api\ManajemenPenggunaController;
use App\Http\Controllers\Api\PesananController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\KategoriHargaLayananController;
use App\Http\Controllers\Api\PengaturanBookingController;
use App\Http\Controllers\Api\JadwalKhususController;
use App\Http\Controllers\Api\KapasitasKhususController;
use App\Http\Controllers\Api\UlasanController;
use App\Http\Controllers\Api\BerandaController;
use App\Http\Controllers\Api\DasborAdminController;

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

        Route::get('/pengaturan-booking', [PengaturanBookingController::class, 'show']);
        Route::put('/pengaturan-booking', [PengaturanBookingController::class, 'update']);

        Route::get('/jadwal-khusus', [JadwalKhususController::class, 'index']);
        Route::post('/jadwal-khusus', [JadwalKhususController::class, 'store']);
        Route::put('/jadwal-khusus/{id}', [JadwalKhususController::class, 'update']);
        Route::delete('/jadwal-khusus/{id}', [JadwalKhususController::class, 'destroy']);

        Route::get('/kapasitas-khusus', [KapasitasKhususController::class, 'index']);
        Route::post('/kapasitas-khusus', [KapasitasKhususController::class, 'store']);
        Route::put('/kapasitas-khusus/{id}', [KapasitasKhususController::class, 'update']);
        Route::delete('/kapasitas-khusus/{id}', [KapasitasKhususController::class, 'destroy']);

        Route::get('/ulasan', [UlasanController::class, 'adminIndex']);
        Route::put('/ulasan/{id}/status-tampil', [UlasanController::class, 'ubahStatusTampil']);

        Route::get('/beranda', [BerandaController::class, 'show']);
        Route::put('/beranda', [BerandaController::class, 'update']);
        Route::post('/beranda/galeri', [BerandaController::class, 'uploadGaleri']);
        Route::delete('/beranda/galeri/{id_galeri}', [BerandaController::class, 'deleteGaleri']);

        Route::get('/dasbor/statistik', [DasborAdminController::class, 'statistik']);
        Route::get('/dasbor/jadwal-bulanan', [DasborAdminController::class, 'jadwalBulanan']);
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
        Route::post('/pesanan/remove', [PesananController::class, 'storeRemove']);
        Route::get('/pesanan', [PesananController::class, 'index']);
        Route::get('/pesanan/{id}', [PesananController::class, 'show']);

        Route::post('/pembayaran', [PembayaranController::class, 'store']);
    
        Route::get('/slot-booking', [PengaturanBookingController::class, 'slotTersedia']);

        Route::get('/ulasan', [UlasanController::class, 'index']);
        Route::post('/ulasan', [UlasanController::class, 'store']);
        Route::post('/ulasan/{id}', [UlasanController::class, 'update']);
        Route::delete('/ulasan/{id}', [UlasanController::class, 'destroy']);
    });
});

Route::get('/layanan', [LayananController::class, 'aktif']);
Route::get('/layanan/kategori/{kategori}', [LayananController::class, 'showByKategori']);
Route::get('/layanan/{id}', [LayananController::class, 'show']);

Route::get('/ulasan-landing', [UlasanController::class, 'landing']);

Route::get('/beranda', [BerandaController::class, 'show']);