<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailRemove extends Model
{
    protected $table = 'detail_remove';

    protected $primaryKey = 'id_detail';

    protected $fillable = [
        'id_pesanan',
        'bagian_kuku',
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
