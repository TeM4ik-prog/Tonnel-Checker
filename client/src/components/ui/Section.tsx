import { ReactNode, useEffect, useState } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  hightCheck?: boolean;
}

export const Section = ({ children, className, hightCheck = true }: SectionProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if(!hightCheck) return;
    
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    const handleResize = () => {
      updateHeaderHeight();
      updateWindowHeight();
    };

    // Инициализация
    handleResize();

    // Добавляем слушатель с debounce для оптимизации
    let timeoutId: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [hightCheck]);

  // if (Children.count(children) === 1) {
  //   return <div className="flex flex-col w-full justify-center items-center">{children}</div>;
  // }

  return (
    <section
      className={`flex flex-col w-full justify-center items-center transition-all duration-300 ${className}`}
      style={{ 
        height: hightCheck ? `calc(${windowHeight}px - ${headerHeight}px)` : '100%',
        // marginTop: hightCheck ? `${headerHeight}px` : '0'
      }}
    >
      {children}
    </section>
  );
};

