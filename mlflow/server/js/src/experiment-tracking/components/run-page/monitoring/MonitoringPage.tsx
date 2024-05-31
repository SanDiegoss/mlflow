import { Button, Typography } from '@databricks/design-system';
import { RulesTable } from './RulesTable';
import { Rule, RuleDTO } from './types';
import { RuleDetailsModal } from './RuleDetailsModal';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { BotModal } from './BotModal';
import { SourcMetricsModal } from './SourceMetricsModal';
import { AddRuleModal } from './AddRuleModal/AddRuleModal';
import { HTTPMethods, fetchEndpoint } from 'common/utils/FetchUtils';
import { ViewMetricsModal } from './ViewMetricsModal';

export interface ModalState {
  isOpen: boolean;
  currentRule: Rule | null;
}
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

const renderViewMetricsButton = (isSourceAdded: boolean, onClick: any) => {
  const disabled = !isSourceAdded;
  return (
    <Button
      componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_1234"
      size="small"
      onClick={onClick}
      disabled={disabled}
    >
      Watch Metrics
    </Button>
  );
};

export const MonitoringPage = ({ experimentId, runUuid }: { runUuid: string; experimentId: string }) => {
  const [detailsModalState, setDetailsModalState] = useState<ModalState>({ isOpen: false, currentRule: null });
  const [botToken, setBotToken] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [isSourceModalActive, setIsSourceModalActive] = useState<boolean>(false);
  const [isBotModalActive, setIsBotModalActive] = useState<boolean>(false);
  const [isAddRuleModalActive, setIsAddRuleModalActive] = useState<boolean>(false);
  const [isMetricsViewModal, setIsMetricsViewModal] = useState<boolean>(false);
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetchEndpoint({
      relativeUrl: `ajax-api/2.0/mlflow/metrics-source/get`,
      method: HTTPMethods.GET,
      success: async ({ resolve, response }: any) => {
        const source = (await response.json()).source as string;
        setSource(source);
        resolve();
      },
    });
    fetchEndpoint({
      relativeUrl: `ajax-api/2.0/mlflow/bot-token/get`,
      method: HTTPMethods.GET,
      success: async ({ resolve, response }: any) => {
        const token = (await response.json()).token as string;
        setBotToken(token);
        resolve();
      },
    });
    fetchEndpoint({
      relativeUrl: `ajax-api/2.0/mlflow/rules/get`,
      method: HTTPMethods.GET,
      success: async ({ resolve, response }: any) => {
        const rules = (await response.json()).rules || [] as Rule[];
        setRules(rules);
        resolve();
      },
    });
  }, []);

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
      {source !== '' && (
        <ViewMetricsModal
          isOpen={isMetricsViewModal}
          onClose={() => {
            setIsMetricsViewModal(false);
          }}
          metricsUrl={source}
          runId={runUuid}
        />
      )}
      {isBotModalActive && (
        <BotModal
          isOpen={isBotModalActive}
          onClose={() => {
            setIsBotModalActive(false);
          }}
          onSubmit={(value: string) => {
            fetchEndpoint({
              relativeUrl: `ajax-api/2.0/mlflow/bot-token/add`,
              method: HTTPMethods.POST,
              body: JSON.stringify({
                token: value,
              }),
              success: async ({ resolve, response }: any) => {
                setBotToken(value);
                resolve();
              },
            });
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
            fetchEndpoint({
              relativeUrl: `ajax-api/2.0/mlflow/metrics-source/add`,
              method: HTTPMethods.POST,
              body: JSON.stringify({
                source: value,
              }),
              success: async ({ resolve, response }: any) => {
                setSource(value);
                resolve();
              },
            });
          }}
        />
      )}
      {isAddRuleModalActive && (
        <AddRuleModal
          isOpen={isAddRuleModalActive}
          onClose={() => {
            setIsAddRuleModalActive(false);
          }}
          onSubmit={(rule: RuleDTO) => {
            fetchEndpoint({
              relativeUrl: `ajax-api/2.0/mlflow/rules/add`,
              method: HTTPMethods.POST,
              body: JSON.stringify(rule),
              success: async ({ resolve, response }: any) => {
                const newRule = (await response.json()).rule as Rule
                setRules([...rules, newRule]);
                resolve();
              },
            });
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
            values={{ length: rules.length }}
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
          {renderViewMetricsButton(source !== '', () => {
            setIsMetricsViewModal(true);
          })}
        </div>
      </div>
      <RulesTable
        rules={rules}
        onDetails={setDetailsModalState}
        onDelete={(ruleId: string) => {
          fetchEndpoint({
            relativeUrl: `ajax-api/2.0/mlflow/rules/delete`,
            method: HTTPMethods.POST,
            body: JSON.stringify({
              rule_id: ruleId,
            }),
            success: async ({ resolve, response }: any) => {
              setRules(
                rules.filter((rule) => {
                  return rule.rule_id !== ruleId;
                }),
              );
              resolve();
            },
          });
        }}
      />
    </div>
  );
};
