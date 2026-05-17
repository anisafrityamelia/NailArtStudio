<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
            ALTER TABLE pesanan 
            MODIFY status ENUM(
                'menunggu_pembayaran',
                'menunggu_konfirmasi',
                'terjadwal',
                'diproses',
                'selesai',
                'dibatalkan'
            ) DEFAULT 'menunggu_pembayaran'
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE pesanan 
            MODIFY status ENUM(
                'menunggu_konfirmasi',
                'terjadwal',
                'diproses',
                'selesai',
                'dibatalkan'
            ) DEFAULT 'menunggu_konfirmasi'
        ");
    }
};