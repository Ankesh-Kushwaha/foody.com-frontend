import { useCreateMyUser } from "@/api/MyUserapi";
import { useAuth0 } from "@auth0/auth0-react"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthCallbackPage = () => {
  const naviagte = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    console.log("USER:", user);
    if (user?.sub && user?.email && user?.name && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email, userName: user.name });
      hasCreatedUser.current = true;
    }
    naviagte("/");
    
  }, [createUser, naviagte, user])

  return <>Loading....</>
}

export default AuthCallbackPage
