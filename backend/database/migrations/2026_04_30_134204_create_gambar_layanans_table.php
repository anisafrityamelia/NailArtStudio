<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gambar_layanan', function (Blueprint $table) {
            $table->id('id_gambar');

            $table->unsignedBigInteger('id_layanan');
            $table->string('path_gambar');

            $table->timestamps();

            $table->foreign('id_layanan')
                ->references('id_layanan')
                ->on('layanan')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gambar_layanan');
    }
};