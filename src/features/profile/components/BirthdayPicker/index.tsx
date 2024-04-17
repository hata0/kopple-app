import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { memo, ReactNode } from "react";

import { DropdownCalendar } from "@/components/layouts/base/DropdownCalendar";
import { Button } from "@/components/shadcn/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  value: Date | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  render: (children: ReactNode) => ReactNode;
};
export const BirthdayPicker = memo(({ onChange, render, value }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {render(
          <Button
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
            variant="outline"
          >
            {value ? format(value, "yyyy年MM月dd日") : <span>誕生日を選択</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>,
        )}
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
BirthdayPicker.displayName = "BirthdayFormControl";
