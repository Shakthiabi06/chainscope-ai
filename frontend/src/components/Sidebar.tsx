import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdApps,
  MdInventory,
  MdSecurity,
  MdAnalytics,
  MdDescription
} from "react-icons/md";


function Sidebar() {

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: MdDashboard
    },
    {
      name: "Applications",
      path: "/applications",
      icon: MdApps
    },
    {
      name: "Dependencies",
      path: "/dependencies",
      icon: MdInventory
    },
    {
      name: "Vulnerabilities",
      path: "/vulnerabilities",
      icon: MdSecurity
    },
    {
      name: "Risk Analysis",
      path: "/risk",
      icon: MdAnalytics
    },
    {
      name: "Reports",
      path: "/reports",
      icon: MdDescription
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
                  isActive
                    ? "menu-item active"
                    : "menu-item"
                }
              >

                <Icon size={22}/>

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