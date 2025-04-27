import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Hero from "./Hero";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import ContactUs from "./ContactUs";

const Layout = () => {
  const [activeSection, setActiveSection] = useState(null);
  const containerRef = useRef(null);

  // Intersection Observer for detecting active sections
  const { ref: section1Ref, inView: inView1 } = useInView({ threshold: 0.7 });
  const { ref: section2Ref, inView: inView2 } = useInView({ threshold: 0.7 });
  const { ref: section3Ref, inView: inView3 } = useInView({ threshold: 0.7 });
  const { ref: section4Ref, inView: inView4 } = useInView({ threshold: 0.7 });
  const { ref: contactRef, inView: inView5 } = useInView({ threshold: 0.7 });

  useEffect(() => {
    if (inView1) setActiveSection("Section1");
    else if (inView2) setActiveSection("Section2");
    else if (inView3) setActiveSection("Section3");
    else if (inView4) setActiveSection("Section4");
    else if (inView5) setActiveSection("ContactUs");
  }, [inView1, inView2, inView3, inView4, inView5]);

  return (
    <>
      <style>
        {`
          /* ✅ Enable Smooth Scrolling with Scroll Snap */
          .layout {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scrollbar-width: none; /* Hide scrollbar */
            -ms-overflow-style: none;
          }

          .layout::-webkit-scrollbar {
            display: none; /* Hide scrollbar for Chrome */
          }

          /* ✅ Ensure Sections Fit Viewport Perfectly */
          .page-section {
             width: 100vw;
            min-height: 100vh; /* ✅ Prevent height issues */
            scroll-snap-align: start;
          }
        `}
      </style>

      <div ref={containerRef} className="layout">
        <div className="page-section"><Hero /></div>
        <div ref={section1Ref} className="page-section"><Section1 /></div>
        <div ref={section2Ref} className="page-section"><Section2 /></div>
        <div ref={section3Ref} className="page-section"><Section3 /></div>
        <div ref={section4Ref} className="page-section"><Section4 /></div>
        <div ref={contactRef} className="page-section"><ContactUs /></div>
      </div>
    </>
  );
};

export default Layout;
