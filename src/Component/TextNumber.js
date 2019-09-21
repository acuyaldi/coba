import React from 'react';
import PropTypes from 'prop-types';

class TextNumber extends React.PureComponent {
  static propTypes = {
    country: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    options: PropTypes.object,
  }
  static defaultProps = {
    country: 'id-ID',
    options: {},
  }
  render() {
    const { country, options, value } = this.props;
    return (
      <React.Fragment>
        {Intl.NumberFormat(country, options).format(value)}
      </React.Fragment>
    );
  }
}

export default TextNumber;

