
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bgImg from '../../assets/images/register.png';
import Loader from '../../components/shared/Loader';
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils/imageUpload";
import useAxiosCommon from './../../hooks/useAxiosCommon';
import logo from '/logo.png';


const Register = () => {

    const { createUser, user, updateUserProfile, loggedOut, loading, setLoading } = useAuth();
    const axiosCommon = useAxiosCommon();


    // custom loader for registration
    const [customLoader, setCustomLoader] = useState(false);

    // password and confirm pass show
    const [passShow, setPassShow] = useState('');
    const [cpassShow, setCpassShow] = useState('');

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const whereTo = location?.state || '/';

    // react form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const pass = watch('password');


    // react form with state changes and updates state when the state changes
    const onSubmit = async (data, e) => {
        const { email, password, name } = data;

        const image = e.target.avatar.files[0]


        try {
            setLoading(true);

            // upload image and get image url
            const image_url = await imageUpload(image);

            const userInfo = { email, name, image_url };

            // insert user data in mongo DB
            await axiosCommon.post('/users', userInfo)


            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()[\]{}|\\;:'",.<>/?~])(?=.{6,})/.test(password)) {

                // console.log(watch('password'))
                return toast.warning(
                    `Password must contain 
                    an Uppercase, 
                    a Lowercase, 
                    a numeric character, 
                    a special character 
                    and Length must be at least 6 characters long!`,
                    { autoClose: 4000, theme: "colored" })
            }

            // create user profile and update user
            createUser(email, password)
                .then(() => {
                    // Add or update other data except email and pass
                    updateUserProfile(name, image_url)
                        .then(async () => {

                            setCustomLoader(true)

                            // Profile updated!
                            toast.success("Registration successful!🎉", { autoClose: 3000, theme: "colored" })
                            toast.info("Try to Login! 😁", { autoClose: 5000, theme: "colored" })

                            // loader
                            setCustomLoader(false)
                            loggedOut();
                            navigate('/login')

                        }).catch((errors) => {

                            setCustomLoader(false)
                            setLoading(false)
                            // An error occurred
                            const errorMessage = errors.message.split(':')[1].split('(')[0].trim();

                            toast.error(errorMessage, { autoClose: 3000, theme: "colored" });
                            navigate('/registration');
                        });

                    // console.log(result)

                })
                .catch(errors => {

                    setCustomLoader(false)
                    setLoading(false)
                    // An error occurred                
                    const errorCode = errors.code;
                    // Remove 'auth/' prefix and '-' characters
                    const cleanedErrorCode = errorCode.replace(/^auth\/|-/g, ' ');
                    const words = cleanedErrorCode.split('-');
                    const capitalizedWords = words.map(word => word.charAt(1).toUpperCase() + word.slice(2));
                    const message = capitalizedWords.join(' ');

                    toast.error(`${message}`, { autoClose: 5000, theme: "colored" })
                    navigate('/registration');
                })
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setLoading(false)
        }

    }


    // Custom loader
    if (customLoader || loading) {
        return <Loader />;
    }

    if (user) {
        return <Navigate to='/' state={whereTo} />
    }



    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Register</title>
            </Helmet>

            <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-base-100 rounded-lg shadow-lg  lg:max-w-4xl  border border-base-300'>
                <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                    <div className='flex justify-center mx-auto'>
                        <img
                            className='w-auto md:h-12  h-8 rounded'
                            src={logo}
                            alt=''
                        />
                    </div>

                    <p className='mt-3 text-xl text-center  '>
                        Get Your Free Account Now!
                    </p>


                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>

                        <div className='text-xs text-center uppercase '>
                            Register with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* name */}
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium  '
                                htmlFor='name'
                            >
                                Username
                            </label>
                            <input
                                id='name'
                                autoComplete='name'
                                name='name'
                                className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                                {...register("name", { required: true })}
                            />
                            <div className="mt-1 animate-pulse">
                                {errors.name && <span className="text-red-500">Please fill up Name field</span>}
                            </div>
                        </div>

                        {/* email */}
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium '
                                htmlFor='LoggingEmailAddress'
                            >
                                Email Address
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='email'
                                className='block w-full px-4 py-2 border rounded-lg  input input-bordered  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email'
                                {...register("email", { required: true })}
                            />
                            <div className="mt-1 animate-pulse">
                                {errors.email && <span className="text-red-500">Please fill up Email field</span>}
                            </div>
                        </div>

                        {/* password */}
                        <div className='mt-4 relative'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                name='password'
                                className='block w-full px-4 py-2 border rounded-lg  input input-bordered  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type={passShow ? "text" : "password"}
                                {...register("password", {
                                    required: "Please fill up Password field",
                                    // pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}|\\;:'",.<>/?~])(?=.{6,})/ || "Password must contain an Uppercase, a Lowercase, a numeric character, a special character and Length must be at least 6 characters long!"
                                })}
                            />
                            <span
                                onClick={() => setPassShow(!passShow)}
                                className="cursor-pointer absolute top-11 right-4 "
                            >
                                {
                                    passShow ? <TfiEye /> : <RxEyeClosed />
                                }
                            </span>
                            <div className="mt-1 animate-pulse">
                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className='mt-4 relative'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium '
                                    htmlFor='loggingPassword'
                                >
                                    Confirm Password
                                </label>
                            </div>

                            <input
                                id='confirmLoggingPassword'
                                autoComplete='current-password'
                                name='confirmPassword'
                                className='block w-full px-4 py-2 border rounded-lg  input input-bordered  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type={cpassShow ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please fill up the Confirm Password field",
                                    validate: value => value === pass || "Passwords do not match"
                                })}
                            />
                            <span
                                onClick={() => setCpassShow(!cpassShow)}
                                className="cursor-pointer absolute top-11 right-4"
                            >
                                {
                                    cpassShow ? <TfiEye /> : <RxEyeClosed />
                                }
                            </span>
                            <div className="mt-1 animate-pulse">
                                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                            </div>
                        </div>

                        {/* photo */}
                        <div className='mt-4'>
                            <label htmlFor='image' className='block mb-2 text-sm  font-medium '>
                                Upload Avatar:
                            </label>

                            <input
                                // required
                                className=' block w-full px-4 py-2 rounded-lg input  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 file-input-success border-none'
                                type='file'
                                id='avatar'
                                name='avatar'
                                accept='image/*'
                                {...register("avatar", { required: true })}
                            />
                            <div className="mt-1 animate-pulse">
                                {errors.avatar && <span className="text-red-500">Please upload an Avatar</span>}
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                            >
                                Register
                            </button>
                        </div>

                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>

                        <Link
                            to='/login'
                            className='text-xs text-rose-700 uppercase  hover:underline font-semibold animate-pulse'
                        >
                            Log In
                        </Link>

                        <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>
                    </div>
                </div>
                <div
                    className='hidden bg-cover bg-center lg:block lg:w-1/2'
                    style={{
                        backgroundImage: `url(${bgImg})`,
                    }}
                ></div>
            </div>
        </div>
    )
}

export default Register