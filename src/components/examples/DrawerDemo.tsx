import { AlertIcon, CancelIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ExampleContainer } from "@/components/examples/ExampleContainer";

export const DrawerDemo = () => {
  return (
    <ExampleContainer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="destructive">
            <Icon icon={AlertIcon} />
            Delete profile
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Delete profile</DrawerTitle>
            <DrawerDescription>
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant={"secondary"}>
                <Icon icon={CancelIcon} />
                Cancel
              </Button>
            </DrawerClose>
            <Button variant="destructive">
              <Icon icon={AlertIcon} />
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ExampleContainer>
  );
};
