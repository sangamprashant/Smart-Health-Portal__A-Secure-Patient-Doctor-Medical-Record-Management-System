// ================= NOTIFICATION PANEL =================
import { Badge, Drawer, List, Typography } from "antd";
import { Bell } from "lucide-react";
import { useState } from "react";

const { Text } = Typography;

export const NotificationPanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, title: "New Report Uploaded", desc: "Blood test report added", time: "2 min ago" },
    { id: 2, title: "Doctor Comment", desc: "Dr. Sharma reviewed MRI", time: "10 min ago" },
    { id: 3, title: "Appointment Reminder", desc: "Tomorrow at 10 AM", time: "1 hr ago" },
  ];

  return (
    <>
      {/* Bell Icon */}
      <Badge count={notifications.length} size="small">
        <Bell
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
      </Badge>

      {/* Drawer Panel */}
      <Drawer
        title="Notifications"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={360}
      >
        <List
          itemLayout="vertical"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<Text strong>{item.title}</Text>}
                description={item.desc}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.time}
              </Text>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};
