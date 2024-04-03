import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { memo } from "react";
import { Control } from "react-hook-form";

import { ProfileFormInput } from "../services/backend/profiles/[id]/type";

import { DropdownCalendar } from "@/components/layouts/base/DropdownCalendar";
import { Button } from "@/components/shadcn/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  control: Control<ProfileFormInput>;
};
export const BirthdayFormField = memo(({ control }: Props) => {
  return (
    <FormField
      control={control}
      name="birthday"
      render={({ field }) => (
        <FormItem className="w-48">
          <FormLabel>誕生日</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  variant="outline"
                >
                  {field.value ? format(field.value, "yyyy年MM月dd日") : <span>誕生日を選択</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <DropdownCalendar
                date={{
                  from: { year: 1900 },
                  to: new Date(),
                }}
                mode="single"
                onSelect={field.onChange}
                selected={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
BirthdayFormField.displayName = "DayOfBirthPicker";
