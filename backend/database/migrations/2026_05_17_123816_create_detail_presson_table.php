<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_presson', function (Blueprint $table) {
            $table->id('id_detail');

            $table->unsignedBigInteger('id_pesanan');

            $table->string('gambar_inspo')->nullable();

            $table->string('foto_jari_kanan');
            $table->string('foto_jempol_kanan');
            $table->string('foto_jari_kiri');
            $table->string('foto_jempol_kiri');

            $table->string('shape_kuku');

            $table->enum('metode_pengambilan', [
                'ambil',
                'antar'
            ]);

            $table->text('alamat_pengiriman')->nullable();

            $table->text('catatan')->nullable();

            $table->timestamps();

            $table->foreign('id_pesanan')
                ->references('id_pesanan')
                ->on('pesanan')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detail_presson');
    }
};