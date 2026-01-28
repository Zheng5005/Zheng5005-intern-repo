## Why is it useful to create a reusable Axios instance?
It gives you a centralized way to configure your requests, for example if you want all your requests to have a timeout, you'll need to write the same configuration every single time you want to use axios, but with an instance, you can write the base configuration, and then import it into the file/component you need it
## How does intercepting requests help with authentication?
By letting you add an authentication token before the request is send, so this way you don't to worry about adding the token in every request

It also helps the refresh token process and handling expire tokens, for example if the token is expired, it can automatically logout the user.
## What happens if an API request times out, and how can you handle it?
If the request timesout, axios will abort the request and will return an error (it also doesn't recieve any response)

You can handle it by configure your axios instance with a timeout:
```js
const api = axios.create({
  timeout: 5000,
});
```

Then you can hanlde the error like this:
```js
try {
  await api.get("/data");
} catch (error) {
  if (error.code === "ECONNABORTED") {
    showToast("Request timed out. Please try again.");
  }
}
```

You can also improve the UX expirence by having a retry logic (using an interceptor):
```js
api.interceptors.response.use(
  res => res,
  async error => {
    if (error.code === "ECONNABORTED") {
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);
```
## Tasks
I ran the following command:
`npm install axios` 

Then I create the axios instance and the interceptor in the same file (axios.js):
```axios.js
import axios from "axios"

function generateRequestId() {
  return crypto.randomUUID()
}

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
  headers: {
    Accept: "*/*"
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["X-Request-ID"] = generateRequestId()

    const token = localStorage.getItem("authToken")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, 
  (error) => {
    console.log("Request error", error)
    return Promise.reject(error)
  }
)

export default axiosInstance
```

And this is a componet that makes the POST request, and it also redirects to the "/profile" route in case the request is succesful:
```AxiosComponent.jsx
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
```
