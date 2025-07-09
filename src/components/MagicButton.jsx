const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}) => {
  return (
    <button
      className={`relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none ${otherClasses}`}
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      
      <span
        className={`inline-flex h-full cursor-pointer items-center justify-center rounded-full 
        bg-slate-950 px-5 text-sm font-bold text-white backdrop-blur-3xl gap-2 
        transition-all duration-300 hover:bg-white hover:text-black`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
