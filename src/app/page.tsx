import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="relative w-full h-auto flex justify-center overflow-x-hidden">
      <div className="mt-32 mb-24 mx-5 sm:mx-10 max-w-2xl">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
      </div>
    </main>
  );
}
