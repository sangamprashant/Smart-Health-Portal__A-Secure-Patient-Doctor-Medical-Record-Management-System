import { Mail, Lock, LogIn, HeartPulse, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg border grid grid-cols-1 md:grid-cols-2 overflow-hidden">

                {/* LEFT SIDE – IMAGE + INFO */}
                <div className="hidden md:flex flex-col justify-center bg-linear-to-br from-slate-50 to-blue-50 p-10">

                    <div className="relative mb-10">
                        <div className="absolute -inset-4 bg-blue-100 rounded-full blur-2xl opacity-60"></div>
                        <img
                            src="/login-health.svg"
                            alt="Healthcare illustration"
                            className="relative z-10 w-full object-contain h-32"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-blue-900 leading-snug">
                        Welcome Back to <br /> Smart Health Portal
                    </h2>

                    <p className="text-gray-600 mt-4">
                        Login to securely access your medical records,
                        appointments, prescriptions, and emergency health data
                        from anywhere, anytime.
                    </p>

                    {/* FEATURES */}
                    <div className="mt-8 space-y-4 text-sm">

                        <div className="flex items-center gap-3 text-blue-900">
                            <ShieldCheck />
                            <span>Secure & Private Access</span>
                        </div>

                        <div className="flex items-center gap-3 text-blue-900">
                            <HeartPulse />
                            <span>Instant Emergency Information</span>
                        </div>

                    </div>

                    {/* IMAGE */}
                    
                </div>

                {/* RIGHT SIDE – LOGIN FORM */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-900">
                            Login to Your Account
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Access your Smart Health dashboard
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">

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
                                    placeholder="••••••••"
                                    className="w-full px-3 py-3 outline-none"
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <button className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-950 transition flex items-center justify-center gap-2">
                            <LogIn size={18} />
                            Login
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-900 font-semibold">
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
