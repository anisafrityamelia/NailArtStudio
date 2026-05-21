<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jadwal_khusus', function (Blueprint $table) {
            $table->id('id_jadwal');

            $table->date('tanggal')->unique();

            $table->enum('status_buka', ['Buka', 'Tutup']);

            $table->time('jam_buka')->nullable();

            $table->time('jam_tutup')->nullable();

            $table->text('catatan')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jadwal_khusus');
    }
};
