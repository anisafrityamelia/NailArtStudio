<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kapasitas_khusus', function (Blueprint $table) {
            $table->id('id_kapasitas');

            $table->date('tanggal')->unique();

            $table->integer('jumlah_karyawan');

            $table->text('catatan')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kapasitas_khusus');
    }
};
