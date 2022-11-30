import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './SelectProject.module.css';
import companyLogo from '../../../images/uptr-logo.svg';
import AddProjects from './AddProjects/AddProjects';
import Project from './Project/Project';

import AddItem from '../../modals/AddItem/AddItem';
import useGetIdProject from '../../../hooks/useGetId';

const SelectProject = () => {
  const projects = useSelector((state) => state.projects);

  const [modalActive, setModalActive] = useState(false);
  const getId = useGetIdProject((id) => id);
  const data = {
    id: getId,
  };

  return (
        <div className={s.selectproject}>
            <div className={s.selectbar}>
               <h2 className={s.title}>Select a project</h2>
               <div className={s.projects}>
                 {projects.length > 0
                   ? projects.map((project) => <Project key={project.id} project={project}/>)
                   : <p>No projects, add new</p>}
               </div>
               <AddProjects setActive={setModalActive}/>
            </div>
            <div className={s.selectmain}>
                <img src={companyLogo} alt="companylogo"/>
                <p>Test task, for the position of Front-end developer</p>
            </div>
            <AddItem active={modalActive} setActive={setModalActive} title={'Project name'} action ={'ADD_PROJECT'} data={data}/>
        </div>
  );
};

export default SelectProject;
