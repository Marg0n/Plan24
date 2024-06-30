import { Tooltip } from 'react-tooltip';
import useAuth from './../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { GiRingingBell } from "react-icons/gi";
import { useQuery } from '@tanstack/react-query';
import Loader from '../shared/Loader';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { FaTasks } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
// import { toast } from 'react-toastify';
// import logo from '/logo.png';

const Profile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    // Notification state
    const [notification, setNotification] = useState(false);
    const [upcomingTasks, setUpcomingTasks] = useState([]);

    // fetch the tasks' data
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks', user],
        queryFn: async () => {
            const { data } = await axiosSecure(`/tasks/${user?.email}`)
            return data
        }
    })

    // fetch a specific users' total tasks' data by email
    const { data: totalTasks } = useQuery({
        queryKey: ['totalTasks', user],
        queryFn: async () => {
            const { data } = await axiosSecure(`/totalTasks/${user?.email}`)
            return data
        }
    })


    // To get the upcoming title of the task
    const notify = async () => {
        const upcomingTaskTitles = tasks?.filter(t => {
            const dueDate = new Date(t.due_date);
            const today = new Date();
            const timeDifference = dueDate.getTime() - today.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            return daysDifference === 1;
        })
        // .map(t => t.title);

        setUpcomingTasks(upcomingTaskTitles);
        setNotification(true);
    };

    useEffect(() => {
        notify();
        // toaster();
        refetch()
    }, [user, tasks]);


    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading && timeLoading) {
        <Loader />
    }


    return (
        <div
            className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center relative'
        // style={{backgroundImage: `url(${imagePath})`}}
        >
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Profile</title>
            </Helmet>


            {upcomingTasks?.length > 0 && (
                <ul className='absolute right-4 top-4 menu menu-horizontal w-40'>
                    <details className='w-full'>

                        <summary className='flex gap-3 justify-end'>
                            {/* Upcoming Tasks */}
                            <GiRingingBell size={25} className={`${!notification ? 'animate-none hidden' : 'animate__animated animate__shakeX animate__infinite hover:animate-none '}`} />
                        </summary>
                        <ul className="rounded-t-none p-2">
                            {upcomingTasks?.map((taskTitle, index) => (
                                <li key={index}>
                                    Task {index + 1}: {taskTitle.title} <br /> ( Due on {taskTitle.due_date} )
                                </li>
                            ))}
                        </ul>
                    </details>
                </ul>
            )}

            {/* display pic, name and mail */}
            <div className=''>
                <div className="flex flex-col items-center mt-6 -mx-2">

                    <div className='mb-4'>
                        <img
                            data-tooltip-id="name-tooltips"
                            data-tooltip-content={`${user?.displayName || user?.email}`}
                            referrerPolicy="no-referrer"
                            className="object-cover w-24 h-24 mx-2 rounded-full avatar ring ring-primary ring-offset-base-100 ring-offset-2 "
                            src={
                                user?.photoURL ? user?.photoURL
                                    : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                            }
                            alt="avatar" />
                        <Tooltip id="name-tooltips" />
                    </div>

                    <h4 className="mx-2 mt-2 font-semibold text-blue-500">
                        {user?.displayName}
                    </h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-error">
                        {user?.email}
                    </p>
                </div>
                {/* const { email, name, bloodGroup, district, upazila, status, isAdmin } = userData */}

            </div>

            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <FaTasks size={45} />
                    </div>
                    <div className="stat-title">Total Tasks</div>
                    <div className="stat-value  text-center">{totalTasks?.length}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                <div className="stat-figure text-primary">
                        <BiTask size={45} />
                    </div>
                    <div className="stat-title">Upcoming Deadlines</div>
                    <div className="stat-value text-center">{upcomingTasks?.length}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                {/* <div className="stat">
                    <div className="stat-title">Progress</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div> */}
            </div>
        </div>
    );
};

export default Profile;