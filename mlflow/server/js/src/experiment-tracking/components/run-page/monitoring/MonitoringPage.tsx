import { useDesignSystemTheme, Modal } from '@databricks/design-system';
import { RulesTable } from './RulesTable';
import { Rule, NotificationMethod } from './types';
import { RuleDetailsModal } from './RuleDetailsModal';
import { useState } from 'react';
import { TelegramMethodInfo } from './types';

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

export const MonitoringPage = ({ experimentId, runUuid }: { runUuid: string; experimentId: string }) => {
  const { theme } = useDesignSystemTheme();
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, currentRule: null });

  return (
    <>
      {modalState.currentRule && (
        <RuleDetailsModal
          isOpen={modalState.isOpen}
          onClose={() => {
            setModalState({ isOpen: false, currentRule: null });
          }}
          rule={modalState.currentRule}
        />
      )}
      <RulesTable rules={testRules} onDetails={setModalState} />
    </>
  );
};
