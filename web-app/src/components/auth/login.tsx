import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import AuthWrapper, { PageFooter, PageHeader } from "./AuthWrapper";
import InputField from "../common/InputField";
import Button from "../common/Button";
import _env from "../../utils/_env";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const {login}=useAuth()

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email.trim()) {
            return alert("Email is required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            return alert("Enter a valid email");
        }

        if (!form.password) {
            return alert("Password is required");
        }

        setLoading(true);

        try {
            const response = await fetch(`${_env.SERVER_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            login(data.token,data.user)

            if (data.user.role === "admin") navigate("/admin/dashboard");
            else if (data.user.role === "doctor") navigate("/doctor/dashboard");
            else navigate("/patient/dashboard");

        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthWrapper type="login">
            <PageHeader type="login" />

            <form className="space-y-5" onSubmit={handleLogin}>
                <InputField
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={<Mail size={18} />}
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    icon={<Lock size={18} />}
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <Button
                    type="submit"
                    text={loading ? "Logging in..." : "Login"}
                    icon={<LogIn size={18} />}
                />
            </form>

            <PageFooter type="login" />
        </AuthWrapper>
    );
};

export default Login;