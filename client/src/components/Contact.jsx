import '../styles/Contact.scss';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-form">
        
        <div className="contact-info">
          <div className="info-card">
            <h3>Email</h3>
            <p>support@pcpartpicker.com</p>
          </div>
          <div className="info-card">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-card">
            <h3>Address</h3>
            <p>123 Tech Street<br />Silicon Valley, CA 94025</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;