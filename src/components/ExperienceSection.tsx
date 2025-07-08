"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const experienceData = [
  {
    image: "/companyLogos/outplayed.jpg",
    role: "Software Engineer Intern",
    company: "Outplayed",
    location: "Remote",
    link: "https://outplayed.in",
    duration: "Jan 2020 - Present",
    skills: ["JavaScript", "React", "Node.js", "Golang", "Apache Kafka"],
    responsibilities: [
      "Developing and maintaining web applications using React and Node.js.",
      "Collaborating with cross-functional teams to design and implement new features.",
      "Optimizing application performance and ensuring scalability.",
      "Participating in code reviews and providing constructive feedback.",
    ],
  },
  {
    image: "/companyLogos/cognitiveTech.png",
    role: "Frontend Developer Intern",
    company: "Cognitive Tech",
    link: "https://www.cognitechindia.in/",
    location: "Remote",
    duration: "Jun 2018 - Dec 2019",
    skills: ["React", "Mext.js", "Tailwind CSS", "TypeScript", "Redux"],
    responsibilities: [
      "Developing and maintaining web applications using React and Node.js.",
      "Collaborating with cross-functional teams to design and implement new features.",
      "Optimizing application performance and ensuring scalability.",
      "Participating in code reviews and providing constructive feedback.",
    ],
  },
  {
    image: "/companyLogos/iitg.png",
    role: "Machine Learning Intern",
    company: "IIT Guwahati",
    link: "https://www.iitg.ac.in/",
    location: "Remote",
    duration: "Jan 2018 - May 2018",
    skills: ["React Native", "Mobile Development"],
    responsibilities: [
      "Developing and maintaining web applications using React and Node.js.",
      "Collaborating with cross-functional teams to design and implement new features.",
      "Optimizing application performance and ensuring scalability.",
      "Participating in code reviews and providing constructive feedback.",
    ],
  },
];

const educationData = [
  {
    image: "/companyLogos/iitg.png",
    role: "Bachelor of Science in Computer Science",
    company: "University of Technology",
    link: "https://www.iitg.ac.in/",
    location: "Guwahati, India",
    duration: "2014 - 2018",
  },
];

const ExperienceSection = () => {
  return (
    <section>
      <div className="mt-16">
        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="experience">Work Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="experience" className="relative">
            <div className="h-[94%] absolute top-4 left-12 w-[1px] bg-foreground/30 -z-10"></div>
            {experienceData.map((experience, idx: number) => (
              <ExperienceCard
                key={idx}
                role={experience.role}
                company={experience.company}
                link={experience.link}
                image={experience.image}
                location={experience.location}
                duration={experience.duration}
                skills={experience.skills}
                responsibilities={experience.responsibilities}
              />
            ))}
          </TabsContent>
          <TabsContent value="education">
            {educationData.map((education, idx: number) => (
              <ExperienceCard
                key={idx}
                role={education.role}
                company={education.company}
                link={education.link}
                location={education.location}
                image={education.image || "/companyLogos/default.png"}
                duration={education.duration}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExperienceSection;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRightIcon, ChevronsUpDown } from "lucide-react";

const ExperienceCard = ({
  role,
  image,
  company,
  link,
  responsibilities,
  location,
  duration,
  skills,
}: {
  key: number;
  role: string;
  image: string;
  company: string;
  link: string;
  location: string;
  responsibilities?: string[];
  duration: string;
  skills?: string[];
}) => {
  const [showResponsibilities, setShowResponsibilities] = useState(false);
  const responsibilitiesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = responsibilitiesRef.current;
      if (!el) return;

      gsap.to(el, {
        height: showResponsibilities ? "auto" : "0px",
        opacity: showResponsibilities ? 1 : 0,
        duration: 0.3,
        ease: "power1.out",
      });
    },
    { dependencies: [showResponsibilities] }
  );

  return (
    <Card
      className="rounded-sm my-4 bg-background px-5"
      onMouseEnter={() => setShowResponsibilities(true)}
      onMouseLeave={() => setShowResponsibilities(false)}
      onClick={() => setShowResponsibilities(!showResponsibilities)}
    >
      <div className="flex">
        <Avatar className="size-12">
          <AvatarImage src={image} />
          <AvatarFallback>{company.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between w-full">
          {/* Company, Role and description */}
          <div className="w-full">
            <div className="flex justify-between">
              <CardHeader>
                <CardTitle className="text-sm sm:text-lg whitespace-nowrap flex items-center gap-2">
                  <a href={link}> {company} </a>{" "}
                  <ArrowDownRightIcon
                    size={15}
                    className={`animate-bounce transition-all duration-500 ${
                      showResponsibilities ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CardTitle>
              </CardHeader>
              {/* Duration */}
              <p className="text-foreground/71 text-xs sm:text-sm whitespace-break-spaces">
                {duration}
              </p>
            </div>
            <CardContent>
              <p className="text-xs sm:text-sm">{role}</p>
              <p className="text-foreground/70 text-xs">{location}</p>
            </CardContent>
            {/* Skills */}
            <div className="mt-2 ps-4">
              {skills &&
                skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="mx-0.5 my-0.5"
                  >
                    {skill}
                  </Badge>
                ))}
            </div>

            {/* Responsibilities */}
            {responsibilities && (
              <>
                <p
                  className={`text-xs flex items-center justify-end mt-2 px-2 w-full gap-1 text-foreground/70 transition-all ${
                    showResponsibilities ? "opacity-0" : "opacity-100"
                  }`}
                >
                  More
                  <ChevronsUpDown size={12} />
                </p>

                {/* Responsibilities*/}

                <div
                  ref={responsibilitiesRef}
                  className="ps-6 overflow-hidden h-0 opacity-0"
                >
                  <h3 className="font-semibold text-s sm:text-base">
                    Responsibilities
                  </h3>
                  {responsibilities.map((r, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm text-foreground/70 mt-2"
                    >
                      • {r}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
