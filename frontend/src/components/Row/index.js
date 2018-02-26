import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';

export default class Row extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      isbn: PropTypes.string,
    }),
    onUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      book: this.props.book,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { book: { id, title, author, isbn } } = this.state;

    if (title && author && isbn) {
      this.setState({ isEditing: false });
      this.props.onUpdate(id, author, title, isbn);
    }
  };

  handleChange = (fieldName) => (e) => {
    this.setState({
      book: {
        ...this.state.book,
        [fieldName]: e.target.value,
      }
    })
  };

  handleEdit = (e) => {
    e.preventDefault();

    this.setState({
      isEditing: true,
    })
  };

  handleCancel = (e) => {
    e.preventDefault();

    this.setState({
      isEditing: false,
      book: this.props.book,
    })
  };

  renderEdit() {
    const {book: {author, title, isbn}} = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div className={styles.item}>
          <label>Author</label>
          <input type="text" value={author} onChange={this.handleChange('author')} className={styles.input} />
        </div>
        <div className={styles.item}>
          <label>Title</label>
          <input type="text" value={title} onChange={this.handleChange('title')} className={styles.input} />
        </div>
        <div className={styles.item}>
          <label>ISBN</label>
          <input type="text" value={isbn} onChange={this.handleChange('isbn')} className={styles.input} />
        </div>
        <div className={styles.controls}>
          <button type="submit" className={styles.submit}>
            Save
          </button>
          <button onClick={this.handleCancel} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  renderRow(){
    const { book } = this.props;

    return (
      <div className={styles.book}>
        <div className={styles.name}>
          <b>{book.author}</b> - {book.title}
        </div>
        <div className={styles.isbn}>
          {book.isbn}
        </div>
        <a onClick={this.handleEdit} className={styles.edit}>Edit</a>
      </div>
    )
  }

  render(){
    const { isEditing } = this.state;

    return (
      <div className={styles.container}>
        {isEditing ? this.renderEdit() : this.renderRow()}
      </div>
    )
  }
}