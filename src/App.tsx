import './App.css';

import { useAppSelector, useAppDispatch } from './app/hook';
import { decrement, increment } from './features/counter/counterSlice';

function App() {

  const { value } = useAppSelector((state) => state.counter);

  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increment());
  }

  const handleDecrease = () => {
    dispatch(decrement());
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p>Omg counter {value}</p>

      <div className='flex flex-row justify-center items-center gap-5'>
        <button className='mt-10 btn btn-primary' onClick={handleIncrease}>Increase counter</button>
        <button className='mt-10 btn btn-primary' onClick={handleDecrease}>Decrease counter</button>
      </div>

    </div>
  )
}

export default App
