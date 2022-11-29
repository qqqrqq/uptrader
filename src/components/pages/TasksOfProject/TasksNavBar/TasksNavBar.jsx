import s from './TasksNavBar.module.css'
import { Link } from 'react-router-dom';
import AddItem from '../../../modals/AddItem/AddItem';
import { useState } from 'react';

import useGetIdTask from '../../../../hooks/useGetIdTask';
import { useDispatch } from 'react-redux';
const TasksNavBar = () => {

    const [modalActive, setModalActive] = useState(false)

    const indexOfCurrentProject = JSON.parse(localStorage.getItem('redux-store')).currentProject
    const projects = JSON.parse(localStorage.getItem('redux-store')).projects
  
    const currentProjectName = projects.filter(({ id }) => id === indexOfCurrentProject)[0]?.name
    const dispatch = useDispatch()
    const getIdTask = useGetIdTask()
    
    const timecreate = new Date()
    const data = {
        id: getIdTask,
        projectId: indexOfCurrentProject,
        timecreate: timecreate
    }
    const options = ['Number', 'Title']
    const [openSelect, setOpenSelect] = useState(false) 
    const [findValue, setValue] = useState(options[0])
    const [inpuValue, setInputValue] = useState('')
   
   
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
     
        
        const newTasks = allTasks.map(task =>{
            if(inpuValue === ''){
                task.filter = true
                return task
            }
            if(findValue === 'Number'){
                
              task.filter = task.id === +inpuValue ? true : false
              return task
            }else{
              task.filter = task.name.toLowerCase().includes(inpuValue.toLowerCase()) 
              return task
            }
           
        })
        dispatch({type: 'SET_FILTER', payload: newTasks})
    


    return (
        <div className={s.tasksnavbar}>
            <Link to={'/'} className={s.tasknavback} href="">
                <div className={s.taskbackarrow}>
                    <div className={s.arrowline}></div>
                </div>
                <p>{currentProjectName}</p>
            </Link>
            <div className={s.findtasks}>
                <input placeholder='Search by task number or title' value={inpuValue} onChange={(e)=>{setInputValue(e.target.value)}} type="text" />
                <div className={s.selectfind} onMouseEnter={()=>{setOpenSelect(true)}} onMouseLeave={()=>{setOpenSelect(false)}}>
                    <div  className={s.selectcurrent}>
                       <p>{findValue}</p>
                    </div>
                    <div className={s.selectitems} onClick={()=>{setValue(findValue === options[0] ? options[1] : options[0])}} style={{display: openSelect ? 'block': 'none'}}>
                       {findValue === options[0] ? options[1] : options[0]}
                    </div>
                </div>
            </div>
            <button className={s.addtask} onClick={() => setModalActive(true)}>
                <p>Add task</p>
                <div className={s.iconbutton}>
                    <div className={s.lv}></div>
                    <div className={s.lh}></div>
                </div>
            </button>
            <AddItem active={modalActive} setActive={setModalActive} title={'Task name'} action={'ADD_TASK'} data={data} />
        </div>
    )
}

export default TasksNavBar