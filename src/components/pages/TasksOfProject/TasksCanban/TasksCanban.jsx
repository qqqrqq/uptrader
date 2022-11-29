import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import s from './TasksCanban.module.css'
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task/Task';
import { useEffect, useState } from 'react';
import AddItem from '../../../modals/AddItem/AddItem';
import tasks from '../../../../reducers/tasks';


const getDefaultColumn = (sourse, dest) => {
    let index 
    for(let i = 1; i<=3; i++){
        if(i === +sourse || i === +dest){
            continue
        }
        index = i
    }
    return index
}   


const onDragEnd = (result, columns, dispatch, state) => {
    
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
        
        const defaultColumnIndex = getDefaultColumn(source.droppableId, destination.droppableId)
        
        let defaultItems = []

        if(defaultColumnIndex){
            const defaultColumn = columns[defaultColumnIndex]
            defaultItems = [...defaultColumn.items]
        }

        const sourseColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourseItems = [...sourseColumn.items]
        const destItems = [...destColumn.items]
        
    
        const otherProjectsTasks = state.tasks.filter(({projectId}) => projectId !== state.currentProject)
    
        const [removed] = sourseItems.splice(source.index, 1)
        const timeEndString = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
        removed.timeEnd = timeEndString
        destItems.splice(destination.index, 0, removed)

        removed.status = +destination.droppableId
        const resultTasks = [...sourseItems,...defaultItems,...destItems, ...otherProjectsTasks]
        
        

        dispatch({type: 'MOVE_TASK', payload: resultTasks})
       

    } else {
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        

        const indexOfDefaultItems = []
        for(let i = 1 ; i <=3 ; i++){
            if(i === +source.droppableId){
                continue
            }
            indexOfDefaultItems.push(i)
        }
        
        const firstDefaultColumn = columns[indexOfDefaultItems[0]]
        const secondDefaultColumn = columns[indexOfDefaultItems[1]]

        const firstDefaultItems = [...firstDefaultColumn.items]
        const secondDefaultItems = [...secondDefaultColumn.items]

        const otherProjectsTasks = state.tasks.filter(({projectId}) => projectId !== state.currentProject)

        const resultTasks = [...copiedItems, ...firstDefaultItems, ...secondDefaultItems, ...otherProjectsTasks]
        
        dispatch({type:'MOVE_INCOLUMN',payload: resultTasks})
      
    }

}

const createColumns = ({first, second, third}) => {
    return {
        [1]: {
            name: 'Queue',
            items: first
        },
        [2]: {
            name: 'Development',
            items: second
        },
        [3]: {
            name: 'Done',
            items: third
        },
    }
}

const getColumnsTasks = (data, currentProject) =>{
   
    return{
        first: data.filter(({ status, projectId}) =>status === 1 && currentProject === projectId ),
        second: data.filter(({ status, projectId }) => (status === 2 && currentProject === projectId)),
        third: data.filter(({ status, projectId }) => (status === 3 && currentProject === projectId)),
    }
    
}


const TasksCanban = () => {

    
  
    const itemsFromBack = useSelector(state => state.tasks)
    const currentProjectIndex = JSON.parse(localStorage.getItem('redux-store')).currentProject
   
    const dispatch = useDispatch()
   
    const state = useSelector(state => state)
   
    const newTasks = getColumnsTasks(itemsFromBack, currentProjectIndex)
    
    const newColumns = createColumns(newTasks)
    const [columns, setColumns] = useState(newColumns)
    
    return (
        <div className={s.taskscanban}>
            <DragDropContext onDragEnd={result => onDragEnd(result,newColumns, dispatch, state)}>
                {Object.entries(newColumns).map(([id, column]) => {
                  
                    return (
                        <div className={s.columncontainer} key={id} >
                            <h2 className={s.titlecolumn} style={{ color: '#456C86' }}>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={s.column}
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                    padding: 4,
                                                    minHeight: 600
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                  
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <Task
                                                                        provided ={provided}
                                                                        snapshot ={snapshot}
                                                                        data ={item}
                                                                    >
                                                                       
                                                                    </Task>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    )
                })}
            </DragDropContext>
           
        </div>
    )
}
export default TasksCanban