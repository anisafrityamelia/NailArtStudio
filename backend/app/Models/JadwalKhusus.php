<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalKhusus extends Model
{
    protected $table = 'jadwal_khusus';

    protected $primaryKey = 'id_jadwal';

    protected $fillable = [
        'tanggal',
        'status_buka',
        'jam_buka',
        'jam_tutup',
        'catatan',
    ];
}
