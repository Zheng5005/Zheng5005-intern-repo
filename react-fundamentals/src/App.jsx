import { Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import Profile from './pages/Profile'
import EffectComponent from './components/EffectComponent'
import SlowAndOptimized from './components/SlowAndOptimized'
import Parent from './components/Issue22/ParentComponent'
import BuggyComponent from './components/BuggyComponent'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/useEffect" element={<EffectComponent />} />
      <Route path="/useMemo" element={<SlowAndOptimized />} />
      <Route path="/useCallback" element={<Parent />} />
      <Route path="/timer" element={<BuggyComponent />} />
    </Routes>
  )
}

export default App
