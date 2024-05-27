import { Button, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { useEffect, useState } from 'react';
import { Condition } from '../types';
import { AddRuleConditionModal } from './AddRuleConditionModal';
import { FormattedMessage } from 'react-intl';
import { RunViewMetadataRow } from '../../overview/RunViewMetadataRow';

interface Props {
  onSubmit: (...args: any[]) => any;
}

const getConditionRow = (condition: Condition, onClick: (...args: any[]) => any) => {
  return (
    <div css={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{condition}</div>
      <Button
        css={{ marginLeft: 'auto' }}
        componentId={'codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_3'}
        size="small"
        onClick={onClick}
      >
        Delete
      </Button>
    </div>
  );
};

export const AddRuleConditionsTable = ({ onSubmit }: Props) => {
  const { theme } = useDesignSystemTheme();
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isAddRuleConditionModal, setIsAddRuleConditionModal] = useState<boolean>(false);
  useEffect(() => {
    onSubmit(conditions);
  }, [conditions, onSubmit]);
  return (
    <div css={{ flex: '1' }}>
      <AddRuleConditionModal
        isOpen={isAddRuleConditionModal}
        onClose={() => {
          setIsAddRuleConditionModal(false);
        }}
        onSubmit={(condition: Condition) => {
          setConditions([...conditions, condition]);
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
            defaultMessage="Conditions ({length})"
            description="Run page > Overview > Conditions addRule title"
            values={{ length: conditions.length }}
          />
        </Typography.Title>
        <Button
          css={{ flexShrink: 0, marginLeft: 'auto', paddingBottom: '10px' }}
          componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_2"
          size="small"
          onClick={() => {
            setIsAddRuleConditionModal(true);
          }}
        >
          Add condition
        </Button>
      </div>

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
          {conditions.map((condition, index) => (
            <RunViewMetadataRow
              title={`Condition ${index + 1}`}
              value={getConditionRow(condition, () => {
                const newConditions = conditions.filter((condition, fiilterIndex) => {
                  return fiilterIndex !== index;
                });
                setConditions(newConditions);
              })}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
