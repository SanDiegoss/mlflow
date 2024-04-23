import { useDesignSystemTheme } from '@databricks/design-system';
import { MonitoringPage } from '../monitoring/MonitoringPage';

export const RunViewMonitoringTab = ({
  experimentId,
  runUuid,
}: {
  runUuid: string;
  experimentId: string;
}) => {
  const { theme } = useDesignSystemTheme();
  return (
    <div
      css={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        paddingBottom: theme.spacing.md,
        position: 'relative',
      }}
    >
      {<MonitoringPage runUuid={runUuid} experimentId={experimentId} />}
    </div>
  );
};
