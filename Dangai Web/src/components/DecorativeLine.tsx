import React from 'react';

interface DecorativeLineProps {
  variant?: 'main' | 'arc';
}

const DecorativeLine: React.FC<DecorativeLineProps> = ({ variant = 'main' }) => {
  const mainLineClasses = "w-full lg:w-[150%] 2xl:w-[125%] lg:left-[-25%] 2xl:left-[-12.5%] h-[4px] my-14 md:my-16 shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.2)]";
  const mainAfterClasses = "top-[-1px] w-[60%] h-[6px] opacity-60 shadow-[0_0_15px_rgba(255,255,255,0.3)]";

  const arcLineClasses = "w-full lg:w-[110%] lg:left-[-5%] h-[3px] my-10 md:my-12 shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.1)]";
  const arcAfterClasses = "top-[-1px] w-[50%] h-[5px] opacity-50 shadow-[0_0_10px_rgba(255,255,255,0.2)]";

  const lineBase = "relative bg-gradient-to-r from-transparent via-white to-transparent opacity-80";
  const afterBase = "content-[''] absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent";

  return (
    <div className={`${lineBase} ${variant === 'main' ? mainLineClasses : arcLineClasses}`}>
      <div className={`${afterBase} ${variant === 'main' ? mainAfterClasses : arcAfterClasses}`}></div>
    </div>
  );
};

export default DecorativeLine;