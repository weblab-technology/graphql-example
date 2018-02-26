import 'isomorphic-fetch';

export const graphql = (url) => {
  if (!url) throw new Error('Missing url parameter');

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return {
    query: function (query, variables) {

      const req = new Request(url, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          variables: variables
        }),
        headers: headers,
      });

      return fetch(req).then(res => res.json());
    }
  }
};