import {
  Apple,
  ClipboardList,
  Pill,
} from "lucide-react";
import { Card, ListItem } from "../Dashboard/Layout";
import ProfileCard from "../common/ProfileCard";
import { HealthRecord } from "../common";

const Profile = () => {
  return (
    <section className="p-6 space-y-8 max-w-7xl mx-auto">
      <ProfileCard />
      <HealthRecord />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card title="Medications" onEditClick={() => { }}>
          <ListItem icon={<Pill />} text="Panadol 500mg - Twice Daily" />
          <ListItem icon={<Pill />} text="Insulin Injection - Morning" />
          <ListItem icon={<Pill />} text="Vitamin D Supplements" />
        </Card>

        <Card title="Diet Plan" onEditClick={() => { }}>
          <ListItem icon={<Apple />} text="8 Cups Water per Day" />
          <ListItem icon={<Apple />} text="Low Sugar Intake" />
          <ListItem icon={<Apple />} text="Intermittent Fasting Recommended" />
        </Card>

      </div>

      <Card title="Doctor Notes" onEditClick={() => { }}>
        <div className="flex items-start gap-3 text-sm text-gray-600">
          <ClipboardList className="text-blue-900 mt-1" />
          Patient is stable. Emergency QR access enabled.
        </div>
      </Card>
    </section>
  )
}

export default Profile