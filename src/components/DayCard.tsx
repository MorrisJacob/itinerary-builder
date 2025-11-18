import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  name: string;
  category: string;
}

interface DayCardProps {
  day: string;
  activities: Activity[];
  onRemove: (activityId: string) => void;
}

export const DayCard = ({ day, activities, onRemove }: DayCardProps) => {
  return (
    <Card className="border-2 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{day}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No activities yet</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-2 rounded-lg bg-secondary p-3 group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.name}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {activity.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemove(activity.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
