import { useEffect, useRef } from "react";

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ✅ Ensuring Hero section is visible when mounted
    if (sectionRef.current) {
      sectionRef.current.classList.add("fade-in");
    }
  }, []);

  return (
    <>
      <style>
        {`
          .hero {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            text-align: center;
            color: white;
            overflow: hidden;
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

          .video-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.2;
            z-index: -1;
          }

          h1 {
            font-size: 3rem;
            font-weight: bold;
            text-transform: uppercase;
          }

          .highlight {
            color: red;
            text-shadow: 2px 2px white;
          }

          p {
            font-size: 1.2rem;
            max-width: 600px;
            margin-top: 20px;
          }
        `}
      </style>

      <div className="hero" ref={sectionRef}>
        {/* Background Video */}
        <video className="video-bg" autoPlay loop muted playsInline>
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <h1>
          <span className="highlight">Work With the Best,</span> Build What’s Next
        </h1>
        <p>
          RICRYM is shaping the future of gaming, software, and blockchain. <br />
          The team welcomes innovators who push boundaries, solve real-world
          challenges, and grow in a high-performance environment.
        </p>
      </div>
    </>
  );
};

export default Hero;
