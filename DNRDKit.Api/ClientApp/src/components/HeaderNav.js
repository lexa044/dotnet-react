import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../contexts/Context';
import { isIterableArray } from '../helpers/utils';
import { 
    Container, 
    Navbar, 
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownItem, 
    DropdownMenu 
} from 'reactstrap';

const HeaderNav = () => {
    const { t, i18n } = useTranslation();
    const { isDark, setIsDark } = useContext(AppContext);
    const shortCuts = [
        {to: '/', lkey: 'header.home'},
        {to: '/e-commerce/shopping-cart', lkey: 'header.delivery'},
        {to: '/e-commerce/shopping-cart', lkey: 'header.payment'}
    ];
  
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    return (
    <Navbar className={isDark ? 'navbar navbar-expand p-0 navbar-light border-bottom': 'navbar navbar-dark navbar-expand p-0 bg-primary'}>
        <Container>
          <Nav className="navbar-nav d-none d-md-flex mr-auto">
          {isIterableArray(shortCuts) &&
              shortCuts.map((shortCut, index) => (
                <NavItem key={index} >
                  <NavLink to={shortCut.to} href={shortCut.to}>{t(shortCut.lkey)}</NavLink>
                </NavItem>
              ))}
          </Nav>
          <Nav className="navbar-nav">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              {t('header.theme')}
              </DropdownToggle>
              <DropdownMenu className="py-0">
                <div className="bg-white py-2 rounded-soft">
                  <DropdownItem onClick={() => setIsDark(true)}>Light</DropdownItem>
                  <DropdownItem onClick={() => setIsDark(false)}>Dark</DropdownItem>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              {t('header.language')}
              </DropdownToggle>
              <DropdownMenu className="py-0" right>
                <div className="bg-white py-2 rounded-soft">
                  <DropdownItem onClick={() => changeLanguage('es')}>Español</DropdownItem>
                  <DropdownItem onClick={() => changeLanguage('en')}>English</DropdownItem>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>            
          </Nav>
        </Container>
    </Navbar>
    );
};

export default HeaderNav;
