import React from 'react';
import PropTypes from 'prop-types';
import s from './AddProjects.module.css';

const AddProjects = (props) => {
  const { setActive } = props;
  return (<div className={s.addprojects}>
                <button onClick={() => setActive(true)}>
                        <div className={s.lv}></div>
                        <div className={s.lh}></div>
                </button>
                <p>Add projects</p>
        </div>
  );
};

AddProjects.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default AddProjects;
