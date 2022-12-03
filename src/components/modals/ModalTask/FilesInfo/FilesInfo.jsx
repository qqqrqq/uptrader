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
      setFileValue('');
      dispatch({ type: 'ADD_FILE', payload: newTasks });
    };
    filereader.readAsDataURL(fileValue);
  };
  const handleFileChange = (e) => {
    setFileValue(e.target.files[0]);
  };
  const openFile = (e, getUrl) => {
    e.preventDefault();
    const win = window.open();
    win.document.write(`<iframe src="${getUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  };
  return (
        <form className={s.modaladdfiles} onSubmit={handleSubmit}>
            <h2>Files: </h2>
            <div className={s.modalloadactions}>
                <p>Download new files:</p>
                <input type="file" ref={fileComponent} onChange={handleFileChange} />
                <input className={s.filesbutton} type="submit" />
            </div>
            <div className={s.filesitems}>
                {data.files.map((file) => (
                    <div key={file.url} className={s.fileitem}>
                        <img src={file.name.endsWith('png') || file.name.endsWith('jpg') || file.name.endsWith('svg') || file.name.endsWith('gif') ? file.url : fileimg} alt="" />
                        <p>{file.name}</p>
                        <a href={file.url} onClick={(e) => openFile(e, file.url)}>download</a>
                    </div>))}
            </div>
        </form>
  );
};

FilesInfo.propTypes = {
  data: PropTypes.object.isRequired,
};
export default FilesInfo;
