import { subDays } from "date-fns";
import { ChangeEvent, Children, HTMLProps, ReactElement } from "react";
import { type DropdownProps } from "react-day-picker";

import { Calendar, CalendarProps } from "@/components/shadcn/ui/calendar";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

type Props = CalendarProps & {
  date: {
    from: DateType;
    to: DateType;
  };
};

type DateType = {
  year: number;
  // 1 <= month <= 12
  month?: number;
  date?: number;
};

export const createFromDate = ({ date = 1, month = 1, year }: DateType) => {
  return new Date(year, month - 1, date);
};
export const createToDate = ({ date, month, year }: DateType) => {
  if (!month) {
    return subDays(new Date(year + 1, 0, 1), 1);
  } else if (!date) {
    return subDays(new Date(year, month, 1), 1);
  } else {
    return new Date(year, month - 1, date);
  }
};

export const DropdownCalendar = ({ classNames, components, date, ...props }: Props) => {
  return (
    <Calendar
      fixedWeeks
      captionLayout="dropdown-buttons"
      classNames={{
        caption_dropdowns: "flex justify-center gap-1",
        ...classNames,
      }}
      components={{
        // 年と月をセレクトできるようにしている
        Dropdown: ({ children, name, onChange, value }: DropdownProps) => {
          const options = Children.toArray(children) as ReactElement<
            HTMLProps<HTMLOptionElement>
          >[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              onValueChange={(value) => {
                handleChange(value);
              }}
              value={value?.toString()}
            >
              <SelectTrigger
                aria-label={name}
                className="pr-1.5 focus:outline-gray-400 focus:ring-0"
              >
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <ScrollArea className="h-72">
                  {options.map((option, id: number) => (
                    <SelectItem
                      key={`${option.props.value as string}-${id}`}
                      value={option.props.value?.toString() ?? ""}
                    >
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          );
        },
        ...components,
      }}
      fromDate={createFromDate(date.from)}
      toDate={createToDate(date.to)}
      {...props}
    />
  );
};
