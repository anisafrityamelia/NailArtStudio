<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GambarLayanan extends Model
{
    protected $table = 'gambar_layanan';

    protected $primaryKey = 'id_gambar';

    protected $fillable = [
        'id_layanan',
        'path_gambar',
    ];

    protected $appends = [
        'url_gambar',
    ];

    public function getUrlGambarAttribute()
    {
        return $this->path_gambar
            ? asset('storage/' . $this->path_gambar)
            : null;
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class, 'id_layanan', 'id_layanan');
    }
}