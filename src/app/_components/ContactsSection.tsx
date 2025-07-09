import SectionHeader from "@/components/SectionHeader";
import { Mail, ArrowDownLeftIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const socialLinks = [
  {
    href: "https://linkedin.com/in/reetam-borgohain",
    label: "LinkedIn",
    icon: "mdi:linkedin",
  },
  {
    href: "https://github.com/ReetamBG",
    label: "GitHub",
    icon: "mdi:github",
  },
  {
    href: "https://instagram.com/ReetamBG",
    label: "Instagram",
    icon: "mdi:instagram",
  },
  // {
  //   href: "https://twitter.com/your-username",
  //   label: "Twitter",
  //   icon: "mdi:twitter",
  // },
  {
    href: "mailto:reetambg@.com",
    label: "Email",
    icon: "mdi:email",
  },
  {
    href: "tel:+919864999238",
    label: "Phone",
    icon: "mdi:phone",
  },
];


const ContactsSection = () => {
  return (
    <section className="mt-20 sm:mt-24 lg:mt-32" id="projects">
      <SectionHeader text="Get in Touch" icon={<Mail />} order="normal" />

      <p className="text-lg sm:text-xl text-foreground/80 text-center px-4">
        I&apos;d love to hear from you!
        <br />
        Reach out through any of the socials below — or even better,
        <br className="hidden sm:inline" />{" "}
        <span className="font-semibold text-destructive">
          drop me a direct message
        </span>{" "}
        through{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold hover:underline text-blue-400"
        >
          Here
          <ArrowDownLeftIcon className="w-4 h-4 animate-bounce" />
        </Link>
      </p>

      {/* Social Icons */}
      <div className="mt-8 flex justify-center gap-6 sm:gap-8">
        {socialLinks.map(({ href, label, icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            aria-label={label}
            className="hover:scale-110 transition-transform text-foreground"
          >
            <Icon icon={icon} className="size-8" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContactsSection;
