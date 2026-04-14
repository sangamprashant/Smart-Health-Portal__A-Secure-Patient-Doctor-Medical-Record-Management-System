import React, { useEffect, useState } from "react";

const WORK_START = 10; // 10 AM
const WORK_END = 18;   // 6 PM
const SLOT_DURATION = 15; // minutes

const BookAppointments = () => {
  // ✅ Dummy IDs
  const doctorId = "doc_123";
  const patientId = "pat_456";

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  // 🔥 Dummy DB (in-memory)
  const [bookings, setBookings] = useState<any[]>([]);

  // 🔥 Generate slots dynamically
  const generateSlots = () => {
    const slots = [];
    let start = WORK_START * 60;
    let end = WORK_END * 60;

    for (let i = start; i < end; i += SLOT_DURATION) {
      const hour = Math.floor(i / 60);
      const min = i % 60;

      const time = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;

      slots.push(time);
    }

    return slots;
  };

  // 🔥 Simulate API: get availability
  const fetchSlots = (selectedDate: string) => {
    const allSlots = generateSlots();

    const slotMap: any = {};

    bookings
      .filter((b) => b.date === selectedDate && b.doctorId === doctorId)
      .forEach((b) => {
        slotMap[b.time] = (slotMap[b.time] || 0) + 1;
      });

    const result = allSlots.map((time) => ({
      time,
      booked: slotMap[time] || 0,
      available: (slotMap[time] || 0) < 2,
    }));

    setSlots(result);
  };

  useEffect(() => {
    if (date) fetchSlots(date);
  }, [date, bookings]);

  // 🔥 Dummy booking logic
  const handleBook = () => {
    if (!selectedTime) return;

    const alreadyBooked = bookings.find(
      (b) =>
        b.patientId === patientId &&
        b.date === date &&
        b.time === selectedTime
    );

    if (alreadyBooked) {
      alert("You already booked this slot");
      return;
    }

    const count = bookings.filter(
      (b) =>
        b.doctorId === doctorId &&
        b.date === date &&
        b.time === selectedTime
    ).length;

    if (count >= 2) {
      alert("Slot full");
      return;
    }

    const newBooking = {
      id: Date.now(),
      doctorId,
      patientId,
      date,
      time: selectedTime,
      reason,
    };

    setBookings([...bookings, newBooking]);
    alert("Appointment booked (dummy)");

    setSelectedTime("");
    setReason("");
  };

  return (
    <div className="p-6">
      {/* Date */}
      <div className="flex justify-end">
        <input
          type="date"
          className="border rounded border-gray-300 p-2 py-1 w-36"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

      {/* 🔥 Placeholder */}
      {!date && (
        <div className="mt-6 space-y-4 grid grid-cols-3 gap-6">
          {[...Array(WORK_END - WORK_START)].map((_, idx) => {
            const hour = WORK_START + idx;

            return (
              <div key={hour}>
                <p className="text-sm text-gray-500 mb-2">
                  {hour}:00 - {hour + 1}:00
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {[0, 15, 30, 45].map((min) => {
                    const time = `${hour
                      .toString()
                      .padStart(2, "0")}:${min
                      .toString()
                      .padStart(2, "0")}`;

                    return (
                      <div
                        key={time}
                        className="p-2 text-center border rounded bg-gray-100 text-gray-400"
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🔥 Real Slots */}
      {slots.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {slots.map((slot) => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => setSelectedTime(slot.time)}
              className={`p-2 border rounded text-sm ${
                selectedTime === slot.time
                  ? "bg-blue-500 text-white"
                  : slot.available
                  ? "bg-green-100"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {slot.time}
              <div className="text-xs">
                {slot.booked}/2 booked
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Reason */}
      <textarea
        placeholder="Reason"
        className="border p-2 w-full mt-4"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleBook}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        disabled={!selectedTime}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default BookAppointments;