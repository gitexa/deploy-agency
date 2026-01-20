import { ReactNode } from "react";

interface QuestionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function QuestionCard({ title, description, children }: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
