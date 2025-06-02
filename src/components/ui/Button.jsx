const Button = ({title, containerClass, leftIcon, rightIcon, id}) => {
  return (
    <button id={id} className={`bg-violet-50 flex gap-3 hover:rounded-sm hover:scale-110 ease-out transition-all duration-300 rounded-[50px] px-7 py-3 cursor-pointer ${containerClass}`}>
      {leftIcon}
      <span className="font-general text-xs font-bold uppercase">{title}</span>
      {rightIcon}
    </button>
  )
}

export default Button