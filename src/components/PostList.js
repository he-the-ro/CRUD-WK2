import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../features/posts/postsSlice';
import PostForm from './PostForm'; // For editing mode
import { useState } from 'react';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleCloseForm = () => {
    setEditingPost(null);
  };

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {editingPost && <PostForm editingPost={editingPost} onClose={handleCloseForm} />}
      {posts.map((post) => (
        <div className="post-item" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
          <button
            onClick={() => dispatch(deletePost(post.id))}
            style={{ marginLeft: '10px', backgroundColor: '#e53e3e' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;
