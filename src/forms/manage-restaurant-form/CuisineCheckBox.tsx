import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">; // ✅ match schema (plural)
};

const CuisineCheckBox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={(field.value ?? []).includes(cuisine)}
          onCheckedChange={(checked) => {
            const current: string[] = field.value ?? [];
            if (checked === true) {
              field.onChange([...current, cuisine]);
            } else {
              field.onChange(current.filter((value) => value !== cuisine));
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckBox;
