

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bgImg from '../../assets/images/login.png';
import Loader from '../../components/shared/Loader';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import logo from '/logo.png';


const Login = () => {

    const { signInUser, user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // custom loader for login
    const [customLoader, setCustomLoader] = useState(false);

    // password show
    const [passShow, setPassShow] = useState(false);

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const whereTo = location?.state || '/dashboard';


    // React hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;

        await signInUser(email, password)
            .then(async result => {

                setCustomLoader(true);
                // console.log(result.user)


                const loggedUser = { email };
                axiosSecure.post(`/jwt`, loggedUser)
                // .then(res => {
                //     console.log(res.data)
                // })
                toast.success("Logged in successful!🎉", { autoClose: 2000, theme: "colored" })

                if (result?.user) {
                    setCustomLoader(false);
                    navigate(whereTo, { replace: true });
                }

            })
            .catch(error => {

                setCustomLoader(false);
                const errorCode = error.code;
                // Remove 'auth/' prefix and '-' characters
                const cleanedErrorCode = errorCode.replace(/^auth\/|-/g, ' ');
                const words = cleanedErrorCode.split('-');
                const capitalizedWords = words.map(word => word.charAt(1).toUpperCase() + word.slice(2));
                const message = capitalizedWords.join(' ');
                toast.error(`${message}`, { autoClose: 5000, theme: "colored" })

            })
    }



    // sitting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Custom loader
    if (customLoader || timeLoading) {
        return <Loader />;
    }

    if (user) {
        // toast.info('You are already Logged in!', { autoClose: 3000, theme: "colored" });
        return <Navigate to='/' state={whereTo} />
    }


    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Login</title>
            </Helmet>

            <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-base-100 rounded-lg shadow-lg  lg:max-w-4xl  border border-base-300'>
                <div
                    className='hidden bg-cover bg-center lg:block lg:w-1/2'
                    style={{
                        backgroundImage: `url(${bgImg})`,
                    }}
                ></div>

                <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                    <div className='flex justify-center mx-auto'>
                        <img
                            className='w-auto md:h-12  h-8 rounded'
                            src={logo}
                            alt=''
                        />
                    </div>

                    <p className='mt-3 text-xl text-center '>
                        Welcome back!
                    </p>

                    

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>

                        <div className='text-xs text-center uppercase  '>
                            login with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium  '
                                htmlFor='LoggingEmailAddress'
                            >
                                Email Address
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='email'
                                className='block w-full px-4 py-2 input input-bordered rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email'
                                {...register("email", { required: true })}
                            />
                            <div className="mt-1 animate-pulse">
                                {errors.email && <span className="text-red-500">Please fill up Email field</span>}
                            </div>
                        </div>

                        <div className='mt-4 relative'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium  '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                name='password'
                                className='block w-full px-4 py-2 input input-bordered rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type={passShow ? "text" : "password"}
                                {...register("password", { required: true })}
                            />
                            <span
                                onClick={() => setPassShow(!passShow)}
                                className="cursor-pointer absolute top-11 right-4"
                            >
                                {
                                    passShow ? <TfiEye /> : <RxEyeClosed />
                                }
                            </span>
                            <div className="mt-1 animate-pulse">
                                {errors.password && <span className="text-red-500">Please fill up Password field</span>}
                            </div>
                        </div>
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>

                        <Link
                            to='/registration'
                            className='text-xs font-semibold text-rose-700 uppercase  hover:underline animate-pulse'
                        >
                            Register
                        </Link>

                        <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login