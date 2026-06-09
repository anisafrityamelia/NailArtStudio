<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PengaturanBooking;
use App\Models\JadwalKhusus;
use App\Models\KapasitasKhusus;
use App\Models\Pesanan;
use App\Models\Layanan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PengaturanBookingController extends Controller
{
    /**
     * Menampilkan pengaturan booking.
     *
     * Endpoint ini digunakan untuk mengambil pengaturan booking yang sedang
     * digunakan oleh sistem, seperti jam buka, jam tutup, durasi slot, dan
     * jumlah karyawan. Jika terdapat kapasitas khusus pada hari ini, jumlah
     * karyawan akan disesuaikan dengan data kapasitas khusus tersebut.
     */
    public function show()
    {
        $pengaturan = PengaturanBooking::first();

        if ($pengaturan) {
            $hariIni = now()->toDateString();

            $kapasitasKhusus = KapasitasKhusus::whereDate('tanggal', $hariIni)->first();

            if ($kapasitasKhusus) {
                $pengaturan->jumlah_karyawan = $kapasitasKhusus->jumlah_karyawan;
            }
        }

        return response()->json([
            'message' => 'Pengaturan booking berhasil diambil',
            'data' => $pengaturan,
        ]);
    }

    /**
     * Memperbarui pengaturan booking.
     *
     * Endpoint ini digunakan oleh admin untuk mengubah pengaturan booking default,
     * meliputi jam buka, jam tutup, durasi slot, dan jumlah karyawan. Pengaturan
     * ini digunakan sebagai dasar perhitungan slot pemesanan layanan.
     */
    public function update(Request $request)
    {
        $request->validate([
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
            'durasi_slot' => 'required|integer|min:1',
            'jumlah_karyawan' => 'required|integer|min:1',
        ]);

        $pengaturan = PengaturanBooking::first();

        if (! $pengaturan) {
            $pengaturan = new PengaturanBooking();
        }

        $pengaturan->fill([
            'jam_buka' => $request->jam_buka,
            'jam_tutup' => $request->jam_tutup,
            'durasi_slot' => $request->durasi_slot,
            'jumlah_karyawan' => $request->jumlah_karyawan,
        ]);

        $pengaturan->save();

        return response()->json([
            'message' => 'Pengaturan booking berhasil diperbarui',
            'data' => $pengaturan,
        ]);
    }

    /**
     * Menampilkan slot booking yang tersedia.
     *
     * Endpoint ini digunakan untuk mengambil daftar slot waktu yang tersedia
     * berdasarkan tanggal dan layanan yang dipilih pelanggan. Sistem akan
     * menghitung ketersediaan slot berdasarkan jam operasional, durasi layanan,
     * durasi slot, jumlah karyawan, jadwal khusus, kapasitas khusus, dan pesanan
     * aktif yang sudah ada pada tanggal tersebut.
     */
    public function slotTersedia(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'id_layanan' => 'required|exists:layanan,id_layanan',
        ]);

        $pengaturan = PengaturanBooking::first();

        if (! $pengaturan) {
            return response()->json([
                'message' => 'Pengaturan booking belum tersedia',
                'data' => [],
            ]);
        }

        $jadwalKhusus = JadwalKhusus::whereDate('tanggal', $request->tanggal)->first();
        $kapasitasKhusus = KapasitasKhusus::whereDate('tanggal', $request->tanggal)->first();

        if ($jadwalKhusus && $jadwalKhusus->status_buka === 'Tutup') {
            return response()->json([
                'message' => 'Studio tutup pada tanggal ini',
                'data' => [],
                'status_jadwal' => 'Tutup',
                'catatan_jadwal' => $jadwalKhusus->catatan,
            ]);
        }

        $layanan = Layanan::findOrFail($request->id_layanan);

        $tanggal = $request->tanggal;
        $durasiSlot = (int) $pengaturan->durasi_slot;
        $jumlahKaryawan = $kapasitasKhusus
            ? (int) $kapasitasKhusus->jumlah_karyawan
            : (int) $pengaturan->jumlah_karyawan;
        $durasiLayanan = (int) $layanan->durasi_menit;

        $jamBukaAktif = $jadwalKhusus && $jadwalKhusus->status_buka === 'Buka'
            ? $jadwalKhusus->jam_buka
            : $pengaturan->jam_buka;

        $jamTutupAktif = $jadwalKhusus && $jadwalKhusus->status_buka === 'Buka'
            ? $jadwalKhusus->jam_tutup
            : $pengaturan->jam_tutup;

        $jamBuka = Carbon::parse($tanggal . ' ' . $jamBukaAktif);
        $jamTutup = Carbon::parse($tanggal . ' ' . $jamTutupAktif);

        $pesananTanggalIni = Pesanan::with('layanan')
            ->whereDate('tanggal_pesanan', $tanggal)
            ->whereIn('status', [
                'menunggu_konfirmasi',
                'terjadwal',
                'diproses',
                'siap_diambil',
            ])
            ->get();

        $slots = [];
        $cursor = $jamBuka->copy();

        while ($cursor->copy()->addMinutes($durasiLayanan)->lte($jamTutup)) {
            $mulaiCalon = $cursor->copy();
            $selesaiCalon = $cursor->copy()->addMinutes($durasiLayanan);

            $jumlahBentrok = 0;

            foreach ($pesananTanggalIni as $pesanan) {
                if (! $pesanan->jam_pesanan || ! $pesanan->layanan) {
                    continue;
                }

                $mulaiPesanan = Carbon::parse($tanggal . ' ' . $pesanan->jam_pesanan);
                $selesaiPesanan = $mulaiPesanan->copy()->addMinutes(
                    (int) $pesanan->layanan->durasi_menit
                );

                $bentrok =
                    $mulaiCalon->lt($selesaiPesanan) &&
                    $selesaiCalon->gt($mulaiPesanan);

                if ($bentrok) {
                    $jumlahBentrok++;
                }
            }

            $slots[] = [
                'jam' => $cursor->format('H:i'),
                'tersedia' => $jumlahBentrok < $jumlahKaryawan,
                'sisa_kapasitas' => max(0, $jumlahKaryawan - $jumlahBentrok),
            ];

            $cursor->addMinutes($durasiSlot);
        }

        return response()->json([
            'message' => 'Slot booking berhasil diambil',
            'data' => $slots,
            'status_jadwal' => $jadwalKhusus ? $jadwalKhusus->status_buka : 'Default',
            'catatan_jadwal' => $jadwalKhusus ? $jadwalKhusus->catatan : null,
            'kapasitas_khusus' => $kapasitasKhusus ? true : false,
        ]);
    }
}