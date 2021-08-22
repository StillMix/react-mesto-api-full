import React from 'react';
import PopupWithForm from '.././PopupWithForm/PopupWithForm.js';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');

  function inputAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar,
    });
    setAvatar('')
  }

    return (
<PopupWithForm name="editAvatar" submite={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}  namePopup="Обновить автар" btn="create-avatar" nameBtn="Сохранить">
                                          <label>
                               <input type="url" id="profile-avatar-input" value={avatar} placeholder="Новый аватар" onChange={inputAvatar} className="input input_type_Avatar" name="avatarInput" required minLength="2" maxLength="200" />
                               <span className="popup__error profile-avatar-input-error" ></span>
                           </label>

       </PopupWithForm>
    );
}

export default EditAvatarPopup;