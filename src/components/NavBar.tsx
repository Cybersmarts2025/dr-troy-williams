
import { Menu, Info, Book } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-custom-background shadow-md z-50 border-b-2 border-custom-primary">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-custom-primary">Dr. Troy Williams</Link>
        <div className="hidden md:flex gap-6">
          <Link to="/about" className="flex items-center gap-1 text-custom-secondary hover:text-custom-primary transition-colors">
            <Info className="h-4 w-4" />
            About
          </Link>
          <Link to="/books" className="flex items-center gap-1 text-custom-secondary hover:text-custom-primary transition-colors">
            <Book className="h-4 w-4" />
            Books
          </Link>
          <a href="#work" className="text-custom-secondary hover:text-custom-primary transition-colors">Work History</a>
          <a href="#videos" className="text-custom-secondary hover:text-custom-primary transition-colors">Videos</a>
          <a href="#contact" className="text-custom-secondary hover:text-custom-primary transition-colors">Contact</a>
        </div>
        <Button variant="patriotic" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
