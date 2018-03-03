import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';

export default class SearchBar extends Component {
  static propTypes = {
    filterText: PropTypes.string,
    onFilter: PropTypes.func,
  };

  static defaultProps = {
    value: ''
  };

  state = {
    value: this.props.filterText,
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFilter(this.state.value);
  };

  render() {
    const { value } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={styles.form}
      >
        <input
          type="text"
          autoFocus
          className={styles.input}
          value={value}
          onChange={this.handleChange}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    )
  }
}