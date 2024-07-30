import HomeLayout from "./HomeLayout/HomeLayout";
import { Users } from "../../interface/users";
import { instace } from "../../api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../admin/auth/Login";
import { useAuth } from "../../ConText/AuthContext";

const LoginHome = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const fetchUsers = async () => {
    const { data } = await instace.get(`/auth/login`);
    setUsers(data.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const { login: contextLogin, isAdmin } = useAuth();
  const nav = useNavigate();
  const onSubmit = async (data: Users) => {
    try {
      const res = await instace.post(`/auth/login`, data);
      contextLogin(res.data.accessToken, res.data.user);
      if (confirm("Đăng nhập thành công!")) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response.data.message ||
          "Đăng nhập thất bại ! Mật khẩu không đúng "
      );
    }
  };
  return (
    <div>
      <HomeLayout>
        <Login onSubmit={onSubmit}></Login>
      </HomeLayout>
    </div>
  );
};

export default LoginHome;
