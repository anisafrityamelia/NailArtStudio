<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PengaturanBooking;
use App\Models\Pesanan;
use App\Models\Layanan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PengaturanBookingController extends Controller
{
    public function show()
    {
        $pengaturan = PengaturanBooking::first();

        return response()->json([
            'message' => 'Pengaturan booking berhasil diambil',
            'data' => $pengaturan,
        ]);
    }

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

        $layanan = Layanan::findOrFail($request->id_layanan);

        $tanggal = $request->tanggal;
        $durasiSlot = (int) $pengaturan->durasi_slot;
        $jumlahKaryawan = (int) $pengaturan->jumlah_karyawan;
        $durasiLayanan = (int) $layanan->durasi_menit;

        $jamBuka = Carbon::parse($tanggal . ' ' . $pengaturan->jam_buka);
        $jamTutup = Carbon::parse($tanggal . ' ' . $pengaturan->jam_tutup);

        $pesananTanggalIni = Pesanan::with('layanan')
            ->whereDate('tanggal_pesanan', $tanggal)
            ->whereNotIn('status', ['dibatalkan'])
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
        ]);
    }
}