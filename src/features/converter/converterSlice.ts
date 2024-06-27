import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CodesModel, ConversionHistoryModel } from '../../shared/interfaces/converterInterfaces';
import { CodesResponseModel, ConversionResponseModel } from '../../shared/interfaces/apiInterfaces';
import { getCodes, getConversion } from '../../shared/services/apiService';

export interface ConverterState {
    amountConverted: number;
    conversionHistory: ConversionHistoryModel[];
    getCodesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    getCodesError: string | null;
    getConversionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    getConversionError: string | null;
    codesList: CodesModel[];
}

const initialState: ConverterState = {
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
        resetConversionHistory: (state) => {
            state.conversionHistory = initialState.conversionHistory;
        },
        resetConversionStatus: (state) => {
            state.amountConverted = 0;
            state.getConversionStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversion.pending, (state) => {
                state.getConversionStatus = 'loading';
            })
            .addCase(getConversion.fulfilled, (state, action) => {
                state.getConversionStatus = 'succeeded';
                const responseData = action.payload as ConversionResponseModel;
                state.amountConverted = responseData.conversion_result;
                console.log('response', responseData);
                const newHistory: ConversionHistoryModel = {
                    amountConverted: responseData.conversion_result,
                    amountToConvert: action.meta.arg.amountToConvert,
                    convertFrom: responseData.base_code,
                    convertTo: responseData.target_code,
                }

                state.conversionHistory.push(newHistory);

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

export const { resetConversionHistory, resetConversionStatus } = converterSlice.actions;
export default converterSlice.reducer;
