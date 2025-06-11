import { TiLocationArrow } from "react-icons/ti"

const Features = () => {
  return (
    <section className="bg-black text-white py-20 px-5 md:px-30">
      <div className="font-circular-web w-full px-5 md:px-10 mb-10">
        <h2>Explore the Zentry Universe</h2>
        <p className="text-white/50 w-[100%] md:w-[40%]">
          Immerse yourself in an IP-rich product universe where players, agentic AI and blockchain lead the new economic paradigm.
        </p>
      </div>
      <div className="h-96 md:h-[65vh] border-1 border-my-blue-50/20 w-full rounded-lg mb-7 overflow-hidden">
        <BentoCard
          videoSrc="/videos/feature-1.mp4"
          title={<>radia<b>n</b>t</>}
          description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-5 md:grid-rows-3 h-[135vh] gap-7">
        <div className="row-span-1 md:row-span-2 border-1 border-my-blue-50/20  rounded-lg overflow-hidden">
          <BentoCard
            videoSrc="/videos/feature-2.mp4"
            title={<>zig<b>m</b>a</>}
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
          />
        </div>
        <div className="row-span-1 border-1 border-my-blue-50/20 rounded-lg overflow-hidden mr-30 md:mr-0">
          <BentoCard
            videoSrc="/videos/feature-3.mp4"
            title={<>n<b>e</b>xus</>}
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
          />
        </div>
        <div className="row-span-1 border-1 border-my-blue-50/20 rounded-lg overflow-hidden ml-15 md:ml-0">
          <BentoCard
            videoSrc="/videos/feature-4.mp4"
            title={<>az<b>u</b>l</>}
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
          />
        </div>
        <div className="row-span-1 border-1 border-my-blue-50/20 rounded-lg overflow-hidden">
          <div className="size-full flex flex-col justify-between bg-my-violet-300 p-5">
            <h1 className="font-zentry-regular special-font text-4xl md:text-7xl max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end fill-black" />
          </div>
        </div>
        <div className="row-span-1 border-1 border-my-blue-50/20 rounded-lg hidden md:block overflow-hidden">
          <video
            src="/videos/feature-5.mp4"
            muted
            autoPlay
            loop
            className="size-full object-cover object-center"
          />
        </div>
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
      <div className="relative p-5 md:p-10 size-full">
        <h3 className="font-zentry-regular special-font text-4xl md:text-7xl uppercase">{title}</h3>
        {description && (
          <p className="text-my-blue-50 max-w-[50%] md:max-w-[40%] text-xs md:text-base">{description}</p>
        )}
      </div>
    </div>
  )
}

export default Features