import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];
}

const ProviderModal = ({ isOpen, onClose, providers }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Providers Information</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {providers.length === 0 ? (
            <p>No providers available</p>
          ) : (
            <div className="flex flex-col gap-8">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="flex flex-col gap-1 border p-6 rounded-lg bg-slate-200"
                >
                  <div className="flex gap-2 items-center text-sm">
                    <UserIcon size={16} />
                    <p>{provider.name}</p>
                  </div>

                  <div className="flex gap-2 items-center text-sm">
                    <MailIcon size={16} />
                    <p> {provider.email || "Not Available"}</p>
                  </div>
                  <div className="flex gap-2 items-center text-sm">
                    <PhoneIcon size={16} />
                    <p> {provider.phone || "Not Available"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogDescription>

        <DialogFooter>
          <DialogClose aria-label="close" asChild>
            <Button onClick={onClose} className="">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderModal;
