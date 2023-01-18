import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

const TrailerModal = (props: Props) => {
  const { isOpen, onClose, videoUrl } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent maxW="50rem">
        <iframe
          id="ytplayer"
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&origin=http://example.com&controls=1&rel=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default TrailerModal;
