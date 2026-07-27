import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1/user'
const savedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  const data = await response.json()
  if (!response.ok) {
    const message = (data.message || 'An unexpected error occurred').replace(/^Error:\s*/, '')
    throw new Error(message)
  }
  return data
}

function clearStoredToken() {
  localStorage.removeItem('authToken')
  sessionStorage.removeItem('authToken')
}

export const login = createAsyncThunk('auth/login', async ({ email, password, remember }, thunkApi) => {
  try {
    const loginResponse = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    const token = loginResponse.body.token
    clearStoredToken()
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('authToken', token)

    const profileResponse = await apiRequest('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { token, user: profileResponse.body }
  } catch (error) {
    clearStoredToken()
    return thunkApi.rejectWithValue(error.message)
  }
})

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.token
    const response = await apiRequest('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.body
  } catch (error) {
    clearStoredToken()
    return thunkApi.rejectWithValue(error.message)
  }
})

export const updateUserName = createAsyncThunk('auth/updateUserName', async (userName, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.token
    const response = await apiRequest('/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userName }),
    })
    return response.body
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: savedToken,
    user: null,
    status: savedToken ? 'loading' : 'idle',
    error: null,
    updateStatus: 'idle',
    updateError: null,
  },
  reducers: {
    logout(state) {
      clearStoredToken()
      state.token = null
      state.user = null
      state.status = 'idle'
      state.error = null
      state.updateStatus = 'idle'
      state.updateError = null
    },
    clearError(state) {
      state.error = null
    },
    clearUpdateState(state) {
      state.updateStatus = 'idle'
      state.updateError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.token = null
        state.user = null
        state.error = action.payload
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.token = null
        state.user = null
        state.error = action.payload
      })
      .addCase(updateUserName.pending, (state) => {
        state.updateStatus = 'loading'
        state.updateError = null
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded'
        state.user = action.payload
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.updateStatus = 'failed'
        state.updateError = action.payload
      })
  },
})

export const { clearError, clearUpdateState, logout } = authSlice.actions
export default authSlice.reducer
