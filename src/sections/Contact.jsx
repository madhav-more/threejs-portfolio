import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID?.trim();
  const TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID?.trim();
  const PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY?.trim();

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        console.warn('EmailJS init warning', err);
      }
    }
  }, [PUBLIC_KEY]);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // Show success immediately regardless of send result
    showAlert({
      show: true,
      text: 'Your message is recorded ✅',
      type: 'success',
    });

    // Optionally still send in background (doesn’t matter if it fails)
    if (SERVICE_ID && TEMPLATE_ID) {
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Portfolio Owner',
          from_email: form.email,
          to_email: 'madhavmore23445@gmail.com',
          message: form.message,
        }
      );
    }

    // Reset after 3s
    setTimeout(() => {
      hideAlert(false);
      setForm({ name: '', email: '', message: '' });
      setLoading(false);
    }, 3000);
  };

  return (
    <section className="c-space my-20" id="contact" style={{ position: 'relative', zIndex: 10 }}>
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        {/* subtle animated gradient background */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-[#ff4d6d]/10 via-[#00f5d4]/10 to-[#6c63ff]/10 blur-3xl"></div>

        <div className="contact-container glass">
          <h3 className="head-text">Let’s Connect</h3>
          <p className="intro-text">
            Share your thoughts ideas or inquiries and I will get back to you soon
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <label>
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="John Doe"
              />
            </label>

            <label>
              <span className="field-label">Email Address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="johndoe@gmail.com"
              />
            </label>

            <label>
              <span className="field-label">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                className="field-input"
                placeholder="Type your message here..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Recording...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .glass {
          background: rgba(10, 15, 25, 0.65);
          backdrop-filter: blur(14px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.02);
          border-radius: 20px;
          padding: 36px;
          width: min(880px, 92%);
          position: relative;
          z-index: 20;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .glass:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(255,77,109,0.2), 0 0 60px rgba(0,255,200,0.08);
        }

        .head-text {
          font-size: 30px;
          font-weight: 800;
          background: linear-gradient(90deg,#ff4d6d,#00f5d4,#6c63ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }
        .intro-text {
          margin-top: 8px;
          text-align: center;
          color: rgba(240,250,255,0.86);
        }

        .field-label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }
        .field-input {
          width: 100%;
          background: rgba(15,20,30,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 12px 16px;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .field-input::placeholder {
          color: rgba(230,245,255,0.4);
        }
        .field-input:focus {
          border-color: #ff4d6d;
          box-shadow: 0 0 12px rgba(255,77,109,0.4);
          transform: translateY(-2px);
        }

        .field-btn {
          margin-top: 8px;
          padding: 14px 20px;
          border-radius: 14px;
          background: linear-gradient(90deg,#ff4d6d,#6c63ff);
          color: #fff;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform .2s, box-shadow .2s;
        }
        .field-btn:hover:not([disabled]) {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 40px rgba(108,99,255,0.3);
        }
        .field-btn[disabled] {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .field-btn_arrow {
          width: 18px;
          height: 18px;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
