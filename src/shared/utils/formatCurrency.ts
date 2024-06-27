export const formatCurrencyFromNumber = (value: number, code: string): string => {
    try {
        return new Intl.NumberFormat('en-US').format(value);
    } catch (e) {
        console.error(`Error formatting currency with code ${code}:`, e);
        return value.toString();
    }
};