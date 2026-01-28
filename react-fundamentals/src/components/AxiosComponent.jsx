import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../axios/axios";

export default function AxiosComponent() {
  const navigate = useNavigate()
  const abortControllerRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const res = await axiosInstance.post(
        "/posts",
        {
          title: "Test",
          body: "This is a test",
          userId: 1,
        },
        {
          signal: controller.signal
        }
      )
      console.log(res)

      if (res.status === 201) {
        navigate("/profile")
      }
    } catch (error) {
      if (error.name === "CanceledError") {
        console.warn("Request was cancelled");
        return;
      }

      if (error.code === "ECONNABORTED") {
        console.error("Request timed out");
      }

      setError("Something went wrong.");
      console.error("API error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return (
    <div className="max-w-md space-y-4 rounded bg-gray-100 p-6 shadow">
      <h2 className="text-lg font-semibold">Create Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
