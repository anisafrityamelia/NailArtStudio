<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_nail_art', function (Blueprint $table) {
            $table->id('id_detail');

            $table->unsignedBigInteger('id_pesanan');

            $table->string('gambar_inspo')->nullable();

            $table->string('bagian_kuku');

            $table->string('layanan_tambahan')->nullable();

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
        Schema::dropIfExists('detail_nail_art');
    }
};