import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions (thunks)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.slice(0, 10); // Limit to first 10
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newPost.title, body: newPost.body, userId: 1 })
  });
  const data = await response.json();
  return data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...updatedPost, userId: 1 })
  });
  const data = await response.json();
  return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE'
  });
  return postId;
});

// Initial State
const initialState = {
  items: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updatePost
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
