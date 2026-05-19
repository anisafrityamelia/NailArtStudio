<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class KategoriHargaLayanan extends Model
{
    protected $table = 'kategori_harga_layanan';

    protected $primaryKey = 'id_kategori_harga';

    protected $fillable = [
        'id_layanan',
        'nama_kategori',
        'deskripsi_kategori',
        'estimasi_harga',
        'gambar_kategori',
        'urutan',
        'status',
    ];

    protected $appends = [
        'url_gambar_kategori',
    ];

    public function layanan()
    {
        return $this->belongsTo(
            Layanan::class,
            'id_layanan',
            'id_layanan'
        );
    }

    public function getUrlGambarKategoriAttribute()
    {
        if (! $this->gambar_kategori) {
            return null;
        }

        return asset('storage/' . $this->gambar_kategori);
    }
}