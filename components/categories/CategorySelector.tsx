'use client'

import {Category} from "@/supabase/types/CategoryType";
import {JSX, useState} from "react";
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Renderable} from "@/utilities/ComponentUtilities";

export function CategorySelector(props: {
    categories: Array<Category>
}): Renderable {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>("")
    const router = useRouter()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full max-w-full relative flex justify-center sm:justify-start",
                        "sm:flex-none items-center gap-2 bg-emerald-500 hover:bg-emerald-700",
                        "hover:text-white text-white font-bold py-2 px-4 rounded",
                        "transition-all duration-200"
                    )}
                >
                    {value
                        ? props.categories.find((category) => category.id.toString() === value)?.title
                        : "Vælg kategori"
                    }
                    <ChevronsUpDown className="ml-2 size-4 shrink-0"/>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Søg efter kategori..."
                        className="h-9"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
                            if (e.key === "Enter") {
                                const selectedCategory = props.categories.find((category) =>
                                    category.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                                )
                                if (selectedCategory?.slug) {
                                    setValue(selectedCategory.id.toString())
                                    router.push(`/categories/${selectedCategory.slug}`)
                                    setOpen(false)
                                }
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>Ingen kategori fundet.</CommandEmpty>
                        <CommandGroup>
                            {props.categories.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(value === category.id.toString() ? "" : category.id.toString())
                                        router.push(`/categories/${category.slug}`)
                                        setOpen(false)
                                    }}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "ml-auto size-4",
                                            value === category.id.toString() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}