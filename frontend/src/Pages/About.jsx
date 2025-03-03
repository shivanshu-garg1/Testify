import  { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, BarChart, Shield, Smartphone, Brain } from 'lucide-react';
import image1 from "../assets/img1.jpeg"
import image2 from "../assets/img2.avif"
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
export default function About() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  

  const features = [
    {
      title: "Automated Grading",
      description: "Instant evaluation & feedback with auto-grading for all types of assessments.",
      icon: <CheckCircle className="w-12 h-12 text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      title: "Secure Exam Environment",
      description: "AI-powered cheat detection & secure browser settings for test integrity.",
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      color: "bg-indigo-100"
    },
    {
      title: "Real-Time Tracking",
      description: "Monitor student progress live with detailed analytics and insights.",
      icon: <BarChart className="w-12 h-12 text-purple-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Multi-Device Support",
      description: "Access tests from any device, anywhere, with responsive design.",
      icon: <Smartphone className="w-12 h-12 text-purple-600" />,
      color: "bg-teal-100"
    },
    {
      title: "AI-Powered Insights",
      description: "Smart analytics to personalize learning paths and improve outcomes.",
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      color: "bg-violet-100"
    }
  ];

  const nextFeature = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveFeature((prev) => (prev + 1) % features.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevFeature = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      nextFeature();
    }, 5000);
    return () => clearInterval(interval);
  });

  
  return (
    <>
    <title>Testify | About</title>
    
    <div className="min-h-screen  text-white ">
      
    <Navbar logo="Testify"/>
      {/* Hero Section with Animation */}
      <div className="pt-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white text-gray-900 rounded-lg shadow-2xl mb-12 overflow-hidden relative m-10">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Revolutionizing
              <br />Test Management
              <br />for a Smarter
              <br />Future!
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome to Testify, a revolutionary test management platform designed to simplify exam creation, administration, and evaluation. Built for educators and students alike, Testify enhances the testing experience with automation, real-time tracking, and AI-driven insights.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img 
              src={image1}
              alt="Digital Education" 
              className="rounded-lg shadow-lg w-full max-w-md transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-200 rounded-full opacity-20"></div>
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-300 rounded-full opacity-20"></div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-white text-gray-900 rounded-lg shadow-xl p-8 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/5">
              <img 
                src={image2}
                alt="Our Mission" 
                className="rounded-lg shadow-lg w-full transform hover:rotate-2 transition-transform duration-500"
              />
            </div>
            <div className="md:w-3/5">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-800">Why We Exist?</h2>
              <p className="text-gray-600 mb-6">
                Our mission is to revolutionize test management by providing an intuitive, efficient, and secure platform for both educators and students. We aim to simplify the test-taking process, ensuring that teachers can focus on teaching while students get a stress-free exam experience.
              </p>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">How We Achieve This</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" />
                  <span><strong>Seamless Test Creation & Automated Evaluation</strong> – Teachers can easily create, customize, and manage tests with automated grading for instant feedback.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" />
                  <span><strong>Enhanced Security & Anti-Cheating Measures</strong> – AI-powered cheat detection, secure browser settings, and randomized questions ensure fair assessments.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" />
                  <span><strong>Multi-Device Accessibility & Cloud Storage</strong> – Access tests anytime, anywhere on laptops, tablets, or mobile devices with cloud-based storage for reliability.</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20"></div>
        </div>

        {/* Key Features Section with Animation */}
        <div className="bg-white text-gray-900 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-purple-800">What Sets Us Apart</h2>
          
          <div className="relative">
            {/* Feature Carousel */}
            <div className="overflow-hidden">
              <div className="flex justify-center">
                <div 
                  className={`w-full max-w-3xl ${features[activeFeature].color} rounded-xl p-8 shadow-lg transform transition-all duration-500 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white p-4 rounded-full shadow-md">
                      {features[activeFeature].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">{features[activeFeature].title}</h3>
                      <p className="text-gray-700">{features[activeFeature].description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevFeature}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-purple-100 transition-colors duration-300"
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-6 h-6 text-purple-800" />
            </button>
            <button 
              onClick={nextFeature}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-purple-100 transition-colors duration-300"
              aria-label="Next feature"
            >
              <ChevronRight className="w-6 h-6 text-purple-800" />
            </button>
          </div>
          
          {/* Feature Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeFeature === index ? 'bg-purple-600 w-6' : 'bg-purple-300'}`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
          
          {/* All Features Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg ${activeFeature === index ? 'border-2 border-purple-600' : 'border border-gray-200'}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-purple-800">{feature.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action with Redirects */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-xl p-8 mb-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Testing Experience?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of educators and institutions who have already revolutionized their assessment process with Testify.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
               
                className="bg-white text-purple-800 hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Link to='/signup'>
                Sign Up Now
                </Link>
              </button>
              <button 
               
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Contact Us
              </button>
            </div>
          </div>
          
        
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}