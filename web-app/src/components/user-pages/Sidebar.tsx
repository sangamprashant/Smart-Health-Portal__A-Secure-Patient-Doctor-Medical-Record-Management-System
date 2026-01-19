import {
    LayoutDashboard,
    Users,
    CalendarDays,
    FileText,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="hidden lg:flex flex-col w-64 bg-blue-900 text-white py-8 px-6 fixed left-0 top-0 h-full">
            <SidebarHeader />
            <nav className="flex flex-col gap-3 text-blue-100 font-medium mt-8">
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <SidebarItem icon={<Users size={20} />} label="Patients" />
                <SidebarItem icon={<CalendarDays size={20} />} label="Appointments" />
                <SidebarItem icon={<FileText size={20} />} label="Medical Reports" />
                <SidebarItem icon={<Settings size={20} />} label="Settings" />
            </nav>
        </aside>
    )
}

export default Sidebar

export const SidebarMoblie = () => {
    return (
        <>
            <SidebarHeader />
            <nav className="flex flex-col gap-3 text-blue-100 font-medium mt-10">
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <SidebarItem icon={<Users size={20} />} label="Patients" />
                <SidebarItem icon={<CalendarDays size={20} />} label="Appointments" />
                <SidebarItem icon={<FileText size={20} />} label="Medical Reports" />
                <SidebarItem icon={<Settings size={20} />} label="Settings" />
            </nav>
        </>
    )
}

const SidebarHeader = () => (
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white text-blue-900 font-bold rounded-2xl flex items-center justify-center">
            SH
        </div>
        <div>
            <h2 className="text-lg font-bold leading-tight">Smart Health</h2>
            <p className="text-sm text-blue-200">Patient Panel</p>
        </div>
    </div>
);

const SidebarItem = ({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-800 transition">
        <span className="text-blue-200">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </div>
);