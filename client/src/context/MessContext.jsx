import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/axios";
import { useAuth } from "./AuthContext";

const MessContext = createContext();

export const MessProvider = ({ children }) => {
  const [mess, setMess] = useState(null);
  const [members, setMembers] = useState([]);
  const [messLoading, setMessLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchMess = async () => {
      setMessLoading(true);
      try {
        const res = await API.get("/mess/mine", { withCredentials: true });
        setMess(res.data.mess);
        setMembers(res.data.members || []);
      } catch (err) {
        console.error("MessContext error:", err.response || err);
      } finally {
        setMessLoading(false);
      }
    };

    fetchMess();
  }, [user]);

  return (
    <MessContext.Provider
      value={{ mess, setMess, members, setMembers, messLoading }}
    >
      {children}
    </MessContext.Provider>
  );
};

export const useMess = () => useContext(MessContext);
