import { useState } from 'react'
import Bujjithalli from './components/Bujjithalli'
// import ChalapathifortuneUpdated from './components/ChalapathifortuneUpdated'
// import ChalapathiFortune from './components/ChalapathiFortune'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <ChalapathiFortune/> */}
      {/* <KarthikFortune/> */}
      {/* <ChalapathifortuneUpdated/> */}
      <Bujjithalli/>
    </div>
  )
}

export default App
