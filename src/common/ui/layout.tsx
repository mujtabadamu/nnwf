import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Home,
  // Settings,
  Users,
  // FileText,
  // HelpCircle,
} from "lucide-react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on mobile after navigation
  const handleNavClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Menu items configuration
  const menuItems = [
    { path: "/", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/user", icon: <Users size={20} />, label: "Users" },
    // { path: "/reports", icon: <FileText size={20} />, label: "Reports" },
    // { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
    // { path: "/help", icon: <HelpCircle size={20} />, label: "Help" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <NavLink to="/" className="text-xl font-bold text-gray-800">
              NNWF
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="font-medium text-gray-700">U</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Absolute positioning for both mobile and desktop when closed */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0 w-64" : "translate-x-[-100px] w-0"
          } ${
            isMobile ? "absolute z-10" : "relative"
          } transition-all duration-300 ease-in-out bg-white border-r border-gray-200 flex flex-col h-full`}
        >
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={location.pathname === item.path}
                  onClick={handleNavClick}
                />
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content - Will now expand when sidebar is closed */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

//@ts-expect-error
function MenuItem({ icon, label, path, isActive, onClick }) {
  return (
    <li>
      <NavLink
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 rounded-md transition-colors ${
            isActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{label}</span>
        <ChevronRight size={16} className="text-gray-400" />
      </NavLink>
    </li>
  );
}
