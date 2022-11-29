
const stateTasks = JSON.parse(localStorage.getItem('redux-store'))?.tasks || []

const tasks = (state = stateTasks, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          projectId: action.payload.projectId,
          status: 1,
          description: '',
          files: [],
          comments: [],
          priority: 'Ordinary',
          timeCreate: action.payload.timecreate,
          timeEnd: '',
          filter: true,
          subtasks: []
        }
      ]
    case 'MOVE_TASK':
      return action.payload

    case 'MOVE_INCOLUMN':
      return action.payload
    case 'ADD_SUBTASK':
      return action.payload
    case 'ADD_DESCRIPTION':
      return action.payload
    case 'CHANGE_NAME':
      return action.payload
    case 'DELETE_WITHPROJECT':
      return [...state].filter(task => task.projectId !== action.payload)
    case 'CHANGE_DESCRIPTION':
      return action.payload
    case 'ADD_FILE':
      return action.payload
    case 'ADD_COMMENT':
      const findComment = (task, comId) =>{
          if(task.id === comId){
            const hasComments = task?.comments[comId-1]
            hasComments ? hasComments.comments.push(action.payload) : task.comments.push(action.payload)
            action.payload.setCountComments(action.payload.countComments + 1)
            return
          }
          else{
            task.comments.map(task =>{
              findComment(task, comId)
            })
          }
      }
        return [...state].map(task =>{
          if(task.id !== action.payload.idTask){
            return task
          }
          if(action.payload.commentId > 0){
            findComment(task, action.payload.commentId )
            return task
          }
          task.comments = [...task.comments, action.payload]
          action.payload.setCountComments(action.payload.countComments + 1)
          return task
        })
    case 'SET_STATUS' :
      return action.payload  
    case 'SET_SUBTASKCHECK':
      return action.payload  
    case 'SWITCH_PRIORITY':
      return action.payload
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export default tasks