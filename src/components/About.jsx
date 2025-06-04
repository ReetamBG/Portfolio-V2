import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mt-36 mb-8 flex flex-col items-center gap-10">
        <p className="font-general text-sm uppercase md:text-xl">Welcome to Zentry</p>
        <div className="text-4xl font-zentry-regular uppercase text-center leading-[0.8] md:text-8xl">
          Discover the worlds <br/>largest shared adventure
        </div>
        <div className="absolute -bottom-[90dvh] font-circular-web text-center max-w-[75%]">
          <p className="text-md md:text-2xl pb-1">The Game of Games begins-your life, now an epic MMORPG</p>
          <p className="text-md md:text-2xl text-gray-500">Zentry unites every player from countless games and platforms</p>
        </div>
      </div>
      <div id="clip" className="h-dvh w-screen">
        <div className="mask-clip-path absolute left-1/2 -translate-x-1/2 z-20 h-[60vh] w-[70vw] md:w-[30vw] origin-center overflow-hidden rounded-3xl border-1">
          <img src="img/about.webp" alt="" className="absolute left-0 top-0 size-full object-cover"/>
        </div>
      </div>
    </div>
  )
}

export default About