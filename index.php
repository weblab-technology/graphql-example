<?php

require_once __DIR__ . '/vendor/autoload.php';

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use App\Types\QueryType;
use App\Types\MutationType;

try {
    // Получение данных запроса
    $input = json_decode(file_get_contents('php://input'), true);
    $query = $input['query'];

    // Получение результата
    $result = GraphQL::executeQuery(new Schema([
        'query' => new QueryType(),
        'mutation' => new MutationType(),
    ]), $query)->toArray();

} catch (\Exception $e) {
    $result = [
        'error' => [
            'message' => $e->getMessage()
        ]
    ];
}

// Отображение результата
header('Content-Type: application/json');
echo json_encode($result);