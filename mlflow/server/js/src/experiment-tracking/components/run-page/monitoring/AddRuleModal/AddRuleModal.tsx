import { Modal, useDesignSystemTheme } from '@databricks/design-system';
import { AddRuleDetailsTable } from './AddRuleDetailsTable';
import { AddRuleConditionsTable } from './AddRuleConditionsTable';
import { AddRuleObserversTable } from './AddRuleObserversTable';
import { RuleDTO } from '../types/Rule';
import { useState } from 'react';
import { Condition, Observer } from '../types';

interface Props {
  isOpen: boolean;
  onClose: (...args: any[]) => any;
  onSubmit: (...args: any[]) => any;
  experimentId: string;
  runUuid: string;
}

export const AddRuleModal = ({ isOpen, onClose, onSubmit, experimentId, runUuid }: Props) => {
  const { theme } = useDesignSystemTheme();
  const [resultRule, setResultRule] = useState<RuleDTO>({
    name: '',
    experimentId: experimentId,
    runUuid: runUuid,
    conditions: [],
    observers: [],
  });
  return (
    <Modal
      title="Add Rule"
      okText="Ok"
      cancelText="Cancel"
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      // @ts-expect-error TS(2322)
      width={720}
    >
      <div css={{ flex: '1' }}>
        <AddRuleDetailsTable
          experimentId={experimentId}
          runUuid={runUuid}
          onSubmit={async (name: string) => {
            setResultRule({ ...resultRule, name });
          }}
        />
        <AddRuleConditionsTable
          onSubmit={async (conditions: Condition[]) => {
            setResultRule({ ...resultRule, conditions });
          }}
        />
        <AddRuleObserversTable
          onSubmit={async (observers: Observer[]) => {
            setResultRule({ ...resultRule, observers });
          }}
        />
      </div>
    </Modal>
  );
};
