import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './TasksNavBar.module.css';
import AddItem from '../../../modals/AddItem/AddItem';

import useGetIdTask from '../../../../hooks/useGetIdTask';
import FindInput from './FindInput/FindInput.jsx';

const TasksNavBar = () => {
  const [modalActive, setModalActive] = useState(false);

  const indexOfCurrentProject = JSON.parse(localStorage.getItem('redux-store')).currentProject;
  const { projects } = JSON.parse(localStorage.getItem('redux-store'));

  const currentProjectName = projects.filter(({ id }) => id === indexOfCurrentProject)[0]?.name;
  const getIdTask = useGetIdTask();

  const timecreate = new Date();
  const data = {
    id: getIdTask,
    projectId: indexOfCurrentProject,
    timecreate,
  };

  return (
    <div className={s.tasksnavbar}>
      <Link to={'/'} className={s.tasknavback} href="">
        <div className={s.taskbackarrow}>
          <div className={s.arrowline}></div>
        </div>
        <p>{currentProjectName}</p>
      </Link>
      <FindInput />
      <button className={s.addtask} onClick={() => setModalActive(true)}>
        <p>Add task</p>
        <div className={s.iconbutton}>
          <div className={s.lv}></div>
          <div className={s.lh}></div>
        </div>
      </button>
      <AddItem active={modalActive} setActive={setModalActive} title={'Task name'} action={'ADD_TASK'} data={data} />
    </div>
  );
};

export default TasksNavBar;
