import { Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import Profile from './pages/Profile'
import EffectComponent from './components/EffectComponent'
import SlowAndOptimized from './components/SlowAndOptimized'
import Parent from './components/Issue22/ParentComponent'
import BuggyComponent from './components/BuggyComponent'
import FormikComponent from './components/FormikComponent'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/useEffect" element={<EffectComponent />} />
      <Route path="/useMemo" element={<SlowAndOptimized />} />
      <Route path="/useCallback" element={<Parent />} />
      <Route path="/timer" element={<BuggyComponent />} />
      <Route path="/Formik" element={<FormikComponent />} />
    </Routes>
  )
}

export default App
