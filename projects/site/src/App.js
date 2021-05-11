import './App.css'
import api from "./api"

function App() {
  return (
    <div className="app">
      <button onClick={() => api.user.register("b@b.com", "abcdefg1")}>Register</button>
    </div>
  )
}

export default App
