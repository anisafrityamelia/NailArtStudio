<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengaturanBooking extends Model
{
    protected $table = 'pengaturan_booking';

    protected $primaryKey = 'id_pengaturan_booking';

    protected $fillable = [
        'jam_buka',
        'jam_tutup',
        'durasi_slot',
        'jumlah_karyawan',
    ];
}