import { Navigate, Route, Routes } from "react-router";
import { useState } from "react";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./components/Layout.jsx";
import toast from "react-hot-toast";

import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { api } from "./service/api.js";
const App = () => {
  const { loading, user: authUser } = useAuthUser(); // renamed for clarity
  const { theme } = useThemeStore();
  const user = localStorage.getItem("user");

  const parsedUser = JSON.parse(user);
  const [selectedGroup, setSelectedGroup] = useState();

  if (loading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);

  const handleGroupClick = async (groupId) => {
    try {
      const res = await api.post("/auth/orgUser", {
        orgId: parsedUser?.orgId || null,
      });
      let filter = res?.data?.org[0]?.groups.filter((val) => val.id == groupId);
      setSelectedGroup(filter[0]);
     } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
         <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout
                showSidebar={true}
                sidebarProps={{ onGroupClick: handleGroupClick }}
              >
                <HomePage groupi={selectedGroup} userId={authUser?.id} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />
         <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
