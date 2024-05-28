import { useDesignSystemTheme, Modal, Button, Typography } from '@databricks/design-system';
import { RulesTable } from './RulesTable';
import { Rule, NotificationMethod, TelegramObserver } from './types';
import { RuleDetailsModal } from './RuleDetailsModal';
import { useState } from 'react';
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
      id: 1,
      method: NotificationMethod.TELEGRAM,
      userId: 1
    } as TelegramObserver,
    {
      id: 2,
      method: NotificationMethod.TELEGRAM,
      userId: 2
    } as TelegramObserver,
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
  const [botToken, setBotToken] = useState<string>('sdfsd');
  const [source, setSource] = useState<string>('fsfdsd');
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
          onSubmit={(value: string) => {
            setBotToken(value);
          }}
        />
      )}
      {isSourceModalActive && (
        <SourcMetricsModal
          isOpen={isSourceModalActive}
          onClose={() => {
            setIsSourceModalActive(false);
          }}
          onSubmit={(value: string) => {
            setSource(value);
          }}
        />
      )}
      {isAddRuleModalActive && (
        <AddRuleModal
          isOpen={isAddRuleModalActive}
          onClose={() => {
            setIsAddRuleModalActive(false);
          }}
          onSubmit={() => {
            // TODO FETCH NEW RULE then update rules state
          }}
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
          {rednerBotButton(botToken !== '', () => {
            setIsBotModalActive(true);
          })}
          {rednerSourceButton(source !== '', () => {
            setIsSourceModalActive(true);
          })}
          {renderAddRuleButton(botToken !== '', source !== '', () => {
            setIsAddRuleModalActive(true);
          })}
        </div>
      </div>
      <RulesTable rules={testRules} onDetails={setDetailsModalState} />
    </div>
  );
};
