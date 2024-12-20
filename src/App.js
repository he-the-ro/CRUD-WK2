import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1>My Posts App</h1>
      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <PostForm />
          <PostList />
        </>
      )}
    </div>
  );
}

export default App;

