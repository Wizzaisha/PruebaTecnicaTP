//import { useAppSelector, useAppDispatch } from "../../../app/hook";
import PrimaryButton from "../../../shared/components/PrimaryButton";


const ConverterForm = () => {

    // const { value } = useAppSelector((state) => state.counter);

    // const dispatch = useAppDispatch();

    const handleClickConvertor = () => {
        console.log('omg click')
    }

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">Currency Converter</h1>
                <p>Convert between different currencies.</p>
            </div>
            <div className="card shadow-xl">
                <div className="card-body">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Amount</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                    </label>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">From</span>
                            </div>
                            <select className="select select-bordered">
                                <option disabled value={''}>Pick one</option>
                                <option>Star Wars</option>
                                <option>Harry Potter</option>
                                <option>Lord of the Rings</option>
                                <option>Planet of the Apes</option>
                                <option>Star Trek</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">To</span>
                            </div>
                            <select className="select select-bordered">
                                <option disabled value={''}>Pick one</option>
                                <option>Star Wars</option>
                                <option>Harry Potter</option>
                                <option>Lord of the Rings</option>
                                <option>Planet of the Apes</option>
                                <option>Star Trek</option>
                            </select>
                        </label>
                    </div>

                    <div className="mt-2">
                        <PrimaryButton onClick={handleClickConvertor}>
                            Convert
                        </PrimaryButton>
                    </div>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Result</span>
                        </div>
                        <input readOnly type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                    </label>
                </div>
            </div>
        </>
    )
}


export default ConverterForm;