<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BerandaGaleri extends Model
{
    protected $table = 'beranda_galeri';
    protected $primaryKey = 'id_galeri';

    protected $fillable = [
        'id_beranda',
        'path_gambar',
        'urutan_tampil',
    ];

    public function beranda()
    {
        return $this->belongsTo(Beranda::class, 'id_beranda', 'id_beranda');
    }
}