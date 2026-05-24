<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ulasan', function (Blueprint $table) {
            $table->enum('status_tampil', ['ditampilkan', 'disembunyikan'])
                ->default('ditampilkan')
                ->after('gambar_ulasan');
        });
    }

    public function down(): void
    {
        Schema::table('ulasan', function (Blueprint $table) {
            $table->dropColumn('status_tampil');
        });
    }
};