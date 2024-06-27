import { combineReducers } from '@reduxjs/toolkit';
import converterSlice from '../features/converter/converterSlice';

const rootReducer = combineReducers({
    converter: converterSlice,
});

export default rootReducer;