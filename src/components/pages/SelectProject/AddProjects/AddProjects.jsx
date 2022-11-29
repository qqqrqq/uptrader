import React from 'react';
import s from './AddProjects.module.css'
const AddProjects = ({setActive}) =>{
    return(
        <div className={s.addprojects}>
                <button onClick={()=>setActive(true)}>
                    <div className={s.lv}></div>
                    <div className={s.lh}></div>
                </button>
                <p>Add projects</p>
        </div>
    )
}

export default AddProjects