import {
  Button,
  ChevronDownIcon,
  ChevronRightIcon,
  Empty,
  Input,
  SearchIcon,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  useDesignSystemTheme,
} from '@databricks/design-system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { Interpolation, Theme } from '@emotion/react';
import { Rule } from './types';
import { ModalState } from './MonitoringPage';

type ParamsColumnDef = ColumnDef<Rule> & {
  meta?: { styles?: Interpolation<Theme>; multiline?: boolean };
};

export const RulesTable = ({
  rules,
  onDetails,
}: {
  rules: Rule[];
  onDetails: React.Dispatch<React.SetStateAction<ModalState>>;
}) => {
  const { theme } = useDesignSystemTheme();
  const intl = useIntl();
  const [filter, setFilter] = useState('');

  const rulesList = useMemo(
    () =>
      rules.filter((rule) => {
        const filterLower = filter.toLowerCase();
        return rule.name.toLowerCase().includes(filterLower);
      }),
    [filter, rules],
  );

  const columns = useMemo<ParamsColumnDef[]>(
    () => [
      {
        id: 'rule-id',
        enableResizing: true,
        size: 80,
        maxSize: 240,
        minSize: 80,
        header: () => (
          <FormattedMessage
            defaultMessage="Rule id"
            description="Run page > Monitoring > Rules table > Id column header"
          />
        ),
        cell: ({ row: { original } }) => (
          <div
            style={{
              paddingTop: '2px',
            }}
          >
            {original.id}
          </div>
        ),
      },
      {
        id: 'rule-name',
        enableResizing: true,
        size: 240,
        maxSize: 360,
        minSize: 120,
        header: () => (
          <FormattedMessage
            defaultMessage="Name"
            description="Run page > Monitoring > Rules table > Name column header"
          />
        ),
        cell: ({ row: { original } }) => (
          <div
            style={{
              paddingTop: '2px',
            }}
          >
            {original.name}
          </div>
        ),
      },
      {
        id: 'methods',
        enableResizing: true,
        size: 360,
        maxSize: 480,
        minSize: 120,
        header: () => (
          <FormattedMessage
            defaultMessage="Observers count"
            description="Run page > Monitoring > Rules table > Methods column header"
          />
        ),
        cell: ({ row: { original } }) => (
          <div
            style={{
              paddingTop: '2px',
            }}
          >
            {original.observers.length}
          </div>
        ),
      },
      {
        id: 'buttons',
        enableResizing: false,
        cell: ({ row: { original } }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              gap: '10px',
            }}
          >
            <Button
              componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_1"
              size="small"
              css={{ flexShrink: 0 }}
              onClick={() => {
                onDetails({ isOpen: true, currentRule: original });
              }}
            >
              Details
            </Button>
            <Button
              componentId="codegen_mlflow_app_src_experiment-tracking_components_run-page_monitoring_rulestable.tsx_2"
              size="small"
              css={{ flexShrink: 0 }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [onDetails],
  );

  const table = useReactTable({
    data: rulesList,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowId: (rule) => rule.id,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    columns,
  });

  const renderEmptyTable = () => {
    return (
      <div css={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty
          description={
            <FormattedMessage
              defaultMessage="No rules recorded"
              description="Run page > Monitoring > Rules table > No rules recorded"
            />
          }
        />
      </div>
    );
  };

  const renderEmptyFilter = () => {
    return (
      <div css={{ marginTop: theme.spacing.md * 4 }}>
        <Empty
          description={
            <FormattedMessage
              defaultMessage="No rules match the search filter"
              description="Run page > Monitoring > Rules table > No results after filtering"
            />
          }
        />
      </div>
    );
  };

  const renderTableContent = () => {
    if (!rules.length) {
      return renderEmptyTable();
    }

    const areAllResultsFiltered = rulesList.length < 1;

    return (
      <>
        <Table scrollable empty={areAllResultsFiltered ? renderEmptyFilter() : null}>
          <TableRow isHeader>
            {table.getLeafHeaders().map((header, index) => (
              <TableHeader
                key={header.id}
                resizable={header.column.getCanResize()}
                resizeHandler={header.getResizeHandler()}
                isResizing={header.column.getIsResizing()}
                css={{
                  flexGrow: header.column.getCanResize() ? 0 : 1,
                }}
                style={{
                  flexBasis: header.column.getCanResize() ? header.column.getSize() : undefined,
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHeader>
            ))}
          </TableRow>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{
                    flexGrow: cell.column.getCanResize() ? 0 : 1,
                    flexBasis: cell.column.getCanResize() ? cell.column.getSize() : undefined,
                  }}
                  multiline
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
      </>
    );
  };

  return (
    <div css={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Typography.Title level={4}>
        <FormattedMessage
          defaultMessage="Rules ({length})"
          description="Run page > Monitoring > Rules table > Section title"
          values={{ length: rulesList.length }}
        />
      </Typography.Title>
      <div
        css={{
          padding: theme.spacing.sm,
          border: `1px solid ${theme.colors.borderDecorative}`,
          borderRadius: theme.general.borderRadiusBase,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div css={{ marginBottom: theme.spacing.sm }}>
          <Input
            prefix={<SearchIcon />}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search rules',
              description: 'Run page > Monitoring > Rules table > Filter input placeholder',
            })}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            allowClear
          />
        </div>
        {renderTableContent()}
      </div>
    </div>
  );
};
