<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{
    public static function sendMessage($target, $message)
    {
        try {
            if (!$target) {
                Log::warning('Fonnte gagal: nomor tujuan kosong');
                return false;
            }

            $target = self::formatNomor($target);

            $response = Http::withHeaders([
                'Authorization' => env('FONNTE_TOKEN'),
            ])->asForm()->post('https://api.fonnte.com/send', [
                'target' => $target,
                'message' => $message,
            ]);

            Log::info('Fonnte response', [
                'target' => $target,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return $response->successful();

        } catch (\Exception $e) {
            Log::error('Fonnte error: ' . $e->getMessage());
            return false;
        }
    }

    private static function formatNomor($nomor)
    {
        $nomor = preg_replace('/[^0-9]/', '', $nomor);

        if (substr($nomor, 0, 1) === '0') {
            $nomor = '62' . substr($nomor, 1);
        }

        return $nomor;
    }
}