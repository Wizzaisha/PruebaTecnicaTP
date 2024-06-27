import { createAsyncThunk } from "@reduxjs/toolkit";
import { CodesResponseModel, ConversionResponseModel } from "../interfaces/apiInterfaces";
import { ConvertionModel } from "../interfaces/converterInterfaces";
import axiosBase from "../utils/axiosBase";

export const getConversion = createAsyncThunk(
    'converter/fetchConversion',
    async (params: ConvertionModel) => {
        const response = await axiosBase.get(`pair/${params.convertFrom}/${params.convertTo}/${params.amountToConvert}`);
        return response.data as ConversionResponseModel;
    },
);

export const getCodes = createAsyncThunk(
    'converter/fetchCodesData',
    async () => {
        const responseApi = await axiosBase.get(`codes`);
        return responseApi.data as CodesResponseModel;
    },
);