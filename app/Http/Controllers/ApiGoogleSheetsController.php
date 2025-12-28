<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApiGoogleSheetsService;
use Inertia\Inertia;

class ApiGoogleSheetsController extends Controller
{
    # lista todos os dados do google sheets
    public function index()
    {
        $sheetsService = new ApiGoogleSheetsService();
        $data = $sheetsService->readSheet('Designs');
        $categore = $sheetsService->readSheet('categoria_cor');
        
        return Inertia::render('midias', [
            'sheetsData' => response()->json($data),
            'categoreData' => response()->json($categore),
        ]);
    }

    # linha específica do google sheets
    public function show($id)
    {
        //
    }
}
