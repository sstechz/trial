import React, { useState } from "react";
import axios from "axios";
import "./login.scss";

import Img from "../../components/lazyLoadImage/Img";

import { useDispatch } from "react-redux";
import {
  getUserName,
  getUserId,
  getToken,
  removeToken,
} from "../../store/loginSlice";
import jwtDecode from "jwt-decode";

import heroBg from "../../assets/heroBanner.jpg";
import faceBg from "../../assets/face.gif";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button/Button";
import { Fingerprint } from "@mui/icons-material";
import { Box, LinearProgress,} from "@mui/material";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://trail-server-7o2t.onrender.com/login", {
        s_id: id,
        password: password,
      });

      if (response.status == 200) {
        const data = response.data;

        dispatch(getUserName(data.name));
        dispatch(getToken(data.token));
        dispatch(getUserId(id));

        // console.log(data);

        setId("");
        setPassword("");
        setError("");
        setIsLoading(false);

        const decodedToken: any = jwtDecode(data.token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeRemaining = expirationTime - currentTime;

        if (timeRemaining > 0) {
          setTimeout(() => {
            dispatch(removeToken());
          }, timeRemaining);
        }

        navigate("/");
      } else {
        const errorData = response.data;
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="loginBanner">
      <div className="backdrop-img">
        <Img src={heroBg} className={""} />
      </div>

      <div className="loginContainer">
        <div className="title">Log In</div>
        <div className="line" />
        <form onSubmit={handleSubmit}>
          <div className="userAuth">
            <div className="id">
              <div className="idTitle">User ID</div>
              <input
                type="text"
                value={id}
                required
                onChange={(event) => setId(event.target.value)}
              />
            </div>
            <div className="pass">
              <div className="passTitle">Password</div>
              <input
                type="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" variant="contained" color="info">
              Submit
            </Button>
          </div>
          <div className="faceAuth">
            <div className="title">
              <b>OR </b>
              <u>Login with face ID</u>
            </div>
            <div className="faceId">
              <div className="face">
                <Img src={faceBg} className="" />
              </div>
              <Button variant="contained" color="success">
                <Fingerprint />
              </Button>
            </div>
          </div>
        </form>
        <div className="signup">
          Don't have an account ?{" "}
          <a href="/signup">
            <u>SignUp</u>
          </a>
        </div>
      </div>

      {isloading && (
        <Box sx={{ width: "450px", paddingTop: "400px", margin: "0 auto" }}>
          <LinearProgress color="warning" />
        </Box>
      )}
    </div>
  );
};

export default Login;



// -----------------------------------------------------------------------------------------


// import { useState, ChangeEvent, FormEvent } from "react";
// import avatar from "../../assets/Table Tennis/1.jpg";
// import "../signup/signup.scss";
// import axios from "axios";

// const url = "http://localhost:5100/uploads";

// function App() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [id, setId] = useState<string>("");
//   const [base64Data, setBase64Data] = useState<string>("");

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     // Handle form submission or further processing with base64Data
//     // console.log(base64Data);

//     try {
//       await axios.post("http://localhost:5100/upload", { base64Data, id });
//       console.log("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       convertToBase64(file);
//     }
//   };

//   const convertToBase64 = (file: File) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       if (typeof reader.result === "string") {
//         setBase64Data(reader.result);
//       }
//     };
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="custom-file-upload">
//           <img src={base64Data || avatar} alt="" />
//         </label>

//         <input
//           type="file"
//           name="myFile"
//           id="file-upload"
//           accept=".jpeg, .png, .jpg"
//           onChange={handleFileUpload}
//         />

//         <input
//           type="text"
//           name="s_id"
//           placeholder="Enter s_id"
//           onChange={(e) => setId(e.target.value)}
//           value={id}
//         />

//         <h3>Doris Wilder</h3>
//         <span>Designer</span>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;
