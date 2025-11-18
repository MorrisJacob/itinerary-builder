import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput = ({ value, onChange }: ApiKeyInputProps) => {
  return (
    <div className="space-y-3">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Enter your Google Maps API key to search for places. Get one at{" "}
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            Google Cloud Console
          </a>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <Label htmlFor="api-key">Google Maps API Key</Label>
        <Input
          id="api-key"
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your API key..."
          className="font-mono text-sm"
        />
      </div>
    </div>
  );
};
