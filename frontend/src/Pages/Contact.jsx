import { useState } from 'react';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
     
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about Testify? We are here to help! Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
            <p className="text-gray-600 mb-6">Reach out to us through any of these channels</p>
            <div className="flex items-center space-x-4 mb-4">
              <Mail className="h-6 w-6 text-purple-600" />
              <p className="text-gray-600">info@testify.com</p>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <Phone className="h-6 w-6 text-purple-600" />
              <p className="text-gray-600">+1 (123) 456-7890</p>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-4" />
                <p className="text-green-700">Message Sent! We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="demo">Request a Demo</option>
                </select>
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-300"></textarea>
                <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg flex justify-center items-center">
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
     
    </div>
    <Footer />
    </>
  );
};

export default Contact;
