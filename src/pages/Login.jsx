import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import googleIcon from '../assets/images/google.png';
import { auth } from "../firebase.config";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { GlobalContext } from "../context/ContextProvider";
import { axiosInstance } from "../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const {setUser} = useContext(GlobalContext);
  const [showPass, setShowPass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const prevState = useLocation()?.state;
  const navigate = useNavigate();

  const loginFetcher = async(email) => {
    const res = await axiosInstance.post('/login', {email});
    return res.data;
  }
  const {mutate, data: resData, isSuccess, isError, error} = useMutation({mutationFn: loginFetcher});
  if (isSuccess) {
    console.log(resData);
  }
  if (isError) {
    toast.error(error.message);
  }
 
  const handleSubmit = e => {
    e.preventDefault();

    // Get values
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mutate(email);
        setUser(userCredential.user)
        toast.success("Login Successful !!!");
        if (prevState) {
          scrollTo(0, 0);
          navigate(prevState);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }
  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        mutate(userCredential?.user?.email)
        setUser(userCredential.user)
        toast.success('Login Successful !!!');
        if (prevState) {
          scrollTo(0, 0);
          navigate(prevState);
        }
      })
      .catch(error => {
        toast.error(error.code);
      })
  }
  const handlePassOnChange = e => {
    const password = e.target.value;
    if (password) setShowEye(true);
    else setShowEye(false);
  }

  return (
    <main>
      <Helmet>
        <title>Login - StudyHub</title>
      </Helmet>

      <section>
        <div className="container">
          <div className="mt-10 max-w-[500px] mx-auto bg-gray-200 px-6 py-10 rounded-lg">
            <h2 className="text-3xl text-primary font-semibold text-center mb-10">Login your account</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="block font-semibold mb-2">Email Address</label>
              <input className="input w-full border-gray-300 mb-5" type="email" name="email" id="email" placeholder="Enter your email address" required />
              <label htmlFor="password" className="block font-semibold mb-2">Password</label>
              <div className="relative">
                <input className="input w-full border-gray-300" onChange={handlePassOnChange} type={showPass ? "text": "password"} name="password" id="password" placeholder="Enter your password" required />
                {
                  showEye ? showPass ? <AiFillEyeInvisible className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer" onClick={() => setShowPass(!showPass)} /> : <AiFillEye className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer" onClick={() => setShowPass(!showPass)} /> : ''
                }
              </div>
              <button type="submit" className="btn btn-primary btn-block !rounded-md mt-5">Login</button>
            </form>
            <p className="font-semibold text-center mt-6">Don&apos;t have an account? <Link to='/register' className="text-primary" onClick={() => scrollTo(0, 0)} state={prevState}>Register</Link></p>

            <div className="flex justify-stretch items-center gap-6 my-6 w-4/5 mx-auto">
              <span className="h-[2px] bg-black flex-1"></span>
              <span className="text-[18px] font-medium">Or</span>
              <span className="h-[2px] bg-black flex-1"></span>
            </div>

            <button className="flex justify-center items-center gap-2 border-2 border-black px-4 py-2 rounded-full w-full font-medium" onClick={googleLogin}>
              <img className="w-6" src={googleIcon} alt="Google Icon" /> Login in with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;