import { FC, ReactNode, useEffect, useRef } from 'react';

import { CloseButton, CloseIcon, ModalContent, ModalHeader, Overlay, Title } from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  'data-testid'?: string;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, 'data-testid': testId }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent ref={modalRef} data-testid={`${testId}-modal`}>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon src="/assets/icons/close.svg" alt="close" height={24} width={24} />
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </Overlay>
  );
};
