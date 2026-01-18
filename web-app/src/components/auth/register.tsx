import { User, Mail, Lock, UserPlus, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg border grid grid-cols-1 md:grid-cols-2 overflow-hidden">

                {/* LEFT SIDE – IMAGE + INFO */}
                <div className="hidden md:flex flex-col justify-center bg-linear-to-br from-slate-50 to-blue-50 p-10">

                       {/* IMAGE */}
                    <img
                        src="/register-health.svg"
                        alt="Healthcare illustration"
                        className="mb-10 w-full object-contain h-32"
                    />

                    <h2 className="text-3xl font-bold text-blue-900 leading-snug">
                        Join Smart Health Portal
                    </h2>

                    <p className="text-gray-600 mt-4">
                        Create your account to securely manage medical records,
                        appointments, prescriptions, and emergency health access
                        from one trusted healthcare platform.
                    </p>

                    {/* FEATURES */}
                    <div className="mt-8 space-y-4 text-sm">

                        <div className="flex items-center gap-3 text-blue-900">
                            <ShieldCheck />
                            <span>Secure Medical Records</span>
                        </div>

                        <div className="flex items-center gap-3 text-blue-900">
                            <Activity />
                            <span>Emergency QR Access</span>
                        </div>

                        <div className="flex items-center gap-3 text-blue-900">
                            <UserPlus />
                            <span>Doctor & Patient Support</span>
                        </div>

                    </div>

                 
                </div>


                {/* RIGHT SIDE – FORM */}
                <div className="p-8 sm:p-10">

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-900">
                            Create Account
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Register to start using Smart Health Portal
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1 flex items-center border rounded-md px-3">
                                <User className="text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    className="w-full px-3 py-3 outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1 flex items-center border rounded-md px-3">
                                <Mail className="text-gray-400" size={18} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-3 py-3 outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 flex items-center border rounded-md px-3">
                                <Lock className="text-gray-400" size={18} />
                                <input
                                    type="password"
                                    placeholder="Create strong password"
                                    className="w-full px-3 py-3 outline-none"
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <button className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-950 transition flex items-center justify-center gap-2">
                            <UserPlus size={18} />
                            Create Account
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-900 font-semibold">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;
