import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import AlertMessages from "@/utils/alertMessages";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword !== password) {
            AlertMessages.error("Passwords do not match");
            return;
        };
        if(email === "" || name === "" || password === "" || confirmPassword === "") {
            AlertMessages.error("Please fill out all fields");
            return;
        };
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/signup`, {
                email, name, password
                },{
                    headers: {
                    "Content-Type": "application/json",
                }}).then((res) => {
                    AlertMessages.success("Account created successfully");
                    router.push('/signin');
                }).catch((err) => {
                    AlertMessages.error(err.response.data.error);
                });
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                <span className="underline font-extrabold text-4xl underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 dark:text-white">
                    GymRat
                </span>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your user name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Frank" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create a new account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already a member? <Link href="/signin" className="text-blue-700 hover:underline dark:text-blue-500">Sign In</Link>
                </div>
            </form>
        </div>

    );
} 