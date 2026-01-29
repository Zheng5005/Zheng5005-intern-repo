import { useEffect, useState } from "react";

export default function MockAPIComponent() {
  const [data, setData] = useState(null);

  async function fetchAPI(signal) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        { signal }
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch failed:", error);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    return () => {
      controller.abort(); // cleanup
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {data && (
        <div className="rounded-md bg-gray-100 p-4">
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Completed: {String(data.completed)}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => fetchAPI()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Fetch Data
      </button>
    </div>
  );
}

