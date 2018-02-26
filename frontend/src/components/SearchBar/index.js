import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';

export default class SearchBar extends Component {
  static propTypes = {
    filterText: PropTypes.string,
    onFilter: PropTypes.func,
  };

  handleChange = (e) => {
    this.props.onFilter(e.target.value);
  };

  render() {
    const { filterText } = this.props;

    return (
      <div className={styles.form}>
        <input value={filterText} onChange={this.handleChange} autoFocus type="text" className={styles.input}/>
      </div>
    )
  }
}