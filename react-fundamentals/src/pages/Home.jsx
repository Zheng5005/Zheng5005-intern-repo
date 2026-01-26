import { Link } from "react-router";
import Counter from "../components/Counter";
import HelloWorld from "../components/HelloWorld";

export default function HomePage() {
  return (
    <>
      <Link to="/profile">
        <button 
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer" >
          Profile Page
        </button>
      </Link>
      <HelloWorld name={"Focus Bear"}/>
      <Counter />
    </>
  )
}
