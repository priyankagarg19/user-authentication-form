import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("*Username is Required!*"),
    password: yup.string().required("*Password is Required!*"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
    if (
      storedUser &&
      storedUser.fullName === data.fullName &&
      storedUser.password === data.password
    ) {
      console.log("Login successful");
      alert("Login successful");
      navigate("/home");
    } else {
      console.log("Invalid credentials");
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="loginPage">
        <div className="login-box">
          <h1>Login</h1>
          <div
            className="input-container"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className="login"
              type="text"
              placeholder="Username"
              {...register("fullName")}
            />
            <FaUser className="fa-icon" />
          </div>

          <p className="error">{errors.fullName?.message}</p>
          <div
            className="input-container"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className="login"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <FaLock className="fa-icon" />
          </div>
          <p className="error">{errors.password?.message}</p>
          <div className="rem-forget">
            <label>
              <input type="checkbox" {...register("rememberMe")} />
              Remember me
            </label>
            <a href="#">
              <b>Forgot Password?</b>
            </a>
          </div>
          <input className="login" type="submit" value="Login" />
          <div className="register">
            Don't have an account?
            <button
              className="changePage"
              type="button"
              onClick={() => navigate("/register")}
            >
              <b>Register</b>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
