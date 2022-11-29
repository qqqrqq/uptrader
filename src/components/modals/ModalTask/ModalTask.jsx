import s from './ModalTask.module.css'
import pencil from '../../../images/pencil.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import fileimg from '../../../images/file.svg'
import AddItem from '../AddItem/AddItem.jsx'
const getStatus = (id) => {
    switch (id) {
        case 1:
            return 'Queue'
        case 2:
            return 'Development'
        case 3:
            return 'Done'
    }
}

const getComment = (comment, replyComment ) => {
    
    return (
        <div key={comment.id} className={`${comment.commentId>0 ? s.subcomment : s.firstcomment} ${s.comment}`} >
            <p>{comment.name}</p>
            <div className={s.commentbuttons}>
                <button className={s.addsubcomment} onClick={() => replyComment(comment.id)}></button>
            </div>
            {comment.comments.length > 0 ? comment.comments.map(comment =>{
                return getComment(comment, replyComment) 
            }) : '' }
         
        </div>
    )
}


const ModalTask = (props) => {
    const { active, setActive, data } = props
    
    const [inputNameOpen, setInputNameOpen] = useState(false)
    const [nameTaskEditValue, setNameTaskValue] = useState(data.name)

    const [inputDescriptionOpen, setDescriptionNameOpen] = useState(false)
    const [descriptionTaskEditValue, setDescriptionTaskValue] = useState(data.description)


    const [modalActive, setModalActive] = useState(false)
    const [modalActiveReply, setModalActiveReply] = useState(false)

    const [commentForReply, setCommentForReply] = useState(null)

    const dispatch = useDispatch()
    const status = getStatus(data.status)
    const changeTaskName = () => {
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
        const newTasks = allTasks.map(task => {
            if (task.id !== data.id) {
                return task
            }
            task.name = nameTaskEditValue

            return task
        })

        dispatch({ type: 'CHANGE_NAME', payload: newTasks })
        setInputNameOpen(false)
    }

    const changeDescriptionTask = () => {
        const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
        const newTasks = allTasks.map(task => {
            if (task.id !== data.id) {
                return task
            }
            task.description = descriptionTaskEditValue

            return task
        })

        dispatch({ type: 'CHANGE_DESCRIPTION', payload: newTasks })
        setDescriptionNameOpen(false)
    }
    const fileComponent = useRef()
    const [fileValue, setFileValue] = useState('')
    const [files, setFiles] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()

        const filereader = new FileReader()

        filereader.onload = function (event) {
            const resultLink = event.target.result

            const fileData = {
                name: fileValue.name,
                url: resultLink
            }

            const allTasks = JSON.parse(localStorage.getItem('redux-store')).tasks
            const newTasks = allTasks.map(task => {
                if (task.id !== data.id) {
                    return task
                }
                task.files.push(fileData)

                return task
            })

            setFiles([...files, fileData])
            dispatch({ type: 'ADD_FILE', payload: newTasks })
        }
        filereader.readAsDataURL(fileValue)
    }
    const handleFileChange = (e) => {

        setFileValue(e.target.files[0])
    }

    const [countComments, setCountComments] = useState(1)

    const newCommentData = {
        id: countComments,
        idTask: data.id,
        commentId: commentForReply,
        countComments,
        setCountComments,
        comments:[]
    }

    


    const replyComment = (id) => {
        setModalActiveReply(true)
        setCommentForReply(id)

  
    }
    const addNewComment = () =>{
        setModalActive(true)
        setCommentForReply(null)
    }
    return (
        <div className={active ? `${s.modaltask} ${s.active}` : s.modaltask} onClick={() => setActive(false)}>
            <div className={active ? `${s.modaltaskkontent} ${s.active}` : s.modaltaskkontent} onClick={(e) => e.stopPropagation()}>
                <button className={s.close} onClick={() => setActive(false)}>
                    <div className={s.lh}></div>
                    <div className={s.lv}></div>
                </button>
                <div className={s.modalcontainer}>
                    <div className={s.modalinfo}>
                        <h2>Task info:</h2>
                        <div className={s.editmodalitem}>
                            <div className={s.modalinfoitem}>
                                <p className={s.modalinfoitemprop}>Task name:</p>
                                <p className={s.modalinfoitemvalue}>{data.name}</p>
                                <button className={s.modalinfoedit} onClick={() => setInputNameOpen(!inputNameOpen)}><img src={pencil} alt="" /></button>
                            </div>
                            <div className={s.modalinfoeditsection} style={{ display: inputNameOpen ? 'block' : 'none' }}>
                                <input type="text" value={nameTaskEditValue} onChange={(e) => setNameTaskValue(e.target.value)} />
                                <button onClick={() => changeTaskName()}></button>
                            </div>

                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> Number:</p>
                            <p className={s.modalinfoitemvalue}>{data.id}</p>
                        </div>
                        <div className={s.editmodalitem}>
                            <div className={s.modalinfoitem}>
                                <p className={s.modalinfoitemprop}>Description:</p>
                                <p className={s.modalinfoitemvalue}>{data.description}</p>
                                <button className={s.modalinfoedit} onClick={() => setDescriptionNameOpen(!inputDescriptionOpen)}><img src={pencil} alt="" /></button>
                            </div>
                            <div className={s.modalinfoeditsection} style={{ display: inputDescriptionOpen ? 'block' : 'none' }}>
                                <input type="text" value={descriptionTaskEditValue} onChange={(e) => setDescriptionTaskValue(e.target.value)} />
                                <button onClick={() => changeDescriptionTask()}></button>
                            </div>

                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> Created:</p>
                            <p className={s.modalinfoitemvalue}>{props.timeCreateString}</p>
                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> Completed:</p>
                            <p className={s.modalinfoitemvalue}>{data.timeEnd}</p>
                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> At work:</p>
                            <p className={s.modalinfoitemvalue}>{props.timeAtWork}</p>
                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> Priority:</p>
                            <p className={s.modalinfoitemvalue}>{data.priority}</p>
                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> Status:</p>
                            <p className={s.modalinfoitemvalue}>{status}</p>
                        </div>
                        <div className={s.modalinfoitem}>
                            <p className={s.modalinfoitemprop}> Subtasks:</p>
                            <p className={s.modalinfoitemvalue}>{data.subtasks.map(subtask => {
                                return subtask.value
                            }).join('; ')}</p>
                        </div>
                    </div>
                    <div className={s.modalrightside}>
                        <form className={s.modaladdfiles} onSubmit={handleSubmit}>
                            <h2>Files: </h2>
                            <div className={s.filesitems}>
                                {data.files.map(file => {
                                    return (
                                        <div className={s.fileitem}>
                                            <img src={fileimg} alt="" />
                                            <p>{file.name}</p>
                                        </div>)
                                })}
                            </div>
                            <div className={s.modalloadactions}>
                                <p>Download new files:</p>
                                <input type="file" ref={fileComponent} onChange={handleFileChange} />
                                <input className={s.filesbutton} type="submit" />
                            </div>

                        </form>
                        <div className={s.addcomments}>
                            <h2>Comments:</h2>
                            <div className={s.commentscontainer}>
                                {data.comments.length >= 1 ? data.comments.map(comment => {
                                    return getComment(comment , replyComment)
                                }) : ''}
                            </div>
                            <button className={s.addcommentbutton} onClick={() => addNewComment()}></button>
                        </div>
                    </div>
                </div>


            </div>
            <AddItem active={modalActiveReply} setActive={setModalActiveReply} title={'Reply to a comment'} action={'ADD_COMMENT'} data={newCommentData} />
            <AddItem active={modalActive} setActive={setModalActive} title={'New comment'} action={'ADD_COMMENT'} data={newCommentData} />
        </div>
    )
}
export default ModalTask