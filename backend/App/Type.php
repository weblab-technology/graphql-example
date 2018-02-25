<?php namespace App;

use App\Types\BookType;
use GraphQL\Type\Definition\Type as BaseType;

/**
 * Class Types
 *
 * Object types for requests
 *
 */
class Type extends BaseType
{
    protected static $book;

    public static function book()
    {
        return self::$book ? : self::$book = new BookType();
    }
}