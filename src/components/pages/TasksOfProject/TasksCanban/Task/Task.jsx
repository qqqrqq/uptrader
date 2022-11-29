
import { useState } from 'react'
import useTimeAtWork from '../../../../../hooks/useTimeAtWork'
import s from './Task.module.css'
import { useDispatch } from "react-redux"
import Subtask from './Subtask/Subtask'
import ModalTask from '../../../../modals/ModalTask/ModalTask'


const getTimeString = (dateObject) => {
    const result = Object.entries(dateObject).reduce((acc, item) => {
        if (item[1] > 0) {
            const letter = item[0].startsWith('min') ? 'min' : item[0].substring(0, 1)
            const timeString = `${item[1]} ${letter}`
            return [...acc, timeString]
        }
        return acc
    }, [])
    return result.join(' ')
}

const Task = (props) => {
    const { provided, snapshot, data } = props

    const timeData = new Date(data.timeCreate)
    const timeCreateString = `${timeData.getDate()}.${timeData.getMonth() + 1}.${timeData.getFullYear()}`
    const NowDate = new Date()
    const timeAtWorkData = new Date(NowDate - timeData)
    const timeAtWorkObject = useTimeAtWork(timeAtWorkData)
    const timeAtWork = getTimeString(timeAtWorkObject)
    const dispatch = useDispatch()

    const setNewSubtask = () => {
        setInputSubtask(false)
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
        const newTasks = allTasks.map(task => {
            if (task.id !== data.id) {
                return task
            }

            task.subtasks.push({
                value: valueNewSubtask,
                id: task.subtasks.length + 1,
                checked: false,
                idTask: data.id,
            })

            return task
        })

        dispatch({ type: 'ADD_SUBTASK', payload: newTasks })
    }
    const [valueNewSubtask, setValueNewSubtask] = useState('')
    const [inputSubtask, setInputSubtask] = useState(false)
    const [modalActive, setModalActive] = useState(false)

    const [checked, setChecked] = useState(data.status === 3 ? true : false)

    const setTaskDone = () => {
        const changeStatusAndSubtaskChecked = (task, done) => {

            const timeEndString = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`

            task.status = done ? 2 : 3
            task.timeEnd = timeEndString


            return task.subtasks.map(subtask => {
                subtask.checked = done ? false : true
                return subtask
            })
        }
        setChecked(!checked)
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
        const newTasks = allTasks.map(task => {
            if (task.id !== data.id) {
                return task
            }
            task.status === 3 ? changeStatusAndSubtaskChecked(task, true) : changeStatusAndSubtaskChecked(task, false)

            return task
        })

        dispatch({ type: 'SET_STATUS', payload: newTasks })
    }
   

    const [openSelect, setOpenSelect] = useState(false)
    
    const [selectValue, setSelectValue] = useState(data.priority)

    const getBackgroundTask = (priority) =>{
        switch(priority){
            case 'Ordinary':
                return '#456C86'
            case 'Average':
                return  '#799611'
            case 'High':
                return  '#962511'
        }
    }
    const switchPriority = (priority) =>{
      
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
        const newTasks = allTasks.map(task => {
            if (task.id !== data.id) {
                return task
            }

            task.priority = priority

            return task
        })

        dispatch({ type: 'SWITCH_PRIORITY', payload: newTasks })
        setOpenSelect(false)    
        setSelectValue(priority)
    }
   
   
    return (
        <div>
            <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={s.task}
                style={{
                    display: data.filter ? 'block': 'none',
                    backgroundColor: snapshot.isDragging ? '#263B4A' : getBackgroundTask(selectValue),
                    marginBottom: '5px',
                    ...provided.draggableProps.style,
                    opacity: checked ? 0.5 : 1,
                    
                }}>

                <div className={s.task}>
                    <div>
                        <label className={s.taskcheckboxlabel}>
                            <input type="checkbox" className={s.realcheckbox} checked={checked} onChange={() => setTaskDone()} />
                            <span className={s.taskscheckbox}></span>
                        </label>
                    </div>
                    <div>
                        <div className={s.tasktitle}>
                            {data.name}
                        </div>
                        <div className={s.description}>

                            {data.description}

                        </div>
                        <div className={s.number}>
                            {data.id}
                        </div>
                    </div>

                    <div className={s.datecreate}>
                        <p>Created: {timeCreateString}</p>
                        {data.status === 3 ? <p>Was End:{data.timeEnd}</p> : ''}
                        <div className={s.atwork}>
                            <p>At work: {timeAtWork}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={s.taskoptions}>
                        <button className={s.addsubtaskbutton} onClick={() => setInputSubtask(true)}><p>+</p> add subtask</button>
                        <div className={s.selectpriority}>
                            <div onClick={() => setOpenSelect(!openSelect)} className={s.selectheader}>
                                <span className={s.spanselectcurrent}>{selectValue}</span>
                            </div>

                            <div className={s.selectbody} style={{display: openSelect ? 'block' : 'none', background: getBackgroundTask(selectValue)}}>
                                <div className={s.selectitem} onClick={()=>switchPriority('Ordinary')} >Ordinary</div>
                                <div className={s.selectitem} onClick={()=>switchPriority('Average')} >Average</div>
                                <div className={s.selectitem} onClick={()=>switchPriority('High')} >High</div>
                            </div>
                        </div>
                        <button className={s.addsubtaskbutton} onClick={() => setModalActive(true)}>details <p>⚙</p></button>
                    </div>

                    <div style={{ display: inputSubtask ? 'flex' : 'none' }} className={s.addsubtask}>
                        <input type="text" value={valueNewSubtask} onChange={(e) => setValueNewSubtask(e.target.value)} />
                        <button className={s.addsubtaskok} onClick={() => setNewSubtask()}></button>
                        <button className={s.addsubtaskcancel} onClick={() => setInputSubtask(false)}></button>
                    </div>
                </div>

                <div className={s.subtittle}>
                    {data.subtasks.length > 0 ? data.subtasks.map((subtask) => {
                        return <Subtask subtask={subtask} status={data.status} key={subtask.id} />
                    }) : ''}
                </div>
            </div>
            <ModalTask active={modalActive} setActive={setModalActive} data={data} timeAtWork={timeAtWork} timeCreateString={timeCreateString} />
        </div>
    )
}

export default Task