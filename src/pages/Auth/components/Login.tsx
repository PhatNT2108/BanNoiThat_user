import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import clientApi from "../../../api/client-api/rest-client";
import ApiResponse from "../../../model/ApiResponse";
import { setUser } from "../../../redux/features/userSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errAccount, setErrAccount] = useState("");

  const handleLogin = async () => {
    try {
      let data: ApiResponse = await clientApi
        .service("auth/login")
        .authentication(email, password);
      dispatch(setUser(data.result));
      console.log(data);
      if (data.isSuccess) {
        navigate("/");
      }
    } catch {
      setErrAccount("Email hoặc mật khẩu không chính xác.");
    }
  };

  const navigateForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">
          Chào mừng bạn ghé thăm
        </h1>
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
          COME HOME
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Hãy nhập thông tin của bạn
        </p>

        <div className="flex flex-col gap-4">
          {/* Input Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-red-400">
                @
              </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring focus:ring-red-300 focus:outline-none"
              />
            </div>
          </div>
          {/* Input Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-red-400">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring focus:ring-red-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {/* {errPassword && <p className="text-red-500 text-sm mt-1">{errPassword}</p>} */}
            {errAccount && (
              <p className="text-red-500 text-sm mt-2">{errAccount}</p>
            )}
          </div>

          {/* Nút Đăng nhập */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-md font-semibold transition disabled:opacity-70"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {/* Quên mật khẩu */}
          <div className="text-center text-sm text-gray-600">
            Quên mật khẩu?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Khôi phục mật khẩu
            </Link>
          </div>

          {/* Đăng nhập bằng Google */}
          <div className="mt-2">
            <p className="text-center text-gray-600">Hoặc đăng nhập bằng:</p>
            <button
              type="button"
              className="w-full mt-2 p-2 border rounded-lg flex items-center justify-center gap-2"
            >
              <img
                src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                alt="Google"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Chuyển đến trang đăng ký */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Bạn chưa có tài khoản? </span>
            <Link to="/register" className="text-red-700 hover:underline">
              Hãy đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
