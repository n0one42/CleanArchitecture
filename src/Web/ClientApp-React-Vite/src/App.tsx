import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import "./App.css";
import "./custom.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
