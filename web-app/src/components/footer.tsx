const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 pt-16">

      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Smart Health Portal
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Smart Health Portal is a secure digital healthcare platform
            that helps patients and doctors manage medical records,
            appointments, and emergency health access efficiently.
          </p>

          <p className="mt-4 text-sm text-gray-400">
            © {new Date().getFullYear()} Smart Health Portal  
            <br />All rights reserved.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Doctors</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Our Services
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Medical Record Management</li>
            <li>Doctor Appointment Booking</li>
            <li>Emergency Health Access</li>
            <li>Online Consultation</li>
            <li>Health History Tracking</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Info
          </h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>📍 Lucknow, Uttar Pradesh, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉ smarthealthportal@gmail.com</li>
            <li>🕒 24×7 Emergency Support</li>
          </ul>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-blue-800 mt-12"></div>

      {/* BOTTOM FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

        <p>
          Designed & Developed by  
          <span className="text-white font-semibold"> Prashant Srivastav</span>
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
