<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPressOn extends Model
{
    protected $table = 'detail_presson';

    protected $primaryKey = 'id_detail';

    protected $fillable = [
        'id_pesanan',
        'gambar_inspo',
        'foto_jari_kanan',
        'foto_jempol_kanan',
        'foto_jari_kiri',
        'foto_jempol_kiri',
        'shape_kuku',
        'metode_pengambilan',
        'alamat_pengiriman',
        'catatan',
    ];

    protected $appends = [
        'url_gambar_inspo',
        'url_foto_jari_kanan',
        'url_foto_jempol_kanan',
        'url_foto_jari_kiri',
        'url_foto_jempol_kiri',
    ];

    public function getUrlGambarInspoAttribute()
    {
        return $this->gambar_inspo
            ? asset('storage/' . $this->gambar_inspo)
            : null;
    }

    public function getUrlFotoJariKananAttribute()
    {
        return $this->foto_jari_kanan
            ? asset('storage/' . $this->foto_jari_kanan)
            : null;
    }

    public function getUrlFotoJempolKananAttribute()
    {
        return $this->foto_jempol_kanan
            ? asset('storage/' . $this->foto_jempol_kanan)
            : null;
    }

    public function getUrlFotoJariKiriAttribute()
    {
        return $this->foto_jari_kiri
            ? asset('storage/' . $this->foto_jari_kiri)
            : null;
    }

    public function getUrlFotoJempolKiriAttribute()
    {
        return $this->foto_jempol_kiri
            ? asset('storage/' . $this->foto_jempol_kiri)
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