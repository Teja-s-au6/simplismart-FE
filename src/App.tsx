import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Models from "./pages/Models";
import ModelDetailPage from "./pages/ModelDetailPage";

const App: React.FunctionComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Models />} />
          <Route path="/model/:id" element={<ModelDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
