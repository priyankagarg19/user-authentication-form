import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("*Username is Required!*"),
    email: yup
      .string()
      .email("*Enter valid email*")
      .required("*Email is Required!*"),
    password: yup.string().min(4).max(10).required("*Password is Required!*"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password does not matches")
      .required("Confirm your Password"),
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
    localStorage.setItem("user", JSON.stringify(data)); // Save user data to localStorage
    console.log("User registered", data);
    alert("User registered Successfully");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="loginPage">
        <div className="login-box">
          <h1>Register</h1>
          {/* USERNAME */}
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

          {/* EMAIL */}
          <div
            className="input-container"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className="login"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            <FaEnvelope className="fa-icon" />
          </div>
          <p className="error">{errors.email?.message}</p>

          {/* PASSWORD */}
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
          {/* CONFIRM PASSWORD */}
          <div
            className="input-container"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              className="login"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <FaLock className="fa-icon" />
          </div>
          <p className="error">{errors.confirmPassword?.message}</p>

          <input className="login" type="submit" value="Register" />
          <div className="register">
            Already have an account?
            <button
              className="changePage"
              type="button"
              onClick={() => navigate("/login")}
            >
              <b>Login</b>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
