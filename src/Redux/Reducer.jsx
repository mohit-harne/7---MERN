import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunks for asynchronous actions
// Fetch user list
export const fetchUserList = createAsyncThunk(
  'users/fetchUserList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8030/");
      console.log('Fetched user list:', response.data); // Log the fetched data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add user
export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8030/addUser", userData);
      toast.success("User Added Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:8030/edit/${userId}`, userData);
      toast.success("User Updated Successfully");
      return userId; // Return the ID of the updated user
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue, dispatch }) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        await axios.delete(`http://localhost:8030/${userId}`);
        dispatch(fetchUserList()); // Refetch user list after deletion
        return userId; // Return the deleted user ID
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue("User deletion cancelled");
  }
);

export const fetchUserObj = createAsyncThunk(
  'users/fetchUserObj',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8030/fetchUserObj/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// User slice
 const dataSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    userObj: null,
    loading: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user list
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Add user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userList.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = state.userList.map(user =>
          user.id === action.payload ? { ...user, ...action.meta.arg.userData } : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = state.userList.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Fetch user by ID
      .addCase(fetchUserObj.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(fetchUserObj.fulfilled, (state, action) => {
        state.loading = false;
        state.userObj = action.payload;
      })
      .addCase(fetchUserObj.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  }
});



// Selectors to get the state data
export const selectUserList = (state) => state.users.userList;
export const selectUserObj = (state) => state.users.userObj;
export const selectLoadingStatus = (state) => state.users.loading;
export const selectErrorMessage = (state) => state.users?.errorMessage;

export default dataSlice.reducer;