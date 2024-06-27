import { useEffect } from "react";
import ConverterForm from "./Components/ConverterForm";
import HistoryTable from "./Components/HistoryTable";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getCodes } from "../../shared/services/apiService";


const Home = () => {

    const dispatch = useAppDispatch();

    const { getCodesStatus } = useAppSelector((state) => state.converter);


    useEffect(() => {
        if (getCodesStatus === 'idle') {
            dispatch(getCodes());
        }
    }, [dispatch, getCodesStatus]);

    return (
        <>
            <main className="container mx-auto px-4 py-12">
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <ConverterForm />
                    </div>
                    <div className="space-y-6">
                        <HistoryTable />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;