import ContactsSection from "@/app/_components/ContactsSection";
import ExperienceSection from "@/app/_components/ExperienceSection";
import HeroSection from "@/app/_components/HeroSection";
import ProjectsSection from "@/app/_components/ProjectsSection";
import SkillsSection from "@/app/_components/SkillsSection";
// import SplashScreen from "@/components/utilityComponents/SpashScreen";


export default function Home() {
  return (
    <>
        {/* <SplashScreen  /> */}
        <main className="relative w-full h-auto flex justify-center overflow-x-hidden">
          <div className="mt-32 mb-24 mx-5 sm:mx-10 max-w-3xl">
            <HeroSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactsSection />
          </div>
        </main>
    </>
  );
}
