import { Link } from "react-router";
import Form from "../components/Issue28/Form";

export default function Profile() {
  return (
    <>
      <Link to="/">
        <button 
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer" >
          Home Page
        </button>
      </Link>
      <Form />
    </>
  )
}
