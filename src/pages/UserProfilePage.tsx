import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserapi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"


export const UserProfilePage = () => {
  const { currentUser,isPending:pending} = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  
  if (pending) {
     return <span>Loading....</span>
  }
  
  if (!currentUser) {
    return <span>Unable to load User Profile</span>;
  }

  return (
    <UserProfileForm onSave={updateUser}  currentUser={currentUser} isPending={isPending} />
  )
}
