import { AlertIcon, CancelIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExampleContainer } from "./example-container";

export const DialogDemo = () => (
  <ExampleContainer>
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Icon icon={AlertIcon} />
        Delete profile
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete profile</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>
            <Icon icon={CancelIcon} />
            Cancel
          </DialogClose>

          <Button variant="destructive">
            <Icon icon={AlertIcon} />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </ExampleContainer>
);
