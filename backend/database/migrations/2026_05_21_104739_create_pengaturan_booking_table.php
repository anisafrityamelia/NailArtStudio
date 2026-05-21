<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengaturan_booking', function (Blueprint $table) {

            $table->id('id_pengaturan_booking');

            $table->time('jam_buka');

            $table->time('jam_tutup');

            $table->integer('durasi_slot');

            $table->integer('jumlah_karyawan');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengaturan_booking');
    }
};