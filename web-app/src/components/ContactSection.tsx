import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
    return (
        <section className="py-24 bg-slate-50">

            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-14">
                    <p className="text-blue-900 font-semibold tracking-wide">
                        CONTACT US
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                        Get in Touch with Smart Health Portal
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Have questions about medical records, appointments, or emergency access?
                        Our support team is available to assist you.
                    </p>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT INFO */}
                    <div className="space-y-8">

                        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Phone className="text-blue-900" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Phone Support</h4>
                                <p className="text-sm text-gray-600">
                                    +91 98765 43210 <br />
                                    24×7 Emergency Assistance
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Mail className="text-blue-900" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Email Address</h4>
                                <p className="text-sm text-gray-600">
                                    support@smarthealthportal.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <MapPin className="text-blue-900" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Office Location</h4>
                                <p className="text-sm text-gray-600">
                                    Lucknow, Uttar Pradesh, India
                                </p>
                            </div>
                        </div>

                        {/* SOCIAL LINKS */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border">
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Connect With Us
                            </h4>

                            <p className="text-sm text-gray-600 mb-5">
                                Follow Smart Health Portal for updates, health tips,
                                and important announcements.
                            </p>

                            <div className="flex gap-4">
                                {/* Facebook */}
                                <a
                                    href="#"
                                    className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center
                 hover:bg-blue-900 hover:text-white transition"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.2V12h2.2V9.7c0-2.2 1.3-3.4 3.3-3.4.9 0 1.9.2 1.9.2v2.1h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
                                    </svg>
                                </a>

                                {/* Twitter / X */}
                                <a
                                    href="#"
                                    className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center
                 hover:bg-blue-900 hover:text-white transition"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.2L6.4 22H3.3l7.2-8.2L1 2h6.3l4.3 5.6L18.9 2z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="#"
                                    className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center
                 hover:bg-blue-900 hover:text-white transition"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9z" />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="#"
                                    className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center
                 hover:bg-blue-900 hover:text-white transition"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9zm4.8-7.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>


                    </div>

                    {/* RIGHT FORM */}
                    <div className="bg-white p-8 rounded-2xl shadow-md border">

                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            Send Us a Message
                        </h3>

                        <form className="space-y-5">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                            />

                            <textarea
                                rows={4}
                                placeholder="Your Message"
                                className="w-full border rounded-md px-4 py-3 focus:outline-blue-900"
                            ></textarea>

                            <button className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-950 transition">
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;
