<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id_pengguna';

    protected $fillable = [
        'email',
        'nama_pengguna',
        'no_hp',
        'password',
        'profil_foto',
        'role',
    ];

    protected $appends = [
        'url_profil_foto',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function pesanan()
    {
        return $this->hasMany(
            Pesanan::class,
            'id_pengguna',
            'id_pengguna'
        );
    }

    public function getUrlProfilFotoAttribute()
    {
        return $this->profil_foto
            ? asset('storage/' . $this->profil_foto)
            : null;
    }
}