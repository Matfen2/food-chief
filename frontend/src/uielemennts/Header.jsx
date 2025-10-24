import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-30 bg-transparent">
      <div className="mx-auto max-w-full px-6 py-3 flex items-center justify-between text-white">
        <Link to="/" className="font-semibold tracking-wide text-2xl select-none">FOOD CHIEF</Link>
        <button type="button" className="rounded-lg bg-white/10 text-lg px-4 py-2 cursor-pointer tracking-widest text-white hover:bg-[#40916C] transition hover:scale-105 active:scale-95" style={{ fontFamily: "BebasNeue"}}>
          Se connecter
        </button>
      </div>
    </header>
  );
};

export default Header;
