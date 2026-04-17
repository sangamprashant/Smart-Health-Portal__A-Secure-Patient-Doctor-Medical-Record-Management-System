import { FormEvent, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { notification } from "antd";
import Scroll from "./page-binder/Scroll";
import _env from "../utils/_env";

const ContactSection = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const submitContact = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${_env.SERVER_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Message failed");

            notification.success({ message: "Message sent successfully" });
            setForm({ fullName: "", email: "", subject: "", message: "" });
        } catch (err) {
            notification.error({
                message: err instanceof Error ? err.message : "Message failed",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Scroll>
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-blue-900 font-semibold tracking-wide">CONTACT US</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                            Get in Touch with Smart Health Portal
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            Have questions about medical records, appointments, or emergency access?
                            Our support team is available to assist you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Phone className="text-blue-900" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                                    <p className="text-sm text-gray-600">+91 98765 43210<br />24x7 Emergency Assistance</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Mail className="text-blue-900" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email Address</h4>
                                    <p className="text-sm text-gray-600">support@smarthealthportal.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <MapPin className="text-blue-900" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Office Location</h4>
                                    <p className="text-sm text-gray-600">Lucknow, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md border">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
                            <form className="space-y-5" onSubmit={submitContact}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                                    value={form.fullName}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                />
                                <textarea
                                    rows={4}
                                    placeholder="Your Message"
                                    className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                />
                                <button
                                    className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-950 transition disabled:opacity-60"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Scroll>
    );
};

export default ContactSection;
