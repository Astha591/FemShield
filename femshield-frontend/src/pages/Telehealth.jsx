import React, { useEffect, useState } from "react";
import axios from "axios";

const Telehealth = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/doctors");
        if (Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        } else {
          console.error("Expected an array, got:", response.data);
          setError("Invalid data received from the server.");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load doctors. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Book Appointment
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedSlot || !userName) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/book", {
        user_name: userName,
        slot: selectedSlot,
        doctor_id: selectedDoctor,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error booking appointment. Try again later.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-[#ef427c] text-center">Telehealth Appointments</h1>

      {loading && <p className="text-center mt-4">Loading doctors...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {!loading && !error && Array.isArray(doctors) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg p-4 shadow">
              <h2 className="font-bold text-xl">{doc.name}</h2>
              <p className="text-gray-600">{doc.specialization}</p>
              <p className="text-gray-500">Available slots: {doc.available_slots.join(", ")}</p>
              <button
                className="mt-3 bg-[#ef427c] text-white rounded p-2 hover:bg-[#d93a6e]"
                onClick={() => {
                  setSelectedDoctor(doc.id);
                  alert(`Selected ${doc.name}. Now fill the form to book.`);
                }}
              >
                Select Doctor
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg p-4 mt-6 shadow">
        <h3 className="font-bold text-lg">Book an Appointment</h3>
        <form onSubmit={handleBooking} className="space-y-3 mt-3">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded p-2 w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Slot (e.g., 10:00 AM)"
            className="border rounded p-2 w-full"
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            required
            disabled={!selectedDoctor}
          />
          <button
            type="submit"
            className="bg-[#ef427c] text-white rounded p-2 w-full hover:bg-[#d93a6e]"
            disabled={!selectedDoctor}
          >
            Book Appointment
          </button>
        </form>
        {message && <p className="mt-3 font-bold">{message}</p>}
      </div>
    </div>
  );
};

export default Telehealth;
