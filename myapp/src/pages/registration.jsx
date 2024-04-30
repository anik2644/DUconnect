import React from "react";
import Navbar from "../components/navbar";

const Register = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-yellow-100">
                <div className="rounded-xl shadow-md p-10 bg-white">
                    <div>
                        <div className="flex flex-col gap-y-5">
                            <div className="text-center text-xl">Registration Ongoing</div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="border rounded-md p-2 border black-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="border rounded-md p-2 border-black-500"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="border rounded-md p-2 border black-500"
                            />
                            <button
                                type="button"
                                className="bg-yellow-300 text-white rounded-md p-3 hover:bg-yellow-800 transition-all duration-200 ease-in-out"
                                >
                                    Register
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register