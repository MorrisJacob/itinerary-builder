import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Loader2 } from "lucide-react";

interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
}

interface PlacesListProps {
  categories: string[];
  city: string;
  apiKey: string;
  onSelectPlace: (placeName: string) => void;
}

const categoryToPlaceType: Record<string, string[]> = {
  food: ["restaurant"],
  entertainment: ["night_club", "movie_theater", "amusement_park"],
  bowling: ["bowling_alley"],
  golf: ["golf_course"],
  cafe: ["cafe"],
  movies: ["movie_theater"],
  fitness: ["gym"],
  shopping: ["shopping_mall", "store"],
};

export const PlacesList = ({ categories, city, apiKey, onSelectPlace }: PlacesListProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey || categories.length === 0 || !city) {
      setPlaces([]);
      return;
    }

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const placeTypes = categories.flatMap((cat) => categoryToPlaceType[cat] || []);
        const uniqueTypes = [...new Set(placeTypes)];
        
        const allPlaces: Place[] = [];
        
        for (const type of uniqueTypes) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${encodeURIComponent(city)}&key=${apiKey}`,
            { mode: 'cors' }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.results) {
              allPlaces.push(...data.results);
            }
          }
        }
        
        // Remove duplicates and limit results
        const uniquePlaces = allPlaces.filter(
          (place, index, self) => index === self.findIndex((p) => p.place_id === place.place_id)
        );
        
        setPlaces(uniquePlaces.slice(0, 20));
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [categories, city, apiKey]);

  if (!apiKey) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (places.length === 0 && categories.length > 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No places found. Try selecting different categories.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {places.map((place) => (
        <Card key={place.place_id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{place.name}</h3>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{place.vicinity}</span>
              </div>
            </div>
            
            {place.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{place.rating}</span>
                {place.user_ratings_total && (
                  <span className="text-muted-foreground">({place.user_ratings_total})</span>
                )}
              </div>
            )}
            
            <Button
              onClick={() => onSelectPlace(place.name)}
              className="w-full"
              size="sm"
            >
              Add to Itinerary
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
