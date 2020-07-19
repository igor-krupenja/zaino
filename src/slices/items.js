import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase/firebase';

// todo check if all exports are used

export const addItem = createAsyncThunk('users/addItem', async (item, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/items`).add({ ...item });
  return { id: docRef.id, ...item };
});

export const loadItems = createAsyncThunk('users/addItem', async (dummy, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/items`).get();
  return docRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const initialState = [];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // reset function to be called on logout
    // todo might need to refactor when have several slices
    resetItemsState: () => initialState,
  },
  extraReducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    // more info https://redux.js.org/tutorials/essentials/part-2-app-structure
    [addItem.fulfilled]: (state, action) => {
      state.push({ ...action.payload });
    },
    [loadItems.fulfilled]: (state, action) => {
      action.payload.forEach(item => state.push(item));
    },
  },
});

export const { resetItemsState } = itemsSlice.actions;
export default itemsSlice.reducer;
