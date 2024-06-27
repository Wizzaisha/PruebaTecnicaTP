

export interface ConvertionFormModel {
    convertFrom: string;
    convertTo: string;
    amountToConvert: number;
}

export interface ConversionHistoryModel extends ConvertionFormModel {
    amountConverted: number;
}

export interface CodesModel {
    code: string;
    name: string;
}