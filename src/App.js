import AuthPage from "./components/authPage";

import { Routes, Route,Link } from "react-router-dom";
import Dashboard from "./components/dashboard";

function App() {

  return (
    <div className="App">
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
      </ul> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
