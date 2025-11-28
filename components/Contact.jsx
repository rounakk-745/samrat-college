import React from 'react';
import { Send, HelpCircle, MapPin, Phone, Mail } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';
import { CONTACT_INFO } from '@/constants';

export default function Contact() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle title="Contact Us" subtitle="Get in touch with us for any queries" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div>
                    <SectionTitle title="Send a Message" subtitle="Have a question? Drop us a line." />
                    <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Name</label>
                                <input type="text" className="w-full p-4 bg-white border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Phone</label>
                                <input type="text" className="w-full p-4 bg-white border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition" placeholder="+91..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input type="email" className="w-full p-4 bg-white border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Subject</label>
                            <select className="w-full p-4 bg-white border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition">
                                <option>General Enquiry</option>
                                <option>Admissions</option>
                                <option>Placement Cell</option>
                                <option>Grievance</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Message</label>
                            <textarea rows={5} className="w-full p-4 bg-white border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2">
                            <Send size={20} /> Send Message
                        </button>
                    </form>
                </div>

                {/* Map and FAQ */}
                <div className="space-y-8">
                    <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.6885764033065!2d77.36352977623017!3d28.609115375677545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce56074e146c1%3A0x7a6b4b6b6b6b6b6b!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: '0.5rem' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="College Location"
                        ></iframe>
                    </div>

                    <div className="bg-blue-50 p-8 rounded-xl">
                        <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2"><HelpCircle size={24} /> Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                { q: "What is the last date for admission?", a: "Admissions for 2024-25 close on July 31st." },
                                { q: "Is hostel facility available?", a: "Yes, we have separate hostels for boys and girls within the campus." },
                                { q: "Do you provide transport?", a: "Bus facility is available from all major points in the city." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition">
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{faq.q}</h4>
                                    <p className="text-gray-600 text-sm">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}