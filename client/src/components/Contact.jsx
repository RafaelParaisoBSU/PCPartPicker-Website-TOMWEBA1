import { useState } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/Contact.scss';
import Modal from './Modal';

// Contact form component - handles customer inquiries
const Contact = () => {
  // State management
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });

  // Validate form fields
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  // Update form field values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear field-specific error when user types
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Submit contact form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setIsSending(true);
    try {
      // Send contact form data to backend
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      // Handle error responses
      let errorMessage = 'Failed to send message';
      if (!response.ok) {
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch (jsonError) {
          console.error('Error parsing response:', jsonError);
        }
        throw new Error(errorMessage);
      }

      // Show success state and reset form
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('Contact submit error:', err);
      // Show error modal
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Message Failed',
        message: err.message || 'We couldn\'t send your message. Please try again later.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Page header */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p className="lead">Have a question, suggestion or need help choosing parts? Send us a message and our team will reply within 1-2 business days.</p>
      </div>

      <div className="contact-grid">
        {/* Contact information sidebar */}
        <aside className="contact-info">
          {/* Support contact details */}
          <div className="info-card main">
            <h3>Customer Support</h3>
            <p className="muted">We're here to help with orders, returns and tech questions.</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:support@pcpartpicker.com">support@pcpartpicker.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a></li>
              <li><strong>Address:</strong> 123 Tech Street, Silicon Valley, CA 94025</li>
            </ul>
          </div>

          {/* Business hours */}
          <div className="info-card small">
            <h4>Hours</h4>
            <p>Mon - Fri: 9:00 AM — 6:00 PM</p>
            <p>Sat: 10:00 AM — 4:00 PM</p>
            <p>Sun: Closed</p>
          </div>

          {/* Social media links */}
          <div className="info-card small">
            <h4>Follow Us</h4>
            <p className="socials">
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Discord">Discord</a>
            </p>
          </div>
        </aside>

        {/* Contact form section */}
        <section className="contact-form-card">
          {/* Success message (shown after submission) */}
          {success ? (
            <div className="success-card">
              <h3>Thanks — we'll be in touch!</h3>
              <p>We've received your message and will reply to <strong>{form.email || 'your email'}</strong> shortly.</p>
              <button className="primary" onClick={() => setSuccess(false)}>Send another message</button>
            </div>
          ) : (
            /* Contact form */
            <form onSubmit={handleSubmit} noValidate>
              {/* Name field */}
              <div className="form-row">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>

              {/* Email field */}
              <div className="form-row">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              {/* Subject field */}
              <div className="form-row">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={handleChange} aria-invalid={!!errors.subject} />
                {errors.subject && <div className="error">{errors.subject}</div>}
              </div>

              {/* Message field */}
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} value={form.message} onChange={handleChange} aria-invalid={!!errors.message} />
                {errors.message && <div className="error">{errors.message}</div>}
              </div>

              {/* Form action buttons */}
              <div className="form-actions">
                <button type="submit" className="primary" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
                <button 
                  type="button" 
                  className="secondary" 
                  onClick={() => setForm({ name: '', email: '', subject: '', message: '' })} 
                  disabled={isSending}
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
      
      {/* Error modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
      >
        {modal.message}
      </Modal>
    </div>
  );
};

export default Contact;
