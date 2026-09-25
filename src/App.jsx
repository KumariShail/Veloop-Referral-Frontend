import { useState } from "react";
import ReferralPage from "./pages/ReferralPage";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  function handleLogin() {
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <ReferralPage />;
}

export default App;