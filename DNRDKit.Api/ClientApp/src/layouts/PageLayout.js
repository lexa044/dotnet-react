import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const PageLayout = ({ children }) => (
    <Fragment>
        <PageHeader />
        {children}
        <PageFooter />
    </Fragment>
);

PageLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageLayout;
