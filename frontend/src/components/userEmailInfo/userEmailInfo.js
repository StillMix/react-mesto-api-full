import React from 'react';

function UserEmailInfo(props) {

    return (
      <div className={`${props.isOpen ? 'userEmailInfo' : 'userEmailInfo-disactive'}`}>
      <p className="userEmailInfo__email">{props.email}</p>
      <button onClick={props.signOut} className="userEmailInfo__link header__button">Выйти</button>
      </div>
    );
}

export default UserEmailInfo;