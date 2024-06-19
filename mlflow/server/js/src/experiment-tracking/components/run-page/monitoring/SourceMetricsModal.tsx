import { useDesignSystemTheme } from '@databricks/design-system';
import { SimpleChangingModal } from './SimpleChangingModal/SimpleChangingModal';

interface Props {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  onSubmit: (...args: any[]) => any;
}

export const SourcMetricsModal = ({ isOpen, onClose, onSubmit }: Props) => {
  return (
    <SimpleChangingModal
      inputName="newSourceUrl"
      rulesMessage="input a new metrics source url"
      inputLabel="Metrics source"
      placeholder="new metrics source url"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Metrics source"
    />
  );
};
