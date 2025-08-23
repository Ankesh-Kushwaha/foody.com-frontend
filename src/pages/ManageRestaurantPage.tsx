import { useCreateMyRestaurant } from '../api/MyRestaurantapi'
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  
  return (
    <ManageRestaurantForm onSave={createRestaurant} isPending={isPending}/>
     )
}

export default ManageRestaurantPage;