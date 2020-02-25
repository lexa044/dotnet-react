import React, { useState, useEffect } from 'react';
import { Container, Row, Form, FormGroup, Input, Button  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Section from './Section';
import Aside from './Aside';
import Article from './Article';
import { contactInfoList, informationList, accountList } from '../config';
import { emailIsValid } from '../helpers/utils';

const FooterTitle = ({ children }) => <h5 className="title">{children}</h5>;

FooterTitle.propTypes = { children: PropTypes.node.isRequired };

const FooterIconList = ({ list }) => (
  <ul className="list-unstyled">
    {list.map(({ title, to, icon }, index) => (
      <li key={index}>
       <FontAwesomeIcon icon={icon} />&nbsp;
        {title}
      </li>
    ))}
  </ul>
);

FooterIconList.propTypes = { list: PropTypes.array.isRequired };

const FooterList = ({ list }) => (
  <ul className="list-unstyled">
    {list.map(({ title, to }, index) => (
      <li key={index}>
        <Link to={to}>
          {title}
        </Link>
      </li>
    ))}
  </ul>
);

FooterList.propTypes = { list: PropTypes.array.isRequired };

const NewsletterForm = () =>{
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  
  const handleSubmit = e => {
    e.preventDefault();
    toast.success(`Your email '${email}' has been subscribed!`);
  };

  useEffect(() => {
    setIsDisabled(!emailIsValid(email));
  }, [email]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          placeholder='Email address'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          required
          autoComplete="username"
        />
      </FormGroup>
      <FormGroup>
        <Button color="warning" block className="mt-3" disabled={isDisabled}>
          Subscribe
      </Button>
      </FormGroup>
    </Form>
  );
};

const PageFooter = () => (
  <footer className="section-footer border-top bg">
    <Container>
      <Section className="footer-top padding-y">
        <Row>
          <Aside className="col-md-4 col-12">
            <Article className="mr-md-4">
              <FooterTitle>Contact us</FooterTitle>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem. </p>
              <FooterIconList list={contactInfoList} />
            </Article>
          </Aside>
          <Aside className="col-md col-6">
            <FooterTitle>Information</FooterTitle>
            <FooterList list={informationList} />
          </Aside>
          <Aside className="col-md col-6">
            <FooterTitle>My Account</FooterTitle>
            <FooterList list={accountList} />
          </Aside>
          <Aside className="col-md-4 col-12">
            <FooterTitle>Newsletter</FooterTitle>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem. </p>
            <NewsletterForm />
          </Aside>
        </Row>
      </Section>
    </Container>
  </footer>
);

export default PageFooter;
