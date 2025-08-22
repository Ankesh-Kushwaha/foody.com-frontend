import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // actual API call
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create the restaurant");
    }

    return response.json();
  };

  // react-query mutation
  const { mutate: createRestaurant, isPending } = useMutation({
    mutationFn: createMyRestaurantRequest,
    onSuccess: () => {
      toast.success("Restaurant created successfully 🎉");
    },
    onError: (err: unknown) => {
      toast.error(
        err instanceof Error ? err.message : "Unable to create restaurant"
      );
    },
  });

  return { createRestaurant, isPending };
};
