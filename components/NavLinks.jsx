import Link from "next/link"

const links = [
    {href:'/chat', label:'chat'},
    {href:'/profile', label:'profile'},
]

const NavLinks = () => {
  return (
    <div className="menu text-base-content w-auto">
      {links.map((link)=>{
        return (
            <li key={link.href}>
                <Link href={link.href} className="capitalize">{link.label}</Link>
            </li>
        )
      })}
    </div>
  )
}

export default NavLinks
