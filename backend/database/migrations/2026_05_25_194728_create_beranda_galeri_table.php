<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beranda_galeri', function (Blueprint $table) {
            $table->id('id_galeri');
            $table->unsignedBigInteger('id_beranda');
            $table->string('path_gambar')->nullable();
            $table->integer('urutan_tampil')->default(1);
            $table->timestamps();

            $table->foreign('id_beranda')
                ->references('id_beranda')
                ->on('beranda')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beranda_galeri');
    }
};
