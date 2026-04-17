import { useEffect, useState } from "react";
import { Badge, Drawer, List, Typography, notification } from "antd";
import { Bell } from "lucide-react";
import _env from "../../utils/_env";
import { useAuth } from "../../providers/AuthContext";

const { Text } = Typography;

type AppNotification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

export const NotificationPanel: React.FC = () => {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const fetchNotifications = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${_env.SERVER_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load notifications");

      setNotifications(data);
    } catch (err) {
      notification.error({
        message: err instanceof Error ? err.message : "Failed to load notifications",
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const markAsRead = async (id: string) => {
    if (!token) return;

    try {
      await fetch(`${_env.SERVER_URL}/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch {
      notification.error({ message: "Failed to update notification" });
    }
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <>
      <Badge count={unreadCount} size="small">
        <Bell size={22} style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
      </Badge>

      <Drawer title="Notifications" placement="right" onClose={() => setOpen(false)} open={open} width={360}>
        <List
          itemLayout="vertical"
          dataSource={notifications}
          locale={{ emptyText: "No notifications" }}
          renderItem={(item) => (
            <List.Item key={item._id} onClick={() => markAsRead(item._id)} style={{ cursor: "pointer" }}>
              <List.Item.Meta
                title={<Text strong={!item.isRead}>{item.title}</Text>}
                description={item.message}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};
