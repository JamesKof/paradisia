import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Accommodation", href: "#accommodation" },
  { name: "Gallery", href: "/gallery", isRoute: true },
  { name: "Explore", href: "#explore" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out rounded-2xl ${
        isScrolled
          ? "w-[95%] max-w-6xl bg-card/80 backdrop-blur-xl shadow-elevation-4 border border-border/60"
          : "w-[95%] max-w-7xl bg-card/60 backdrop-blur-lg shadow-elevation-2 border border-border/40"
      }`}
      style={{ animation: "floatNavbar 6s ease-in-out infinite" }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Paradasia Hideway"
              className="h-11 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(28_92%_54%/0.4)]"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 bg-muted/40 backdrop-blur-sm rounded-xl px-1.5 py-1 border border-border/30">
            {navLinks.map((link) =>
              link.isRoute ? (
                <span
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className="relative px-4 py-2 text-foreground/70 hover:text-brand-orange transition-all duration-300 text-sm font-medium cursor-pointer rounded-lg hover:bg-accent/50 group"
                >
                  {link.name}
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange rounded-full transition-all duration-300 group-hover:w-3/5" />
                </span>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-foreground/70 hover:text-brand-orange transition-all duration-300 text-sm font-medium rounded-lg hover:bg-accent/50 group"
                >
                  {link.name}
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange rounded-full transition-all duration-300 group-hover:w-3/5" />
                </a>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-orange hover:text-brand-orange-dark hover:bg-accent/50 rounded-xl transition-all duration-300 hover:scale-105"
                    onClick={() => navigate("/admin")}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/60 hover:text-brand-orange hover:bg-accent/50 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/60 hover:text-brand-orange hover:bg-accent/50 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/60 hover:text-brand-orange hover:bg-accent/50 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/auth")}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
            <a href="#accommodation">
              <Button
                variant="orange"
                size="default"
                className="rounded-xl shadow-[0_4px_15px_hsl(28_92%_54%/0.35)] hover:shadow-[0_6px_25px_hsl(28_92%_54%/0.5)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                Book Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 hover:bg-accent/50 rounded-xl transition-all duration-300 hover:scale-110"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-border/30">
            {navLinks.map((link) =>
              link.isRoute ? (
                <span
                  key={link.name}
                  onClick={() => {
                    navigate(link.href);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 text-foreground/70 hover:text-brand-orange hover:bg-accent/50 rounded-xl transition-all duration-300 cursor-pointer hover:translate-x-2"
                >
                  {link.name}
                </span>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-foreground/70 hover:text-brand-orange hover:bg-accent/50 rounded-xl transition-all duration-300 hover:translate-x-2"
                >
                  {link.name}
                </a>
              )
            )}
            <div className="flex flex-col gap-3 mt-4 px-4">
              {user ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" className="w-full text-brand-orange border-brand-orange rounded-xl" onClick={() => navigate("/admin")}>
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  <Button variant="outline" className="w-full rounded-xl" onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full rounded-xl" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full rounded-xl" onClick={() => navigate("/auth")}>
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
              <a href="#accommodation" onClick={() => setIsOpen(false)}>
                <Button variant="orange" className="w-full rounded-xl">
                  Book Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
