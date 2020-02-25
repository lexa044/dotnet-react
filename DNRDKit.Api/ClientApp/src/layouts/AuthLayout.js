import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, CardBody, Col, Row } from 'reactstrap';
import Background from '../components/Background';
import Flex from '../components/Flex';

const AuthLayout = ({ leftSideContent, children }) => (
  <Container fluid>
    <Row noGutters className="min-vh-100 flex-center">
      <Col lg={8} className="col-xxl-5 py-3">
        <Card className="overflow-hidden z-index-1">
          <CardBody className="p-0">
            <Row noGutters className="h-100">
              <Col md={5} className="text-center bg-card-gradient">
                <div className="position-relative p-4 pt-md-5 pb-md-7">
                  <Background image={process.env.PUBLIC_URL + '/img/half-circle.png'} className="bg-auth-card-shape" />
                  <div className="z-index-1 position-relative">
                    <Link className="mb-4 fs-4 d-inline-block" to="/">
                      React-i18n
                    </Link>
                    <p className="text-100">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.
                    </p>
                  </div>
                </div>
                <div className="mt-3 mb-4 mt-md-4 mb-md-5">{leftSideContent}</div>
              </Col>
              <Col md={7} tag={Flex} align="center" justify="center">
                <div className="p-4 p-md-5 flex-grow-1">{children}</div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

AuthLayout.propTypes = {
  leftSideContent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default AuthLayout;
