/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { DownloadCloud, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const resume = "";
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
            <p className="my-2 text-base sm:text-xl font-medium">
              Software Developer from India 🇮🇳
            </p>
            {/* Socials and Resume */}
            <div className="mt-6 flex gap-4 items-center transition-all">
              <a href={resume}>
                <Button className="h-6 cursor-pointer hover:scale-105 bg-red-700 text-white">
                  Resume
                  <DownloadCloud />
                </Button>
              </a>
              <a href={linkedin}>
                <FaLinkedin
                  size={22}
                  className="text-blue-500 hover:text-blue-500/70 hover:scale-105"
                />
              </a>
              <a href={github}>
                <FaGithub
                  size={22}
                  className="text-foreground hover:text-foreground/70 hover:scale-105"
                />
              </a>
              <a href={email}>
                <Mail
                  size={22}
                  className="text-foreground hover:text-foreground/70 hover:scale-105"
                />
              </a>
            </div>
          </div>
          <div className="size-24 overflow-hidden rounded-full shrink-0">
            <img
              src="/pfp.jpg"
              alt="profile picture"
              className="object-cover object-center"
            />
          </div>
        </div>
        {/* About section */}
        <div className="mt-16">
          <h3 className="font-bold text-xl">About</h3>
          <p className="text-sm text-primary/80">
            Hello i am a software developer yada yada yadad. yada yada yada
            hello no nigg shit. yada yada yada hello no nigg shit. yada yada
            yada hello no nigg shit. yada yada yada hello no nigg shit. yada
            yada yada helo nigga yada no shit i work with Next.js yada yada Yeah
            i also use express.js yada yada yada
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
