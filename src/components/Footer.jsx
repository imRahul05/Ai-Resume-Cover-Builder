import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { name: "Resume Builder", href: "#" },
        { name: "Cover Letter Builder", href: "#" },
        { name: "AI-Powered Suggestions", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Github", href: "#", icon: Github },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              src="/src/assets/logo.png"
              alt="genZRes Logo"
              className="h-12 w-auto"
            />
            <p className="text-sm leading-6">
              An easy pathway for job seekers to create professional resumes and cover letters with AI.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-y-12 sm:gap-x-8 xl:col-span-2 xl:mt-0">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold leading-6 text-white">{section.title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="hover:text-gray-300">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm leading-6">
            &copy; {currentYear} genZRes. All rights reserved.
          </p>
          <nav className="mt-6 sm:mt-0">
            <ul className="-mx-4 -my-2 flex flex-wrap justify-center">
              {["Terms of Service", "Privacy Policy", "Cookie Settings"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="mx-4 my-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-400 hover:text-gray-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;