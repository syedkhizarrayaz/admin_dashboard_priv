// import React, {useEffect} from 'react'
// import { AiOutlineMenu } from 'react-icons/ai';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
// import { useStateContext } from '../contexts/ContextProvider';


// const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
//   <TooltipComponent content={title} position="BottomCenter">
//     <button
//       type="button"
//       onClick={() => customFunc()}
//       style={{ color }}
//       className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:text-black"
//     >
//       <span
//         style={{ background: dotColor }}
//         className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
//       />
//       {icon}
//     </button>
//   </TooltipComponent>
// );


// const Navbar = () => {
//   const { activeMenu, setActiveMenu, setScreenSize, screenSize } = useStateContext();
  
//   useEffect(() => {
//     const handleResize = () => setScreenSize(window.innerWidth);

//     window.addEventListener('resize', handleResize);

//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (screenSize <= 900) {
//       setActiveMenu(false);
//     } else {
//       setActiveMenu(true);
//     }
//   }, [screenSize]);
  
//   const handleActiveMenu = () => setActiveMenu(!activeMenu);
  
//   return (
//     <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
//     <NavButton title="Menu" customFunc={handleActiveMenu} color={'secondary-dark-bg'} icon={<AiOutlineMenu />} />
//     <div className='flex'>
//       {/* <TooltipComponent content="Profile" position="BottomCenter">
//       <div
//             className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
//             onClick={() => handleClick('userProfile')}
//           >
//             <img
//               className="rounded-full w-8 h-8"
//               src={avatar}
//               alt="user-profile"
//             />
//             <p>
//               <span className="text-gray-400 text-14">Hi,</span>{' '}
//               <span className="text-gray-400 font-bold ml-1 text-14">
//                 Admin
//               </span>
//             </p>
//             <MdKeyboardArrowDown className="text-gray-400 text-14" />
//           </div>
//       </TooltipComponent>
//       {isClicked.userProfile && (<UserProfile />)} */}
//     </div>
    
//     </div>
//   )
// }

// export default Navbar

// Navbar.js
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
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
  const { toggleSidebar } = useStateContext();

  return (
    <div className="flex justify-between p-2 md:ml-2 md:mr-2 relative">
      <NavButton title="Menu" customFunc={toggleSidebar} color={'secondary-dark-bg'} icon={<AiOutlineMenu />} />
      {/* Other Navbar Items */}
    </div>
  );
};

export default Navbar;
