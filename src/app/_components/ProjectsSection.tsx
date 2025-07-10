/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowDownRightIcon,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { projectsData } from "@/data/projectData";
import SectionHeader from "@/components/SectionHeader";

const ProjectsSection = () => {
  return (
    <section className="mt-32" id="projects">
      <SectionHeader
        text="My Projects"
        icon={<BriefcaseBusiness />}
        order="reversed"
      />

      {/* Projects */}
      {projectsData.slice(0, 4).map((project, idx) => (
        <ProjectCard
          key={idx}
          id={idx}
          title={project.title}
          description={project.description}
          image={project.image}
        />
      ))}

      <Link
        href="/projects"
        className="text-sm sm:text-base flex gap-2 justify-end mt-6 sm:mt-10 pe-6 sm:pe-12 text-foreground/80 items-center"
      >
        <span className="hover:underline">View More</span>
        <ArrowRight size={20} />
      </Link>
    </section>
  );
};

export default ProjectsSection;

const ProjectCard = ({
  id,
  title,
  description,
  image,
}: {
  id: number
  title: string;
  description: string;
  image: string;
}) => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <Link
      href={`/projects/${id}`}
      className="border-b-1 flex flex-col sm:flex-row justify-between px-2 sm:px-5 py-8 cursor-pointer"
      onMouseEnter={() => setShowLinks(true)}
      onMouseLeave={() => setShowLinks(false)}
    >
      {/* text */}
      <div
        className={`mt-2 ${
          showLinks ? "translate-x-4" : "trasnlate-x-0"
        } transition-all duration-500 pe-4 md:pe-8`}
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
            className="block lg:hidden animate-bounce transition-all duration-500 -left-6 relative"
          />
        </h4>
        <p className="text-xs sm:text-base text-foreground/70">{description}</p>
      </div>
      {/* Preview */}
      <div className="overflow-hidden min-w-full w-full sm:min-w-44 sm:w-44 min-h-44 h-44 sm:min-h-24 sm:h-24 rounded-md mt-4 sm:mt-0">
        <img
          src={image}
          alt="Project Preview"
          className="object-cover w-full h-full"
        />
      </div>
    </Link>
  );
};
