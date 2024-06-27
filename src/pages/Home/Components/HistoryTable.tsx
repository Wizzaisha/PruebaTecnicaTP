


const HistoryTable = () => {


    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">Currency History</h1>
                <p>View your past currency conversions.</p>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Converted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>100</th>
                                    <td>USD</td>
                                    <td>EUR</td>
                                    <td>90</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryTable;