
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/edit"
          element={<EditStudent />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;