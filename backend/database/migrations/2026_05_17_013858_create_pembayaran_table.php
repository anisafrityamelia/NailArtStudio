<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pembayaran', function (Blueprint $table) {

            $table->id('id_pembayaran');

            $table->unsignedBigInteger('id_pesanan');

            $table->string('kode_pembayaran')->unique();

            $table->integer('nominal_pembayaran');

            $table->string('bukti_pembayaran')->nullable();

            $table->enum('status_verifikasi', [
                'menunggu_verifikasi',
                'terverifikasi',
                'ditolak',
            ])->default('menunggu_verifikasi');

            $table->dateTime('tanggal_pembayaran')->nullable();

            $table->dateTime('tanggal_verifikasi')->nullable();

            $table->text('catatan_admin')->nullable();

            $table->timestamps();

            $table->foreign('id_pesanan')
                ->references('id_pesanan')
                ->on('pesanan')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};