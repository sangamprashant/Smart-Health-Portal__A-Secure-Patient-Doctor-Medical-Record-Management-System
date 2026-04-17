import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography, Modal, Input, Space, Tag, Select, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FileText, Calendar, User } from "lucide-react";
import _env from "../../utils/_env";
import { useAuth } from "../../providers/AuthContext";

const { Title, Text, Paragraph } = Typography;

type Person = {
  _id: string;
  fullName: string;
  patientId?: string;
};

interface MedicalRecord {
  _id: string;
  patientId: Person;
  doctorId?: Person;
  title: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
}

const PatientReport = () => {
  const { token, user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [patients, setPatients] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ patientId: "", title: "", description: "", fileUrl: "" });

  const fetchRecords = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${_env.SERVER_URL}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load reports");

      setRecords(data);
    } catch (err) {
      notification.error({
        message: err instanceof Error ? err.message : "Failed to load reports",
      });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [token]);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!token || user?.role === "patient") return;

      const res = await fetch(`${_env.SERVER_URL}/user/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPatients(data);
    };

    fetchPatients();
  }, [token, user?.role]);

  const handleAdd = async () => {
    if (!token || !form.patientId || !form.title.trim()) {
      return notification.error({ message: "Patient and title are required" });
    }

    try {
      const res = await fetch(`${_env.SERVER_URL}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save report");

      notification.success({ message: "Report saved" });
      setForm({ patientId: "", title: "", description: "", fileUrl: "" });
      setIsModalOpen(false);
      fetchRecords();
    } catch (err) {
      notification.error({
        message: err instanceof Error ? err.message : "Failed to save report",
      });
    }
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Patient Reports</Title>
          <Text type="secondary">Manage medical records efficiently</Text>
        </div>

        {user?.role !== "patient" && (
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setIsModalOpen(true)}>
            Add Report
          </Button>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {records.map((record) => (
          <Col xs={24} sm={12} md={8} key={record._id}>
            <Card hoverable style={{ borderRadius: 8 }} bodyStyle={{ padding: 16 }}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Space>
                    <FileText size={18} />
                    <Text strong>{record.title}</Text>
                  </Space>
                  <Tag color="blue">{new Date(record.createdAt).toLocaleDateString()}</Tag>
                </div>

                <Paragraph type="secondary" ellipsis={{ rows: 2 }}>{record.description}</Paragraph>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Space size={4}>
                    <User size={14} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {user?.role === "patient" ? record.doctorId?.fullName || "N.A" : record.patientId?.fullName || "N.A"}
                    </Text>
                  </Space>

                  {record.fileUrl && <a href={record.fileUrl} target="_blank" rel="noreferrer">View File</a>}
                </div>

                <Space size={4}>
                  <Calendar size={14} />
                  <Text type="secondary" style={{ fontSize: 12 }}>Created</Text>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal title="Add New Report" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleAdd} okText="Save">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            placeholder="Select patient"
            value={form.patientId || undefined}
            onChange={(patientId) => setForm({ ...form, patientId })}
            options={patients.map((patient) => ({ label: `${patient.fullName} (${patient.patientId || "N.A"})`, value: patient._id }))}
          />
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="File URL optional" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} />
          <Input.TextArea placeholder="Description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Space>
      </Modal>
    </div>
  );
};

export default PatientReport;
