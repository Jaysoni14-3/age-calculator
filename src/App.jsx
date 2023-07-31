import './App.css'
import { HashRouter , Routes, Route } from 'react-router-dom'
import AgeCalculator from './Pages/AgeCalculator'
import BmiCalculator from './Pages/BmiCalculator'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <HashRouter >
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/age-calculator' element={<AgeCalculator />} />
          <Route path='/bmi-calculator' element={<BmiCalculator />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
