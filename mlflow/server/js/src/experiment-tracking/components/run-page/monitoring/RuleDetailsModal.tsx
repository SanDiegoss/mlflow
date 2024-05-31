import { DesignSystemThemeInterface, Modal, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { RunViewMetadataRow } from '../overview/RunViewMetadataRow';
import { FormattedMessage } from 'react-intl';
import { Rule } from './types';
import { ObserverView } from './ObserverView';
import { ConditionsView } from './ConditionsView';

interface RuleDetailsModalProps {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  rule: Rule;
}

export const RuleDetailsModal = ({ isOpen, onClose, rule }: RuleDetailsModalProps) => {
  const { id, run_id, experiment_id, name } = rule;
  const { theme } = useDesignSystemTheme();
  return (
    <Modal
      title="Rule Details"
      okText="Ok"
      cancelText="Cancel"
      visible={isOpen}
      onOk={onClose}
      onCancel={onClose}
      // @ts-expect-error TS(2322): Type '{ children: {}[] | null | undefined; "data-t... Remove this comment to see the full error message
      width={720}
    >
      <div css={{ flex: '1' }}>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="Details" description="Run page > Overview > Details section title" />
        </Typography.Title>
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
            <RunViewMetadataRow
              title={<FormattedMessage defaultMessage="Experiment Id" description="Run page > Monitoring > Modal" />}
              value={experiment_id}
            />
            <RunViewMetadataRow
              title={<FormattedMessage defaultMessage="Run Uuid" description="Run page > Monitoring > Modal" />}
              value={run_id}
            />
            <RunViewMetadataRow
              title={<FormattedMessage defaultMessage="Rule Id" description="Run page > Monitoring > Modal" />}
              value={id}
            />
            <RunViewMetadataRow
              title={<FormattedMessage defaultMessage="Rule name" description="Run page > Monitoring > Modal" />}
              value={name}
            />
          </tbody>
        </table>
      </div>
      <ConditionsView conditions={rule.conditions} />
      <div css={{ flex: '1' }}>
        <Typography.Title level={4}>Observers ({rule.observers.length})</Typography.Title>
        {rule.observers.map((observer) => (
          <ObserverView observer={observer} />
        ))}
      </div>
    </Modal>
  );
};
