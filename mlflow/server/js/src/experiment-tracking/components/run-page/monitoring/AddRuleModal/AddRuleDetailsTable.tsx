import { FormattedMessage } from 'react-intl';
import { RunViewMetadataRow } from '../../overview/RunViewMetadataRow';
import { Button, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { useEffect, useState } from 'react';
import { RenameRuleModal } from './RenameRuleModal';

interface Props {
  experimentId: string;
  runUuid: string;
  onSubmit: (...args: any[]) => any;
}

export const AddRuleDetailsTable = ({ experimentId, runUuid, onSubmit }: Props) => {
  const { theme } = useDesignSystemTheme();
  const [name, setStateName] = useState<string>('');
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  useEffect(() => {
    onSubmit(name);
  }, [name, onSubmit]);
  return (
    <div css={{ flex: '1' }}>
      <RenameRuleModal
        isOpen={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false);
        }}
        setName={(name: string) => {
          setStateName(name);
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
          <FormattedMessage defaultMessage="Details" description="Run page > Overview > Details section title" />
        </Typography.Title>
        <Button
          css={{ flexShrink: 0, marginLeft: 'auto', paddingBottom: '10px' }}
          componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_4"
          size="small"
          onClick={() => {
            setIsRenameModalOpen(true);
          }}
        >
          {name === '' ? 'Add Rule name' : 'Change Rule name'}
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
          <RunViewMetadataRow
            title={<FormattedMessage defaultMessage="Experiment Id" description="Run page > Monitoring > Modal" />}
            value={experimentId}
          />
          <RunViewMetadataRow
            title={<FormattedMessage defaultMessage="Run Uuid" description="Run page > Monitoring > Modal" />}
            value={runUuid}
          />
          <RunViewMetadataRow
            title={<FormattedMessage defaultMessage="Rule name" description="Run page > Monitoring > Modal" />}
            value={name}
          />
        </tbody>
      </table>
    </div>
  );
};
