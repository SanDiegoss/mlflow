import { Button, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { useEffect, useState } from 'react';
import { Condition, Observer } from '../types';
import { AddRuleConditionModal } from './AddRuleConditionModal';
import { FormattedMessage } from 'react-intl';
import { RunViewMetadataRow } from '../../overview/RunViewMetadataRow';
import { Theme } from '@databricks/design-system/dist/theme';

interface Props {
  onSubmit: (...args: any[]) => any;
}

const getObserverTable = (observer: Observer, theme: Theme, onDelete: (...args: any[]) => any) => {
  return (
    <table
        css={{
          display: 'block',
          border: `1px solid ${theme.colors.borderDecorative}`,
          borderBottom: 'none',
          borderRadius: theme.general.borderRadiusBase,
          width: '50%',
          minWidth: 640,
          marginBottom: theme.spacing.lg,
          overflow: 'hidden',
        }}
      >
        <tbody css={{ display: 'block' }}>
          
        </tbody>
      </table>
  );
};

export const AddRuleObserversTable = ({ onSubmit }: Props) => {
  const { theme } = useDesignSystemTheme();
  const [observers, setObservers] = useState<Observer[]>([]);
  const [isAddRuleObserverModal, setIsAddRuleObservernModal] = useState<boolean>(false);
  useEffect(() => {
    onSubmit(observers);
  }, [observers, onSubmit]);
  return (
    <div css={{ flex: '1' }}>
      <AddRuleConditionModal
        isOpen={isAddRuleObserverModal}
        onClose={() => {
            setIsAddRuleObservernModal(false);
        }}
        onSubmit={(observer: Observer) => {
            setObservers([...observers, observer]);
        }}
      />
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '10px',
          width: '95%',
        }}
      >
        <Typography.Title level={4}>
          <FormattedMessage
            defaultMessage="Observers ({length})"
            description="Run page > Overview > Observers addRule title"
            values={{ length: observers.length }}
          />
        </Typography.Title>
        <Button
          css={{ flexShrink: 0, marginLeft: 'auto', paddingBottom: '10px' }}
          componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_2"
          size="small"
          onClick={() => {
            setIsAddRuleObservernModal(true);
          }}
        >
          Add Observer
        </Button>
      </div>

      {observers.map((observer, index) => (
        getObserverTable(observer, theme, () => {
            const newObservers = observers.filter((observer, fiilterIndex) => {
              return fiilterIndex !== index;
            });
            setObservers(newObservers);
          })
      ))}
    </div>
  );
};
