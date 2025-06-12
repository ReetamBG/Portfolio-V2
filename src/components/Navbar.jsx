import { TiLocationArrow } from "react-icons/ti"
import Button from "./ui/Button"
import { useEffect, useRef, useState } from "react"
import { AiFillCodepenCircle } from "react-icons/ai"
import { useWindowScroll } from "react-use"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const navItems = [
  { text: "Home", href: "#" },
  { text: "About", href: "#about" },
  { text: "Features", href: "#features" },
  { text: "Story", href: "#story" },
  { text: "Contact", href: "#contact" },
]

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const audioElementRef = useRef()
  const navbarRef = useRef()
  const navContainerRef = useRef()

  const { y: currentScrollY } = useWindowScroll()

  useEffect(() => {
    // if at the top of the website show transparent navbar 
    if(currentScrollY < 150){
      setIsNavbarVisible(true)
      navbarRef.current.classList.remove("floating-navbar")
    }
    // scrolling down (i.e current scroll position > last scroll position) (below 150) navbar becomes floating but hides it
    else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false)
    }
    // scrolling up floating navbar reappears
    else if (lastScrollY > currentScrollY){
      setIsNavbarVisible(true)
      navbarRef.current.classList.add("floating-navbar")
    }

    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  // show navbar based on if visible
  useGSAP(()=>{
      gsap.to(navContainerRef.current, {
        y: isNavbarVisible ? 0 : -100,
        opacity: isNavbarVisible ? 1 : 0,
        duration: 0.3
      })
    }, [isNavbarVisible])

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
    <div className="fixed top-4 z-50 w-full h-15" ref={navContainerRef}>
      {/* Logo and product button */}
      <header
        ref={navbarRef}
        className="flex justify-between items-center h-full w-[95%] mx-auto transition-all duration-1000 ease-in-out"
      >
        <div className="ml-5 h-full flex gap-3 sm:gap-5 items-center">
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
              <a className=" nav-hover-btn" key={idx} href={navItem.href}>{navItem.text}</a>
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
                  animationDelay: `${bar * 0.2}s`,
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