<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailLayananTambahan extends Model
{
    protected $table = 'detail_layanan_tambahan';

    protected $primaryKey = 'id_detail_tambahan';

    protected $fillable = [
        'id_pesanan',
        'area_waxing',
        'catatan',
    ];

    public function pesanan()
    {
        return $this->belongsTo(
            Pesanan::class,
            'id_pesanan',
            'id_pesanan'
        );
    }
}
