import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { formatCurrencyFromNumber } from "../../../shared/utils/formatCurrency";
import './styles.css/HistoryTable.css';
import { resetConversionHistory } from "../../../features/converter/converterSlice";


const HistoryTable = () => {

    const { conversionHistory } = useAppSelector((state) => state.converter);

    const dispatch = useAppDispatch();

    const handleResetFilter = () => {
        dispatch(resetConversionHistory());
    }

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">Currency History</h1>
                <p>View your past currency conversions.</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-5">
                <div className="card-body p-0">
                    <div className="flex flex-row justify-end">
                        <button className="btn btn-ghost w-28 text-error" onClick={handleResetFilter}>
                            <MdDelete size={30} />
                        </button>
                    </div>
                    <div className="overflow-x-auto table-custom">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conversionHistory.length === 0 &&
                                    <tr className="text-lg text-center">
                                        <td colSpan={4}>No history data.</td>
                                    </tr>
                                }
                                {conversionHistory.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{formatCurrencyFromNumber(item.amountToConvert, item.convertFrom)}</td>
                                            <td>{item.convertFrom}</td>
                                            <td>{item.convertTo}</td>
                                            <td className="font-bold">{formatCurrencyFromNumber(item.amountConverted, item.convertTo)}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryTable;