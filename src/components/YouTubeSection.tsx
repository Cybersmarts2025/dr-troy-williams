
import { Card, CardContent } from "./ui/card";
import { Youtube, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const YouTubeSection = () => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  const videos = [
    {
      id: "bmx_J5T7MnM",
      title: "Cybersecurity Fundamentals with Dr. Troy Williams"
    },
    {
      id: "TGAaPyptaW8",
      title: "AI and Machine Learning in Cybersecurity"
    },
    {
      id: "ffoO7U_y3XY",
      title: "Advanced Threat Detection Strategies"
    },
    {
      id: "YDYsCmLI-7c",
      title: "Zero Trust Security Architecture"
    },
    {
      id: "PqLi0_NuciI",
      title: "Fraud Prevention in Digital Banking"
    },
    {
      id: "VnMl6a1aajk",
      title: "Building Secure AI Systems"
    }
  ];

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(videoId);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 relative" id="videos">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white z-0"></div>
      
      <div className="absolute inset-0 z-0 opacity-5"
        style={{ 
          background: "repeating-linear-gradient(45deg, #f1f5f9 0px, #f1f5f9 1px, transparent 1px, transparent 20px)", 
          backgroundSize: "200px 200px"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#3C3B6E] to-transparent flex-grow"></div>
          <h2 className="text-3xl font-bold text-center mx-4 text-[#3C3B6E] flex items-center gap-2">
            <Youtube className="h-7 w-7" />
            <span>Featured Videos</span>
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#3C3B6E] to-transparent flex-grow"></div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {videos.map((video, index) => (
            <motion.div 
              key={video.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="relative aspect-video overflow-hidden rounded-t-lg cursor-pointer"
                    onMouseEnter={() => setHoveredVideo(index)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    onClick={() => handleVideoClick(video.id)}
                  >
                    {playingVideo === video.id ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                        title={video.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="z-0"
                      />
                    ) : (
                      <>
                        <img 
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={{ 
                              scale: hoveredVideo === index ? 1 : 0.8,
                              opacity: hoveredVideo === index ? 1 : 0.8
                            }}
                            className="bg-[#B22234] text-white p-3 rounded-full"
                          >
                            <Play className="h-8 w-8" />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#3C3B6E]">{video.title}</h3>
                    <p className="text-sm text-gray-500">Dr. Troy Williams</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mt-10"
        >
          <a 
            href="https://www.youtube.com/@DrTroyWilliamsPhD" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B22234] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#9B0000] transition-colors"
          >
            <Youtube className="h-5 w-5" />
            <span>View More on YouTube</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;
