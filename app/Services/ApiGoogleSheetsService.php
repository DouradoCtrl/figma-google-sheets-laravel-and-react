<?php
namespace App\Services;

use Google\Client;
use Google\Service\Sheets;
use Google\Service\Sheets\BatchUpdateSpreadsheetRequest;

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

    // buscar o id da aba pelo nome
    public function getSheetIdByName($sheetName)
    {
        $spreadsheet = $this->service->spreadsheets->get($this->spreadsheetId);
        foreach ($spreadsheet->getSheets() as $sheet) {
            if ($sheet->getProperties()->getTitle() === $sheetName) {
                return $sheet->getProperties()->getSheetId();
            }
        }
        return null;
    }

    // remove uma linha específica da planilha
    public function deleteRow($sheetName, $rowIndex)
    {
        $sheetId = $this->getSheetIdByName($sheetName);

        $requestBody = new BatchUpdateSpreadsheetRequest([
            'requests' => [
                'deleteDimension' => [
                    'range' => [
                        'sheetId' => $sheetId,
                        'dimension' => 'ROWS',
                        'startIndex' => $rowIndex,
                        'endIndex' => $rowIndex + 1,
                    ],
                ],
            ],
        ]);

        return $this->service->spreadsheets->batchUpdate($this->spreadsheetId, $requestBody);
    }
}