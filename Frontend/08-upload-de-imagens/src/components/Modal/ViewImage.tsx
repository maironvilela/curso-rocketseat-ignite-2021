import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent bgColor="pGray.900">
        <ModalCloseButton />

        <ModalBody>
          <Image src={imgUrl} />
        </ModalBody>

        <ModalFooter>
          <Link href={imgUrl} mr="auto" isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
