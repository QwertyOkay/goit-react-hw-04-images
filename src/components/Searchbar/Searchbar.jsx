import { PropTypes } from 'prop-types';
import { MyBtn, MyForm, MyInput, MySearchBar } from './styled.module';
import iconFind from '../../image/search.svg';
import { useState } from 'react';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const onInput = e => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value.trim());

    window.scrollTo({
      top: 0,
    });
  };

  return (
    <MySearchBar className="searchbar">
      <MyForm className="form" onSubmit={handleSubmit}>
        <MyBtn type="submit" className="button">
          <img src={iconFind} alt="" width="32" />
        </MyBtn>

        <MyInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInput}
          value={value}
        />
      </MyForm>
    </MySearchBar>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
