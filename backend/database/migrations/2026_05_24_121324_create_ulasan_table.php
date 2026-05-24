<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ulasan', function (Blueprint $table) {
            $table->id('id_ulasan');

            $table->unsignedBigInteger('id_pesanan');
            $table->unsignedBigInteger('id_pengguna');

            $table->unsignedTinyInteger('rating');
            $table->text('ulasan');
            $table->string('gambar_ulasan')->nullable();

            $table->timestamps();

            $table->foreign('id_pesanan')
                ->references('id_pesanan')
                ->on('pesanan')
                ->onDelete('cascade');

            $table->foreign('id_pengguna')
                ->references('id_pengguna')
                ->on('users')
                ->onDelete('cascade');

            $table->unique('id_pesanan');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ulasan');
    }
};
