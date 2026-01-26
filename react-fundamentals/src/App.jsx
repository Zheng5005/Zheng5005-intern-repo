import { Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
