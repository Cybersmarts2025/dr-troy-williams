
const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png"
              alt="Dr. Troy Williams"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dr. Troy Williams</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Welcome to my personal website. I'm passionate about sharing knowledge and making a difference through my work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
