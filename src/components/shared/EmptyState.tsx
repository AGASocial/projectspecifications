import { Card, CardContent } from '@/components/ui/card';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-xl font-semibold mb-2">{title}</p>
        <p className="text-muted-foreground mb-6">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}