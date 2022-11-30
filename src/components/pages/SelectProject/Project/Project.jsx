import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './Project.module.css';

const Project = (props) => {
  const { project } = props;
  const dispatch = useDispatch();

  const setCurrentProject = () => {
    dispatch({ type: 'SET_PROJECT', payload: project.id });
  };
  const deleteProject = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: project.id });
    dispatch({ type: 'DELETE_WITHPROJECT', payload: project.id });
  };
  return (
    <div className={s.project}>
          <Link to={'/tasks'} onClick={() => setCurrentProject()}>{project.name}</Link>
            <button onClick={() => deleteProject()}>
                <div className={s.lv}>
                </div>
                <div className={s.lh}>
                </div>
            </button>
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Project;
