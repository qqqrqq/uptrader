import React from 'react';
import s from './TasksOffProject.module.css';
import TasksNavBar from './TasksNavBar/TasksNavBar';
import TasksCanban from './TasksCanban/TasksCanban';

const TasksOffProject = () => (
        <div className={s.tasksofproject}>
            <TasksNavBar/>
            <TasksCanban/>
        </div>
);

export default TasksOffProject;
