import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/layout";
import { HomePage } from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./auth/ProtectedRoute";


const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout showHero={true}><HomePage /></Layout>} />
        <Route path="/auth-callback" element={ <AuthCallbackPage/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      </>
   )
}

export default AppRoute;