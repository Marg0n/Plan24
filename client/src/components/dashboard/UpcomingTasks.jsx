import { useEffect, useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../shared/Loader";
import useAuth from "../../hooks/useAuth";
import UpcomingTasksTable from "./UpcomingTasksTable";


const UpcomingTasks = () => {

    const axiosSecure = useAxiosSecure()
    const [customLoading, setCustomLoading] = useState(false);

    const { user } = useAuth();

    // fetch the tasks' data
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/tasks/${user?.email}`)
            return data
        }
    })

    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    if (customLoading || isLoading || timeLoading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Upcoming Tasks</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl mt-4 font-serif text-center">
                    Upcoming Tasks!
                </h3>
            </AttentionSeeker>

            <div className="overflow-x-auto my-4 mx-1 rounded-lg">
                <table className="table  table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Assigned to</th>
                            <th>Added By</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            tasks?.map((task, idx) => {
                                return <UpcomingTasksTable
                                    key={task._id} task={task} idx={idx}
                                // handleDelete={handleDelete}
                                // handleChangeActive={handleChangeActive}
                                />
                            })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Assigned to</th>
                            <th>Added By</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
};

export default UpcomingTasks;