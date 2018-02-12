<?php namespace App\Types;

use App\Type;
use App\Data;
use GraphQL\Type\Definition\ObjectType;

/*
 * Class MutationType
 *
 * Класс mutation запроса
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