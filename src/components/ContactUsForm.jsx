import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Adjust this import path as needed

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');

    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        timestamp: new Date()
      });
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear the form
    } catch (error) {
      console.error('Error submitting form: ', error);
      setSubmitStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {['name', 'email'].map((field) => (
        <motion.div
          key={field}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: field === 'name' ? 0.2 : 0.3 }}
        >
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b-2 border-purple-400 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        </motion.div>
      ))}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className="w-full bg-transparent border-b-2 border-purple-400 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors resize-none"
          placeholder="Your Message"
        ></textarea>
      </motion.div>
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Send Message</span>
        <FiSend className="w-5 h-5" />
      </motion.button>
      {submitStatus && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center ${
            submitStatus === 'Sending...' ? 'text-yellow-300' :
            submitStatus.includes('successfully') ? 'text-green-300' : 'text-red-300'
          }`}
        >
          {submitStatus}
        </motion.p>
      )}
    </motion.form>
  );
};

export default ContactUsForm;