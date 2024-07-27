import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import ProfilePhoto from "./profile-photo";
import { useAuth } from "@/context/auth-provider";

type PhotoModalProps = {
  src?: string;
  isOpen: boolean;
  onOpenChange: () => void;
};

const PhotoModal = ({ src, isOpen, onOpenChange }: PhotoModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      hideCloseButton
      placement="center"
      backdrop="blur"
      classNames={{
        base: "w-min",
        wrapper: "w-full",
        backdrop: "bg-[#000000]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalBody>
          <ProfilePhoto
            src={src || "/default.webp"}
            className="h-auto w-[500px] rounded-none"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PhotoModal;
