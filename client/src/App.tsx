import { RegisterPage } from "./components/pages/RegisterPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="items-center justify-center ">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
