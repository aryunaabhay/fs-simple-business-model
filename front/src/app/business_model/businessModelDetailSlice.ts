import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../../core/store'
import { BusinessModel } from './entities/BusinessModel'


interface BusinessModelDetailState {
    selected?: BusinessModel
}

const initialState: BusinessModelDetailState = {
    selected: undefined,
};

const businessModelDetailSlice = createSlice({
    name: 'businessModelDetail',
    initialState,
    reducers: {
     selectBusinessModel(state, action: PayloadAction<BusinessModel>) {
        state.selected = action.payload;
      },
      clearSelectedBusinessModel(state) {
        state.selected = undefined;
      },
    },
  });

  export const { selectBusinessModel, clearSelectedBusinessModel } = businessModelDetailSlice.actions

  // Other code such as selectors can use the imported `RootState` type
  export const selectBusinessModelDetail = (state: RootState) => state.businessModelDetail
  
  export default businessModelDetailSlice.reducer