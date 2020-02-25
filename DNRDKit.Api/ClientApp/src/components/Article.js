import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Article = ({ className, children, ...rest }) => {
  return (
    <article className={classNames(className)} {...rest}>
      {children}
    </article>
  );
};

Article.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Article;
