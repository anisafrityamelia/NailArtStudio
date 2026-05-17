<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\DetailNailArt;
use App\Models\DetailPressOn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PesananController extends Controller
{
    public function storeNailArt(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',

            'tanggal_pesanan' => 'required|date',

            'jam_pesanan' => 'required',

            'gambar_inspo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'bagian_kuku' => 'required|string',

            'layanan_tambahan' => 'nullable|string',

            'catatan' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {

            // upload gambar
            $pathGambar = null;

            if ($request->hasFile('gambar_inspo')) {
                $pathGambar = $request
                    ->file('gambar_inspo')
                    ->store('gambar-inspo', 'public');
            }

            // generate kode pesanan
            $kodePesanan =
                'ORD-' .
                now()->format('YmdHis');

            // simpan pesanan
            $pesanan = Pesanan::create([
                'kode_pesanan' => $kodePesanan,

                'id_pengguna' => $request->user()->id_pengguna,

                'id_layanan' => $request->id_layanan,

                'tanggal_pesanan' => $request->tanggal_pesanan,

                'jam_pesanan' => $request->jam_pesanan,

                'status' => 'menunggu_pembayaran',
            ]);

            // simpan detail nail art
            DetailNailArt::create([
                'id_pesanan' => $pesanan->id_pesanan,

                'gambar_inspo' => $pathGambar,

                'bagian_kuku' => $request->bagian_kuku,

                'layanan_tambahan' => $request->layanan_tambahan,

                'catatan' => $request->catatan,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking nail art berhasil',
                'data' => $pesanan->load([
                    'detailNailArt',
                    'layanan',
                    'pengguna'
                ]),
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Booking gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function storePressOn(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',

            'gambar_inspo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'foto_jari_kanan' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'foto_jempol_kanan' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'foto_jari_kiri' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'foto_jempol_kiri' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',

            'shape_kuku' => 'required|string',

            'metode_pengambilan' => 'required|in:ambil,antar',

            'alamat_pengiriman' => 'nullable|string',

            'catatan' => 'nullable|string',
        ]);

        if (
            $request->metode_pengambilan === 'antar' &&
            ! $request->alamat_pengiriman
        ) {
            return response()->json([
                'message' => 'Alamat pengiriman wajib diisi jika memilih metode antar',
            ], 422);
        }

        DB::beginTransaction();

        try {
            $pathGambarInspo = null;

            if ($request->hasFile('gambar_inspo')) {
                $pathGambarInspo = $request
                    ->file('gambar_inspo')
                    ->store('press-on/gambar-inspo', 'public');
            }

            $pathFotoJariKanan = $request
                ->file('foto_jari_kanan')
                ->store('press-on/foto-jari', 'public');

            $pathFotoJempolKanan = $request
                ->file('foto_jempol_kanan')
                ->store('press-on/foto-jari', 'public');

            $pathFotoJariKiri = $request
                ->file('foto_jari_kiri')
                ->store('press-on/foto-jari', 'public');

            $pathFotoJempolKiri = $request
                ->file('foto_jempol_kiri')
                ->store('press-on/foto-jari', 'public');

            $kodePesanan =
                'ORD-' .
                now()->format('YmdHis');

            $pesanan = Pesanan::create([
                'kode_pesanan' => $kodePesanan,

                'id_pengguna' => $request->user()->id_pengguna,

                'id_layanan' => $request->id_layanan,

                'status' => 'menunggu_pembayaran',
            ]);

            DetailPressOn::create([
                'id_pesanan' => $pesanan->id_pesanan,

                'gambar_inspo' => $pathGambarInspo,

                'foto_jari_kanan' => $pathFotoJariKanan,
                'foto_jempol_kanan' => $pathFotoJempolKanan,
                'foto_jari_kiri' => $pathFotoJariKiri,
                'foto_jempol_kiri' => $pathFotoJempolKiri,

                'shape_kuku' => $request->shape_kuku,

                'metode_pengambilan' => $request->metode_pengambilan,

                'alamat_pengiriman' => $request->alamat_pengiriman,

                'catatan' => $request->catatan,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking press on berhasil',
                'data' => $pesanan->load([
                    'detailPressOn',
                    'layanan',
                    'pengguna'
                ]),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Booking press on gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user(); // otomatis dari token Sanctum

        // Ambil semua pesanan milik user tersebut
        $pesanan = Pesanan::with([
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'pembayaran',
        ])
        ->where('id_pengguna', $user->id_pengguna)
        ->orderBy('created_at', 'desc')
        ->get(); // gunakan get(), bukan paginate()

        return response()->json([
            'message' => 'Daftar pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    // pesanan masuk admin
    public function pesananMasukAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'pembayaran',
        ])
        ->where('status', 'menunggu_konfirmasi')
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar pesanan masuk berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'harga_final' => 'required',
            'catatan_admin' => 'nullable|string',
        ]);

        $pesanan = Pesanan::with('pembayaran')
        ->find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        $statusMap = [
            'Terjadwal' => 'terjadwal',
            'Diproses' => 'diproses',
            'Dibatalkan' => 'dibatalkan',
            'Selesai' => 'selesai',
        ];

        $statusDatabase =
            $statusMap[$request->status]
            ?? $request->status;
        
        $pesanan->update([
            'status' => $statusDatabase,
            'harga_final' => $request->harga_final,
            'tanggal_konfirmasi' => now(),
            'dikonfirmasi_oleh' => $request->user()->id_pengguna,
            'catatan_admin' => $request->catatan_admin,
        ]);

        if ($pesanan->pembayaran) {
            $pesanan->pembayaran->update([
                'status_verifikasi' => 'terverifikasi',
                'tanggal_verifikasi' => Carbon::now(),
            ]);
        }

        return response()->json([
            'message' => 'Status pesanan berhasil diperbarui',
            'data' => $pesanan->load([
                'pengguna',
                'layanan',
                'detailNailArt',
                'detailPressOn',
                'pembayaran',
            ]),
        ]);
    }

    // pesanan aktif admin
    public function pesananAktifAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'pembayaran',
        ])
        ->whereIn('status', ['terjadwal', 'diproses'])
        ->orderBy('tanggal_konfirmasi', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar pesanan aktif berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    public function updateStatusAktif(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'catatan_admin' => 'nullable|string',
        ]);

        $pesanan = Pesanan::find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        $statusMap = [
            'Terjadwal' => 'terjadwal',
            'Diproses' => 'diproses',
            'Dibatalkan' => 'dibatalkan',
            'Selesai' => 'selesai',
        ];

        $statusDatabase =
            $statusMap[$request->status]
            ?? $request->status;
        
        $pesanan->update([
            'status' => $statusDatabase,
            'catatan_admin' => $request->catatan_admin,
        ]);

        return response()->json([
            'message' => 'Status pesanan aktif berhasil diperbarui',
            'data' => $pesanan->load([
                'pengguna',
                'layanan',
                'detailNailArt',
                'detailPressOn',
                'pembayaran',
            ]),
        ]);
    }


    // riwayat pesanan admin
    public function riwayatPesananAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'pembayaran',
        ])
        ->whereIn('status', ['selesai', 'dibatalkan'])
        ->orderBy('updated_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar riwayat pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    public function show($id)
    {
        $pesanan = Pesanan::with([
            'user',
            'layanan',
            'detailNailArt',
            'detailPressOn',
        ])->find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }
}