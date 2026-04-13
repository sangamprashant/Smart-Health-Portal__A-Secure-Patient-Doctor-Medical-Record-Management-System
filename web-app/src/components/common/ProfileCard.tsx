import { Button, Modal, Input, Select, Form, notification } from "antd";
import { useAuth } from "../../providers/AuthContext";
import { MapPin, Plus, User } from "lucide-react";
import { useState } from "react";
import _env from "../../utils/_env";

function ProfileCard() {
    const { user, updateUserData, token } = useAuth();
    const [openEditProfileModal, setOpenProfileModal] = useState(false);
    const [partEdit, setPartEdit] = useState<{
        open: boolean;
        type: null | "gender" | "age" | "address";
    }>({
        open: false,
        type: null,
    });

    const [form, setForm] = useState({
        fullName: user?.fullName || "",
        gender: user?.gender || "",
        age: user?.age || "",
        city: user?.address?.city || "",
        country: user?.address?.country || "",
    });

    const handleFullSave = async () => {
        try {
            const res = await fetch(`${_env.SERVER_URL}/user/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullName: form.fullName,
                    gender: form.gender,
                    age: Number(form.age),
                    address: {
                        city: form.city,
                        country: form.country,
                    },
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            updateUserData(data.user);

            notification.success({
                message: "Success",
                description: data.message,
            });

            setOpenProfileModal(false);

        } catch (error: any) {
            notification.error({
                message: "Error",
                description: error.message,
            });
        }
    };

    const handlePartialSave = async () => {
        try {
            let payload: any = {};

            if (partEdit.type === "gender") payload.gender = form.gender;
            if (partEdit.type === "age") payload.age = Number(form.age);
            if (partEdit.type === "address") {
                payload.address = {
                    city: form.city,
                    country: form.country,
                };
            }

            const res = await fetch(`${_env.SERVER_URL}/user/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            updateUserData(data.user);

            notification.success({
                message: "Updated",
                description: "Profile updated successfully",
            });

            setPartEdit({ open: false, type: null });

        } catch (error: any) {
            notification.error({
                message: "Error",
                description: error.message,
            });
        }
    };

    return (
        <>
            <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={user?.profile_image || "/user.png"}
                    className="w-28 h-28 rounded-2xl object-cover border-3"
                />

                <div className="flex-1">
                    <h2 className="text-2xl font-bold">{user?.fullName}</h2>

                    <p className="text-gray-600 text-sm mt-2 flex gap-2 flex-wrap">

                        {user?.gender ? (
                            <span className=" capitalize">{user.gender}</span>
                        ) : (
                            <Button
                                size="small"
                                icon={<Plus size={14} />}
                                onClick={() => setPartEdit({ open: true, type: "gender" })}
                            >
                                Add Gender
                            </Button>
                        )}

                        <span>•</span>

                        {user?.age ? (
                            <span>Age: {user.age}</span>
                        ) : (
                            <Button
                                size="small"
                                icon={<Plus size={14} />}
                                onClick={() => setPartEdit({ open: true, type: "age" })}
                            >
                                Add Age
                            </Button>
                        )}

                        <span>•</span>

                        {user?.address?.city || user?.address?.country ? (
                            <span>
                                {user?.address?.city} {user?.address?.country}
                            </span>
                        ) : (
                            <Button
                                size="small"
                                icon={<Plus size={14} />}
                                onClick={() => setPartEdit({ open: true, type: "address" })}
                            >
                                Add Address
                            </Button>
                        )}
                    </p>

                    <p className="text-blue-900 font-semibold mt-2">
                        {user?.patientId}
                    </p>
                </div>

                <button
                    onClick={() => setOpenProfileModal(true)}
                    className="px-6 py-2 bg-blue-900 text-white rounded-xl"
                >
                    Edit Profile
                </button>
            </div>

            <Modal
                centered
                open={openEditProfileModal}
                onCancel={() => setOpenProfileModal(false)}
                footer={null}
                title={
                    <div className="flex items-center gap-2">
                        <User size={18} />
                        <span className="font-semibold">Edit Profile</span>
                    </div>
                }
            >
                <Form layout="vertical" onFinish={handleFullSave} className="mt-4">

                    <Form.Item label="Full Name">
                        <Input
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({ ...form, fullName: e.target.value })
                            }
                            placeholder="Enter full name"
                        />
                    </Form.Item>

                    <Form.Item label="Gender">
                        <Select
                            value={form.gender}
                            onChange={(val) => setForm({ ...form, gender: val })}
                            placeholder="Select gender"
                        >
                            <Select.Option disabled value="">Select your gender</Select.Option>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Age">
                        <Input
                            type="number"
                            value={form.age}
                            onChange={(e) =>
                                setForm({ ...form, age: e.target.value })
                            }
                            placeholder="Enter age"
                        />
                    </Form.Item>

                    <div className="bg-gray-50 p-3 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                            <MapPin size={16} />
                            Address
                        </div>

                        <Form.Item label="City">
                            <Input
                                value={form.city}
                                onChange={(e) =>
                                    setForm({ ...form, city: e.target.value })
                                }
                                placeholder="Enter city"
                            />
                        </Form.Item>

                        <Form.Item label="Country">
                            <Input
                                value={form.country}
                                onChange={(e) =>
                                    setForm({ ...form, country: e.target.value })
                                }
                                placeholder="Enter country"
                            />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => setOpenProfileModal(false)}
                            className="px-4 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-900 text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </Form>
            </Modal>

            <Modal
                centered
                open={partEdit.open}
                onCancel={() => setPartEdit({ open: false, type: null })}
                footer={null}
                title={
                    <span className="font-semibold capitalize">
                        Edit {partEdit.type}
                    </span>
                }
            >
                <div className="mt-4 space-y-3">

                    {partEdit.type === "gender" && (
                        <Select
                            className="w-full"
                            value={form.gender}
                            onChange={(val) => setForm({ ...form, gender: val })}
                        >
                            <Select.Option disabled value="">Select your gender</Select.Option>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    )}

                    {partEdit.type === "age" && (
                        <Input
                            type="number"
                            placeholder="Enter age"
                            value={form.age}
                            onChange={(e) =>
                                setForm({ ...form, age: e.target.value })
                            }
                        />
                    )}

                    {partEdit.type === "address" && (
                        <>
                            <Input
                                placeholder="City"
                                value={form.city}
                                onChange={(e) =>
                                    setForm({ ...form, city: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Country"
                                value={form.country}
                                onChange={(e) =>
                                    setForm({ ...form, country: e.target.value })
                                }
                            />
                        </>
                    )}

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() =>
                                setPartEdit({ open: false, type: null })
                            }
                            className="px-4 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handlePartialSave}
                            className="px-4 py-2 bg-blue-900 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ProfileCard;