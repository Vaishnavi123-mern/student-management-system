
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EditStudent from "./pages/EditStudent";
import AddStudent from "./pages/AddStudent";

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
        <Route
          path="/add"
          element={<AddStudent />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;