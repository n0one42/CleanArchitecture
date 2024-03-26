import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import AppRoutes from "./AppRoutes";
import "./custom.css";

function App() {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
}

export default App;
