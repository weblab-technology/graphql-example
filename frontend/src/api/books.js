import {graphql} from './../utils/graphql';

const client = graphql(process.env.API_URL || 'http://127.0.0.1:8888');

export const loadAll = () => {
  const query = `
    query { 
      books { 
        id
        title 
        isbn 
        author 
     } 
  }`;

  return client.query(query);
};

export const search = (value) => {
  const query = `
    query { 
      books(author: "${value}") { 
        id 
        title 
        isbn 
        author 
      }       
    }
  `;

  return client.query(query);
};

export const update = (id, author, title) => {
  const query = `
    mutation { 
      book_update(id: ${id}, author: "${author}", title: "${title}") { 
        id 
        title 
        isbn 
        author 
      } 
    }
  `;

  return client.query(query);
};
