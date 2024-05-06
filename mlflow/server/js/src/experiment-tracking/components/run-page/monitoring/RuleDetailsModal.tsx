import { DesignSystemThemeInterface, Modal, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { RunViewMetadataRow } from '../overview/RunViewMetadataRow';
import { FormattedMessage } from 'react-intl';
import { Condition, NotificationInfo, NotificationMethod, Observer, Rule } from './types';
import { Theme } from '@databricks/design-system/dist/theme';

interface RuleDetailsModalProps {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  rule: Rule;
}

const renderConditions = (conditions: Condition[], theme: Theme) => {
  return (
    <div css={{ flex: '1' }}>
      <Typography.Title level={4}>Conditions ({conditions.length})</Typography.Title>
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
            <RunViewMetadataRow key={index} title={`Condition ${index + 1}`} value={condition} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderObservers = (observers: Observer[], theme: Theme) => {
  return (
    <div css={{ flex: '1' }}>
      <Typography.Title level={4}>Observers ({observers.length})</Typography.Title>
      {observers.map((observer) => renderObserver(observer, theme))}
    </div>
  );
};

const renderObserver = (observer: Observer, theme: Theme) => {
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
          title={<FormattedMessage defaultMessage="Oserver id" description="Run page > Monitoring > Modal" />}
          value={observer.id}
        />
        {renderNotificationInfo(observer.info, theme)}
      </tbody>
    </table>
  );
};

const renderNotificationInfo = (notificationInfo: NotificationInfo, theme: Theme) => {
  return [
    <RunViewMetadataRow
      title={<FormattedMessage defaultMessage="Method name" description="Run page > Monitoring > Modal" />}
      value={notificationInfo.method}
    />,
    ...Object.keys(notificationInfo.info).map((key) => {
      return <RunViewMetadataRow title={key} value={notificationInfo.info[key]} />;
    }),
  ];
};

export const RuleDetailsModal = ({ isOpen, onClose, rule }: RuleDetailsModalProps) => {
  const { id, runUuid, experimentId, name } = rule;
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
              value={experimentId}
            />
            <RunViewMetadataRow
              title={<FormattedMessage defaultMessage="Run Uuid" description="Run page > Monitoring > Modal" />}
              value={runUuid}
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
      {renderConditions(rule.conditions, theme)}
      {renderObservers(rule.observers, theme)}
    </Modal>
  );
};
