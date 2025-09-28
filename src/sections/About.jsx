import { useState } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(' madhavmore535@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20 relative" id="about">
      {/* Background grid and subtle animated reddish glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,0,70,0.06),transparent_70%)] animate-pulse" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,0,70,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,70,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-6 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container relative group">
            <span className="animated-border"></span>
            <img src="assets/madhav.png" alt="grid-1" className="w-full  sm:h-[220px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I’m Madhav More</p>
              <p className="grid-subtext">
                With 2 years of experience, I have honed my skills in full-stack development and AI development, along with hands-on expertise in machine learning and deep learning.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container relative group">
            <span className="animated-border"></span>
            <img src="assets/my_skills.png" alt="grid-2" className="w-full sm:h-[220px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
                applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container relative group">
            <span className="animated-border"></span>
            <div className="rounded-3xl w-full sm:h-[300px] flex justify-center items-center overflow-hidden">
              <Globe
                height={280}
                width={280}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 12 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I&apos;m based in India, Pune and open to remote work worldwide.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container relative group">
            <span className="animated-border"></span>
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[220px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container relative group">
            <span className="animated-border"></span>
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[100px] sm:h-[200px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container cursor-pointer" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-lg md:text-md font-medium text-white text-red-400/80">
                  madhavmore535@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animated-border {
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-radius: 0.75rem;
          pointer-events: none;
        }
        .group:hover .animated-border {
          border: 1px solid rgba(255,50,100,0.7);
          animation: border-animate 3s linear infinite;
        }
        @keyframes border-animate {
          0% { box-shadow: 0 0 3px rgba(255,70,100,0.6), inset 0 0 3px rgba(255,70,100,0.6); }
          50% { box-shadow: 0 0 6px rgba(255,70,100,0.8), inset 0 0 6px rgba(255,70,100,0.8); }
          100% { box-shadow: 0 0 3px rgba(255,70,100,0.6), inset 0 0 3px rgba(255,70,100,0.6); }
        }
      `}</style>
    </section>
  );
};

export default About;