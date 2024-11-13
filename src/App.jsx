import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EMICalculator from './component/EMICalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
     <EMICalculator/>
    </div>
  )
}

export default App
