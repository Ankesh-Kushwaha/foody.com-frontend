import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {toast} from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  userName: string;
};

export const useCreateMyUser = () => {
  const {getAccessTokenSilently } = useAuth0();

  
  const createUserReq = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
         Authorization:`Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create User");
      toast.error("user logged in failed !")
     
    }

    toast.success("user logged in successfull !")
    
    return response.json(); // return something useful!
  };

  const {
    mutateAsync: createUser,
    isPending, // in v5 it's `isPending` instead of `isLoading`
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createUserReq,
  });

  // ✅ return values from the hook
  return { createUser, isPending, isError, isSuccess };
};

type UpdateMyUserRequest = {
  name: string,
  addressLine1: string,
  mobileNo: string,
  city: string,
  country:string,
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user/update-user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
       toast.error("user updation failed")
    }
    toast.success("user updated successfully")
    return response.json();
  }
  
  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  // ✅ return values from the hook
  return { updateUser, isPending, isError, isSuccess };
}



export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user/get-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user Profile");
    }
    return response.json();
  };

  const {
    data: currentUser,
    isPending,
    isError,
    error,
  } = useQuery<User>({
    queryKey: ["fetchCurrentUser"],
    queryFn: getMyUserRequest,
  });

  if (isError && error instanceof Error) {
    toast.error(error.message);
  }

  return { currentUser, isPending };
};


