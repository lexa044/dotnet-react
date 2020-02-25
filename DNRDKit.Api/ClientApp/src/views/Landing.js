import React from 'react';
import { Card, Row, Col } from 'reactstrap';
import PageLayout from '../layouts/PageLayout'
import Section from '../components/Section';

const hrefLink = '#';
const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

export default function Landing() {
    return (
        <PageLayout>
            <Section className="section-content padding-bottom-sm padding-y-sm">
                <header className="section-heading">
                    <a href={hrefLink} className="btn btn-outline-primary float-right">See all</a>
                    <h3 className="section-title">Recommended</h3>
                </header>
                <Row>
                    {availableSizes.map((size, index) => (
                        <Col key={index} md={3}>
                            <Card className="card-product-grid">
                                <a href={hrefLink} className="img-wrap">
                                    <img src={process.env.PUBLIC_URL + '/img/1.jpg'} alt='Sample' />
                                </a>
                                <figcaption className="info-wrap">
                                    <a href={hrefLink} className="title">Just another product name ({size})</a>
                                    <div className="price mt-1">$179.00</div>
                                </figcaption>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Section>
        </PageLayout>
    );
}