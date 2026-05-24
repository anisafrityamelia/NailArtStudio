<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Ulasan extends Model
{
    protected $table = 'ulasan';

    protected $primaryKey = 'id_ulasan';

    protected $fillable = [
        'id_pesanan',
        'id_pengguna',
        'rating',
        'ulasan',
        'gambar_ulasan',
    ];

    protected $appends = [
        'url_gambar_ulasan',
    ];

    public function getUrlGambarUlasanAttribute()
    {
        if (! $this->gambar_ulasan) {
            return null;
        }

        return asset('storage/' . $this->gambar_ulasan);
    }

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'id_pesanan', 'id_pesanan');
    }

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'id_pengguna', 'id_pengguna');
    }
}