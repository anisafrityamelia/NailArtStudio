<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailNailArt extends Model
{
    protected $table = 'detail_nail_art';

    protected $primaryKey = 'id_detail';

    protected $fillable = [
        'id_pesanan',
        'gambar_inspo',
        'bagian_kuku',
        'layanan_tambahan',
        'catatan',
    ];

    protected $appends = [
        'url_gambar_inspo',
    ];

    public function getUrlGambarInspoAttribute()
    {
        return $this->gambar_inspo
            ? asset('storage/' . $this->gambar_inspo)
            : null;
    }

    public function pesanan()
    {
        return $this->belongsTo(
            Pesanan::class,
            'id_pesanan',
            'id_pesanan'
        );
    }
}