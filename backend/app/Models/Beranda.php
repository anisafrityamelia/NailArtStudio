<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beranda extends Model
{
    protected $table = 'beranda';
    protected $primaryKey = 'id_beranda';

    protected $fillable = [
        'deskripsi',
        'alamat_studio',
        'link_lokasi',
        'jam_buka',
        'akun_ig',
        'akun_tiktok',
        'no_wa',
    ];

    public function galeri()
    {
        return $this->hasMany(BerandaGaleri::class, 'id_beranda', 'id_beranda')
            ->orderBy('urutan_tampil', 'asc');
    }
}