import SectionHeader from "@/components/SectionHeader";
import { BriefcaseBusiness } from "lucide-react";
import React from "react";

const Projects = () => {
  return (
    <main className="relative w-full h-auto flex justify-center overflow-x-hidden">
      <div className="mt-32 mb-24 mx-5 sm:mx-10 max-w-3xl w-3xl">
        <SectionHeader
          text="Projects"
          icon={<BriefcaseBusiness />}
          order="normal"
        />
        COMING SOON ...
      </div>
    </main>
  );
};

export default Projects;
