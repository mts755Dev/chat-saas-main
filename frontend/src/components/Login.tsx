"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLoginMutation, useLoginMutation } from "../redux/slices/auth/UsersAPISlice";
import { setCredentials } from "../redux/slices/auth/AuthSlice";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { cn } from "../libs/utils";
import axios from "axios";

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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const resolver = yupResolver<FormData>(schema);

  const dispatch = useDispatch();
  const router = useRouter();

    const handleGoogleLogin = async () => {
        window.open("http://localhost:5000/api/users/google", "_self");
    };
    const handleFacebookLogin = async () => {
      window.open("http://localhost:5000/api/users/facebook", "_self");
  };

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

useEffect(() => {
    if (userInfo) {
      router.push("/home");
    }
  }, [router, userInfo]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push("/home");
    } catch (err: any) {
      toast.error(err?.data?.message);
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
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                width={48}
                height={48}
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-white-500">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Start a 14 day free trial
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={submitHandler} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-white-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-white-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={handleFacebookLogin}
                >
                <Logo name={"Facebook"} img={"https://cdn.simpleicons.org/facebook/000/fff"}  />

                  <span className="text-sm font-semibold leading-6">Facebook</span>
                </button>
                <button
                  onClick={handleGoogleLogin}
                >
                <Logo name={"Google"} img={"https://cdn.simpleicons.org/google/000/fff"}  />

                  <span className="text-sm font-semibold leading-6">Google</span>
                </button>

                <button
                >
                <Logo name={"Apple"} img={"https://cdn.simpleicons.org/apple/000/fff"}  />

                  <span className="text-sm font-semibold leading-6">Apple</span>
                </button>
                </div>

                <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white mt-6 px-6 text-gray-900">
                      <a href="/register">Don't have an account? Register</a>
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            width={700}
            height={700}
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
