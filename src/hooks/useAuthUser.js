import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/me";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axios.get(API_URL, {
          withCredentials: true,
            headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
   // important for cookies / session
        });

        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        setError(err.response?.data?.message || "Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
};

export default useAuthUser;
