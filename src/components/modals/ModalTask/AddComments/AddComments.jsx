import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddItem from '../../AddItem/AddItem';
import s from './AddComments.module.css';

const getComment = (newComment, replyComment) => (
    <div key={newComment.id} className={`${newComment.commentId > 0 ? s.subcomment : s.firstcomment} ${s.comment}`} >
        <p>{newComment.name}</p>
        <div className={s.commentbuttons}>
            <button
                className={s.addsubcomment}
                onClick={() => replyComment(newComment.id)}>
            </button>
        </div>
        {newComment.comments.length > 0 ? newComment.comments.map((nextComment) => getComment(nextComment, replyComment)) : ''}

    </div>
);

const AddComments = (props) => {
  const {
    data, setModalActive, setModalActiveReply, modalActiveReply, modalActive,
  } = props;
  const [commentForReply, setCommentForReply] = useState(null);
  const [countComments, setCountComments] = useState(1);

  const newCommentData = {
    id: countComments,
    idTask: data.id,
    commentId: commentForReply,
    countComments,
    setCountComments,
    currentProject: data.projectId,
    comments: [],
  };

  const replyComment = (id) => {
    setModalActiveReply(true);
    setCommentForReply(id);
  };
  const addNewComment = () => {
    setModalActive(true);
    setCommentForReply(null);
  };

  return (
        <div className={s.addcomments}>
            <h2>Comments:</h2>
            <div className={s.commentscontainer}>
                {data.comments.length >= 1 ? data.comments.map((comment) => getComment(comment, replyComment)) : ''}
            </div>
            <button
                className={s.addcommentbutton}
                onClick={() => addNewComment()}>
            </button>
            <AddItem active={modalActiveReply} setActive={setModalActiveReply} title={'Reply to a comment'} action={'ADD_COMMENT'} data={newCommentData} />
            <AddItem active={modalActive} setActive={setModalActive} title={'New comment'} action={'ADD_COMMENT'} data={newCommentData} />
        </div>
  );
};

AddComments.propTypes = {
  modalActiveReply: PropTypes.bool.isRequired,
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired,
  setModalActiveReply: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default AddComments;
