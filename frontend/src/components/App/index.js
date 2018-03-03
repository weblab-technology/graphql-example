import React, {Component} from 'react';
import {loadAll, search, update} from './../../api/books';
import SearchBar from './../SearchBar';
import Row from './../Row';
import styles from './styles.less';

export default class App extends Component {
  state = {
    books: [],
    filterText: '',
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    loadAll().then(response => {
      this.setState({
        filterText: '',
        books: response.data.books,
      });
    });
  };

  getFiltered = (text) => {
    search(text).then( response => {
      this.setState({
        filterText: text,
        books: response.data.books,
      });
    });
  };

  onFilter = (value) => {
    if (value) {
      this.getFiltered(value);
    } else {
      this.getAll();
    }
  };

  onUpdateBook = (id, author, name) => {
    update(id, author, name).then( response => {
      this.setState({
        books: this.state.books.map( book => book.id !== id? book: response.data.book_update),
      })
    });
  };

  render() {
    const { filterText, books } = this.state;

    return (
      <div className={styles.container}>
        <SearchBar
          filterText={filterText}
          onFilter={this.onFilter}
        />

        <div className={styles.list}>
          {books.map( book => (
            <Row
              key={book.id}
              book={book}
              onUpdate={this.onUpdateBook}
            />
          ))}
        </div>
      </div>
    )
  }
}
