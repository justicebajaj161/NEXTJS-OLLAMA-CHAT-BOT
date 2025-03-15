import { UserButton } from "@clerk/nextjs"
import { currentUser } from '@clerk/nextjs/server'




const MemberProfile =async () => {
    const user =  await currentUser()

  return (
    <div className="px-4 gap-2 flex items-center">
      <UserButton />
      <p className="textarea-md ml-2">{user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}

export default MemberProfile
