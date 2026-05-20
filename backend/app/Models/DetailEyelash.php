<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailEyelash extends Model
{
    protected $table = 'detail_eyelash';

    protected $primaryKey = 'id_detail';

    protected $fillable = [
        'id_pesanan',
        'jenis_lash',
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