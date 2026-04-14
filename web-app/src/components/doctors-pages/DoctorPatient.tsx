
// ================= DOCTOR PATIENT LIST =================
import { Input, List, Avatar, Card } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";

 const DoctorPatient: React.FC = () => {
  const [search, setSearch] = useState("");

  const patients = [
    {
      id: "1",
      fullName: "Rahul Verma",
      age: 28,
      gender: "male",
      patientId: "SHP-2026-123",
      profile_image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: "2",
      fullName: "Anjali Singh",
      age: 32,
      gender: "female",
      patientId: "SHP-2026-456",
      profile_image: "https://i.pravatar.cc/100?img=2",
    },
  ];

  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ borderRadius: 16 }}>
        {/* Search */}
        <Input
          placeholder="Search patients..."
          prefix={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        {/* List */}
        <List
          itemLayout="horizontal"
          dataSource={filtered}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.profile_image} size={48} />}
                title={<span style={{ fontWeight: 600 }}>{item.fullName}</span>}
                description={`ID: ${item.patientId} • ${item.age} yrs • ${item.gender}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DoctorPatient;