import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import s from './AddItem.module.css';

const AddItem = (props) => {
  const {
    active, setActive, title, action, data,
  } = props;
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [empty, setEmpty] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  const addData = (e) => {
    e.preventDefault();
    if (empty || value.trim() === '') {
      setEmpty(true);
      return;
    }
    const payload = {
      name: value,
      ...data,
    };

    dispatch({ type: action, payload });

    setActive(false);
    setValue('');
  };
  const handleKeypress = (e) => {
    setValue(e.target.value);
    if (e.keyCode === 13) {
      addData(e);
    }
  };

  return (
        <div className={active ? `${s.addprojectmodal} ${s.active}` : s.addprojectmodal} onClick={() => setActive(false)}>
            <form className={active ? `${s.addprojectmodalcontent} ${s.active}` : s.addprojectmodalcontent} onClick={(e) => e.stopPropagation()}>
                <button className={s.close} onClick={() => setActive(false)}>
                    <div className={s.lh}></div>
                    <div className={s.lv}></div>
                </button>

                <label>
                    <p>{title}</p>
                    <input type="text" value={value} onKeyDown={handleKeypress} onChange={(e) => handleChange(e)} />
                </label>
                {empty ? <div className={s.errorVlid}>Should not be empty</div> : ''}
                <button type="submit" onClick={(e) => addData(e)} className={s.add}>
                    <div className={s.lh}></div>
                    <div className={s.lv}></div>
                </button>
            </form>
        </div>
  );
};

AddItem.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
};

export default AddItem;
