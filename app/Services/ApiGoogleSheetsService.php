<?php
namespace App\Services;

use Google\Client;
use Google\Service\Sheets;

class ApiGoogleSheetsService
{
    protected $client;
    protected $service;

    public function __construct()
    {
        $this->client =  new Client();

        $this->client->setAuthConfig(storage_path('app/private/google-sheets/jp-duarte-dev-google-sheets.json'));
        $this->client->addScope(Sheets::SPREADSHEETS);

        $this->service = new Sheets($this->client);
    }

    // Lê dados de uma planilha
    public function readSheet($spreadsheetId, $range)
    {
        $response = $this->service->spreadsheets_values->get($spreadsheetId, $range);
        return $response->getValues();
    }
}