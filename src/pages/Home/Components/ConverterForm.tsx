import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hook";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import { ConvertionFormModel } from "../../../shared/interfaces/converterInterfaces";
import { getConversion } from "../../../shared/services/apiService";
import { resetConversionStatus } from "../../../features/converter/converterSlice";
import { MdErrorOutline } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";


const ConverterForm = () => {

    const { codesList, amountConverted, getConversionStatus } = useAppSelector((state) => state.converter);

    const dispatch = useAppDispatch();

    const [form, setForm] = useState<ConvertionFormModel>({
        convertFrom: '',
        convertTo: '',
        amountToConvert: 0
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

        if (getConversionStatus !== 'idle') {
            dispatch(resetConversionStatus());
        }

        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleClickConvertor = () => {
        console.log('form', form);
        dispatch(getConversion(form));
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
                        <input
                            value={form.amountToConvert}
                            name="amountToConvert"
                            type="number"
                            placeholder="Type amount"
                            className="input input-bordered input-primary w-full"
                            onChange={handleOnChange}
                            required
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">From</span>
                            </div>
                            <select
                                onChange={handleOnChange}
                                name="convertFrom"
                                defaultValue={''}
                                className="select select-bordered select-primary"
                                required
                            >
                                <option disabled value={''}>Selecte one</option>
                                {codesList?.map(code => {
                                    return (
                                        <option key={code.code} value={code.code}>{code.code} - {code.name}</option>
                                    )
                                })
                                }
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">To</span>
                            </div>
                            <select
                                name="convertTo"
                                defaultValue={''}
                                className="select select-bordered select-primary"
                                onChange={handleOnChange}
                            >
                                <option disabled value={''}>Selecte one</option>
                                {codesList?.map(code => {
                                    return (
                                        <option key={code.code} value={code.code}>{code.code} - {code.name}</option>
                                    )
                                })
                                }
                            </select>
                        </label>
                    </div>

                    <div className="mt-2 mb-5">
                        <PrimaryButton onClick={handleClickConvertor}>
                            Convert
                        </PrimaryButton>
                    </div>

                    {getConversionStatus === 'loading' &&
                        <div role="alert" className="alert bg-gray-100 flex flex-row justify-center items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    }
                    {getConversionStatus === 'failed' &&
                        <div role="alert" className="alert bg-red-100">
                            <MdErrorOutline size={30} />
                            <span>Error! Can't get the conversion.</span>
                        </div>
                    }
                    {getConversionStatus === 'succeeded' &&
                        <div role="alert" className="alert bg-green-100">
                            <CiCircleCheck size={30} />
                            <span>Success!</span>
                        </div>
                    }

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Result</span>
                        </div>
                        <input value={amountConverted} onChange={() => { }} name="amountConverted" readOnly type="number" placeholder="Result" className="input input-bordered input-primary w-full" />
                    </label>

                </div>
            </div>
        </>
    )
}


export default ConverterForm;