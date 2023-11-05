import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authContext } from "./authContext";
import { auth_api } from "../utils/axios";

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    rootFolder: "",
  });

  const fetchDetails = async () => {
    const response = await auth_api.get("/user/info");
    const data = response.data;

    if (data.status_code == 200) {
      const u = data.data;

      setUser({
        username: u.username,
        email: u.email,
        rootFolder: u.rootFolder,
      });
    }
  };
  useEffect(() => {
    fetchDetails();
  },[]);
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
