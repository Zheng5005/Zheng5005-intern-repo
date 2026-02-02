import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, {rejectWithValue}) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      if(!res.ok) {
        throw new Error('Failed to fetch user')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    clearUsers: (state) => {
      state.users = [];
      state.currentUser = null;
    },
    // Normal synchronous action
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload
        const exists = state.users.find(user => user.id === action.payload.id)
        if (!exists) {
          state.users.push(action.payload)
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { addUser, clearUsers, setCurrentUser } = userSlice.actions
export default userSlice.reducer
