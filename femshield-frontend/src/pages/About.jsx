import React from "react";
import about from "../assets/images/about.png";
import { Heart, Shield, Users } from "lucide-react";

const coreValues = [
  {
    icon: Heart,
    title: "Personalized Insights",
    description:
      "Receive tailored health recommendations based on your unique profile and goals.",
  },
  {
    icon: Shield,
    title: "Cycle Tracking",
    description:
      "Monitor your menstrual cycle, predict periods, and understand your body’s patterns.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description:
      "Connect with healthcare professionals for guidance and support on your health journey.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="flex-1">
            <img
              src={about}
              alt="FemShield"
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="flex flex-col flex-1">
            <h1 className="font-bold text-5xl text-[#160f11] leading-[60px]">
              Your AI‑Powered Women's Health Assistant
            </h1>
            <p className="text-[#160f11] mt-4 text-base leading-6">
              FemShield is your personal guide to understanding and managing your
              health. Get personalized insights, track your cycles, and connect
              with experts.
            </p>
            <a
              href="/get-started"
              className="mt-4 inline-block text-center font-bold rounded-xl bg-[#ff70a5] hover:bg-[#ff5a95] text-[#160f11] py-3 px-8"
            >
              Get Started
            </a>
          </div>
        </div>
      </main>

      {/* Core Values Section */}
      <section className="bg-gray-50 w-full py-10">
        <div className="max-w-5xl mx-auto flex flex-col items-start space-y-6 px-4">
          <h2 className="font-bold text-4xl text-[#160f11]">
            How FemShield Works
          </h2>
          <p className="text-[#160f11] text-base max-w-2xl leading-6">
            FemShield combines AI with expert knowledge to provide personalized
            health support.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex flex-col flex-1 border border-gray-200"
              >
                <value.icon className="w-6 h-6 text-[#160f11]" />
                <h3 className="font-bold text-base mt-3 text-[#160f11]">
                  {value.title}
                </h3>
                <p className="text-[#8c5e70] text-sm mt-1 leading-5">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 mt-10">
        <div className="flex justify-center space-x-6">
          <a
            href="/privacy"
            className="hover:text-[#160f11] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-[#160f11] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="hover:text-[#160f11] transition-colors"
          >
            Contact Us
          </a>
        </div>
        <p className="mt-2 text-gray-500 text-sm">
          ©2024 FemShield. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
