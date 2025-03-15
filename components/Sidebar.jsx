import MemberProfile from "./MemberProfile"
import NavLinks from "./NavLinks"
import SidebarHeader from "./SidebarHeader"


const Sidebar = () => {
  return (
    <div className="px-4 py-12 bg-base-300 w-80 min-h-full grid grid-rows-[auto_1fr_auto]">
     <SidebarHeader/>
      <NavLinks/>
      <MemberProfile/>
    </div>
  )
}

export default Sidebar
