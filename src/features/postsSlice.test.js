import postsReducer, { fetchPosts, createPost, updatePost, deletePost } from './postsSlice';

describe('posts reducer', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null
  };

  it('should handle initial state', () => {
    expect(postsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchPosts.fulfilled', () => {
    const posts = [{ id: 1, title: 'test', body: 'content' }];
    const action = { type: fetchPosts.fulfilled, payload: posts };
    const state = postsReducer(initialState, action);
    expect(state.items).toEqual(posts);
    expect(state.status).toBe('succeeded');
  });

  it('should handle createPost.fulfilled', () => {
    const newPost = { id: 101, title: 'New Post', body: 'New Content' };
    const action = { type: createPost.fulfilled, payload: newPost };
    const state = postsReducer(initialState, action);
    expect(state.items).toContainEqual(newPost);
  });

  it('should handle updatePost.fulfilled', () => {
    const startState = {
      ...initialState,
      items: [{ id: 1, title: 'Old', body: 'Content' }]
    };
    const updatedPost = { id: 1, title: 'Updated', body: 'New content' };
    const action = { type: updatePost.fulfilled, payload: updatedPost };
    const state = postsReducer(startState, action);
    expect(state.items[0]).toEqual(updatedPost);
  });

  it('should handle deletePost.fulfilled', () => {
    const startState = {
      ...initialState,
      items: [{ id: 1, title: 'To Delete', body: '...' }]
    };
    const action = { type: deletePost.fulfilled, payload: 1 };
    const state = postsReducer(startState, action);
    expect(state.items).toHaveLength(0);
  });
});
