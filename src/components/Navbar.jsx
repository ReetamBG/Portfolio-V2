import { TiLocationArrow } from "react-icons/ti"
import Button from "./ui/Button"
import { useEffect, useRef, useState } from "react"
import { AiFillCodepenCircle } from "react-icons/ai"

const navItems = [
  { text: "Home", href: "#" },
  { text: "About", href: "#about" },
  { text: "Projects", href: "#projects" },
]

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioElementRef = useRef()

  useEffect(() => {
    isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
  }, [isAudioPlaying])

  // start audio play on click anywhere (Code by AI)
  useEffect(() => {
    const tryPlay = () => {
      if (audioElementRef.current) {
        audioElementRef.current.play().catch(() => { })
      }
      window.removeEventListener('click', tryPlay)
      setIsAudioPlaying(true)
    }

    window.addEventListener('click', tryPlay)

    return () => window.removeEventListener('click', tryPlay)
  }, [])


  return (
    <div className="fixed top-4 z-50 w-full h-15">
      {/* Logo and product button */}
      <header className="flex justify-between items-center h-full w-[95%] mx-auto">
        <div className="h-full flex gap-3 sm:gap-5 items-center">
          {/* <img src="img/logo.png" className="h-full" /> */}
          <AiFillCodepenCircle className="size-8 fill-white mr-0 sm:mr-5" />
    
            <Button
              title="Products"
              rightIcon={<TiLocationArrow className="text-sm hidden sm:block" />}
              containerClass="h-7 text-black !bg-my-blue-50 !px-5 !font-semibold !text-[0.7rem]"
            />
            <Button
              title="Wallpaper"
              containerClass="h-7 text-black !bg-my-blue-50 !px-5 !font-semibold !text-[0.7rem]"
            />
          
        </div>
        <div className="flex items-center gap-15">
          <nav className="hidden sm:flex text-white uppercase text-xs gap-15 font-general font-bold">
            {navItems.map((navItem, idx) => (
              <a key={idx} href={navItem.href}>{navItem.text}</a>
            ))}
          </nav>
          <button
            onClick={() => setIsAudioPlaying(prev => !prev)}
            className="flex gap-1 cursor-pointer size-10 items-center"
          >
            <audio ref={audioElementRef} src="audio/loop.mp3" loop hidden />
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`indicator-line ${isAudioPlaying && "active"}`}
                style={{
                  animationDelay: `${bar * 0.1}s`,
                }}
              />
            ))}
          </button >
        </div>
      </header>
    </div>
  )
}

export default Navbar