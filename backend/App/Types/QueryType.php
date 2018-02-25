<?php namespace App\Types;

use App\Type;
use App\Data;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class QueryType
 *
 * Query type class
 *
 */
class QueryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'fields' => function() {
                return [
                    'books' => [
                        'type' => Type::listOf(Type::book()),
                        'description' => 'Return books list',
                        'args' => [
                            'title' => Type::string(),
                            'isbn' => Type::int(),
                            'author' => Type::string(),
                            'price' => Type::float(),
                        ],
                        'resolve' => function ($root, $args) {
                            return Data::load()->filter($args);
                        }
                    ],
                ];
            }
        ];

        parent::__construct($config);
    }
}