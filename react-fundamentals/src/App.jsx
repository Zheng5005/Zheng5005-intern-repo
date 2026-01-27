import { Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import Profile from './pages/Profile'
import EffectComponent from './components/EffectComponent'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/useEffect" element={<EffectComponent />} />
    </Routes>
  )
}

export default App
