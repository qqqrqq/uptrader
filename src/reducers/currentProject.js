
const stateCurrent = JSON.parse(localStorage.getItem('redux-store'))?.currentProject || null

      
const currentProject = (state = stateCurrent, action) => {
    switch (action.type) {
      case 'SET_PROJECT':
        return action.payload
      default:
        return state
    }
  }
  
  export default currentProject