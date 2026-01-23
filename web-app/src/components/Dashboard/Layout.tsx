import {
    Menu,
    X,
} from "lucide-react";
import React, { useState } from "react";
import Sidebar, { SidebarMobile } from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">
            <Sidebar role="doctor" />

            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative w-72 bg-blue-900 text-white h-full p-6 overflow-y-auto">
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 text-white"
                        >
                            <X size={28} />
                        </button>
                        <SidebarMobile role="doctor" />
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-y-auto lg:ml-64">

                <header className="sticky top-0 bg-white z-20 shadow-sm px-6 py-4 flex justify-between items-center">

                    {/* Mobile Hamburger */}
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden text-blue-900"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={28} />
                        </button>

                        <h1 className="text-xl font-bold text-blue-900">
                            Patient Profile Dashboard
                        </h1>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="doctor"
                                className="w-10 h-10 rounded-full"
                            />
                            <p className="text-sm font-semibold text-gray-700">
                                Dr. Admin
                            </p>
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
};

export default Layout;

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <h3 className="text-lg font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

export const Card = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

export const ListItem = ({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) => (
    <div className="flex items-center gap-3 text-sm text-gray-700">
        <span className="text-blue-900">{icon}</span>
        {text}
    </div>
);
