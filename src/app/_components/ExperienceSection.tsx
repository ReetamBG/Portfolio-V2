"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { experienceData, educationData } from "@/data/experienceData";

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
            {/* <div className="h-[94%] absolute top-4 left-12 w-[1px] bg-foreground/30 -z-10"></div> */}
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

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRightIcon, ChevronsUpDown } from "lucide-react";

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
  const [showLinks, setShowLinks] = useState(false);
  const responsibilitiesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = responsibilitiesRef.current;
      if (!el) return;

      gsap.to(el, {
        height: showResponsibilities ? "auto" : "0px",
        opacity: showResponsibilities ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    },
    { dependencies: [showResponsibilities] }
  );

  return (
    <div
      className="rounded-sm my-4 bg-background px-0 sm:px-2 text-foreground border-b-1 py-5"
      // onMouseEnter={() => setShowResponsibilities(true)}
      // onMouseLeave={() => setShowResponsibilities(false)}
      onMouseEnter={() => {setShowLinks(true)}}
      onMouseLeave={() => {setShowLinks(false)}}
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
              <CardHeader className={`transition-all duration-500 ${showResponsibilities || showLinks ? "translate-x-4" : "trasnlate-x-0"}`}>
                <CardTitle className="text-sm sm:text-xl whitespace-nowrap flex items-center gap-2">
                  <a href={link}>{company}</a>
                  <ArrowUpRightIcon
                    className={`animate-bounce transition-all duration-500 size-3 sm:size-5 ${
                      showResponsibilities || showLinks ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CardTitle>
              </CardHeader>
              {/* Duration */}
              <p className="text-foreground/71 text-xs sm:text-sm whitespace-break-spaces">
                {duration}
              </p>
            </div>
            <CardContent className={`transition-all duration-500 ${showResponsibilities || showLinks ? "translate-x-4" : "trasnlate-x-0"}`}>
              <p className="text-xs sm:text-base">{role}</p>
              <p className="text-foreground/70 text-xs">{location}</p>
            </CardContent>
            {/* Skills */}
            {/* <div className="mt-2 ps-4">
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
            </div> */}

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
                  {/* Skills (Reloacated here) */}
                  <div className="mb-8">
                    {skills &&
                      skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="me-1 my-0.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base">
                    Responsibilities
                  </h3>
                  {responsibilities.map((r, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-base text-foreground/70 mt-2"
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
    </div>
  );
};
