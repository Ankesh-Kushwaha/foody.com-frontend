import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cuisineList } from '@/config/restaurant-options-config';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import CuisineCheckBox from './CuisineCheckBox';

export const CuisineSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div className="text-2xl font-bold">Cuisines</div>
      <FormDescription>
        Select the cuisines that your restaurant serves
      </FormDescription>

      <FormField
        control={control}
        name="cuisines"  // ✅ matches schema + defaultValues
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem, idx) => (
                <CuisineCheckBox
                  cuisine={cuisineItem}
                  key={idx}
                  field={field}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
