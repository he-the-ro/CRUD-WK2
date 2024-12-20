import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../features/posts/postsSlice';

function PostForm({ editingPost, onClose }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      dispatch(updatePost({ ...editingPost, title, body }));
    } else {
      dispatch(createPost({ title, body }));
    }
    if (onClose) onClose();
  };

  return (
    <div className="post-form">
      <h2>{editingPost ? 'Edit Post' : 'Add New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
        </label>
        <label>
          Body:
          <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required />
        </label>
        <div className="form-buttons">
          <button type="submit">{editingPost ? 'Update' : 'Create'}</button>
          {editingPost && onClose && (
            <button type="button" onClick={onClose}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  editingPost: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  }),
  onClose: PropTypes.func
};

PostForm.defaultProps = {
  editingPost: null,
  onClose: null
};

export default PostForm;
