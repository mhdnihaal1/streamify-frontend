import { Navigate, Route, Routes } from "react-router";
import { useState } from "react";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
 import Layout from "./components/Layout.jsx";

import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./store/useThemeStore.js";
import axios from "axios";

const App = () => {
  const { isLoading, user: authUser } = useAuthUser(); // renamed for clarity
  const { theme } = useThemeStore();
 const user = localStorage.getItem("user");

      const parsedUser = JSON.parse(user);
  const [selectedGroup, setSelectedGroup] = useState();

  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);

  const handleGroupClick = async (groupId) => {
    try {
       const res = await axios.post("http://localhost:3000/api/auth/orgUser", { orgId: parsedUser?.orgId || null } )
        let filter = res?.data?.org[0]?.groups.filter((val)=> val.id ==groupId )
       setSelectedGroup(filter[0]);  
 
    } catch (err) {
      console.error("Error fetching group:", err);
    }
  };

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        {/* Home / Chat Page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout showSidebar={true} sidebarProps={{ onGroupClick : handleGroupClick }}>
                <HomePage groupi={selectedGroup} userId={authUser?.id} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
 

        {/* Signup Page */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to="/" />
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/" />
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
