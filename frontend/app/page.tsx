import Home from '@/components/Home'
import React from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);


const App = () => {
  return (
    <>
      <Home />
    </>
  )
}

export default App