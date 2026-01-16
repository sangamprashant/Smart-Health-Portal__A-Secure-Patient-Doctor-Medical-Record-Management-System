const Hero = () => {
  return (
    <section className="bg-blue-900 text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Smart Health Portal <br />
            <span className="text-blue-200">
              Your Digital Healthcare Companion
            </span>
          </h1>

          <p className="mt-5 text-blue-100 max-w-xl mx-auto md:mx-0">
            Manage your medical records, book doctor appointments,
            and access emergency health information securely —
            all in one smart platform.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-900 transition">
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center md:justify-start">
            <div>
              <h3 className="text-2xl font-bold">200K+</h3>
              <p className="text-sm text-blue-200">Patients Registered</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">180+</h3>
              <p className="text-sm text-blue-200">Verified Doctors</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">24×7</h3>
              <p className="text-sm text-blue-200">Emergency Access</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/doctor.png"
            alt="Doctor"
            className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain"
          />
        </div>

      </div>

    </section>
  );
};

export default Hero;
