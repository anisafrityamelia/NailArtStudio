<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';

    protected $primaryKey = 'id_pembayaran';

    protected $fillable = [
        'id_pesanan',
        'kode_pembayaran',
        'nominal_pembayaran',
        'bukti_pembayaran',
        'status_verifikasi',
        'tanggal_pembayaran',
        'tanggal_verifikasi',
        'catatan_admin',
    ];

    protected $appends = [
        'url_bukti_pembayaran',
    ];

    public function getUrlBuktiPembayaranAttribute()
    {
        return $this->bukti_pembayaran
            ? asset('storage/' . $this->bukti_pembayaran)
            : null;
    }

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'id_pesanan', 'id_pesanan');
    }
}