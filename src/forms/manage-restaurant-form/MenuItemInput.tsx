import { Button } from "@/components/ui/button";
import {
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      {/* Name field */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex flex-[2]">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price field */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem className="flex flex-[1]">
            <FormLabel>Price (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="10.0"
                className="bg-white"
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Remove button */}
      <Button
        type="button"
        onClick={removeMenuItem}
        variant="destructive"
        className="max-h-fit"
      >
        Remove Item
      </Button>
    </div>
  );
};

export default MenuItemInput;
