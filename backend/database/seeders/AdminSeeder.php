<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'nama_pengguna' => 'Admin',
            'email' => 'admin@aliaoye.com',
            'no_hp' => '08978898005',
            'password' => Hash::make('123456'),
            'role' => 'admin',
        ]);
    }
}