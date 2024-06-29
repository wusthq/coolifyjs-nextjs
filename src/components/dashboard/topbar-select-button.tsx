import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TopbarSelectButtonProps extends SelectMainListProps {
  children: React.ReactNode;
}

export const TopbarSelectButton = ({
  children,
  options,
  activeId,
  createButton,
}: TopbarSelectButtonProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-1">
          {children}
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              aria-expanded={open}
              className="rounded-[8px] px-0.5 py-1.5 text-gray-300 hover:bg-gray-100 hover:text-gray-500"
              role="combobox"
              onClick={() => setOpen(!open)}
            >
              <ChevronsUpDown className="scale-75" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent align="start" className="w-[250px] p-0">
          <SelectList
            activeId={activeId}
            options={options}
            createButton={createButton}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1">
        {children}
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-expanded={open}
            className="rounded-[8px] px-0.5 py-1.5 text-gray-300 hover:bg-gray-100 hover:text-gray-500"
            role="combobox"
            onClick={() => setOpen(!open)}
          >
            <ChevronsUpDown className="scale-75" />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="fixed bottom-0 left-0 right-0 flex h-[96%] flex-col rounded-t-[10px] bg-white">
        <div className="h-full">
          <SelectList
            activeId={activeId}
            options={options}
            createButton={createButton}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

interface SelectMainListProps {
  activeId?: string;
  options: {
    id: string;
    value: string;
    onClick: () => void;
  }[];
  createButton: {
    onClick: () => void;
    label: string;
  };
}
interface SelectListProps extends SelectMainListProps {
  setOpen: (open: boolean) => void;
}

const SelectList = ({
  activeId,
  setOpen,
  createButton,
  options,
}: SelectListProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Command className="h-full">
      <CommandInput className="text-[16px]" placeholder="Search..." />
      <CommandList
        className={cn({
          "relative h-full !max-h-[unset]": !isDesktop,
        })}
      >
        <CommandEmpty>No result</CommandEmpty>
        <div
          className={cn({
            "absolute left-0 top-0 flex h-full w-full flex-col": !isDesktop,
          })}
        >
          <CommandGroup className="h-full overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                className="cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  option.onClick();
                }}
              >
                <div className="flex w-full items-center gap-3 truncate py-1">
                  <div className="min-h-[22px] min-w-[22px] rounded-full bg-indigo-200"></div>
                  <span className="truncate">{option.value}</span>
                </div>
                <div hidden={activeId !== option.id}>
                  <Check className="scale-75" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup
            className={cn({
              "border-t pb-2": !isDesktop,
              "-mt-2": isDesktop,
            })}
          >
            <CommandItem
              className={cn(
                "flex h-10 w-full cursor-pointer items-center gap-2 rounded-lg px-1.5 text-left",
              )}
              onSelect={() => {
                setOpen(false);
                createButton.onClick();
              }}
            >
              <PlusCircle className="ml-1 text-indigo-500" size={18} />
              <span className="pl-1.5">{createButton.label}</span>
            </CommandItem>
          </CommandGroup>
        </div>
      </CommandList>
    </Command>
  );
};
