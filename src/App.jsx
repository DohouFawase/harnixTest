import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./page/home";
import Home from "./page/dashbord/view/homePage";
import Feedback from "./page/dashbord/view/feedback";

import Admin from "./page/layout/admin";
import Client from "./page/layout/client";
import Register from "./page/auth/register";
import Login from "./page/auth/login";
import ProtectedRoute from "./components/auth/content/protecteRoute";
function App() {
  return (
    <>
      <Routes>
        {/* Home Page Route */}
        <Route element={<Client />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/sign-up" element={<Register/>}/>
        </Route>

        {/* Dashboard Routes */}
        <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                            <Admin />

                      </ProtectedRoute>
                        
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="feedback" element={<Feedback />} />
                </Route>
      </Routes>
    </>
  );
}

export default App;
