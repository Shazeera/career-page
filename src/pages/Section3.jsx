import { useEffect, useRef } from "react";
import gsap from "gsap";

const Section3 = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.7 }
    );
  }, []);

  return (
    <>
      <style>
        {`
          .section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100vw;
            height: 100vh;
            padding: 5rem;
            background: black;
            color: white;
            overflow: hidden;
          }

          .section h1 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .section p {
            font-size: 1.2rem;
            max-width: 600px;
            line-height: 1.5;
          }
        `}
      </style>

      <div className="section" ref={sectionRef}>
        <h1 ref={titleRef}>
          Shaping <br /> the Future
        </h1>
        <p ref={textRef}>
          RICRYM pushes the boundaries of gaming, software, and blockchain by
          focusing on innovation, adaptability, and continuous learning.
        </p>
      </div>
    </>
  );
};

export default Section3;
