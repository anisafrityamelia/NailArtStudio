<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KapasitasKhusus extends Model
{
    protected $table = 'kapasitas_khusus';

    protected $primaryKey = 'id_kapasitas';

    protected $fillable = [
        'tanggal',
        'jumlah_karyawan',
        'catatan',
    ];
}
