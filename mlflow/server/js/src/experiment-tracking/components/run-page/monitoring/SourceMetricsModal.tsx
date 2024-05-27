import { useDesignSystemTheme } from '@databricks/design-system';
import { SimpleChangingModal } from './SimpleChangingModal/SimpleChangingModal';

interface BotModalProps {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
}

export const SourcMetricsModal = ({ isOpen, onClose }: BotModalProps) => {
  const { theme } = useDesignSystemTheme();

  const onSubmit = async (value: any) => {
    // TODO FETCH
  };

  return (
    <SimpleChangingModal
      inputName='newSourceUrl'
      rulesMessage='input a new metrics source url'
      inputLabel='Metrics source'
      placeholder='new metrics source url'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title='Metrics source'
    />
  );
};
