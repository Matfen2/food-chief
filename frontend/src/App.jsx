import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importation des pages
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
