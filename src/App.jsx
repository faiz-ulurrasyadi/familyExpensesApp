import './App.css'
import Header from './components/Header.jsx'
import AddExpenses from './components/AddExpenses.jsx'
import History from './components/History.jsx'
import Summary from './components/Summary.jsx'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className="family-expenses-app">
          <Header />
        </div>
        <Routes>
          <Route path="/add-expense" element={<AddExpenses />} />
          <Route path="/history" element={<History />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
