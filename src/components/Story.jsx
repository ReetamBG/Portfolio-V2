import AnimatedHeader from "./AnimatedHeader"
import { useRef, useState } from "react";

const Story = () => {

  const [transformStyle, setTransformStyle] = useState("")
  const imgContainerRef = useRef()

  const handleMouseMove = (e) => {
    if (!imgContainerRef.current) return  // return if item not mounted

    // box position
    const { top, bottom, left, right } = imgContainerRef.current.getBoundingClientRect()

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

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle("")
  }

  return (
    <div
      id="story"
      className="relative w-screen h-[70dvh] md:h-[80dvh] lg:h-dvh bg-black isolate"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full absolute mix-blend-difference z-10">
        <p className="uppercase font-general text-my-blue-50 text-xs md:text-sm text-center mb-10">The open ip universe</p>
        <AnimatedHeader
          text="The st<b>o</b>ry of<br /> a hidden real<b>m</b>"
          containerClass="text-my-blue-50 mix-blend-difference"
        />
      </div>


      <div className="story-image-container top-55 sm:top-20 md:top-40">
        <div
          className="story-image-mask"
          style={{ transform: transformStyle }}
          ref={imgContainerRef}
        >
          <img src="/img/entrance.webp" />
        </div>
      </div>
    </div>
  )
}

export default Story