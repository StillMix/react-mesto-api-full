import React from 'react';
import PopupWithForm from '.././PopupWithForm/PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit({
      name: name,
      link:link
    });
    setName('');
    setLink('');
  }
  function inputName(e) {
    setName(e.target.value);
  }
  function inputLink(e) {
    setLink(e.target.value);
  }

    return (
      <PopupWithForm submite={handleSubmit} name="new-card" isOpen={props.isOpen} onClose={props.onClose}   namePopup="Новое место" btn="create-new-card" nameBtn="Создать">
      <label>
      <input id="card-name-input" type="text" placeholder="Название" value={name} onChange={inputName} className="input input_type_nameImage" name="NameIMGInput" required minLength="2" maxLength="30" />
      <span className="popup__error card-name-input-error"></span>
  </label>


<label>
<input type="url" id="card-src-input" placeholder="Ссылка на картинку" value={link} onChange={inputLink} className="input input_type_src" name="SrcInput" required />
<span className="popup__error card-src-input-error"></span>
</label>

</PopupWithForm>
    );
}

export default AddPlacePopup;