"use client";
import { useState, useEffect } from "react";

// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/auth/UsersAPISlice";
import { setCredentials } from "../redux/slices/auth/AuthSlice";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cn } from "@/libs/utils";

interface FormData {
  firstName: string;
  age: number;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const {
  //   register:customRegister,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // })
  // const onSubmit = (data:FormData) => console.log(data)
  const dispatch = useDispatch();
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

const handleFacebookLogin = async () => {
  window.open("http://localhost:5000/api/users/facebook", "_self");
};

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const googleSignUp = () => {
    window.open("http://localhost:5000/api/users/google", "_self");
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        router.push("/home");
      } catch (err: any) {
        toast.error(err?.message || err.error);
      }
    }
  };
  const Logo = ({ name, img }: { name: string; img: string }) => {
    return (
      <div className={cn("h-6 w-6 cursor-pointer")}>
        <img src={img} alt={name} />
      </div>
    );
  };

  return (
    <div className="flex min-h-full flex-1">
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
              <h1>Register</h1>
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="my-2">
                  <label htmlFor="name"
                  className="block text-sm font-medium leading-6 text-white-900"
                  >Name</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      value={name}
                      className="block w-half rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="my-2">
                  <label htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white-900"
                  >Email Address</label>
                  <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    className="block w-half rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={e => setEmail(e.target.value)}
                  />
                  </div>
                </div>

                <div className="my-2">
                  <label htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white-900"
                  >Password</label>
                  <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    className="block w-half rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={e => setPassword(e.target.value)}
                  />
                  </div>
                </div>

                <div className="my-2">
                  <label htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-white-900"
                  >Confirm Password</label>
                  <div className="mt-2">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    className="block w-half rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  </div>
                </div>

                <button type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Register
                </button>

                {isLoading && <div>Loading...</div>}
              </form>
              <div className="mt-10">
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                  onClick={googleSignUp}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                >
                <Logo name={"Google"} img={"https://cdn.simpleicons.org/google/000/fff"}  />
                </button>
                <button
                  onClick={handleFacebookLogin}
                >
                <Logo name={"Facebook"} img={"https://cdn.simpleicons.org/facebook/000/fff"}  />

                  <span className="text-sm font-semibold leading-6">Facebook</span>
                </button>

                <a href="#" className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                  <span className="text-sm font-semibold leading-6">Apple</span>
                </a>
              </div>
              </div>

              <div className="py-3">
              <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white mt-6 px-6 text-gray-900">
                      <a href="/login">Already have an account? Login</a>
                    </span>
                  </div>
              </div>
            </div>
            </div>
            </div>
            </div>
  );
};

export default RegisterScreen;
