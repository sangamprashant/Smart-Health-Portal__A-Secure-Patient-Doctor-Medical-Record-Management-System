import { useState } from "react";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import AuthWrapper, { PageFooter, PageHeader } from "./AuthWrapper";
import InputField from "../common/InputField";
import Button from "../common/Button";
import _env from "../../utils/_env";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth()

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.fullName.trim()) {
            return alert("Full name is required");
        }

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

        if (form.password.length < 6) {
            return alert("Password must be at least 6 characters");
        }

        setLoading(true);

        try {
            const response = await fetch(`${_env.SERVER_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            login(data.token, data.user)
            setForm({
                fullName: "",
                email: "",
                password: "",
            });

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
        <AuthWrapper type="register">
            <PageHeader type="register" />

            <form className="space-y-5" onSubmit={handleRegister}>
                <InputField
                    label="Full Name"
                    type="text"
                    placeholder="Your full name"
                    icon={<User size={18} />}
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />

                <InputField
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={<Mail size={18} />}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Create strong password"
                    icon={<Lock size={18} />}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <Button type="submit" text={loading ? "Creating..." : "Create Account"} icon={<UserPlus size={18} />} />
            </form>

            <PageFooter type="register" />
        </AuthWrapper>
    );
};

export default Register;