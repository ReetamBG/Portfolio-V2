/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { DownloadCloud, Mail, User } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const resume = "https://drive.google.com/file/d/1SSj2cfoshR9f1Q6H4CZzO-XMzm2d22oO/view?usp=drive_link";
const email = "r33t4m@gmail.com";
const linkedin = "https://www.linkedin.com/in/reetam-borgohain";
const github = "https://github.com/ReetamBG";

const HeroSection = () => {
  return (
    <section>
      <div>
        {/* Name, Intro, PFP  */}
        <div className="flex flex-col-reverse sm:flex-row gap-10">
          <div>
            <h1 className="text-4xl sm:text-6xl tracking-tight font-bold sm:whitespace-nowrap">
              Hi, I&apos;m Reetam 👋
            </h1>
            <p className="my-2 text-base sm:text-2xl font-medium">
              Fullstack Software Engineer
            </p>
            {/* Socials and Resume */}
            <div className="mt-6 flex gap-4 items-center transition-all">
              <a target="_blank" href={resume}>
                <Button className="h-6 cursor-pointer bg-red-700/80 hover:bg-red-900/80 text-white">
                  Resume
                  <DownloadCloud />
                </Button>
              </a>
              <a target="_blank" href={linkedin}>
                <FaLinkedin
                  size={22}
                  className="text-blue-500 hover:text-blue-500/70"
                />
              </a>
              <a target="_blank" href={github}>
                <FaGithub
                  size={22}
                  className="text-foreground hover:text-foreground/70"
                />
              </a>
              <a target="_blank" href={email}>
                <Mail
                  size={22}
                  className="text-foreground hover:text-foreground/70"
                />
              </a>
            </div>
          </div>
          <div className="size-24 overflow-hidden rounded-full shrink-0">
            <img
              src="pfp3.png"
              alt="profile picture"
              className="object-cover object-center"
            />
          </div>
        </div>
        {/* About section */}
        <div className="mt-16">
          <h3 className="font-bold text-xl sm:text-2xl">About Me</h3>
          <div className="relative">
            <hr className="border-t-2 border-foreground/40 mt-2 mb-8" />
            <span className="bg-foreground text-background p-2 rounded-full absolute -top-5 right-5">
              <User />
            </span>
          </div>
          <p className="text-sm sm:text-base text-foreground/80">
            A 21-year-old Computer Science undergrad with experience in
            fullstack development and machine learning. Currently in my final
            year of CS degree from JEC, Assam. I primarily work with Next.js,
            React, Node.js, and Express to build web applications front and
            back.
            <br />
            I&apos;ve built stuff ranging from AI integrated full-stack
            applications to real-time systems and have also worked with
            languages like Golang and Python for building Backend Applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
