import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CodesModel, ConvertionModel } from '../../shared/interfaces/converterInterfaces';
import { CodesResponseModel, ConversionResponseModel } from '../../shared/interfaces/apiInterfaces';
import { getCodes, getConversion } from '../../shared/services/apiService';

export interface ConverterState {
    convertFrom: string;
    convertTo: string;
    amountToConvert: number;
    amountConverted: number;
    conversionHistory: ConvertionModel[];
    getCodesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    getCodesError: string | null;
    getConversionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    getConversionError: string | null;
    codesList: CodesModel[];
}

const initialState: ConverterState = {
    convertFrom: '',
    convertTo: '',
    amountToConvert: 0,
    amountConverted: 0,
    conversionHistory: [],
    getCodesStatus: 'idle',
    getCodesError: null,
    getConversionStatus: 'idle',
    getConversionError: null,
    codesList: []
};

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        handleConverter: (state, action: PayloadAction<ConvertionModel>) => {
            const { convertFrom, convertTo, amountToConvert, amountConverted } = action.payload;
            state.convertFrom = convertFrom;
            state.convertTo = convertTo;
            state.amountToConvert = amountToConvert;
            state.amountConverted = amountConverted;
        },
        addConversionHistory: (state, action: PayloadAction<ConvertionModel>) => {
            state.conversionHistory.push(action.payload);
        },
        resetConversionHistory: (state) => {
            state.conversionHistory = initialState.conversionHistory;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversion.pending, (state) => {
                state.getConversionStatus = 'loading';
            })
            .addCase(getConversion.fulfilled, (state, action: PayloadAction<ConversionResponseModel>) => {
                state.getConversionStatus = 'succeeded';
                console.log(action);
            })
            .addCase(getConversion.rejected, (state, action) => {
                state.getConversionStatus = 'failed';
                state.getConversionError = action.error.message || 'The request has failed.';
            })
            .addCase(getCodes.pending, (state) => {
                state.getCodesStatus = 'loading';
            })
            .addCase(getCodes.fulfilled, (state, action: PayloadAction<CodesResponseModel>) => {
                state.getCodesStatus = 'succeeded';
                const responseData = action.payload;
                console.log(responseData);
                state.codesList = responseData.supported_codes.map(item => {
                    return {
                        code: item[0],
                        name: item[1]
                    }
                });
            })
            .addCase(getCodes.rejected, (state, action) => {
                state.getCodesStatus = 'failed';
                state.getConversionError = action.error.message || 'The request has failed.';
            });
    },
});

export const { handleConverter, addConversionHistory, resetConversionHistory } = converterSlice.actions;
export default converterSlice.reducer;
