import React, { useState, useRef } from 'react';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [shake, setShake] = useState(false);

  const canvasRef = useRef(null);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#9d4edd', '#00b4d8', '#ffbd2e', '#ff5f56', '#27c93f'];
    const particles = [];

    // Create 60 colorful particles emerging from the button center
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height - 40,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 10 - 6, // Explode upwards
        gravity: 0.25,
        opacity: 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.opacity -= 0.015;

        if (p.opacity > 0) {
          alive = true;
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!email.trim() || !EMAIL_REGEX.test(email.trim().toLowerCase())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (!validate()) {
      // Trigger a shake effect on the submit button for UX polish
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully.'
        });
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        // Trigger visual success celebration
        triggerConfetti();
      } else {
        throw new Error(result.message || 'An error occurred during submission.');
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        text: `Error: ${err.message || 'Unable to connect to the mail server. Please try again later.'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <h2 className="section-title"><span className="title-number">06.</span> Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info-panel">
            <h3>Let's collaborate on AI and automation.</h3>
            <p>I am looking for internship opportunities or collaborative projects. If you have an opening, need some data engineering work, or just want to talk tech, feel free to reach out!</p>
            
            <div className="info-details">
              <div className="info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:zinjurke77h@gmail.com">zinjurke77h@gmail.com</a>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+917028921574">+91 7028921574</a>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>Location</h4>
                  <p>Pune, India</p>
                </div>
              </div>
            </div>
          </div>
          
              <div className="contact-form-panel" style={{ position: 'relative' }}>
                <canvas 
                  ref={canvasRef} 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10,
                    borderRadius: 'var(--radius-lg)'
                  }}
                />
                <form id="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-grid-2">
                    <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                      <label htmlFor="form-name">Name</label>
                      <input 
                        type="text" 
                        id="form-name" 
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <span className="error-msg">{errors.name}</span>
                    </div>
                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                      <label htmlFor="form-email">Email</label>
                      <input 
                        type="email" 
                        id="form-email" 
                        placeholder="email@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <span className="error-msg">{errors.email}</span>
                    </div>
                  </div>
                  <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                    <label htmlFor="form-message">Message</label>
                    <textarea 
                      id="form-message" 
                      rows="5" 
                      placeholder="Hi Suyash, we have an opening..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                    <span className="error-msg">{errors.message}</span>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block" 
                    disabled={isSubmitting}
                    style={{ animation: shake ? 'shake 0.4s ease' : 'none' }}
                  >
                    {isSubmitting ? (
                      <><span className="spinner"></span> Submitting...</>
                    ) : (
                      <>Send Message <i className="fa-solid fa-paper-plane"></i></>
                    )}
                  </button>
                  {status.text && (
                    <div className={`form-status ${status.type}`}>
                      <i className="fa-solid fa-circle-check"></i> {status.text}
                    </div>
                  )}
                </form>
              </div>
        </div>
      </div>
    </section>
  );
}
