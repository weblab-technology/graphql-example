<?php namespace App\Types;

use App\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class BookType
 *
 * Type of returned objects class with custom fields
 *
 */
class BookType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'fields' => [
                'id' => [
                    'type' => Type::id(),
                    'description' => 'ID',
                ],
                'title' => [
                    'type' => Type::string(),
                    'description' => 'Book title',
                ],

                'isbn' => [
                    'type' => Type::string(),
                    'description' => 'ISBN',
                ],
                'author' => [
                    'type' => Type::string(),
                    'description' => 'Book author',
                ],
                'author_name' => [
                    'type' => Type::string(),
                    'deprecationReason' => 'Deprecated. Use author field',
                ],
                'price' => [
                    'type' => Type::float(),
                    'description' => 'Book price',
                ],
            ]
        ];

        parent::__construct($config);
    }
}
