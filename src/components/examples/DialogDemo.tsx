import { AlertIcon, CancelIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/Icon"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExampleContainer } from "./example-container"

export const DialogDemo = () => {
  return (
    <ExampleContainer>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" >
            <Icon icon={AlertIcon} />
            Delete profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete profile</DialogTitle>
            <DialogDescription>Are you sure you want to delete your profile? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild >
              <Button variant={'secondary'} >
                <Icon icon={CancelIcon} />
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive">
              <Icon icon={AlertIcon} />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ExampleContainer>
  )
}