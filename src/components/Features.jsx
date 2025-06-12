import { useRef, useState } from "react"
import { TiLocationArrow } from "react-icons/ti"

const Features = () => {
  return (
    <section id="features" className="bg-black text-white py-20 px-5 md:px-30 lg:pb-50">
      <div className="font-circular-web w-full px-5 md:px-10 mb-10">
        <h2>Explore the Zentry Universe</h2>
        <p className="text-white/50 w-[100%] md:w-[40%]">
          Immerse yourself in an IP-rich product universe where players, agentic AI and blockchain lead the new economic paradigm.
        </p>
      </div>
      <BentoTilt className="h-70 md:h-[50vh] lg:h-[70vh] w-full mb-7">
        <BentoCard
          videoSrc="/videos/feature-1.mp4"
          title={<>radia<b>n</b>t</>}
          description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
        />
      </BentoTilt>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-5 md:grid-rows-3 h-[135vh] gap-7">
        <BentoTilt className="row-span-1 md:row-span-2">
          <BentoCard
            videoSrc="/videos/feature-2.mp4"
            title={<>zig<b>m</b>a</>}
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
          />
        </BentoTilt>
        <BentoTilt className="row-span-1 mr-30 md:mr-0">
          <BentoCard
            videoSrc="/videos/feature-3.mp4"
            title={<>n<b>e</b>xus</>}
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
          />
        </BentoTilt>
        <BentoTilt className="row-span-1 ml-15 md:ml-0">
          <BentoCard
            videoSrc="/videos/feature-4.mp4"
            title={<>az<b>u</b>l</>}
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
          />
        </BentoTilt>
        <BentoTilt className="row-span-1">
          <div className="size-full flex flex-col justify-between bg-my-violet-300 p-5">
            <h1 className="font-zentry-regular special-font text-4xl md:text-7xl max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end fill-black" />
          </div>
        </BentoTilt>
        <BentoTilt className="row-span-1 hidden md:block">
          <video
            src="/videos/feature-5.mp4"
            muted
            autoPlay
            loop
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </section>
  )
}

const BentoCard = ({ videoSrc, title, description }) => {
  return (
    <div className="relative size-full overflow-hidden">
      <video
        src={videoSrc}
        className="absolute object-cover size-full object-center"
        autoPlay
        muted
        loop
      />
      <div className="relative p-5 size-full">
        <h3 className="font-zentry-regular special-font text-4xl md:text-6xl uppercase">{title}</h3>
        {description && (
          <p className="text-my-blue-50 max-w-[50%] md:max-w-[40%] text-xs md:text-sm">{description}</p>
        )}
      </div>
    </div>
  )
}

// For the tilting animation on hover 
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("")
  const containerRef = useRef()

  const handleMouseMove = (e) => {
    if(!containerRef.current) return  // return if item not mounted

    // box position
    const {top, bottom, left, right} = containerRef.current.getBoundingClientRect()

    // cursor position
    const cursorX = e.clientX
    const cursorY = e.clientY

    // normalized relative position of the cursor wrt the item
    const relativeX = (cursorX - left) / (right - left)  // (cursorX - boxLeft) / widthOfBox
    const relativeY = (cursorY - top) / (bottom - top)   // (cursorY - boxRight) / heightOfBox
    
    // relative position of cursor from center -> degree of tilt
    const tiltStrength = 8
    const tiltX = -(relativeY - 0.5) * tiltStrength
    const tiltY = (relativeX - 0.5) * tiltStrength

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle("")
  }

  return (
    <div
     ref={containerRef} 
     onMouseMove={handleMouseMove}
     onMouseLeave={handleMouseLeave}
     className={`border-1 border-my-blue-50/20 rounded-lg overflow-hidden ${className} transition-all duration-100 ease-linear`}
     style={{transform: transformStyle}}
     >
      {children}
    </div>
  )
}

export default Features