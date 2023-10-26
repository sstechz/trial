import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { Header, Contact } from "./components";

import { Home } from "./pages";
import { Login } from "./pages";
import { Payment } from "./pages";
import { PageNotFound } from "./pages";
import { Details } from "./pages";
import { Signup } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { destroyLogin } from "./store/loginSlice";
import { destroyRegistered } from "./store/registeredSlice";
import { RootState } from "./store/store";

const App = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === "") {
      dispatch(destroyLogin());
      dispatch(destroyRegistered());
      // alert("Session Expired");
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:sports" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* treat contact as footer */}
      <Contact />
    </BrowserRouter>
  );
};

export default App;
