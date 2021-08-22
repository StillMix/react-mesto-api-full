import React from 'react';
import headerLogo from '../../images/header-logo.svg';

function Header(props) {
    return (
          <header className="header">
    <img src={headerLogo} alt="Логотип сайта" className="header__logo" />
    { props.children }
    </header>
    );
}

export default Header;