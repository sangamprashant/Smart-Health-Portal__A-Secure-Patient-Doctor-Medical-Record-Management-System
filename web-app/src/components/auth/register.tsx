import { User, Mail, Lock, UserPlus, } from "lucide-react";
import AuthWrapper, { PageFooter, PageHeader } from "./AuthWrapper";

const Register = () => {
    return (
        <AuthWrapper type="register">
            <PageHeader type="register" />

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

            <PageFooter type="register" />
        </AuthWrapper>
    );
};

export default Register;
