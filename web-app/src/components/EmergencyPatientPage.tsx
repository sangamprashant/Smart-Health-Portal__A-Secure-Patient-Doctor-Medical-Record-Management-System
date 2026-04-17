import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ClipboardList,
  Droplet,
  FileText,
  HeartPulse,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import _env from "../utils/_env";
import { useAuth } from "../providers/AuthContext";

type EmergencyData = {
  qrCodeId: string;
  accessLevel: "public" | "doctor";
  patient: {
    fullName: string;
    email?: string;
    gender?: string;
    age?: number;
    phone?: string;
    patientId?: string;
    address?: {
      city?: string;
      state?: string;
      country?: string;
    };
  };
  emergency: {
    bloodGroup: string;
    allergies: string[];
    diseases: string[];
    emergencyContact?: {
      name?: string;
      phone?: string;
      relation?: string;
    } | null;
    emergencyNotes?: string;
  };
  clinical?: {
    healthRecord?: {
      weight?: number;
      height?: number;
      bmi?: number;
      bloodPressure?: {
        systolic?: number;
        diastolic?: number;
      };
    } | null;
    medications: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[];
    doctorNotes?: string;
    reports: {
      fileUrl: string;
      type: string;
    }[];
  } | null;
};

const Empty = ({ text }: { text: string }) => (
  <p className="text-sm text-gray-500">No {text} recorded.</p>
);

const EmergencyPatientPage = () => {
  const { qrCodeId } = useParams();
  const { token, user } = useAuth();
  const [data, setData] = useState<EmergencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useMemo(() => {
    const address = data?.patient.address;
    return [address?.city, address?.state, address?.country]
      .filter(Boolean)
      .join(", ");
  }, [data?.patient.address]);

  useEffect(() => {
    const fetchEmergencyPatient = async () => {
      if (!qrCodeId) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${_env.SERVER_URL}/emergency/${qrCodeId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Unable to load emergency profile");
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyPatient();
  }, [qrCodeId, token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-red-50 px-4 py-16">
        <div className="mx-auto max-w-5xl text-center text-gray-700">
          Loading emergency profile...
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-red-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-white p-8 text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-600" size={44} />
          <h1 className="text-2xl font-bold text-gray-900">QR not available</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-2 text-white" to="/scan">
            Scan again
          </Link>
        </div>
      </main>
    );
  }

  const isDoctorView = data.accessLevel === "doctor";

  return (
    <main className="min-h-screen bg-red-50 text-gray-900">
      <section className="bg-red-700 px-4 py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-100">
              <ShieldCheck size={18} />
              Emergency Patient Profile
            </p>
            <h1 className="mt-2 text-3xl font-bold">{data.patient.fullName}</h1>
            <p className="mt-1 text-red-100">
              {data.patient.patientId || data.qrCodeId}
            </p>
          </div>

          <div className="rounded-lg bg-white px-4 py-3 text-red-700">
            {isDoctorView
              ? "Doctor access: full emergency record"
              : "Public access: critical basics only"}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-8 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold">
            <UserRound className="text-blue-700" />
            Patient
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Age:</strong> {data.patient.age || "N.A"}</p>
            <p><strong>Gender:</strong> {data.patient.gender || "N.A"}</p>
            <p><strong>Location:</strong> {location || "N.A"}</p>
            {isDoctorView && <p><strong>Phone:</strong> {data.patient.phone || "N.A"}</p>}
            {isDoctorView && <p><strong>Email:</strong> {data.patient.email || "N.A"}</p>}
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold">
            <Droplet className="text-red-700" />
            Critical Details
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Blood group:</strong> {data.emergency.bloodGroup}</p>
            <p>
              <strong>Allergies:</strong>{" "}
              {data.emergency.allergies.length ? data.emergency.allergies.join(", ") : "N.A"}
            </p>
            <p>
              <strong>Diseases:</strong>{" "}
              {data.emergency.diseases.length ? data.emergency.diseases.join(", ") : "N.A"}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold">
            <Phone className="text-green-700" />
            Emergency Contact
          </div>
          {data.emergency.emergencyContact ? (
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {data.emergency.emergencyContact.name || "N.A"}</p>
              <p><strong>Phone:</strong> {data.emergency.emergencyContact.phone || "N.A"}</p>
              <p><strong>Relation:</strong> {data.emergency.emergencyContact.relation || "N.A"}</p>
            </div>
          ) : (
            <Empty text="emergency contact" />
          )}
        </div>
      </section>

      {data.emergency.emergencyNotes && (
        <section className="mx-auto max-w-6xl px-4 pb-6">
          <div className="rounded-lg border border-red-200 bg-white p-5">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
              <AlertTriangle className="text-red-700" />
              Emergency Notes
            </h2>
            <p className="text-gray-700">{data.emergency.emergencyNotes}</p>
          </div>
        </section>
      )}

      {isDoctorView ? (
        <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-10 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Activity className="text-blue-700" />
              Health Record
            </h2>
            {data.clinical?.healthRecord ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p><strong>BMI:</strong> {data.clinical.healthRecord.bmi || "N.A"}</p>
                <p><strong>Weight:</strong> {data.clinical.healthRecord.weight || "N.A"} kg</p>
                <p><strong>Height:</strong> {data.clinical.healthRecord.height || "N.A"} cm</p>
                <p>
                  <strong>BP:</strong>{" "}
                  {data.clinical.healthRecord.bloodPressure
                    ? `${data.clinical.healthRecord.bloodPressure.systolic}/${data.clinical.healthRecord.bloodPressure.diastolic}`
                    : "N.A"}
                </p>
              </div>
            ) : (
              <Empty text="health record" />
            )}
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <HeartPulse className="text-red-700" />
              Medications
            </h2>
            {data.clinical?.medications.length ? (
              <div className="space-y-3">
                {data.clinical.medications.map((medication) => (
                  <div className="rounded-lg border border-gray-200 p-3" key={`${medication.name}-${medication.dosage}`}>
                    <p className="font-semibold">{medication.name}</p>
                    <p className="text-sm text-gray-600">
                      {medication.dosage} | {medication.frequency} | {medication.duration}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Empty text="medications" />
            )}
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <ClipboardList className="text-green-700" />
              Doctor Notes
            </h2>
            <p className="text-sm text-gray-700">{data.clinical?.doctorNotes || "N.A"}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <FileText className="text-blue-700" />
              Reports
            </h2>
            {data.clinical?.reports.length ? (
              <div className="space-y-2">
                {data.clinical.reports.map((report) => (
                  <a
                    className="block rounded-lg border border-gray-200 p-3 text-sm text-blue-700"
                    href={report.fileUrl}
                    key={`${report.fileUrl}-${report.type}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {report.type || "Report"}
                  </a>
                ))}
              </div>
            ) : (
              <Empty text="reports" />
            )}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-lg border border-blue-200 bg-white p-5 text-sm text-gray-700">
            Doctors can log in before opening this QR to view medications,
            reports, health records, and notes.
          </div>
        </section>
      )}

      {!user && (
        <div className="mx-auto max-w-6xl px-4 pb-10">
          <Link className="inline-block rounded-lg bg-blue-700 px-5 py-2 text-white" to="/login">
            Doctor login
          </Link>
        </div>
      )}
    </main>
  );
};

export default EmergencyPatientPage;
