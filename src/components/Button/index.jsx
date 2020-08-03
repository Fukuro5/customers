import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import st from './styles.scss';

export default function Button(props) {
  const {
    type,
    className,
    children,
    onClick,
    ...otherProps
  } = props;

  return (
    <button
      type={type}
      className={cn(st.button, className)}
      onClick={onClick}
      { ...otherProps }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'submit',
  className: null,
  onClick: null,
};
