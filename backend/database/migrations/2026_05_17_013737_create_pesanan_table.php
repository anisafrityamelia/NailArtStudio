<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesanan', function (Blueprint $table) {
            $table->id('id_pesanan');

            $table->string('kode_pesanan')->unique();

            $table->unsignedBigInteger('id_pengguna');
            $table->unsignedBigInteger('id_layanan');

            $table->date('tanggal_pesanan');
            $table->time('jam_pesanan');

            $table->integer('harga_final')->nullable();

            $table->enum('status', [
                'menunggu_konfirmasi',
                'terjadwal',
                'diproses',
                'selesai',
                'dibatalkan'
            ])->default('menunggu_konfirmasi');

            $table->timestamp('tanggal_konfirmasi')->nullable();

            $table->unsignedBigInteger('dikonfirmasi_oleh')->nullable();

            $table->enum('status_selesai_otomatis', [
                'manual',
                'otomatis'
            ])->default('manual');

            $table->timestamps();

            // foreign key
            $table->foreign('id_pengguna')
                ->references('id_pengguna')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('id_layanan')
                ->references('id_layanan')
                ->on('layanan')
                ->onDelete('cascade');

            $table->foreign('dikonfirmasi_oleh')
                ->references('id_pengguna')
                ->on('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pesanan');
    }
};