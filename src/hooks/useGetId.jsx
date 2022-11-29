


const useGetIdProject = () =>{
    const state = JSON.parse(localStorage.getItem('redux-store'))
    return state.projects.length+1
}

export default useGetIdProject