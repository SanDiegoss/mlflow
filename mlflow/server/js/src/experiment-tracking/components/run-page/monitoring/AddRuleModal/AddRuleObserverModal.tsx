import { GenericInputModal } from 'experiment-tracking/components/modals/GenericInputModal';
import { AddRuleObserverForm } from './AddRuleObserverForm';
import { Observer, TelegramObserver } from '../types';

interface Props {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  onSubmit: (observer: Observer) => any;
}

export const AddRuleObserverModal = ({ isOpen, onClose, onSubmit }: Props) => {
  return (
    <GenericInputModal
      title={'Add Observer'}
      okText="Confirm"
      isOpen={isOpen}
      handleSubmit={async (values: any) => {
        const method = values['method'];
        const userId = values['userId'];
        const newObserver: TelegramObserver = {
            id: 0,
            method: method,
            userId: userId
        }
        onSubmit(newObserver);
      }}
      onClose={onClose}
    >
      <AddRuleObserverForm />
    </GenericInputModal>
  );
};
