import { SimpleChangingModal } from '../SimpleChangingModal/SimpleChangingModal';

interface Props {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  setName: (...args: any[]) => any;
}

export const RenameRuleModal = ({ isOpen, onClose, setName }: Props) => {

  return (
    <SimpleChangingModal
      inputName='newRuleName'
      rulesMessage='input a new rule name'
      inputLabel='Rule name'
      placeholder='new rule name'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={setName}
      title='Rule name'
    />
  );
};
