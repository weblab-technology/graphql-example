<?php namespace App;

/*
 * Class Data
 *
 * Работа с данными json
 */
class Data
{
    const JSON_DATA_PATH = 'data/books.json';

    protected $items = [];

    protected $key = 'id';

   /*
    * Загрузка данных из json файла
    *
    * @return App\Data
    */
    public static function load()
    {
        $data = new self();
        $jsonData = file_get_contents(self::JSON_DATA_PATH);
        $data->items = json_decode($jsonData, true);

        return $data;
    }

   /*
    * Запись массива $items в json файл
    *
    * @void
    */
    public function save()
    {
        $jsonData = json_encode($this->items);
        file_put_contents(self::JSON_DATA_PATH, $jsonData);
    }

   /*
    * Фильтрация загруженных данных по массиву параметров из запроса
    *
    * @param array $args
    * @return array
    */
    public function filter($args)
    {
        $result = $this->items;

        foreach ($args as $name => $value) {
            $result = array_filter($result, function($item) use ($name, $value) {
                return $item[$name] == $value;
            });
        }

        return $result;
    }

   /*
    * Обновление записи по ключу
    *
    * @param int $id
    * @param array $data
    * @return mixed
    */
    public function update($id, $data)
    {
        $index = array_search($id, array_column($this->items, $this->key));

        foreach ($data as $key => $value) {
            if ($key !== $this->key) {
                $this->items[$index][$key] = $value;
            }
        }

        $this->save();

        return $this->items[$index];
    }
}