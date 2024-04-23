import { useDesignSystemTheme, Modal } from '@databricks/design-system';
import { RulesTable } from './RulesTable';
import { Rule, NotificationMethod, ConditionType } from './types';
import { RuleDetailsModal } from './RuleDetailsModal';
import { useState } from 'react';

const testRule: Rule = {
  id: '1',
  name: 'MyFirstRule',
  experimentId: 'experimentIdExample',
  runUuid: 'runUuidExample',
  conditions: [
    [
      {
        metric: 'keka',
        condition: ConditionType.MORE,
        value: 100,
      },
    ],
  ],
  observers: [
    {
      method: NotificationMethod.TELEGRAM,
      info: {
        userId: 123,
      },
    },
  ],
};

export interface ModalState {
  isOpen: boolean;
  currentRuleId: string | null;
}

const testRules: Rule[] = [testRule];

export const MonitoringPage = ({ experimentId, runUuid }: { runUuid: string; experimentId: string }) => {
  const { theme } = useDesignSystemTheme();
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, currentRuleId: null });

  return (
    <>
      <RuleDetailsModal
        isOpen={modalState.isOpen}
        onClose={() => {
          setModalState({ isOpen: false, currentRuleId: null });
        }}
        experimentId={experimentId}
        runUuid={runUuid}
        ruleId={modalState.currentRuleId}
      />
      <RulesTable rules={testRules} onDetails={setModalState} />
    </>
  );
};
