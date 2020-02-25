import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Aside = ({ className, children, ...rest }) => {
  return (
    <aside className={classNames(className)} {...rest}>
      {children}
    </aside>
  );
};

Aside.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Aside;
