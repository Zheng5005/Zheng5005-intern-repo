import { useState } from "react";
import List from "./List";

export default function Form() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setItems((prev) => [...prev, input]);
    setInput("");
  }

  return (
    <div className="mx-auto mt-10 flex max-w-sm flex-col items-center rounded-lg bg-gray-100 p-6 shadow-md">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          name="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Put your text here"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </form>

      <List items={items} />
    </div>
  );
}

