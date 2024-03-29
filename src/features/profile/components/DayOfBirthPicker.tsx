import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { memo } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { FormFieldValue } from "./ProfileForm";

import { DropdownCalendar } from "@/components/layouts/base/DropdownCalendar";
import { Button } from "@/components/shadcn/ui/button";
import { FormControl } from "@/components/shadcn/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";

export const DayOfBirthPicker = memo((field: ControllerRenderProps<FormFieldValue, "birthday">) => {
  return (
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
  );
});
DayOfBirthPicker.displayName = "DayOfBirthPicker";
