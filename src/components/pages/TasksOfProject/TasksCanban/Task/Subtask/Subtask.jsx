import { useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './Subtask.module.css'

const Subtask = (props) => {
    const {subtask} = props
    
    const [checked, setChecked] = useState(subtask.checked)
    const dispatch = useDispatch()
    const changedChecked = () =>{
        setChecked(!checked)
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks

        const newTasks = allTasks.map(task => {
          
            if (task.id !== subtask.idTask) {
                return task
            }
     
            task.subtasks[subtask.id-1].checked = !checked

            return task
        })
      
        
        dispatch({type: 'SET_SUBTASKCHECK',payload:newTasks })
        
    }
    
    return (
        <div className={`${s.subtittle} ${checked ? s.checked : ''}`}>
            <div>
                <label className={s.taskcheckboxlabel}>
                    <input type="checkbox" className={s.realcheckbox} checked={props.status === 3 || checked  ? true : false} onChange={()=>changedChecked()}/>
                    <span className={s.taskscheckbox}></span>
                </label>
            </div>
            <div className={s.subtittledescription}>
                {props.subtask.value}
            </div>
        </div>
    )
}

export default Subtask