/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowDownRightIcon, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { projectsData } from "@/data/projectData";

const ProjectsSection = () => {
  return (
    <section className="mt-32" id="projects">
      {/* Heading */}
      <h3 className="font-bold text-xl sm:text-3xl text-right">My Projects</h3>
      <div className="relative">
        <hr className="border-t-2 border-foreground/40 mt-2 mb-12 sm:mb-16" />
        <span className="bg-foreground text-background p-2 sm:p-4 rounded-full absolute -top-5 sm:-top-7 left-5 sm:left-7">
          <BriefcaseBusiness />
        </span>
      </div>

      {/* Projects */}
      {projectsData.map((project, idx) => (
        <ProjectCard
          key={idx}
          title={project.title}
          description={project.description}
          image={project.image}
        />
      ))}
    </section>
  );
};

export default ProjectsSection;

const ProjectCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <Link
      href="/"
      className="border-b-1 flex flex-col sm:flex-row justify-between px-2 sm:px-5 py-4 cursor-pointer"
      onMouseEnter={() => setShowLinks(true)}
      onMouseLeave={() => setShowLinks(false)}
    >
      {/* text */}
      <div
        className={`mt-2 ${
          showLinks ? "translate-x-4" : "trasnlate-x-0"
        } transition-all duration-500 pe-5`}
      >
        <h4 className="font-semibold text-base sm:text-xl flex gap-2 items-center mb-2">
          {title}{" "}
          <ArrowDownRightIcon
            size={20}
            className={`animate-bounce transition-all duration-500 ${
              showLinks ? "opacity-100" : "opacity-0"
            }`}
          />
          <ArrowDownRightIcon
            size={15}
            className="block lg:hidden animate-bounce transition-all duration-500 -left-5 relative"
          />
        </h4>
        <p className="text-xs sm:text-base text-foreground/70">{description}</p>
      </div>
      {/* Preview */}
      <div className="overflow-hidden min-w-full w-full sm:min-w-44 sm:w-44 min-h-44 h-44 sm:min-h-24 sm:h-24 rounded-md mt-4 sm:mt-0">
        <img src={image} alt="Project Preview" className="object-cover w-full h-full" />
      </div>
    </Link>
  );
};
