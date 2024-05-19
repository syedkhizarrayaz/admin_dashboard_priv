// Navbar.js
import React, {useEffect} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      // onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:text-black"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  // const handleActiveMenu = () => setActiveMenu(!activeMenu);
  console.log(activeMenu)
  return (
    <div className="flex justify-between p-2 md:ml-2 md:mr-2 relative">
      <NavButton title="Menu" color={'secondary-dark-bg'} icon={<AiOutlineMenu />} />
      {/* Other Navbar Items */}
    </div>
  );
};

export default Navbar;
