"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone) {
      setStatus("Please provide your name and phone number.");
      return;
    }

    // Here you would send data to backend
    setStatus("Thank you! We’ll contact you within 24 hours.");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <section id="contact-form" className="py-20 bg-[#F6F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-extrabold text-black/80 mb-4">
            Take the First Step Today
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            Your healthier tomorrow begins with a simple message today. Fill out
            the form below and let us help you start your journey to better
            health.
          </p>
        </div>

        {/* Form & Contact Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-black/80">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-black/80 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:border-[#12a4dd]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-semibold text-black/80 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:border-[#12a4dd]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-black/80 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:border-[#12a4dd]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-semibold text-black/80 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your concerns or questions..."
                  className="w-full border border-gray-200 bg-gray-100 px-4 py-3 rounded-lg min-h-[120px] focus:outline-none focus:border-[#12a4dd]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Send Message
              </button>

              {status && (
                <p className="text-sm text-[#12a4dd] mt-2 text-center font-medium">
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Clinic Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black/80">
                Visit Our Clinic
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#12a4dd]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#12a4dd]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black/80">
                      Address
                    </h4>
                    <p className="text-black/60 text-sm leading-relaxed">
                     1st Floor, Golden Heights Building, 
                      <br />
                      Jhankar More, Burdwan Road, Siliguri
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#12a4dd]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#12a4dd]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black/80">Phone</h4>
                    <p className="text-black/60 text-sm leading-relaxed">
                      +91 98765 43210
                      <br />
                      +91 98765 43211 (Emergency)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#12a4dd]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#12a4dd]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black/80">Email</h4>
                    <p className="text-black/60 text-sm leading-relaxed">
                      care@diabeticclinic.com
                      <br />
                      emergency@diabeticclinic.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#12a4dd]/5 rounded-xl border border-[#12a4dd]/20">
              <h4 className="font-semibold text-lg mb-2 text-black/80">
                Clinic Hours
              </h4>
              <div className="space-y-1 text-black/60 text-sm leading-relaxed">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
                <p className="text-[#12a4dd] font-medium mt-2">
                  Emergency: 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
