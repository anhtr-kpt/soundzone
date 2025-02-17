import { Link, useLocation } from "react-router-dom";
import {
  Disc,
  UsersRound,
  Database,
  Users,
  LayoutDashboard,
  Tags,
} from "lucide-react";

const NavigationBar = () => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Songs",
      path: "/admin/songs",
      icon: Disc,
    },
    {
      title: "Artists",
      path: "/admin/artists",
      icon: UsersRound,
    },
    {
      title: "Genres",
      path: "/admin/genres",
      icon: Tags,
    },
    {
      title: "Albums",
      path: "/admin/albums",
      icon: Database,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <nav className="">
      <ul role="list" className="space-y-2">
        {navItems.map(({ title, path, icon: Icon }) => (
          <li
            key={path}
            className={`${
              location.pathname === path
                ? "flex bg-gradient-to-r from-primary-foreground/40 to-20%"
                : ""
            }`}
          >
            <Link
              to={path}
              className={`border-l-2 primary-hover link ${
                location.pathname === path
                  ? "text-primary-foreground border-primary-foreground"
                  : "border-background"
              }`}
            >
              {Icon && <Icon size={22} strokeWidth={1.5} />}
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
