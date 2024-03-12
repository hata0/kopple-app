import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

import { DayOfBirthCalendar } from "./DayOfBirthCalendar";
import { FormFieldValue } from "./ProfileForm";

import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const DayOfBirthPicker = (field: ControllerRenderProps<FormFieldValue, "birthday">) => {
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
            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <DayOfBirthCalendar
          captionLayout="dropdown-buttons"
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          fromYear={1900}
          mode="single"
          onSelect={field.onChange}
          selected={field.value}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
};
