<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ApiGoogleSheetsService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

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

    # adiciona um novo registro ao google sheets
    public function store(Request $request)
    {  
        $sheetsService = new ApiGoogleSheetsService();
        $values = [
            $request->input('Fundo'),
            $request->input('Texto'),
            $request->input('Título'),
            $request->input('categoriaMenu'),
        ];
        
        $sheetsService->appendRow('Designs', $values);
        return response()->noContent();
    }

    # remove um registro específico do google sheets
    public function destroy($rowIndex)
    {
        $sheetsService = new ApiGoogleSheetsService();
        $sheetsService->deleteRow('Designs', $rowIndex);

        return response()->noContent();
    }
}
