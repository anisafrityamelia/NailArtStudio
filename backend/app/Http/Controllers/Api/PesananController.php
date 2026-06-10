<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\DetailNailArt;
use App\Models\DetailPressOn;
use App\Models\DetailEyelash;
use App\Models\DetailRemove;
use App\Models\DetailLayananTambahan;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Services\FonnteService;

class PesananController extends Controller
{
    /**
     * Membuat pesanan layanan Nail Art.
     *
     * Endpoint ini digunakan oleh pelanggan untuk membuat booking layanan Nail Art.
     * Data pesanan mencakup tanggal, jam, gambar inspirasi, bagian kuku, layanan
     * tambahan, dan catatan. Setelah berhasil, sistem akan membuat data pesanan
     * dan detail Nail Art dengan status awal menunggu pembayaran.
     */
    public function storeNailArt(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',

            'tanggal_pesanan' => 'required|date|after_or_equal:today',

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

    /**
     * Membuat pesanan layanan Press On.
     *
     * Endpoint ini digunakan oleh pelanggan untuk membuat pesanan Press On.
     * Data yang dikirim mencakup gambar inspirasi, foto jari kanan dan kiri,
     * foto jempol kanan dan kiri, shape kuku, metode pengambilan, alamat
     * pengiriman jika memilih antar, serta catatan tambahan.
     */
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

    /**
     * Membuat pesanan layanan Eyelash.
     *
     * Endpoint ini digunakan oleh pelanggan untuk membuat booking layanan Eyelash.
     * Data pesanan mencakup layanan yang dipilih, tanggal, jam, jenis lash,
     * dan catatan tambahan. Status awal pesanan adalah menunggu pembayaran.
     */
    public function storeEyelash(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',

            'tanggal_pesanan' => 'required|date|after_or_equal:today',

            'jam_pesanan' => 'required',

            'jenis_lash' => 'required|string',

            'catatan' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $kodePesanan =
                'ORD-' .
                now()->format('YmdHis');

            $pesanan = Pesanan::create([
                'kode_pesanan' => $kodePesanan,

                'id_pengguna' => $request->user()->id_pengguna,

                'id_layanan' => $request->id_layanan,

                'tanggal_pesanan' => $request->tanggal_pesanan,

                'jam_pesanan' => $request->jam_pesanan,

                'status' => 'menunggu_pembayaran',
            ]);

            DetailEyelash::create([
                'id_pesanan' => $pesanan->id_pesanan,

                'jenis_lash' => $request->jenis_lash,

                'catatan' => $request->catatan,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking eyelash berhasil',
                'data' => $pesanan->load([
                    'detailEyelash',
                    'layanan',
                    'pengguna'
                ]),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Booking eyelash gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Membuat pesanan layanan Remove.
     *
     * Endpoint ini digunakan oleh pelanggan untuk membuat booking layanan Remove.
     * Data pesanan mencakup layanan yang dipilih, tanggal, jam, bagian kuku,
     * dan catatan tambahan. Status awal pesanan adalah menunggu pembayaran.
     */
    public function storeRemove(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',

            'tanggal_pesanan' => 'required|date|after_or_equal:today',

            'jam_pesanan' => 'required',

            'bagian_kuku' => 'required|string',

            'catatan' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $kodePesanan =
                'ORD-' .
                now()->format('YmdHis');

            $pesanan = Pesanan::create([
                'kode_pesanan' => $kodePesanan,

                'id_pengguna' => $request->user()->id_pengguna,

                'id_layanan' => $request->id_layanan,

                'tanggal_pesanan' => $request->tanggal_pesanan,

                'jam_pesanan' => $request->jam_pesanan,

                'status' => 'menunggu_pembayaran',
            ]);

            DetailRemove::create([
                'id_pesanan' => $pesanan->id_pesanan,

                'bagian_kuku' => $request->bagian_kuku,

                'catatan' => $request->catatan,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking remove berhasil',
                'data' => $pesanan->load([
                    'detailRemove',
                    'layanan',
                    'pengguna'
                ]),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Booking remove gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function storeLayananTambahan(Request $request)
    {
        $request->validate([
            'id_layanan' => 'required|exists:layanan,id_layanan',
            'tanggal_pesanan' => 'required|date|after_or_equal:today',
            'jam_pesanan' => 'required',
            'area_waxing' => 'nullable|string',
            'catatan' => 'nullable|string',
        ]);

        $layanan = Layanan::find($request->id_layanan);

        if (! $layanan) {
            return response()->json([
                'message' => 'Layanan tidak ditemukan',
            ], 404);
        }

        if (
            $layanan->kategori_layanan === 'waxing' &&
            ! $request->area_waxing
        ) {
            return response()->json([
                'message' => 'Area waxing wajib diisi',
            ], 422);
        }

        DB::beginTransaction();

        try {
            $kodePesanan = 'ORD-' . now()->format('YmdHis');

            $pesanan = Pesanan::create([
                'kode_pesanan' => $kodePesanan,
                'id_pengguna' => $request->user()->id_pengguna,
                'id_layanan' => $request->id_layanan,
                'tanggal_pesanan' => $request->tanggal_pesanan,
                'jam_pesanan' => $request->jam_pesanan,
                'status' => 'menunggu_pembayaran',
            ]);

            DetailLayananTambahan::create([
                'id_pesanan' => $pesanan->id_pesanan,
                'area_waxing' => $layanan->kategori_layanan === 'waxing'
                    ? $request->area_waxing
                    : null,
                'catatan' => $request->catatan,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking layanan berhasil',
                'data' => $pesanan->load([
                    'detailLayananTambahan',
                    'layanan',
                    'pengguna'
                ]),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Booking layanan gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menampilkan daftar pesanan pelanggan.
     *
     * Endpoint ini digunakan untuk mengambil seluruh pesanan milik pelanggan
     * yang sedang login. Data yang ditampilkan mencakup informasi layanan,
     * detail pesanan sesuai jenis layanan, pembayaran, dan ulasan.
     */
    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user(); // otomatis dari token Sanctum

        // Ambil semua pesanan milik user tersebut
        $pesanan = Pesanan::with([
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'detailEyelash',
            'detailRemove',
            'detailLayananTambahan',
            'pembayaran',
            'ulasan',
        ])
        ->where('id_pengguna', $user->id_pengguna)
        ->orderBy('created_at', 'desc')
        ->get(); // gunakan get(), bukan paginate()

        return response()->json([
            'message' => 'Daftar pesanan berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    /**
     * Menampilkan daftar pesanan aktif untuk admin.
     *
     * Endpoint ini digunakan oleh admin untuk mengambil daftar pesanan aktif,
     * yaitu pesanan dengan status menunggu konfirmasi, terjadwal, diproses,
     * atau siap diambil. Data diurutkan berdasarkan prioritas status, tanggal,
     * jam pesanan, dan waktu pembuatan.
     */
    public function pesananAktifAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'detailEyelash',
            'detailRemove',
            'detailLayananTambahan',
            'pembayaran',
        ])
        ->whereIn('status', ['menunggu_konfirmasi', 'terjadwal', 'diproses', 'siap_diambil'])
        ->orderByRaw("
            CASE
                WHEN status = 'menunggu_konfirmasi' THEN 1
                WHEN status = 'terjadwal' THEN 2
                WHEN status = 'diproses' THEN 3
                WHEN status = 'siap_diambil' THEN 4
                ELSE 5
            END
        ")
        ->orderByRaw("COALESCE(tanggal_pesanan, '9999-12-31') ASC")
        ->orderByRaw("COALESCE(jam_pesanan, '23:59:59') ASC")
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Daftar pesanan aktif berhasil diambil',
            'data' => $pesanan,
        ]);
    }

    /**
     * Memperbarui status pesanan aktif.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah status pesanan aktif,
     * menambahkan catatan admin, serta mengisi harga final pesanan. Jika harga
     * final diisi, sistem juga akan memverifikasi pembayaran DP dan mencatat
     * waktu konfirmasi. Setelah status diperbarui, sistem akan mengirimkan
     * notifikasi WhatsApp kepada pelanggan.
     */
    public function updateStatusAktif(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'catatan_admin' => 'nullable|string',
            'harga_final' => 'nullable',
        ]);

        $pesanan = Pesanan::with('pembayaran')->find($id);

        if (! $pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan',
            ], 404);
        }

        $statusMap = [
            'Terjadwal' => 'terjadwal',
            'Diproses' => 'diproses',
            'Siap Diambil' => 'siap_diambil',
            'Dibatalkan' => 'dibatalkan',
            'Selesai' => 'selesai',
        ];

        $statusDatabase = $statusMap[$request->status] ?? $request->status;

        $dataUpdate = [
            'status' => $statusDatabase,
            'catatan_admin' => $request->catatan_admin,
        ];

        if ($request->filled('harga_final')) {
            $dataUpdate['harga_final'] = $request->harga_final;
            $dataUpdate['tanggal_konfirmasi'] = now();
            $dataUpdate['dikonfirmasi_oleh'] = $request->user()->id_pengguna;
        }

        $pesanan->update($dataUpdate);

        if ($request->filled('harga_final') && $pesanan->pembayaran) {
            $pesanan->pembayaran->update([
                'status_verifikasi' => 'terverifikasi',
                'tanggal_verifikasi' => Carbon::now(),
            ]);
        }

        $pesanan->load(['pengguna', 'layanan']);

        $this->kirimNotifikasiStatusPesanan($pesanan);

        return response()->json([
            'message' => 'Status pesanan aktif berhasil diperbarui',
            'data' => $pesanan->load([
                'pengguna',
                'layanan',
                'detailNailArt',
                'detailPressOn',
                'detailEyelash',
                'detailRemove',
                'detailLayananTambahan',
                'pembayaran',
            ]),
        ]);
    }

    /**
     * Menampilkan riwayat pesanan admin.
     *
     * Endpoint ini digunakan oleh admin untuk mengambil daftar pesanan yang sudah
     * selesai atau dibatalkan. Data riwayat digunakan untuk melihat rekam jejak
     * pesanan yang tidak lagi termasuk dalam pesanan aktif.
     */
    public function riwayatPesananAdmin()
    {
        $pesanan = Pesanan::with([
            'pengguna',
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'detailEyelash',
            'detailRemove',
            'detailLayananTambahan',
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

    /**
     * Menampilkan detail pesanan.
     *
     * Endpoint ini digunakan untuk mengambil detail pesanan berdasarkan ID pesanan.
     * Data yang ditampilkan mencakup informasi pengguna, layanan, serta detail
     * layanan sesuai jenis pesanan seperti Nail Art, Press On, Eyelash, atau Remove.
     */
    public function show($id)
    {
        $pesanan = Pesanan::with([
            'user',
            'layanan',
            'detailNailArt',
            'detailPressOn',
            'detailEyelash',
            'detailRemove',
            'detailLayananTambahan',
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

    private function kirimNotifikasiStatusPesanan(Pesanan $pesanan): void
    {
        $fonnte = app(FonnteService::class);

        $namaPelanggan = $pesanan->pengguna->nama_pengguna ?? 'Pelanggan';
        $nomorPelanggan = $pesanan->pengguna->no_hp ?? null;
        $namaLayanan = $pesanan->layanan->nama_layanan ?? 'Layanan';
        $kodePesanan = $pesanan->kode_pesanan;

        $tanggal = $pesanan->tanggal_pesanan
            ? Carbon::parse($pesanan->tanggal_pesanan)->format('d-m-Y')
            : '-';

        $jam = $pesanan->jam_pesanan
            ? Carbon::parse($pesanan->jam_pesanan)->format('H:i')
            : '-';

        $hargaFinal = $pesanan->harga_final
            ? 'Rp ' . number_format($pesanan->harga_final, 0, ',', '.')
            : '-';

        if ($pesanan->status === 'terjadwal') {
            $pesan = "Halo {$namaPelanggan}, pesanan kamu sudah dikonfirmasi.\n\n"
                . "Kode Pesanan: {$kodePesanan}\n"
                . "Layanan: {$namaLayanan}\n"
                . "Tanggal: {$tanggal}\n"
                . "Jam: {$jam}\n"
                . "Total Harga: {$hargaFinal}\n\n"
                . "Silakan datang sesuai jadwal ya. Terima kasih.";

            $fonnte->sendMessage($nomorPelanggan, $pesan);
        }

        if ($pesanan->status === 'diproses') {
            $pesan = "Halo {$namaPelanggan}, pesanan kamu sedang diproses.\n\n"
                . "Kode Pesanan: {$kodePesanan}\n"
                . "Layanan: {$namaLayanan}\n"
                . "Total Harga: {$hargaFinal}\n\n"
                . "Kami akan mengabari lagi jika ada update berikutnya.";

            $fonnte->sendMessage($nomorPelanggan, $pesan);
        }

        if ($pesanan->status === 'siap_diambil') {
            $pesan = "Halo {$namaPelanggan}, pesanan kamu sudah siap diambil.\n\n"
                . "Kode Pesanan: {$kodePesanan}\n"
                . "Layanan: {$namaLayanan}\n"
                . "Total Harga: {$hargaFinal}\n\n"
                . "Silakan ambil pesanan kamu di studio ya.";

            $fonnte->sendMessage($nomorPelanggan, $pesan);
        }

        if ($pesanan->status === 'selesai') {
            $pesan = "Halo {$namaPelanggan}, pesanan kamu sudah selesai.\n\n"
                . "Kode Pesanan: {$kodePesanan}\n"
                . "Layanan: {$namaLayanan}\n\n"
                . "Terima kasih sudah melakukan pemesanan di Alia Oye Studio.";

            $fonnte->sendMessage($nomorPelanggan, $pesan);
        }

        if ($pesanan->status === 'dibatalkan') {
            $catatanAdmin = $pesanan->catatan_admin
                ? "\nCatatan: {$pesanan->catatan_admin}"
                : "";

            $pesan = "Halo {$namaPelanggan}, mohon maaf pesanan kamu dibatalkan.\n\n"
                . "Kode Pesanan: {$kodePesanan}\n"
                . "Layanan: {$namaLayanan}"
                . $catatanAdmin . "\n\n"
                . "Silakan hubungi admin untuk informasi lebih lanjut.";

            $fonnte->sendMessage($nomorPelanggan, $pesan);
        }
    }
}