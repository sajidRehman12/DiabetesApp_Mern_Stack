import { useState } from "react";
import {
  Heart,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="app">
      <nav className="bg-white shadow-md"> {/* Added background and shadow for depth */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Increased max-width and added horizontal padding */}
          <div className="flex justify-between items-center py-4"> {/* Changed to justify-between for left/right alignment */}
            {/* Logo section */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"> {/* Centered content, added shadow */}
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Diabetic Patients Assessment</h1>
                <p className="text-sm text-slate-600">Comprehensive Health Monitoring & Risk Analysis</p>
              </div>
            </div>

            {/* Primary navigation - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-8 text-lg font-medium"> {/* Added text styling */}
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out">Home</a>
              
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-6">
              

              {/* Free trial button - hidden on very small screens */}
              <div className="hidden xs:block">
                <button className="rounded-full border-solid border-2 border-blue-600 text-blue-600 py-2 px-6 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"> {/* Enhanced button styling */}
                  Free Trial
                </button>
              </div>

              {/* Mobile menu toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)} className="text-gray-600 hover:text-blue-600 transition-colors">
                  {toggleMenu ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />} {/* Increased icon size */}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-500 ease-in-out ${ /* Adjusted duration and easing */
            !toggleMenu ? "h-0" : "h-screen" // Changed to h-screen to fill the viewport
          }`}
        >
          <div className="px-8 pt-8 pb-4"> {/* Added bottom padding */}
            <div className="flex flex-col gap-6 font-bold tracking-wider text-xl"> {/* Increased font size and adjusted gap */}
              <a href="#" className="border-l-4 border-blue-600 pl-4 text-blue-600 hover:text-blue-800 transition-colors duration-300 ease-in-out"> {/* Highlighted active item */}
                Home
              </a>
            </div>
          </div>
          {/* Optional: Add a dark overlay when the mobile menu is open for better focus */}
          {toggleMenu && (
            <div className="absolute inset-0 bg-black opacity-25" onClick={() => setToggleMenu(false)}></div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;