import s from './Project.module.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Project = (props) =>{
const dispatch = useDispatch()

const setCurrentProject = () =>{
  dispatch({type: 'SET_PROJECT',payload: props.project.id})
}
const deleteProject = () =>{
   dispatch({type: 'DELETE_PROJECT',payload: props.project.id})
   dispatch({type:'DELETE_WITHPROJECT',payload: props.project.id})
}
 return(
    <div className={s.project}>
          <Link to={'/tasks'} onClick={()=>setCurrentProject()}>{props.project.name}</Link>
            <button onClick={()=>deleteProject()}>
                <div className={s.lv}>
                </div>
                <div className={s.lh}>
                </div>
            </button>
    </div>
 )
}

export default Project