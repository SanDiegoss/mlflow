import { SimpleChangingModal } from '../SimpleChangingModal/SimpleChangingModal';

interface Props {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  onSubmit: (...args: any[]) => any;
}

export const AddRuleConditionModal = ({ isOpen, onClose, onSubmit }: Props) => {

  return (
    <SimpleChangingModal
      inputName='newRuleName'
      rulesMessage='input a new condition'
      inputLabel='Condition'
      placeholder='new condition string'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title='Condition'
    />
  );
};
