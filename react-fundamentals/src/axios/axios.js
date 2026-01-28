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
