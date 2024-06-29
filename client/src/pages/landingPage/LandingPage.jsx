import { Helmet } from "react-helmet-async";
import logo from '/logo.png';
import { Link } from "react-router-dom";


const LandingPage = () => {
    return (
        <div>
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Welcome Page</title>
            </Helmet>

            <div className=" flex flex-col gap-6 justify-center items-center">
                <img
                    src={logo}
                    alt=""
                    className="h-48 object-cover rounded-full"
                />
                <h1 className=' text-xl lg:text-3xl font-bold'>Welcome to Plan24!</h1>
                <p className=' text-xl lg:text-3xl font-semibold'>Manage your tasks, deadlines, and projects effectively!</p>

                <div className="flex gap-4 justify-center items-center">
                    <Link
                        to='/registration'
                        className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-secondary group-hover:bg-primary"></span>
                        <span className="relative text-black group-hover:text-warning">
                            Register
                        </span>
                    </Link>
                    <Link
                        to='/login'
                        className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-secondary group-hover:bg-primary"></span>
                        <span className="relative text-black group-hover:text-warning">
                            Login
                        </span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default LandingPage;