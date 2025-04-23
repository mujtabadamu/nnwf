import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../common/input/input";
import Button from "../../common/button/button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    navigate("/");
  };

  return (
    <Container>
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-gray-500">Join us today!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="my-3">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  error={errors.email?.message}
                  onChange={(e) => {
                    const emailValue = e.target.value.toLowerCase();
                    setValue("email", emailValue);
                    clearErrors("email");
                  }}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  {...register("password")}
                  error={errors.password?.message}
                  onChange={(e) => {
                    setValue("password", e.target.value);
                    clearErrors("password");
                  }}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  onChange={(e) => {
                    setValue("confirmPassword", e.target.value);
                    clearErrors("confirmPassword");
                  }}
                />
              </div>
            </div>

            <Button fullWidth type="submit">
              Register
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#143085] hover:text-blue-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;
