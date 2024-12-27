import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { GlobalContext } from "../context/ContextProvider";
import { axiosInstance } from "../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Register = () => {
  const { setUser } = useContext(GlobalContext);
  const [showPass, setShowPass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const prevState = useLocation()?.state;
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosInstance.post('/login', { email });
      return res.data;
    },
    onSuccess: (data) => console.log(data),
    onError: (error) => toast.error(error.message)
  });

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: data.photo
        })
          .then(() => {
            mutate(data.email);
            setUser(userCredential.user);
            toast.success("Registration Successful!");
            if (prevState) {
              scrollTo(0, 0);
              navigate(prevState);
            }
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        mutate(userCredential?.user?.email);
        setUser(userCredential.user);
        toast.success('Login Successful!');
        if (prevState) {
          scrollTo(0, 0);
          navigate(prevState);
        }
      })
      .catch(error => toast.error(error.code));
  };

  const handlePassOnChange = e => {
    setIsActive(false);
    setErrorMsg("");
    const password = e.target.value;
    setShowEye(!!password);

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      setErrorMsg("At least one uppercase character required");
    } else if (!/[0-9]/.test(password)) {
      setErrorMsg("At least one number required");
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setErrorMsg("At least one special character required");
    } else {
      setIsActive(true);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <Helmet>
        <title>Register - StudyHub</title>
      </Helmet>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-900">Create an account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Start your journey with us</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="photo">
                Profile Photo URL
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="photo"
                name="photo"
                type="url"
                placeholder="https://example.com/photo.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  onChange={handlePassOnChange}
                  placeholder="••••••••"
                  required
                />
                {showEye && (
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                )}
              </div>
              {errorMsg && (
                <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms_and_conditions"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <Link className="text-blue-600 hover:text-blue-500" to="/terms">
                  Terms of Service
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isActive}
              className="w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={googleLogin}
            className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <img src="/api/placeholder/24/24" alt="Google" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => scrollTo(0, 0)}
              state={prevState}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;