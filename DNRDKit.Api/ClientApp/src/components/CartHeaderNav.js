import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Row, Col, Button } from 'reactstrap';
import Section from './Section';
import { logoutUser } from '../actions/auth';

const UserInfoPanel = () => {
    const { identity, identityDispatch } = useContext(AppContext);

    const handleSignout = e => {
        e.preventDefault();
        logoutUser(identityDispatch);
    };

    const anonymousContent = (
        <div>
            <Link to='/authentication/signin'>Sign in</Link>&nbsp;|&nbsp;
            <Link to='/authentication/signup'>Sign up</Link>
        </div>
    );

    const registeredContent = (
        <div>
            <Link to='#!' onClick={handleSignout}>Sign out</Link>
        </div>
    );

    return (
        <div className="text">
            {identity.isAuthenticated && <span className="text-muted">{identity.user.firstName}</span>}
            {!identity.isAuthenticated && anonymousContent}
            {identity.isAuthenticated && registeredContent}
        </div>
    );
};

const SearchBox = () => (
    <Form className="search">
        <div className="input-group w-100">
            <input type="text" className="form-control" placeholder="Search"></input>
            <div className="input-group-append">
                <Button color="primary">
                    <FontAwesomeIcon icon="search" />
                </Button>
            </div>
        </div>
    </Form>
);

const CartHeaderNav = () => (
    <Section className="header-main border-bottom">
        <Row className="align-items-center">
            <Col lg={2} className="col-4">
                Brand
            </Col>
            <Col lg={6} sm={12}>
                <SearchBox />
            </Col>
            <Col lg={4} sm={6} className="col-12">
                <div className="widgets-wrap float-md-right">
                    <div className="widget-header icontext">
                        <Link to='/profile' className="icon icon-sm rounded-circle border">
                            <FontAwesomeIcon icon="user" />
                        </Link>
                        <UserInfoPanel />
                    </div>
                </div>
            </Col>
        </Row>
    </Section>
);

export default CartHeaderNav;
