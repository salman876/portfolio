import { FC } from 'react';

import { Modal } from 'components/ui/Modal';

type AssetModalProps = {
  type: 'add' | 'release';
  onClose: () => void;
};

export const AssetModal: FC<AssetModalProps> = ({ type, onClose }) => {
  return <Modal isOpen onClose={onClose} title="Manage Holdings" children={<h1>hi</h1>} />;
};
