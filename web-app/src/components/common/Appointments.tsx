import React, { useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  FileText,
  ArrowUpDown,
  CalendarPlus,
} from "lucide-react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

type Appointment = {
  _id: string;
  patientId: {
    _id: string;
    fullName: string;
  };
  doctorId: {
    _id: string;
    fullName: string;
  };
  date: string;
  time: string;
  slotKey: string;
  reason: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

/* ✅ FIXED UNIQUE IDS */
const dummyAppointments: Appointment[] = [
  {
    _id: "1",
    patientId: { _id: "p1", fullName: "Rahul Sharma" },
    doctorId: { _id: "d1", fullName: "Dr. Mehta" },
    date: "2026-04-15",
    time: "10:00 AM",
    slotKey: "2026-04-15_10:00",
    reason: "Fever & Cold",
    status: "pending",
  },
  {
    _id: "1c",
    patientId: { _id: "p1", fullName: "Rahul Sharma" },
    doctorId: { _id: "d1", fullName: "Dr. Mehta" },
    date: "2026-04-15",
    time: "10:00 AM",
    slotKey: "2026-04-15_10:00",
    reason: "Fever & Cold",
    status: "pending",
  },
  {
    _id: "1sfg",
    patientId: { _id: "p1", fullName: "Rahul Sharma" },
    doctorId: { _id: "d1", fullName: "Dr. Mehta" },
    date: "2026-04-15",
    time: "10:00 AM",
    slotKey: "2026-04-15_10:00",
    reason: "Fever & Cold",
    status: "pending",
  },
  {
    _id: "2",
    patientId: { _id: "p2", fullName: "Anjali Verma" },
    doctorId: { _id: "d1", fullName: "Dr. Mehta" },
    date: "2026-04-16",
    time: "11:30 AM",
    slotKey: "2026-04-16_11:30",
    reason: "Skin Allergy",
    status: "confirmed",
  },
  {
    _id: "3",
    patientId: { _id: "p3", fullName: "Vikas Singh" },
    doctorId: { _id: "d2", fullName: "Dr. Gupta" },
    date: "2026-04-17",
    time: "02:00 PM",
    slotKey: "2026-04-17_14:00",
    reason: "Back Pain",
    status: "completed",
  },
  {
    _id: "4",
    patientId: { _id: "p4", fullName: "Neha Kapoor" },
    doctorId: { _id: "d2", fullName: "Dr. Gupta" },
    date: "2026-04-18",
    time: "09:30 AM",
    slotKey: "2026-04-18_09:30",
    reason: "Routine Checkup",
    status: "cancelled",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-50 text-yellow-600 border-yellow-200";
    case "confirmed":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "completed":
      return "bg-green-50 text-green-600 border-green-200";
    case "cancelled":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const Appointments = () => {
  const navigate = useNavigate()
  const { user } = useAuth();

  const [selected, setSelected] = useState<Appointment | null>(null);
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "earliest">("latest");

  const handleOpen = (appt: Appointment) => {
    setSelected(appt);
    setOpen(true);
  };

  /* ✅ FILTER + SORT */
  const filteredAppointments = dummyAppointments
    .filter((appt) => {
      if (!user) return false;

      const roleMatch =
        user.role === "patient"
          ? appt.patientId._id === user._id
          : user.role === "doctor"
            ? appt.doctorId._id === user._id
            : true;

      const statusMatch =
        statusFilter === "all" || appt.status === statusFilter;

      return roleMatch && statusMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();

      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Appointments</h2>
        <p className="text-sm text-gray-500">
          Manage and view your appointments
        </p>
      </div>

      {/* 🔥 FILTER + SORT */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-sm rounded-full border transition ${statusFilter === status
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={() =>
              setSortOrder((prev) =>
                prev === "latest" ? "earliest" : "latest"
              )
            }
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 w-25"
          >
            <ArrowUpDown size={16} />
            {sortOrder === "latest" ? "Latest" : "Earliest"}
          </button>
          <button onClick={() => navigate("./book")} className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50"><CalendarPlus size={16} /> Book an Appointment</button>
        </div>
      </div>

      {/* Grid */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No appointments found</p>
          <p className="text-sm">Try changing filters</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appt) => {
            const otherPerson =
              user?.role === "doctor"
                ? appt.patientId.fullName
                : appt.doctorId.fullName;

            return (
              <div
                key={appt._id}
                onClick={() => handleOpen(appt)}
                className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{appt.reason}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${getStatusStyle(
                      appt.status
                    )}`}
                  >
                    {appt.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{otherPerson}</p>

                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {appt.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {appt.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🔥 MODAL */}
      <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered>
        {selected && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Appointment Details</h3>

            <div className="flex items-center gap-2">
              <FileText size={18} />
              {selected.reason}
            </div>

            <div className="flex items-center gap-2">
              {user?.role === "doctor" ? (
                <>
                  <User size={18} />
                  {selected.patientId.fullName}
                </>
              ) : (
                <>
                  <Stethoscope size={18} />
                  {selected.doctorId.fullName}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              {selected.date}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              {selected.time}
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full border w-fit ${getStatusStyle(
                selected.status
              )}`}
            >
              {selected.status}
            </span>

            <div className="flex gap-2 mt-2">
              <Button type="primary">Confirm</Button>
              <Button danger>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;