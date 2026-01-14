function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">

        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
          Real-Time Complaint Management System
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          A MERN Stack & React Native based system to register, track, and resolve
          complaints with real-time updates and transparency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-blue-700">User Module</h3>
            <p className="text-sm text-gray-600">
              Register and track complaints in real time
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-xl">
            <h3 className="font-semibold text-green-700">Admin Module</h3>
            <p className="text-sm text-gray-600">
              Assign, manage, and resolve complaints
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl">
            <h3 className="font-semibold text-purple-700">Real-Time Updates</h3>
            <p className="text-sm text-gray-600">
              Instant notifications & status tracking
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          MCA Final Year Project | MERN + React Native
        </p>

      </div>
    </div>
  );
}

export default App;
