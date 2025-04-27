import { useEffect, useRef } from "react";

const ContactUs = () => {
  const sectionRef = useRef(null);
  const contactInfoRef = useRef(null);
  const contactFormRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.classList.add("fade-in");
    }
    if (contactInfoRef.current) {
      contactInfoRef.current.style.animation = `slideInLeft 1s ease-out 0.5s forwards`;
    }
    if (contactFormRef.current) {
      contactFormRef.current.style.animation = `slideInRight 1s ease-out 0.8s forwards`;
    }
  }, []);

  return (
    <>
      <style>
        {`
          .contact-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100vw;
            height: 100vh;
            padding: 0; /* 🔥 Removed padding to ensure full height */
            background: black;
            color: white;
            opacity: 0;
            transform: translateY(50px);
            animation: fadeIn 1s ease-out forwards 0.3s;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .contact-info {
            max-width: 300px;
            opacity: 0;
          }

          .contact-info h1 {
            font-size: 2rem;
            font-weight: bold;
            color: red;
            margin-bottom: 1rem;
          }

          .contact-info p {
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }

          .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }

          .social-icons img {
            width: 24px;
            height: 24px;
            cursor: pointer;
          }

          .contact-form {
            width: 50%;
            opacity: 0;
          }

          .contact-form p {
            font-size: 1rem;
            margin-bottom: 1rem;
          }

          .contact-form input,
          .contact-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 1rem;
            background: #d9d9d9;
            border: none;
            font-size: 1rem;
          }

          .contact-form textarea {
            height: 100px;
          }

          .contact-form button {
            padding: 10px 20px;
            background: black;
            color: white;
            border: 1px solid red;
            font-size: 1rem;
            cursor: pointer;
          }

          .contact-form button:hover {
            background: red;
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div className="contact-section" ref={sectionRef}>
        {/* Left Side - Contact Info */}
        <div className="contact-info" ref={contactInfoRef}>
          <h1>Contact Us</h1>
          <p>A-05-02, One South Street Mall Jln OS, Taman Serdang Perdana 43300 Seri Kembangan, Selangor</p>
          <p>admin@ricrym.com</p>
          <p>+60163343973</p>
          <div className="social-icons">
            <img src="/icons/x.svg" alt="X" />
            <img src="/icons/instagram.svg" alt="Instagram" />
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form" ref={contactFormRef}>
          <p>A great vision needs great people.<br />RICRYM grows with talent.</p>
          <input type="text" placeholder="Enter your name" />
          <input type="email" placeholder="Enter valid email address" />
          <textarea placeholder="Enter message"></textarea>
          <button type="submit">Submit</button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
