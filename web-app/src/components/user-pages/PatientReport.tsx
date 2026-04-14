import  { useState } from "react";
import { Card, Button, Row, Col, Typography, Modal, Input, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FileText, Calendar, User } from "lucide-react";

const { Title, Text } = Typography;

interface MedicalRecord {
  _id: string;
  patientId: string;
  doctorId?: string;
  title: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
}

const PatientReport = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      _id: "1",
      patientId: "p1",
      doctorId: "Dr. Sharma",
      title: "Blood Test Report",
      description: "Hemoglobin and RBC levels normal.",
      fileUrl: "#",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      patientId: "p1",
      doctorId: "Dr. Mehta",
      title: "X-Ray Chest",
      description: "No abnormalities detected.",
      fileUrl: "#",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  const handleAdd = () => {
    if (!form.title) return;

    const newRecord: MedicalRecord = {
      _id: Date.now().toString(),
      patientId: "p1",
      doctorId: "Dr. New",
      title: form.title,
      description: form.description,
      createdAt: new Date().toISOString(),
    };

    setRecords([newRecord, ...records]);
    setForm({ title: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Patient Reports</Title>
          <Text type="secondary">Manage medical records efficiently</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Add Report
        </Button>
      </div>

      {/* Cards Grid */}
      <Row gutter={[16, 16]}>
        {records.map((record) => (
          <Col xs={24} sm={12} md={8} key={record._id}>
            <Card
              hoverable
              style={{ borderRadius: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                {/* Title Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Space>
                    <FileText size={18} />
                    <Text strong>{record.title}</Text>
                  </Space>
                  <Tag color="blue">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </Tag>
                </div>

                {/* Description */}
                <Text type="secondary" ellipsis={{ rows: 2 }}>
                  {record.description}
                </Text>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Space size={4}>
                    <User size={14} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {record.doctorId || "N/A"}
                    </Text>
                  </Space>

                  {record.fileUrl && (
                    <a href={record.fileUrl} target="_blank" rel="noreferrer">
                      View File
                    </a>
                  )}
                </div>

                {/* Created Label */}
                <Space size={4}>
                  <Calendar size={14} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Created
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal
        title="Add New Report"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAdd}
        okText="Save"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Input.TextArea
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default PatientReport;