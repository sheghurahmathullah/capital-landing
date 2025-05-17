import React, { useState, useRef } from 'react';
import { PlayCircle, X } from 'react-feather';

const FounderInsights: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleClose = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Video Container */}
          <div className="relative group">
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
              {!isPlaying ? (
                <>
                  <img 
                    src="/ceo-thumbnail.png" 
                    alt="Mr. Balaskandan Raghunathan, Sugee Managing Director" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity"
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handlePlay}
                  >
                    <PlayCircle 
                      className="h-20 w-20 text-white opacity-90 hover:opacity-100 hover:scale-110 transition-all" 
                      strokeWidth={1}
                    />
                  </div>
                </>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    controls
                    className="w-full h-full object-cover"
                    poster="/ceo-thumbnail.png"
                  >
                    <source src="/video/ceo.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-all"
                    aria-label="Close video"
                  >
                    <X size={24} />
                  </button>
                </>
              )}
            </div>
            {!isPlaying && (
              <div className="absolute -inset-4 border-2 border-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            )}
          </div>
          
          {/* Content */}
          <div className="text-white">
            <span className="uppercase tracking-wider text-blue-300 font-medium text-sm">
              Leadership Insights
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Words from Our Founder
            </h2>
            
            <div className="mt-6 space-y-4 text-lg leading-relaxed">
              <p>
                In this exclusive video, our Managing Director, <strong>Mr. Balaskandan Raghunathan</strong>, 
                shares his expert insights on Sugee, its growth, vision, and the impact it has made in the industry.
              </p>
              <p>
                Watch as Mr. Raghunathan talks about the company's journey, challenges, and the future of Sugee, 
                offering a deeper look at what drives the success of the business.
              </p>
              <p className="font-medium text-blue-200">
                His perspective highlights the dedication and passion that fuel our mission.
              </p>
            </div>
            
            <button 
              onClick={handlePlay}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              {isPlaying ? 'Now Playing' : 'Watch the Full Video'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderInsights;