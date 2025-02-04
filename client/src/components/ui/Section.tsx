import { useEffect, useState, ReactNode, Children } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  hightCheck?: boolean;
}

export const Section = ({ children, className, hightCheck = true }: SectionProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if(!hightCheck) return
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    updateHeaderHeight();
    updateWindowHeight();

    window.addEventListener("resize", () => {
      updateHeaderHeight();
      updateWindowHeight();
    });

    return () => window.removeEventListener("resize", updateWindowHeight);
  }, []);


  // if (Children.count(children) === 1) {
  //   return <div className="flex flex-col w-full justify-center items-center">{children}</div>;
  // }

  return (
    <section
      className={`flex flex-col h-full w-full justify-center items-center ${className}`}
      style={{ height: hightCheck ? `calc(${windowHeight}px - ${headerHeight + 16}px)` : '100%' }}
    >
      {children}
    </section>
  );
};

