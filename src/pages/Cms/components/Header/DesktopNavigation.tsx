import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Building2, Users2, Mail } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";

interface DesktopNavigationProps { }

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ header, labels, setLabels }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Local state to hold the editable labels


  useEffect(() => {
    if (header?.content) {
      try {
        // Parse the JSON string into an object and update the state
        const parsedContent = JSON.parse(header?.content);
        setLabels(parsedContent);
      } catch (error) {
      }
    }
  }, [header?.content]); // Only run the effect when header.content changes

  // onBlur handler factory
  const handleBlur = (id: string) => (e: React.FocusEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent ?? "";
    setLabels(prev => ({ ...prev, [id]: newText.trim() }));
  };

  const navLinks = [
    { to: '/', id: "home", icon: Home },
    { to: '/about', id: "about" },
    { to: '/businesses', id: "businesses", icon: Users2 },
    { to: '/partner', id: "partner", icon: Mail },
    { to: '/contact', id: "contact", icon: Building2 },
  ];

  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      <div className="flex items-center justify-center gap-8 mx-auto">
        {navLinks.map(({ id, to, icon: Icon }) => {
          const isActive = location.pathname === to;

          return (
            <div key={id} >
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(id)}
                className={`
                  whitespace-nowrap
                  text-sm md:text-base
                  transition-colors
                  hover:text-[rgba(204,31,65,1)]
                  ${isActive
                    ? "text-[rgba(204,31,65,1)] font-semibold"
                    : "text-gray-700"
                  }
                  px-2 py-1
                `}
              >
                {labels[id]}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="flex items-center gap-4">
        <LanguageDropdown />
      </div> */}
    </div>
  );
};
