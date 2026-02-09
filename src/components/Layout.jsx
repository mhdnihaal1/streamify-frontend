import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false , sidebarProps = {} }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <div className="w-64"><Sidebar {...sidebarProps} /></div>}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto">{children}</main>
 
        </div>
        
      </div>
      
    </div>
  );
};
export default Layout;
