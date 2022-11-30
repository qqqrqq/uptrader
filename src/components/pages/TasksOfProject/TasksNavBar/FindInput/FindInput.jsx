import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './FindInput.module.css';

const FindInput = () => {
  const dispatch = useDispatch();

  const options = ['Number', 'Title'];
  const [openSelect, setOpenSelect] = useState(false);
  const [findValue, setValue] = useState(options[0]);
  const [inpuValue, setInputValue] = useState('');

  const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks;

  const newTasks = allTasks.map((task) => {
    if (inpuValue === '') {
      task.filter = true;
      return task;
    }
    if (findValue === 'Number') {
      task.filter = task.id === +inpuValue;
      return task;
    }
    task.filter = task.name.toLowerCase().includes(inpuValue.toLowerCase());
    return task;
  });
  dispatch({ type: 'SET_FILTER', payload: newTasks });

  return (
        <div className={s.findtasks}>
                <input placeholder='Search by task number or title' value={inpuValue} onChange={(e) => { setInputValue(e.target.value); }} type="text" />
                <div
                    className={s.selectfind}
                    onMouseEnter={() => { setOpenSelect(true); }}
                    onMouseLeave={() => { setOpenSelect(false); }}>
                    <div className={s.selectcurrent}>
                       <p>{findValue}</p>
                    </div>
                    <div className={s.selectitems} onClick={() => { setValue(findValue === options[0] ? options[1] : options[0]); }} style={{ display: openSelect ? 'block' : 'none' }}>
                       {findValue === options[0] ? options[1] : options[0]}
                    </div>
                </div>
            </div>
  );
};

export default FindInput;
