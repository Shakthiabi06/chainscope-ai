import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Package,
  ShieldAlert,
  Activity,
  FileText
} from "lucide-react";

function Sidebar() {

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Applications",
      path: "/applications",
      icon: Boxes
    },
    {
      name: "Dependencies",
      path: "/dependencies",
      icon: Package
    },
    {
      name: "Vulnerabilities",
      path: "/vulnerabilities",
      icon: ShieldAlert
    },
    {
      name: "Risk Analysis",
      path: "/risk",
      icon: Activity
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText
    }
  ];


  return (

    <aside className="sidebar">

      <div className="logo">
        ChainScope<span>AI</span>
      </div>


      <nav>

        {
          menu.map((item)=>{

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                className={({isActive}) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >

                <Icon size={20}/>

                <span>
                  {item.name}
                </span>

              </NavLink>

            )

          })
        }

      </nav>


    </aside>

  )

}


export default Sidebar;