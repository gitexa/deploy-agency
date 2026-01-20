"use client";

import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOptionProps {
  value: string;
  label: string;
  description: string;
}

export function RadioOption({ value, label, description }: RadioOptionProps) {
  return (
    <div className="flex items-start space-x-3 space-y-0">
      <RadioGroupItem value={value} id={value} className="mt-1" />
      <Label
        htmlFor={value}
        className="font-normal cursor-pointer flex-1"
      >
        <div className="space-y-1">
          <div className="font-semibold text-base">{label}</div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </div>
        </div>
      </Label>
    </div>
  );
}
