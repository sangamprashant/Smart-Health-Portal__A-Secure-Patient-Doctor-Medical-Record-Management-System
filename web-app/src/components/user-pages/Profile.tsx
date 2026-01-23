import {
  Activity,
  Apple,
  ClipboardList,
  Droplet,
  Pill,
  Ruler,
  Weight,
} from "lucide-react";
import { Card, ListItem, StatCard } from "../Dashboard/Layout";

const Profile = () => {
  return (
    <section className="p-6 space-y-8 max-w-7xl mx-auto">

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Activity />} label="BMI" value="22.4" />
        <StatCard icon={<Weight />} label="Weight" value="72 kg" />
        <StatCard icon={<Ruler />} label="Height" value="175 cm" />
        <StatCard icon={<Droplet />} label="Blood Pressure" value="124/80" />
      </div>

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

      <Card title="Doctor Notes">
        <div className="flex items-start gap-3 text-sm text-gray-600">
          <ClipboardList className="text-blue-900 mt-1" />
          Patient is stable. Emergency QR access enabled.
        </div>
      </Card>
    </section>
  )
}

export default Profile