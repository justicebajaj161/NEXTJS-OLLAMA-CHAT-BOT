import { FaPastafarianism } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="mb-4 flex items-center gap-4 px-4">
      <FaPastafarianism className="w-10 h-10 text-primary "/>
      <h2 className="text-xl font-extrabold text-primary mr-auto">
        AdityaAI
      </h2>
      <ThemeToggle/>
    </div>
  )
}

export default SidebarHeader
