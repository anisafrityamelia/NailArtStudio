<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = 'pesanan';

    protected $primaryKey = 'id_pesanan';

    protected $fillable = [
        'kode_pesanan',
        'id_pengguna',
        'id_layanan',
        'tanggal_pesanan',
        'jam_pesanan',
        'harga_final',
        'status',
        'tanggal_konfirmasi',
        'dikonfirmasi_oleh',
        'status_selesai_otomatis',
    ];

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'id_pengguna', 'id_pengguna');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_pengguna', 'id_pengguna');
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class, 'id_layanan', 'id_layanan');
    }

    public function detailNailArt()
    {
        return $this->hasOne(
            DetailNailArt::class,
            'id_pesanan',
            'id_pesanan'
        );
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class, 'id_pesanan', 'id_pesanan');
    }
}