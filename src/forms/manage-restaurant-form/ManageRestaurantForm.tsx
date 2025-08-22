import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import { CuisineSection } from "./CuisineSection";
import MenuSection from "./MenuSection";
import { formSchema, RestaurantFormData } from "./formSchema";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

type Props = {
  onSave: (restaurantFormData: FormData) => void; // Accept FormData instead of RestaurantFormData
  isPending: boolean;                                      // ✅ match namin                      
};

const ManageRestaurantForm = ({ onSave, isPending}: Props) => {
  const form = useForm<RestaurantFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any, // workaround for type mismatch
    defaultValues: {
      cuisines: [],
      menuItems:[{name:"",price:0}]
    }
  })
  
const onSubmit = (formDataJson: RestaurantFormData) => {
  const formData = new FormData();

  formData.append("restaurantName", formDataJson.restaurantName);
  formData.append("city", formDataJson.city);
  formData.append("country", formDataJson.country);

  // Keep as float numbers (stringified), don't multiply by 100
  formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
  formData.append(
    "estimatedDeliveryTime",
    formDataJson.estimatedDeliveryTime.toString()
  );

  // Append cuisines array
  formDataJson.cuisines.forEach((cuisine, index) => {
    formData.append(`cuisines[${index}]`, cuisine);
  });

  // Append menuItems array
  formDataJson.menuItems.forEach((menuItem, index) => {
    formData.append(`menuItems[${index}][name]`, menuItem.name);
    formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
  });

  // Append image if exists
  if (formDataJson.imageFile) {
    formData.append("imageFile", formDataJson.imageFile);
  }

  onSave(formData);
};


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <DetailSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
         {isPending ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  )
};

export default ManageRestaurantForm;
