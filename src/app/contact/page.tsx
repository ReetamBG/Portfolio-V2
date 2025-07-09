import SectionHeader from "@/components/SectionHeader";
import { Mail } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <main className="relative w-full h-auto flex justify-center overflow-x-hidden">
      <div className="mt-32 mb-24 mx-5 sm:mx-10 w-3xl max-w-3xl">
        <SectionHeader text="Get in Touch" icon={<Mail />} order="normal" />
        COMING SOON ...
      </div>
    </main>
  );
};

export default Contact;
