import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

const AnimatedHeader = ({ text, containerClass }) => {

  const containerRef = useRef()

  useGSAP(()=>{
    const ctx = gsap.from(".animated-word", {
      opacity: "0",
      translate: "10px 51px -60px",
      rotateX: "-40deg",
      rotateY: "60deg",
      transformOrigin: "50% 50% -150px",
      stagger: 0.05,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "100 bottom",
        toggleActions: "play none none reverse"
      }
    })

    // Clean up on unmount
    // (not strictly necessary as it never unmounts, but still good practice)
    return () => ctx.revert(); 
  }, {scope: containerRef})


  return (
    <div
      ref={containerRef}
      className={`text-4xl flex flex-col gap-2 font-zentry-regular uppercase special-font text-center leading-[0.8] md:text-8xl ${containerClass}`}
    >
      {text.split("<br />").map((line, lineIndex) => (
        <div key={lineIndex} className="flex gap-3 justify-center flex-wrap">
          {line.split(" ").map((word, wordIndex) => (
            <span
              className="animated-word"  // use className instead of id cuz multiple words with same id
              key={wordIndex}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedHeader;
