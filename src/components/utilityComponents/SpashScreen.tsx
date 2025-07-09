"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "こんにちは",
  "Ciao",
  "안녕하세요",
  "你好",
  "नमस्ते",
];

export default function SplashScreen() {
  const [currentText, setCurrentText] = useState(greetings[0]);
  const splashRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [showSplash, setShowSplash] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial fade-in (performer enters)
    tl.to(
      textRef.current,
      { opacity: 1, duration: 0.6, ease: "power1.in" }
    );

    // Cycle greetings
    greetings.forEach((greeting) => {
      tl.to(
        {},
        {
          duration: 0.15, // how long each word stays on screen
          onStart: () => setCurrentText(greeting),
        }
      );
    });

    // Curtain lifts (wait  a bit before lifting)
    tl.to(
      splashRef.current,
      {
        y: "-100%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => setShowSplash(false),
      },
      ">0.25"
    ); // wait 0.25 seconds before lifting the curtain

    return () => tl.kill();
  }, []);

  // Cleanup after the animation is done
  if(!showSplash) {
    return null; 
  }

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      <h1
        ref={textRef}
        className="opacity-0 text-foreground/80 text-4xl sm:text-6xl font-[Homemade Apple] tracking-wider"
      >
        • {currentText}
      </h1>
    </div>
  );
}
