import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { memo } from "react";

import { DropdownCalendar } from "@/components/layouts/base/DropdownCalendar";
import { Button } from "@/components/shadcn/ui/button";
import { FormControl } from "@/components/shadcn/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  value: Date | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
};
export const BirthdayFormControl = memo(({ onChange, value }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
            variant="outline"
          >
            {value ? format(value, "yyyy年MM月dd日") : <span>誕生日を選択</span>}
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
          onSelect={onChange}
          selected={value}
        />
      </PopoverContent>
    </Popover>
  );
});
BirthdayFormControl.displayName = "BirthdayFormControl";
