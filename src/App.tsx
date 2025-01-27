import Layout from "./Layout";
import LoginManager from "./components/Login/LoginManager";
import { Navigate, Route, Routes } from "react-router-dom";
import { ReactNode } from 'react';
import DraggableCards from "./components/Draggable";

const App = () => {
  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const userName = localStorage.getItem("loggedInUser");
    return userName ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
      <Route
        element={<LoginManager />}
        path="/login"
      />
       <Route
        element={<DraggableCards />}
        path="/test"
      />
    </Routes>
  );
};

export default App;
