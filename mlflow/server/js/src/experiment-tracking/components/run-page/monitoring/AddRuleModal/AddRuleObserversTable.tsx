import { Button, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { useEffect, useState } from 'react';
import { Condition, Observer } from '../types';
import { FormattedMessage } from 'react-intl';
import { RunViewMetadataRow } from '../../overview/RunViewMetadataRow';
import { Theme } from '@databricks/design-system/dist/theme';
import { ObserverView } from '../ObserverView';
import { AddRuleObserverModal } from './AddRuleObserverModal';

interface Props {
  onSubmit: (...args: any[]) => any;
}

export const AddRuleObserversTable = ({ onSubmit }: Props) => {
  const { theme } = useDesignSystemTheme();
  const [observers, setObservers] = useState<Observer[]>([]);
  const [isAddRuleObserverModal, setIsAddRuleObservernModal] = useState<boolean>(false);
  const submitObservers = (observers: Observer[]) => {
    const newObservers = observers.map((observer, index) => {
      return {
        ...observer,
        id: index + 1,
      };
    });
    setObservers(newObservers);
    onSubmit(newObservers);
  }
  return (
    <div css={{ flex: '1'}}>
      <AddRuleObserverModal
        isOpen={isAddRuleObserverModal}
        onClose={() => {
          setIsAddRuleObservernModal(false);
        }}
        onSubmit={(observer: Observer) => {
          submitObservers([...observers, observer]);
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

      {observers.map((observer, filterIndex) => (
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          <ObserverView observer={observer} />
          <Button
            css={{ flexShrink: 0, width: '10%', marginBottom: '15px' }}
            componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_10"
            size="small"
            onClick={() => {
              const newObservers = observers.filter((observer, index) => {
                return filterIndex !== index;
              });
              submitObservers(newObservers);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};
