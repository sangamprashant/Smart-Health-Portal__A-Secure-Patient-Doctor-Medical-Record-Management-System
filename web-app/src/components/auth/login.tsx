import { Mail, Lock, LogIn } from "lucide-react";
import AuthWrapper, { PageFooter, PageHeader } from "./AuthWrapper";

const Login = () => {
    return (
        <AuthWrapper type="login">
            <PageHeader type="login" />

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

            <PageFooter type="login" />
        </AuthWrapper>
    );
};

export default Login;
