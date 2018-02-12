# Пример работы GraphQL

Примеры запросов:

1. Список:
   query {
     books {
       id
       title
       isbn
       author
     }
   }
2. Поиск по автору:
   query {
     books(author: "Robin Nixon") {
       id
       title
       isbn
       author
     }
   }
3. Изменение аттрибутов записи:
   mutation {
     book_update(id: 3, author: "New author", title: "New title") {
       id
       title
       isbn
       author
     }
   }
