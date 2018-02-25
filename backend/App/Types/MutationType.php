<?php namespace App\Types;

use App\Type;
use App\Data;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class MutationType
 *
 * Mutation requests class
 *
 */
class MutationType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'fields' => function() {
                return [
                    'book_update' => [
                        'type' => Type::book(),
                        'description' => 'Book update',
                        'args' => [
                            'id' => Type::id(),
                            'isbn' => Type::string(),
                            'title' => Type::string(),
                            'author' => Type::string(),
                            'price' => Type::float(),
                        ],
                        /**
                         * Closure для возврата данных запроса. Можно легко заменить на любой тип данных, например результат выполнения sql запроса к базе данных.
                         * Возвращаемые значения: массив объектов, в случае, если тип запроса это список типов объектов (Type::listOf(<object type>)) или объект в случае, если тип запроса это одиночный тип объекта
                         *
                         *
                         */
                        'resolve' => function ($root, $args) {
                            if (!isset($args['id'])) {
                                throw new \Exception('ID parameter is required');
                            }

                            return Data::load()->update($args['id'], $args);
                        }
                    ]
                ];
            }
        ];

        parent::__construct($config);
    }
}