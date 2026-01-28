import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/counterSlice";

export default function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
      <p className="text-lg text-gray-800">
        <Trans 
          i18nKey="counterText" 
          count={count} 
          components={{
            1: <span className="font-semibold" />
          }} />
      </p>

      <button
        type="button"
        onClick={() => dispatch(increment())}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
      >
        Click me
      </button>
    </div>
  );
}

