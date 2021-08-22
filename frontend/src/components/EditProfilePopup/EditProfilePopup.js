import React from 'react';
import PopupWithForm from '.././PopupWithForm/PopupWithForm.js';
import { UserContext } from '../../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

React.useEffect(() => {
  currentUser && setName(currentUser.name)
  currentUser && setDescription(currentUser.about)
}, [currentUser, props.isOpen]);

  function inputName(e) {
    setName(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

function inputDescription(e) {
  setDescription(e.target.value);
}

    return (
      <PopupWithForm name="edit" submite={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}   namePopup="Редактировать профиль" btn="edit" nameBtn="Сохранить">
      <label>
      <input id="profile-name-input" type="text" placeholder="Имя" value={name && name} onChange={inputName}  className="input input_type_name" name="NameInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-name-input-error"></span>
  </label>


<label>
<input type="text" id="profile-status-input" placeholder="О себе" value={description && description} onChange={inputDescription}   className="input input_type_status" name="JobInput" required minLength="2" maxLength="200" />
<span className="popup__error profile-status-input-error"></span>
</label>

</PopupWithForm>
    );
}

export default EditProfilePopup;