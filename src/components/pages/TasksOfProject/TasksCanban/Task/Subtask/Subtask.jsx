import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import s from './Subtask.module.css';

const Subtask = (props) => {
  const { subtask, status } = props;

  const [checked, setChecked] = useState(subtask.checked);
  const dispatch = useDispatch();
  const changedChecked = () => {
    setChecked(!checked);
    const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks;

    const newTasks = allTasks.map((task) => {
      if (task.id !== subtask.idTask) {
        return task;
      }

      task.subtasks[subtask.id - 1].checked = !checked;

      return task;
    });

    dispatch({ type: 'SET_SUBTASKCHECK', payload: newTasks });
  };

  return (
        <div className={`${s.subtittle} ${checked ? s.checked : ''}`}>
            <div>
                <label className={s.taskcheckboxlabel}>
                    <input type="checkbox" className={s.realcheckbox} checked={!!(status === 3 || checked)} onChange={() => changedChecked()}/>
                    <span className={s.taskscheckbox}></span>
                </label>
            </div>
            <div className={s.subtittledescription}>
                {props.subtask.value}
            </div>
        </div>
  );
};

Subtask.propTypes = {
  subtask: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired,
};

export default Subtask;
