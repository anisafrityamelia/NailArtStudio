<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kategori_harga_layanan', function (Blueprint $table) {
            $table->id('id_kategori_harga');

            $table->unsignedBigInteger('id_layanan');

            $table->string('nama_kategori');
            $table->text('deskripsi_kategori')->nullable();
            $table->integer('estimasi_harga');

            $table->string('gambar_kategori')->nullable();

            $table->integer('urutan')->default(0);

            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');

            $table->timestamps();

            $table->foreign('id_layanan')
                ->references('id_layanan')
                ->on('layanan')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kategori_harga_layanan');
    }
};