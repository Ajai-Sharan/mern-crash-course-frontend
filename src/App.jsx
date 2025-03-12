import { Box} from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
import { Toaster } from './components/ui/toaster'


function App() {  
  

  return (
    <>
      <Box minH={"100vh"} >
          <Navbar></Navbar>
          <Toaster />
          <Routes>
              <Route path='/' element={<HomePage></HomePage>}></Route>
              <Route path='/create' element={<CreatePage></CreatePage>}></Route>
          </Routes>

          {/* <Demo></Demo> */}

          {/* <ProductCard></ProductCard> */}

      </Box>
    </>
  )
}

export default App
