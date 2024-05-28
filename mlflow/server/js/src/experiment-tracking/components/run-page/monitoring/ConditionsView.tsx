import { Typography, useDesignSystemTheme } from '@databricks/design-system';
import { Condition } from './types';
import { RunViewMetadataRow } from '../overview/RunViewMetadataRow';

interface Props {
  conditions: Condition[];
}

export const ConditionsView = ({ conditions }: Props) => {
  const { theme } = useDesignSystemTheme();
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
