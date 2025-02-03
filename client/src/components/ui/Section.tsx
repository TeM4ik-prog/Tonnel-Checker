import { useEffect, useState, ReactNode, Children } from "react";

interface SectionProps {
  children: ReactNode;
}

export const Section = ({ children }: SectionProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
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
      className="flex flex-col w-full justify-center items-center"
      style={{ height: `calc(${windowHeight}px - ${headerHeight + 16}px)` }}
    >
      {children}
    </section>
  );
};

