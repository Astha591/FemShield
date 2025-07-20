import React from "react";
 import { Link } from "react-router-dom"; 
import bg from "../assets/images/bg.png";
import pcos from "../assets/images/pcos.png";
import breast_cancer from "../assets/images/breast_cancer.png";
import cervical from "../assets/images/cervical.png";
import pregnancy from "../assets/images/pregnancy.png";
import thy from "../assets/images/thy.png";

import ai from "../assets/images/ai.svg";
import time from "../assets/images/time.svg";
import prv from "../assets/images/prv.svg";
import holistic from "../assets/images/holistic.svg";

import fb from "../assets/images/fb.svg";
import insta from "../assets/images/insta.svg";
import twitter from "../assets/images/twitter.svg";



const Home = () => {
  const assessments = [
  {
    title: "PCOS Risk",
    description: "Assess your risk for Polycystic Ovary Syndrome (PCOS).",
    image: pcos,
    route: "/pcos",
  },
  {
    title: "Breast Cancer Risk",
    description: "Evaluate your risk for breast cancer.",
    image: breast_cancer,
    route: "/breastCancer",
  },
  {
    title: "Pregnancy Risk",
    description: "Determine your pregnancy risk factors.",
    image: pregnancy,
    route: "/pregnancy",
  },
  {
    title: "Thyroid Risk",
    description: "Check your risk for thyroid issues.",
    image: thy,
    route: "/thyroid",
  },
  {
    title: "Cervical Cancer Risk",
    description: "Assess your risk for cervical cancer.",
    image: cervical,
    route: "/cervicalCancer",
  },
];
  const features = [
    {
      title: "AI-Powered Precision",
      description:
        "Our AI algorithms provide accurate and personalized health risk assessments.",
      icon: ai,
    },
    {
      title: "24/7 Availability",
      description:
        "Access our health companion anytime, anywhere, for immediate insights.",
      icon: time,
    },
    {
      title: "Privacy-First & Secure",
      description:
        "Your data is protected with top-tier security measures, ensuring complete privacy.",
      icon: prv,
    },
    {
      title: "Holistic, Woman-Centered Care",
      description:
        "We focus on your overall well-being, offering comprehensive and compassionate care.",
      icon: holistic,
    },
  ];

  const socialIcons = [
    {
      src: twitter,
      alt: "Social icon 1",
    },
    {
      src: insta,
      alt: "Social icon 2",
    },
    {
      src: fb,
      alt: "Social icon 3",
    },
  ];

  const navigationLinks = [
    { label: "About FemShield", href: "/about" },
    { label: "Assessments", href: "/assessments" },
    { label: "Connect", href: "/connect" },
    { label: "Terms & Privacy", href: "/terms" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
   
      {/* Hero Section */}
      <header
  className="text-center py-20 w-960px h-512px"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <h1 className="text-4xl font-bold text-gray-800">Your 24x7 AI Health Companion for Women</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Get personalized assessments and expert insights for various health
          risks, including PCOS, breast cancer, pregnancy, thyroid issues, and
          cervical cancer. Empowering women with AI-driven health insights in
          a secure and nurturing environment.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <a
            href="#assessments"
            className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700"
          >
            Get Started
          </a>
          <a
            href="#assessments"
            className="bg-white text-pink-600 border border-pink-600 px-6 py-3 rounded-full hover:bg-pink-100"
          >
            Explore Assessments
          </a>
        </div>
      </header>



{/* Assessments Section */}
<section id="assessments" className="py-16 px-4">
  <h2 className="text-3xl font-bold text-center">Assessments</h2>
  <div className="mt-8 flex flex-wrap justify-center gap-6">
    {assessments.map((a, index) => (
      <Link
        key={index}
        to={a.route} // Route defined in your assessments array
        className="bg-white rounded-xl p-4 shadow hover:shadow-lg w-64 flex flex-col justify-start"
      >
        <img
          src={a.image}
          alt={a.title}
          className="w-full h-40 object-cover rounded-lg"
        />
        <h3 className="text-xl font-semibold mt-3">{a.title}</h3>
        <p className="text-gray-600 mt-1">{a.description}</p>
      </Link>
    ))}
  </div>
</section>

      {/* Why FemShield Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold">Why FemShield?</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Empowering Women's Health with AI
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow hover:shadow-lg">
              <img src={f.icon} alt={f.title} className="w-6 h-6 mx-auto" />
              <h3 className="text-xl font-semibold mt-3">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Take Charge of Your Health Today</h2>
        <p className="mt-2 max-w-2xl mx-auto">
          Begin your journey towards better health with FemShield's AI-powered
          assessments and expert insights.
        </p>
        <a
          href="#assessments"
          className="mt-4 inline-block bg-white text-pink-600 font-bold rounded-full px-8 py-3 hover:bg-gray-100"
        >
          Start Your Assessment Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10">
        <div className="flex flex-col items-center space-y-4">
          <nav className="flex flex-wrap justify-center gap-6">
            {navigationLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-gray-600 hover:text-gray-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex space-x-4">
            {socialIcons.map((icon, idx) => (
              <a key={idx} href="#">
                <img src={icon.src} alt={icon.alt} className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-gray-500">© 2024 FemShield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;