<?php
namespace App\Services;

use Google\Client;
use Google\Service\Sheets;
use Google\Service\Sheets\BatchUpdateSpreadsheetRequest;
 use Google\Service\Sheets\ValueRange;
use Illuminate\Support\Facades\Log;

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
        $body = new ValueRange([
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

    # Atualiza um bloco de células na planilha
    public function updateRow($sheetName, $rowIndex, $values)
    {
        // Calcula a última coluna baseado na quantidade de valores
        $colCount = count($values);
        $endCol = chr(ord('A') + $colCount - 1); // A=0, B=1, C=2, D=3
        $rowNumber = $rowIndex + 1; // Google Sheets é 1-indexed
        $range = $sheetName . '!' . 'A' . $rowNumber . ':' . $endCol . $rowNumber;
        
        $body = new ValueRange([
            'values' => [$values]
        ]);
        $params = ['valueInputOption' => 'RAW'];

        return $this->service->spreadsheets_values->update($this->spreadsheetId, $range, $body, $params);
    }
}