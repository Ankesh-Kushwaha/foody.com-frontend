import {z} from 'zod'
export const formSchema = z
  .object({
    restaurantName: z.string().min(1, "restaurant name is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),

    deliveryPrice: z.coerce.number().min(0, "delivery price is required"),
    estimatedDeliveryTime: z.coerce.number().min(1, "estimated delivery time is required"),

    cuisines: z.array(z.string()).nonempty("please select at least one item"),

    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),

    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),

  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

export type RestaurantFormData = z.infer<typeof formSchema>;