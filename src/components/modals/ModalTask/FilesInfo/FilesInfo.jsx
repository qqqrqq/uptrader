import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import fileimg from '../../../../images/file.svg';

import s from './FilesInfo.module.css';

const FilesInfo = (props) => {
  const { data } = props;
  const fileComponent = useRef();
  const [fileValue, setFileValue] = useState('');
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const filereader = new FileReader();

    filereader.onload = function onload(event) {
      const resultLink = event.target.result;

      const fileData = {
        name: fileValue.name,
        url: resultLink,
      };

      const state = JSON.parse(localStorage.getItem('redux-store'));
      const newTasks = state.tasks.map((task) => {
        if (task.id !== data.id || state.currentProject !== task.projectId) {
          return task;
        }
        task.files.push(fileData);

        return task;
      });

      setFiles([...files, fileData]);
      dispatch({ type: 'ADD_FILE', payload: newTasks });
    };
    filereader.readAsDataURL(fileValue);
  };
  const handleFileChange = (e) => {
    setFileValue(e.target.files[0]);
  };
  return (
        <form className={s.modaladdfiles} onSubmit={handleSubmit}>
            <h2>Files: </h2>
            <div className={s.filesitems}>
                {data.files.map((file) => (
                    <div key={file.url} className={s.fileitem}>
                        <img src={fileimg} alt="" />
                        <p>{file.name}</p>
                    </div>))}
            </div>
            <div className={s.modalloadactions}>
                <p>Download new files:</p>
                <input type="file" ref={fileComponent} onChange={handleFileChange} />
                <input className={s.filesbutton} type="submit" />
            </div>
        </form>
  );
};

FilesInfo.propTypes = {
  data: PropTypes.object.isRequired,
};
export default FilesInfo;
