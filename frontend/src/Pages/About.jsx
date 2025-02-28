/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BarChart,
  Shield,
  Smartphone,
  Brain,
} from "lucide-react";

import image1 from "../assets/img1.jpeg";
import image2 from "../assets/img2.avif";

export default function About() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const features = [
    {
      title: "Automated Grading",
      description:
        "Instant evaluation & feedback with auto-grading for all types of assessments.",
      icon: <CheckCircle className="w-12 h-12 text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Secure Exam Environment",
      description:
        "AI-powered cheat detection & secure browser settings for test integrity.",
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      color: "bg-indigo-100",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Monitor student progress live with detailed analytics and insights.",
      icon: <BarChart className="w-12 h-12 text-purple-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Multi-Device Support",
      description:
        "Access tests from any device, anywhere, with responsive design.",
      icon: <Smartphone className="w-12 h-12 text-purple-600" />,
      color: "bg-teal-100",
    },
    {
      title: "AI-Powered Insights",
      description:
        "Smart analytics to personalize learning paths and improve outcomes.",
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      color: "bg-violet-100",
    },
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
      setActiveFeature(
        (prev) => (prev - 1 + features.length) % features.length
      );
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
    <div className="bg-purple-900">
      <title>Testify | About</title>
      <div className="pt-16 px-4 text-lg font-semibold">
        {/* Section 1 */}
        <div className="flex gap-5 justify-center p-5  bg-white rounded-b-md">
          {/* Content Section */}
          <div className="overflow-hidden w-[150] flex flex-col  ">
            <h1 className="text-7xl font-bold  p-3">
              Empowering <h1 />
              <h1>Education </h1>
              <h1>with Smart Test </h1>
              <h1>Management</h1>
            </h1>
            <p className="text-gray-600 p-3">
              Welcome to Testify, a revolutionary test management platform
              designed to simplify exam creation, administration, and
              evaluation. Built for educators and students alike, Testify
              enhances the testing experience with automation, real-time
              tracking, and AI-driven insights.
            </p>
          </div>

          {/* Animation (GIF Section) */}
          <div className="w-[200] h-[200] relative">
            <img
              src={gifAnimation}
              alt="Animated GIF"
              className="w-full h-full rounded-sm"
            />
          </div>
        </div>
      </div>
      Further Content...
    </div>
  );
}
