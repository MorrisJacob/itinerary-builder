import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ActivityInputProps {
  onAdd: (activity: string) => void;
}

export const ActivityInput = ({ onAdd }: ActivityInputProps) => {
  const [activity, setActivity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activity.trim()) {
      onAdd(activity.trim());
      setActivity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Add an activity..."
        className="flex-1"
      />
      <Button type="submit" size="icon" className="shrink-0">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};
