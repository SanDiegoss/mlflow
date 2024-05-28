import { useDesignSystemTheme } from '@databricks/design-system';
import { Observer } from './types';
import { RunViewMetadataRow } from '../overview/RunViewMetadataRow';
import { FormattedMessage } from 'react-intl';

const renderNotificationInfo = (observer: Observer) => {
  return [
    <RunViewMetadataRow
      title={<FormattedMessage defaultMessage="Method name" description="Run page > Monitoring > Modal" />}
      value={observer.method}
    />,
    ...Object.keys(observer)
      .filter((key) => {
        return key !== 'id' && key !== 'method';
      })
      .map((key) => {
        return <RunViewMetadataRow title={key} value={observer[key]} />;
      }),
  ];
};

interface Props {
  observer: Observer;
}

export const ObserverView = ({ observer }: Props) => {
  const { theme } = useDesignSystemTheme();
  return (
    <table
      css={{
        display: 'block',
        border: `1px solid ${theme.colors.borderDecorative}`,
        borderBottom: 'none',
        borderRadius: theme.general.borderRadiusBase,
        width: '50%',
        minWidth: 640,
        marginBottom: theme.spacing.sm,
        overflow: 'hidden',
      }}
    >
      <tbody css={{ display: 'block' }}>
        <RunViewMetadataRow
          title={<FormattedMessage defaultMessage="Oserver id" description="Run page > Monitoring > Modal" />}
          value={observer.id}
        />
        {renderNotificationInfo(observer)}
      </tbody>
    </table>
  );
};
