import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { toast } from "sonner";

interface EmailDialogProps {
  itineraryHtml: string;
}

export const EmailDialog = ({ itineraryHtml }: EmailDialogProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSending(true);
    // Placeholder for email functionality - will be implemented with Lovable Cloud
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Itinerary sent successfully!");
    setIsOpen(false);
    setEmail("");
    setName("");
    setIsSending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Mail className="h-4 w-4" />
          Email Itinerary
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Itinerary</DialogTitle>
          <DialogDescription>
            Send your weekly itinerary to friends and family
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleSend} disabled={isSending} className="w-full">
          {isSending ? "Sending..." : "Send Email"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
