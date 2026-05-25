
import React from "react";
import "./Contactus.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function Contactus() {
  return (
    <div className="contact-page">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          We are here to help you anytime 📞
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>
            Have questions about products, orders, or support?
            Reach out to our team anytime.
          </p>

          <div className="info-box">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h4>Phone</h4>
              <span>+91 8309396628</span>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email</h4>
              <span>sparrowjack9635@gmail.com</span>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Location</h4>
              <span>Hyderabad, India</span>
            </div>
          </div>

          <div className="info-box">
            <FaClock className="info-icon" />
            <div>
              <h4>Working Hours</h4>
              <span>Mon - Sat : 9AM - 8PM</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form-box">

          <form
            className="contact-form"
            action="https://formsubmit.co/sparrowjack9635@gmail.com"
            method="POST"
          >

            <input
              type="text"
              placeholder="Enter your name"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              required
            ></textarea>

            <input
              type="hidden"
              name="_subject"
              value="New Contact Message From ElectroShop"
            />

            <button type="submit">
              Send Message
            </button>

            <p className="mail-note">
              📩 Your message will be sent directly to our email.
            </p>

          </form>

        </div>

      </div>

      <div className="map-section">

  <h2>Our Location 📍</h2>

  <iframe
    title="ElectroShop Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.326639651304!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcce0406f4f6b91%3A0x6f3b7d0a6a4c6d9b!2sHyderabad!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>

</div>

    </div>
  );
}

export default Contactus;




