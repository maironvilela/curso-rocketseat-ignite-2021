import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { useSidebarDrawer } from "../context/SidebarDrawerContext";
import { Sidebar } from "./Sidebar"
import { SidebarNav } from "./SidebarNav"

export const SidebarDrawer = () => {
  const { isOpen, onClose } = useSidebarDrawer();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.800" alignItems="center"
        >
          <DrawerCloseButton />
          <DrawerHeader>  </DrawerHeader>

          <DrawerBody>
            <SidebarNav />
          </DrawerBody>

          <DrawerFooter>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </>
  )
}
