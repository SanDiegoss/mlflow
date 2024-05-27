import { useDesignSystemTheme, Modal, Button, Typography } from '@databricks/design-system';
import { RulesTable } from './RulesTable';
import { Rule, NotificationMethod } from './types';
import { RuleDetailsModal } from './RuleDetailsModal';
import { useState } from 'react';
import { TelegramMethodInfo } from './types';
import { FormattedMessage } from 'react-intl';
import { BotModal } from './BotModal';
import { SourcMetricsModal } from './SourceMetricsModal';
import { AddRuleModal } from './AddRuleModal/AddRuleModal';

const testRule: Rule = {
  id: '1',
  name: 'MyFirstRule',
  experimentId: 'experimentIdExample',
  runUuid: 'runUuidExample',
  conditions: ['keka > 100'],
  observers: [
    {
      id: '1',
      info: {
        method: NotificationMethod.TELEGRAM,
        info: {
          userId: 1,
        } as TelegramMethodInfo,
      },
    },
    {
      id: '2',
      info: {
        method: NotificationMethod.TELEGRAM,
        info: {
          userId: 2,
        } as TelegramMethodInfo,
      },
    },
  ],
};

export interface ModalState {
  isOpen: boolean;
  currentRule: Rule | null;
}

const testRules: Rule[] = [testRule];

const rednerBotButton = (isBotAuthorized: boolean, onClick: any) => {
  return (
    <Button
      componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_7"
      size="small"
      onClick={onClick}
    >
      {isBotAuthorized ? 'Change Telegram Bot' : 'Authorize your Telegram Bot'}
    </Button>
  );
};

const rednerSourceButton = (isSourceAdded: boolean, onClick: any) => {
  return (
    <Button
      componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_6"
      size="small"
      onClick={onClick}
    >
      {isSourceAdded ? 'Change Metrics Source' : 'Add metrics source'}
    </Button>
  );
};

const renderAddRuleButton = (isSourceAdded: boolean, isBotAuthorized: boolean, onClick: any) => {
  const disabled = !isSourceAdded || !isBotAuthorized;
  return (
    <Button
      componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_5"
      size="small"
      onClick={onClick}
      disabled={disabled}
    >
      Add Rule
    </Button>
  );
};

export const MonitoringPage = ({ experimentId, runUuid }: { runUuid: string; experimentId: string }) => {
  const { theme } = useDesignSystemTheme();
  const [detailsModalState, setDetailsModalState] = useState<ModalState>({ isOpen: false, currentRule: null });
  const [isBotAuthorized, setIsBotAuthorized] = useState<boolean>(true);
  const [isSourceAdded, setIsSourceAdded] = useState<boolean>(true);
  const [isSourceModalActive, setIsSourceModalActive] = useState<boolean>(false);
  const [isBotModalActive, setIsBotModalActive] = useState<boolean>(false);
  const [isAddRuleModalActive, setIsAddRuleModalActive] = useState<boolean>(false);

  return (
    <div css={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {detailsModalState.currentRule && (
        <RuleDetailsModal
          isOpen={detailsModalState.isOpen}
          onClose={() => {
            setDetailsModalState({ isOpen: false, currentRule: null });
          }}
          rule={detailsModalState.currentRule}
        />
      )}
      {isBotModalActive && (
        <BotModal
          isOpen={isBotModalActive}
          onClose={() => {
            setIsBotModalActive(false);
          }}
        />
      )}
      {isSourceModalActive && (
        <SourcMetricsModal
          isOpen={isSourceModalActive}
          onClose={() => {
            setIsSourceModalActive(false);
          }}
        />
      )}
      {isAddRuleModalActive && (
        <AddRuleModal
          isOpen={isAddRuleModalActive}
          onClose={() => {
            setIsAddRuleModalActive(false);
          }}
          onSubmit={() => {}}
          experimentId={experimentId}
          runUuid={runUuid}
        />
      )}
      <div css={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        <Typography.Title level={4}>
          <FormattedMessage
            defaultMessage="Rules ({length})"
            description="Run page > Monitoring > Rules table > Section title"
            values={{ length: testRules.length }}
          />
        </Typography.Title>
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            flexShrink: 0,
            marginLeft: 'auto',
            marginBottom: '10px',
            gap: '10px',
          }}
        >
          {rednerBotButton(isBotAuthorized, () => {
            setIsBotModalActive(true);
          })}
          {rednerSourceButton(isSourceAdded, () => {
            setIsSourceModalActive(true);
          })}
          {renderAddRuleButton(isSourceAdded, isBotAuthorized, () => {
            setIsAddRuleModalActive(true);
          })}
        </div>
      </div>
      <RulesTable rules={testRules} onDetails={setDetailsModalState} />
    </div>
  );
};
