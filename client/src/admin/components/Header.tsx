import { Cast } from "lucide-react";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import Settings from "./Settings";

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`fixed bg-background z-10 top-0 left-0 right-0 ml-56 py-4 px-8 flex gap-6 justify-between items-center transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${lastScrollY > 0 ? "border-b" : ""}`}
    >
      <Searchbar />
      <div className="flex items-center gap-8">
        <button type="button" className="primary-hover">
          <Cast strokeWidth={1.5} size={22} />
        </button>
        <Settings />
        {/* <button type="button" className="primary-hover">
          <Settings strokeWidth={1.5} size={22} />
        </button> */}
        <button type="button" className="primary-hover">
          <img
            src="../src/assets/avatar.jpeg"
            className="rounded-full w-10 border border-primary"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
