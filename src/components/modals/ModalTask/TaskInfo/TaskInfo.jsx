import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import pencil from '../../../../images/pencil.svg';
import s from './TaskInfo.module.css';

const getStatus = (id) => {
  switch (id) {
    case 1:
      return 'Queue';
    case 2:
      return 'Development';
    case 3:
      return 'Done';
    default:
      return '';
  }
};

const TaskInfo = (props) => {
  const { data, timeCreateString, timeAtWork } = props;
  const [inputNameOpen, setInputNameOpen] = useState(false);
  const [nameTaskEditValue, setNameTaskValue] = useState(data.name);
  const dispatch = useDispatch();
  const [inputDescriptionOpen, setDescriptionNameOpen] = useState(false);
  const [descriptionTaskEditValue, setDescriptionTaskValue] = useState(data.description);

  const status = getStatus(data.status);

  const changeTaskName = () => {
    const state = JSON.parse(localStorage.getItem('redux-store'));
    const newTasks = state.tasks.map((task) => {
      if (task.id !== data.id || state.currentProject !== task.projectId) {
        return task;
      }
      task.name = nameTaskEditValue;

      return task;
    });
    dispatch({ type: 'CHANGE_NAME', payload: newTasks });
    setInputNameOpen(false);
  };

  const changeDescriptionTask = () => {
    const state = JSON.parse(localStorage.getItem('redux-store'));
    const newTasks = state.tasks.map((task) => {
      if (task.id !== data.id || state.currentProject !== task.projectId) {
        return task;
      }
      task.description = descriptionTaskEditValue;

      return task;
    });

    dispatch({ type: 'CHANGE_DESCRIPTION', payload: newTasks });
    setDescriptionNameOpen(false);
  };
  return (
        <div className={s.modalinfo}>
            <h2>Task info:</h2>
            <div className={s.editmodalitem}>
                <div className={s.modalinfoitem}>
                    <p className={s.modalinfoitemprop}>Task name:</p>
                    <p className={s.modalinfoitemvalue}>{data.name}</p>
                    <button className={s.modalinfoedit} onClick={() => setInputNameOpen(!inputNameOpen)}><img src={pencil} alt="" /></button>
                </div>
                <div className={s.modalinfoeditsection} style={{ display: inputNameOpen ? 'block' : 'none' }}>
                    <input type="text" value={nameTaskEditValue} onChange={(e) => setNameTaskValue(e.target.value)} />
                    <button onClick={() => changeTaskName()}></button>
                </div>

            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> Number:</p>
                <p className={s.modalinfoitemvalue}>{data.id}</p>
            </div>
            <div className={s.editmodalitem}>
                <div className={s.modalinfoitem}>
                    <p className={s.modalinfoitemprop}>Description:</p>
                    <p className={s.modalinfoitemvalue}>{data.description}</p>
                    <button className={s.modalinfoedit} onClick={() => setDescriptionNameOpen(!inputDescriptionOpen)}><img src={pencil} alt="" /></button>
                </div>
                <div className={s.modalinfoeditsection} style={{ display: inputDescriptionOpen ? 'block' : 'none' }}>
                    <input type="text" value={descriptionTaskEditValue} onChange={(e) => setDescriptionTaskValue(e.target.value)} />
                    <button onClick={() => changeDescriptionTask()}></button>
                </div>

            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> Created:</p>
                <p className={s.modalinfoitemvalue}>{timeCreateString}</p>
            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> Completed:</p>
                <p className={s.modalinfoitemvalue}>{data.timeEnd}</p>
            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> At work:</p>
                <p className={s.modalinfoitemvalue}>{timeAtWork}</p>
            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> Priority:</p>
                <p className={s.modalinfoitemvalue}>{data.priority}</p>
            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> Status:</p>
                <p className={s.modalinfoitemvalue}>{status}</p>
            </div>
            <div className={s.modalinfoitem}>
                <p className={s.modalinfoitemprop}> Subtasks:</p>
                <p className={s.modalinfoitemvalue}>{data.subtasks.map((subtask) => subtask.value).join('; ')}</p>
            </div>
        </div>
  );
};

TaskInfo.propTypes = {
  timeCreateString: PropTypes.string.isRequired,
  timeAtWork: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default TaskInfo;
