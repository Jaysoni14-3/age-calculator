import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import AgeCalculator from './Pages/AgeCalculator'
import BmiCalculator from './Pages/BmiCalculator'
import Home from './Pages/Home'
import Calculator from './Pages/Calculator'
import CurrencyConverter from './Pages/CurrencyConverter'

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          {/* Router error  */}
          <Route index path='/' element={<Home />} />
          <Route path='/age-calculator' element={<AgeCalculator />} />
          <Route path='/bmi-calculator' element={<BmiCalculator />} />
          <Route path='/calculator' element={<Calculator />} />
          <Route path='/currency-converter' element={<CurrencyConverter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
