import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ModalTask.module.css';
import TaskInfo from './TaskInfo/TaskInfo';
import FilesInfo from './FilesInfo/FilesInfo';
import AddComments from './AddComments/AddComments';

const ModalTask = (props) => {
  const {
    active, setActive, data, timeAtWork, timeCreateString,
  } = props;

  const [modalActive, setModalActive] = useState(false);
  const [modalActiveReply, setModalActiveReply] = useState(false);

  return (
        <div className={active ? `${s.modaltask} ${s.active}` : s.modaltask} onClick={() => setActive(false)}>
            <div className={active ? `${s.modaltaskkontent} ${s.active}` : s.modaltaskkontent} onClick={(e) => e.stopPropagation()}>
                <button className={s.close} onClick={() => setActive(false)}>
                    <div className={s.lh}></div>
                    <div className={s.lv}></div>
                </button>
                <div className={s.modalcontainer}>
                    <TaskInfo
                      data ={data}
                      timeAtWork={timeAtWork}
                      timeCreateString={timeCreateString}/>
                    <div className={s.modalrightside}>
                        <FilesInfo data={data}/>
                        <AddComments data={data}
                            modalActive={modalActive}
                            setModalActive={setModalActive}
                            modalActiveReply={modalActiveReply}
                            setModalActiveReply={setModalActiveReply}
                            />
                    </div>
                </div>

            </div>

        </div>
  );
};

ModalTask.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  timeAtWork: PropTypes.string.isRequired,
  timeCreateString: PropTypes.string.isRequired,
};

export default ModalTask;
