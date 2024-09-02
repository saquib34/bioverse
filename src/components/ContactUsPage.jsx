import React from 'react';
import ContactUsForm from './ContactUsForm';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import LoginNavbar from './loginNavbar';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <LoginNavbar />
      <div className="pt-16 flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-6xl bg-white bg-opacity-10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Get in Touch
            </motion.h1>
            <p className="text-gray-300 text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="space-y-4">
              {[
                { icon: FiMail, text: "shadmanshahin6@gmail.com" },
                { icon: FiMapPin, text: "SRM RAMAPURAM" },
                { icon: FiPhone, text: "+91 7070927837" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <item.icon className="w-6 h-6 text-purple-400" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white bg-opacity-5 p-8 md:p-12">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;