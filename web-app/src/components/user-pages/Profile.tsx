import React from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Settings,
  Activity,
  HeartPulse,
  Weight,
  Ruler,
  Droplet,
} from "lucide-react";

/* ================= MAIN PROFILE COMPONENT ================= */

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col w-20 bg-blue-900 text-white py-6 items-center gap-8">
        <div className="text-2xl font-bold">SH</div>

        <nav className="flex flex-col gap-6 text-blue-200">
          <LayoutDashboard className="hover:text-white cursor-pointer" />
          <Users className="hover:text-white cursor-pointer" />
          <CalendarDays className="hover:text-white cursor-pointer" />
          <FileText className="hover:text-white cursor-pointer" />
          <Settings className="hover:text-white cursor-pointer" />
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">
        {/* ================= TOPBAR ================= */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-blue-900">
            Patient Profile
          </h1>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block border rounded-lg px-4 py-2 text-sm"
            />

            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-semibold text-gray-700">
                Dr. Admin
              </p>
            </div>
          </div>
        </header>

        {/* ================= PROFILE SECTION ================= */}
        <section className="p-6 space-y-6">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
            {/* Patient Image */}
            <img
              src="https://i.pravatar.cc/120"
              alt="patient"
              className="w-28 h-28 rounded-2xl object-cover"
            />

            {/* Patient Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                Prashant Srivastav
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                Male • Age: 22 • Lucknow, India
              </p>

              <p className="text-blue-900 text-sm font-semibold mt-2">
                Patient ID: SHP-2026-001
              </p>
            </div>

            {/* Edit Button */}
            <button className="px-5 py-2 rounded-xl bg-blue-900 text-white font-semibold hover:bg-blue-950 transition">
              Edit Profile
            </button>
          </div>

          {/* ================= HEALTH STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Activity className="text-blue-900" />}
              label="BMI"
              value="22.4"
            />

            <StatCard
              icon={<Weight className="text-blue-900" />}
              label="Weight"
              value="72 kg"
            />

            <StatCard
              icon={<Ruler className="text-blue-900" />}
              label="Height"
              value="175 cm"
            />

            <StatCard
              icon={<Droplet className="text-blue-900" />}
              label="Blood Pressure"
              value="124/80"
            />
          </div>

          {/* ================= TIMELINE + HISTORY ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Timeline
              </h3>

              <ul className="space-y-4 text-sm text-gray-700">
                <li>✅ 2024 - Diagnosed with Diabetes Type 2</li>
                <li>✅ 2023 - Thyroid Disorder</li>
                <li>✅ 2022 - Regular Checkups Started</li>
                <li>✅ 2021 - First Health Record Uploaded</li>
              </ul>
            </div>

            {/* Medical History */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Medical History
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <HistoryCard
                  title="Chronic Disease"
                  desc="Diabetes, Obesity, Thyroid Disorder"
                  icon={<HeartPulse className="text-blue-900" />}
                />

                <HistoryCard
                  title="Emergency Risk"
                  desc="Diabetic Ketoacidosis"
                  icon={<Activity className="text-red-500" />}
                />

                <HistoryCard
                  title="Family History"
                  desc="Obesity (Father)"
                  icon={<Users className="text-blue-900" />}
                />

                <HistoryCard
                  title="Complications"
                  desc="Neuropathy, Retinopathy"
                  icon={<FileText className="text-blue-900" />}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;

/* ================= SMALL COMPONENTS (SAME FILE) ================= */

/* ---- StatCard Props Type ---- */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-lg font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};

/* ---- HistoryCard Props Type ---- */
interface HistoryCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ title, desc, icon }) => {
  return (
    <div className="border rounded-xl p-4 flex gap-3 hover:shadow-md transition">
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
};
