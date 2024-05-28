import { Form, Input } from '@databricks/design-system';
import { Select } from 'antd';

interface Props {
  innerRef?: any;
}

export const AddRuleObserverForm = ({ innerRef }: Props) => {
  return (
    // @ts-expect-error TS(2322)
    <Form ref={innerRef} layout="vertical">
      <Form.Item name="method" rules={[{ required: true, message: 'Fill all fields' }]} label="method" initialValue={'telegram'}>
        <Select placeholder="select notification method" data-testid="change method">
          <Select.Option value='telegram'>Telegram</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='userId' rules={[{ required: true, message: 'input id' }]} label='User Id'>
        <Input placeholder='input id from telegram bot' data-testid='change userId' />
      </Form.Item>
    </Form>
  );
};
