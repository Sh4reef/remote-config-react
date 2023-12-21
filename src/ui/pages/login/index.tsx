import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input } from "antd";
import AuthModel from "../../../models/auth.model";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const mutationLogin = useMutation({
    mutationFn: AuthModel.login,
  });

  const handleFinish: FormProps["onFinish"] = async (values) => {
    await mutationLogin.mutateAsync(values);
    navigate(state?.from || "/projects");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate, state]);

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input />
      </Form.Item>
      <Button htmlType="submit">Login</Button>
    </Form>
  );
};

export default LoginPage;
