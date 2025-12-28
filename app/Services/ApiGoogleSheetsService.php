<?php
namespace App\Services;

use Google\Client;
use Google\Service\Sheets;

class ApiGoogleSheetsService
{
    protected $client;
    protected $service;

    protected $spreadsheetId = "13AjWnV05Q2utVq9ZH7_mLl3WUWBvv4_ON73RkyA1L2U";

    public function __construct()
    {
        $this->client =  new Client();

        $this->client->setAuthConfig(storage_path('app/private/google-sheets/jp-duarte-dev-google-sheets.json'));
        $this->client->addScope(Sheets::SPREADSHEETS);

        $this->service = new Sheets($this->client);
    }

    // Lê dados de uma planilha
    public function readSheet($range)
    {
        $response = $this->service->spreadsheets_values->get($this->spreadsheetId, $range);
        return $response->getValues();
    }

    // Adiciona uma nova linha à planilha (final)
    public function appendRow($range, $values)
    {
        $body = new Sheets\ValueRange([
            'values' => [$values]
        ]);
        $params = ['valueInputOption' => 'RAW'];
        
        return $this->service->spreadsheets_values->append($this->spreadsheetId, $range, $body, $params);
    }
}