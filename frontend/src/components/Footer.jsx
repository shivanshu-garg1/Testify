import { Github, Twitter, Linkedin, Mail, Heart, CheckCircle, BarChart, Shield, Smartphone, Brain } from 'lucide-react';

const Footer = () => {
  
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" }
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Testify</h3>
            <p className="text-gray-100 mb-4">
              Revolutionizing test management for educators and students with automation, security, and AI-driven insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.path} className="text-white/80 hover:text-white flex items-center gap-2 hover:translate-x-1 transform duration-300">
                      <span className="w-1.5 h-1.5 bg-white/80 rounded-full"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Features</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Automated Grading', icon: <CheckCircle size={16} /> },
                  { name: 'Secure Exam Environment', icon: <Shield size={16} /> },
                  { name: 'Real-Time Tracking', icon: <BarChart size={16} /> },
                  { name: 'Multi-Device Support', icon: <Smartphone size={16} /> },
                  { name: 'AI-Powered Insights', icon: <Brain size={16} /> }
                ].map((feature) => (
                  <li key={feature.name} className="text-white/80 flex items-center gap-2">
                    {feature.icon}
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-white/80">
              <p>Chitkara University</p>
              <p>Himachal Pradesh</p>
              <p>India</p>
              <p className="mt-2">Email: info@testify.com</p>
              <p>Phone: +91 78072 00645</p>
            </address>
            <a href="/contact">
              <button className="mt-4 bg-white text-purple-800 hover:bg-gray-100 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm">
               Get in touch
              </button>
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
         
          <div className="mt-4 md:mt-0 flex items-center">
            <p className="text-white/80 flex items-center">
              Made with <Heart size={16} className="mx-1 text-red-400" /> by Testify Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
