import Statx from "./Statx";

const Hero = () => {
  return (
    <section className="bg-slate-50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Smart Health Portal <br />
            <span className="text-blue-900">
              Your Digital Healthcare Companion
            </span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-xl mx-auto md:mx-0">
            Manage your medical records, book doctor appointments,
            and access emergency health information securely —
            all in one intelligent healthcare platform.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-blue-900 text-white px-7 py-3 rounded-md font-semibold hover:bg-blue-950 transition">
              Get Started
            </button>

            <button className="border border-blue-900 text-blue-900 px-7 py-3 rounded-md hover:bg-blue-900 hover:text-white transition">
              Contact Us
            </button>
          </div>


        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center flex-col items-center">
          <img
            src="/doctors-3.png"
            alt="Doctor illustration"
            className="w-full h-full object-contain"
          />
          {/* Stats */}
          <Statx />
        </div>
      </div>
    </section>
  );
};

export default Hero;
