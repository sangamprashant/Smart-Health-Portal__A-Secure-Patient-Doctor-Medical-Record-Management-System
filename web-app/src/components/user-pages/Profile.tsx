import React, { useState } from "react";
import {
  Activity,
  Weight,
  Ruler,
  Droplet,
  Pill,
  Apple,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import Sidebar, { SidebarMoblie } from "./Sidebar";

/* ================= MAIN PROFILE COMPONENT ================= */

const Profile: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar /> {/*=== DESKTOP SIDEBAR ===*/}

      {/* ================= MOBILE SIDEBAR DRAWER ================= */}
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
            <SidebarMoblie />
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT SCROLL ================= */}
      <main className="flex-1 overflow-y-auto lg:ml-64">

        {/* ================= TOPBAR ================= */}
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

        {/* ================= PAGE CONTENT ================= */}
        <section className="p-6 space-y-8 max-w-7xl mx-auto">

          {/* ================= PATIENT CARD ================= */}
          <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
            <img
              src="https://i.pravatar.cc/130"
              alt="patient"
              className="w-28 h-28 rounded-2xl object-cover border"
            />

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                Prashant Srivastav
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                Male • Age: 22 • Lucknow, India
              </p>

              <p className="text-blue-900 font-semibold text-sm mt-2">
                Patient ID: SHP-2026-001
              </p>
            </div>

            <button className="px-6 py-2 rounded-xl bg-blue-900 text-white font-semibold hover:bg-blue-950 transition">
              Edit Profile
            </button>
          </div>

          {/* ================= HEALTH STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Activity />} label="BMI" value="22.4" />
            <StatCard icon={<Weight />} label="Weight" value="72 kg" />
            <StatCard icon={<Ruler />} label="Height" value="175 cm" />
            <StatCard icon={<Droplet />} label="Blood Pressure" value="124/80" />
          </div>

          {/* ================= EXTRA DASHBOARD ROW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <Card title="Medications">
              <ListItem icon={<Pill />} text="Panadol 500mg - Twice Daily" />
              <ListItem icon={<Pill />} text="Insulin Injection - Morning" />
              <ListItem icon={<Pill />} text="Vitamin D Supplements" />
            </Card>

            <Card title="Diet Plan">
              <ListItem icon={<Apple />} text="8 Cups Water per Day" />
              <ListItem icon={<Apple />} text="Low Sugar Intake" />
              <ListItem icon={<Apple />} text="Intermittent Fasting Recommended" />
            </Card>
          </div>

          {/* Notes */}
          <Card title="Doctor Notes">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <ClipboardList className="text-blue-900 mt-1" />
              Patient is stable. Emergency QR access enabled.
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Profile;

/* ================= REUSABLE COMPONENTS ================= */



interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
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

const Card = ({
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

const ListItem = ({
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
