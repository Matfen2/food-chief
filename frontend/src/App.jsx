import Home from './pages/Home'
import Recipe from './pages/Recipe'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} /> à faire plus tard
        {/* <Route path="/dashboard" element={<Dashboard />} /> à faire plus tard*/}
      </Routes>
    </Router>
  )
}

export default App

