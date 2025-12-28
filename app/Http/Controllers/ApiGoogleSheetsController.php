<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApiGoogleSheetsService;
use Inertia\Inertia;

class ApiGoogleSheetsController extends Controller
{
    public function index()
    {
        $sheetsService = new ApiGoogleSheetsService();
        $data = $sheetsService->readSheet('Designs');

        return Inertia::render('midias', [
            'sheetsData' => response()->json($data),
        ]);
    }
}
