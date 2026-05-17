<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    protected $table = 'layanan';

    protected $primaryKey = 'id_layanan';

    protected $fillable = [
        'nama_layanan',
        'harga_dasar',
        'deskripsi_layanan',
        'kategori_layanan',
        'durasi_menit',
        'status_layanan',
    ];

    public function gambar()
    {
        return $this->hasMany(GambarLayanan::class, 'id_layanan', 'id_layanan');
    }

    public function pesanan()
    {
        return $this->hasMany(
            Pesanan::class,
            'id_layanan',
            'id_layanan'
        );
    }
}