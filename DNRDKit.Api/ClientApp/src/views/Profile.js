import React from 'react';
import { Row } from 'reactstrap';
import PageLayout from '../layouts/PageLayout'
import Section from '../components/Section';
import Aside from '../components/Aside';
import Article from '../components/Article';

const hrefLink = '#';

export default function Profile() {
    return (
        <PageLayout>
            <Section className="section-content padding-y">
                <Row>
                    <Aside className="col-md-3">
                        <ul className="list-group">
                            <a className="list-group-item active" href={hrefLink}> Account overview  </a>
                            <a className="list-group-item" href={hrefLink}> My Orders </a>
                            <a className="list-group-item" href={hrefLink}> My wishlist </a>
                            <a className="list-group-item" href={hrefLink}> Return and refunds </a>
                            <a className="list-group-item" href={hrefLink}>Settings </a>
                            <a className="list-group-item" href={hrefLink}> My Selling Items </a>
                            <a className="list-group-item" href={hrefLink}> Received orders </a>
                        </ul>
                    </Aside>
                    <main className="col-md-9">
                        <Article className="card mb-3">
                            <div className="card-body">
                                <p>
                                    <i className="fa fa-map-marker text-muted"></i> &nbsp; My address:
                                    <br />
                                    Tashkent city, Street name, Building 123, House 321 &nbsp;
                                    <a href={hrefLink} className="btn-link"> Edit</a>
                                </p>
                            </div>
                        </Article>
                    </main>
                </Row>
            </Section>
        </PageLayout>
    );
}