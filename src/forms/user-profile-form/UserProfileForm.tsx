import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import type { User } from '@/types'
import { useEffect } from 'react'

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "addressLine1 is required"),
  mobileNo: z.string().min(1, "mobileNo is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
})


type UserFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isPending: boolean;
  currentUser:User
}

const UserProfileForm = ({onSave,isPending,currentUser}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser
  });


  useEffect(() => {
    form.reset(currentUser)
  },[currentUser,form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className='space-y-4 bg-gray-50 rounded-lg md:p-10'>
        <div>
          <h2 className='text-2xl font-bold'> User Profile Form</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>
               Email
            </FormLabel>
            <FormControl>
              <Input {...field} disabled className='bg-white' />
            </FormControl>
          </FormItem>
        )} />

        
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>
               Name
            </FormLabel>
            <FormControl>
              <Input {...field} className='bg-white' />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} />
     
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField control={form.control} name="mobileNo" render={({ field }) => (
            <FormItem>
              <FormLabel>
                MobileNo
              </FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )} />
          
          <FormField control={form.control} name="addressLine1" render={({ field }) => (
            <FormItem>
              <FormLabel>
                AddressLine1
              </FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )} />
          
           <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>
                City
              </FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )} />
          
           <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country
              </FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )} />
        </div>

       {isPending ? (<LoadingButton/>) :( <Button type='submit' className='bg-orange-500'>Submit</Button>)}
      </form>
    </Form>
  )
}

export default UserProfileForm;