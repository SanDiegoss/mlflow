import { Modal, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { RunViewMetadataRow } from '../overview/RunViewMetadataRow';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { HTTPMethods, fetchEndpoint } from 'common/utils/FetchUtils';

interface RuleDetailsModalProps {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  metricsUrl: string;
  runId: string;
}

interface Metric {
  run_id: string;
  name: string;
  value: number;
}

export const ViewMetricsModal = ({ isOpen, onClose, metricsUrl, runId }: RuleDetailsModalProps) => {
  const { theme } = useDesignSystemTheme();
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    fetchEndpoint({
      relativeUrl: `ajax-api/2.0/mlflow/custom-metrics/get`,
      method: HTTPMethods.GET,
      success: async ({ resolve, response }: any) => {
        const metrics = (await response.json()).custom_metrics as Metric[];
        setMetrics(
          metrics.filter((metric) => {
            return metric.run_id === runId;
          }),
        );
        resolve();
      },
    });
  }, [runId]);

  return (
    <Modal
      title="Metrics"
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
          <FormattedMessage defaultMessage="Metrics" description="Run page > Overview > Details metrics title" />
        </Typography.Title>
        {metrics.map((metric) => {
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
                <RunViewMetadataRow
                  title={<FormattedMessage defaultMessage="Name" description="Run page > Monitoring > Modal" />}
                  value={metric.name}
                />
                <RunViewMetadataRow
                  title={<FormattedMessage defaultMessage="Value" description="Run page > Monitoring > Modal" />}
                  value={metric.value}
                />
              </tbody>
            </table>
          );
        })}
      </div>
    </Modal>
  );
};
