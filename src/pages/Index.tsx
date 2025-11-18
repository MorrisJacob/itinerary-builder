import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { DayCard } from "@/components/DayCard";
import { ActivityInput } from "@/components/ActivityInput";
import { EmailDialog } from "@/components/EmailDialog";
import { Button } from "@/components/ui/button";
import { Utensils, Music, Trophy, Goal, Coffee, Film, Dumbbell, ShoppingBag } from "lucide-react";

const categories = [
  { id: "food", name: "Food & Dining", icon: Utensils },
  { id: "entertainment", name: "Entertainment", icon: Music },
  { id: "bowling", name: "Bowling", icon: Trophy },
  { id: "golf", name: "Golf", icon: Goal },
  { id: "cafe", name: "Cafés", icon: Coffee },
  { id: "movies", name: "Movies", icon: Film },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
  { id: "shopping", name: "Shopping", icon: ShoppingBag },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Activity {
  id: string;
  name: string;
  category: string;
  day: string;
}

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDay, setCurrentDay] = useState("Monday");

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addActivity = (activityName: string) => {
    if (selectedCategories.length === 0) {
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      name: activityName,
      category: categories.find((c) => c.id === selectedCategories[0])?.name || "",
      day: currentDay,
    };

    setActivities((prev) => [...prev, newActivity]);
  };

  const removeActivity = (activityId: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== activityId));
  };

  const getActivitiesForDay = (day: string) => {
    return activities.filter((a) => a.day === day);
  };

  const generateItineraryHtml = () => {
    return `
      <h1>My Weekly Itinerary</h1>
      ${daysOfWeek
        .map(
          (day) => `
        <h2>${day}</h2>
        <ul>
          ${getActivitiesForDay(day)
            .map((a) => `<li>${a.name} - ${a.category}</li>`)
            .join("")}
        </ul>
      `
        )
        .join("")}
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Plan Your Week
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your favorite categories and build the perfect itinerary for your week
          </p>
        </div>

        {/* Categories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Choose Your Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                name={category.name}
                selected={selectedCategories.includes(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
          </div>
        </section>

        {/* Activity Input */}
        {selectedCategories.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Add Activities</h2>
              <div className="flex gap-2">
                <select
                  value={currentDay}
                  onChange={(e) => setCurrentDay(e.target.value)}
                  className="rounded-lg border-2 border-border bg-card px-4 py-2 text-sm font-medium"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ActivityInput onAdd={addActivity} />
          </section>
        )}

        {/* Weekly View */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Your Itinerary</h2>
            {activities.length > 0 && <EmailDialog itineraryHtml={generateItineraryHtml()} />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {daysOfWeek.map((day) => (
              <DayCard
                key={day}
                day={day}
                activities={getActivitiesForDay(day)}
                onRemove={removeActivity}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
