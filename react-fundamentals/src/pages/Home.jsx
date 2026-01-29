import { Link } from "react-router";
import Counter from "../components/Counter";
import HelloWorld from "../components/HelloWorld";
import AxiosComponent from "../components/AxiosComponent";

export default function HomePage() {
  return (
    <>
      <Link to="/profile">
        <button 
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer m-2" >
          Profile Page
        </button>
      </Link>
      <Link to="/useEffect">
        <button 
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer" >
          useEffect component Page
        </button>
      </Link>
      <Link to="/Formik">
        <button 
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer" >
          Formik component
        </button>
      </Link>
      <HelloWorld name={"Focus Bear"}/>
      <Counter />
      <AxiosComponent />
    </>
  )
}
