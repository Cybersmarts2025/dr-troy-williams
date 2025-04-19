
interface BackgroundOverlayProps {
  shieldPatternUrl: string;
}

export const BackgroundOverlay = ({ shieldPatternUrl }: BackgroundOverlayProps) => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#3C3B6E]/10 z-0"></div>
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: `url('${shieldPatternUrl}')`,
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
    </>
  );
};
