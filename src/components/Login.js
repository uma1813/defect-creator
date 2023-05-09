import "../App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VALID_USER } from "../redux/actions/actionConstants";

const users = [
  {
    id: 1,
    username: "uma",
    password: "123",
  },
  {
    id: 2,
    username: "vikas",
    password: "123",
  },
];

export const Login = () => {
  const [cred, setCred] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    const findUser = users?.find(
      (user) =>
        user?.username === cred?.username && user?.password === cred?.password
    );
    if (findUser) {
      dispatch({
        type: VALID_USER,
        payload: {
          status: true,
          userId: findUser?.id,
          username: findUser?.username,
        },
      });
      localStorage.setItem("valid", true);
      navigate("/defect");
    } else {
      alert("User does not exist");
    }
  };

  return (
    <div className="login-container">
      <h2>Defect Creator</h2>
      <div>
        <div className="login">Login</div>
        <div className="field-wrapper">
          <label>Username</label>
          <input
            value={cred?.username}
            onChange={(e) => setCred({ ...cred, username: e.target.value })}
          />
        </div>
        <div className="field-wrapper">
          <label>Password</label>
          <input
            type="password"
            value={cred?.password}
            onChange={(e) => setCred({ ...cred, password: e.target.value })}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={login}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};
