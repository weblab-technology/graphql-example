# GraphQL work example

Requests example:

1. Records list receive:
   query {
     books {
       id
       title
       isbn
       author
     }
   }
2. Search records by author field:
   query {
     books(author: "Robin Nixon") {
       id
       title
       isbn
       author
     }
   }
3. Update record attributes:
   mutation {
     book_update(id: 3, author: "New author", title: "New title") {
       id
       title
       isbn
       author
     }
   }
