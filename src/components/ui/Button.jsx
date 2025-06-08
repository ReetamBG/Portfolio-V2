const Button = ({ title, containerClass, leftIcon, rightIcon, id }) => {
  return (
    <button id={id} className={`bg-violet-50 flex gap-3 items-center  hover:rounded-sm hover:scale-x-90 hover:scale-y-110 hover:-skew-y-1  hover:skew-x-5 ease-out transition-all duration-200 rounded-2xl px-7 py-3 cursor-pointer ${containerClass} font-general font-bold uppercase text-xs`}>
        {leftIcon}
        <span>{title}</span>
        {rightIcon}
    </button>
  )
}

export default Button