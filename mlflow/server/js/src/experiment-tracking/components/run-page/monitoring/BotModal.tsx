import { SimpleChangingModal } from './SimpleChangingModal/SimpleChangingModal';

interface BotModalProps {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
}

export const BotModal = ({ isOpen, onClose }: BotModalProps) => {
  const onSubmit = async (value: any) => {};

  return (
    <SimpleChangingModal
      inputName="newToken"
      rulesMessage="input a new token"
      inputLabel="Bot token"
      placeholder="new token"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Bot Token"
    />
  );
};
