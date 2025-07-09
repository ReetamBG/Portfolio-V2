import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";
import React from "react";
import { Icon } from "@iconify/react";

import {
  backendSkills,
  frontendSkills,
  languageSkills,
  toolsSkills,
} from "@/data/skillsData";
import SectionHeader from "@/components/SectionHeader";

const renderIcons = (
  skills: { icon: string; color?: string; className?: string }[]
) =>
  skills.map(({ icon, color, className }) => (
    <div
      key={icon}
      className="transition-transform hover:scale-110 duration-200 cursor-pointer"
    >
      <Icon
        icon={icon}
        className={`size-6 sm:size-8 ${className ?? ""}`}
        style={color ? { color } : undefined}
      />
    </div>
  ));

const SkillsSection = () => {
  return (
    <section className="mt-20 sm:mt-24 lg:mt-32" id="projects">
      
      <SectionHeader text="Technical Skills" icon={<Brain />} order="normal" />

      {/* Skills */}
      <div className="flex flex-col gap-6">
        {/* Languages */}
        <Card className="bg-background flex flex-col gap-2 px-6 py-4 ms-8">
          <h5 className="font-semibold text-base text-foreground/90 sm:text-lg">
            Languages
          </h5>
          <p className="text-xs text-foreground/70 sm:text-sm">
            Strong foundation in multiple programming languages,
            enabling me to adapt quickly.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-5 mt-2">
            {renderIcons(languageSkills)}
          </div>
        </Card>

        {/* Backend */}
        <Card className="bg-background flex flex-col gap-2 px-6 py-4 me-8">
          <h5 className="font-semibold text-base text-foreground/90 sm:text-lg">
            Backend
          </h5>
          <p className="text-xs text-foreground/70 sm:text-sm">
            Building robust backend systems using modern
            technologies and frameworks.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-5 mt-2">
            {renderIcons(backendSkills)}
          </div>
        </Card>

        {/* Frontend */}
        <Card className="bg-background flex flex-col gap-2 px-6 py-4 ms-8">
          <h5 className="font-semibold text-base text-foreground/90 sm:text-lg">
            Frontend
          </h5>
          <p className="text-xs text-foreground/70 sm:text-sm">
            Creating engaging and responsive user interfaces.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-5 mt-2">
            {renderIcons(frontendSkills)}
          </div>
        </Card>

        {/* Tools and DevOps */}
        <Card className="bg-background flex flex-col gap-2 px-6 py-4 me-8">
          <h5 className="font-semibold text-base text-foreground/90 sm:text-lg">
            Tools & DevOps
          </h5>
          <p className="text-xs text-foreground/70 sm:text-sm">
            Tools & DevOps to streamline development & deployment.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-5 mt-2">
            {renderIcons(toolsSkills)}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SkillsSection;
