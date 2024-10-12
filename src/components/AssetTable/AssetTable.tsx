import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Asset } from 'types/asset';

import { formatUSD } from 'utils/formatUSD';

import { Chevron, Icon, NameWrapper, Property, TBody, THead, Table, TableHeaderCell } from './AssetTable.styles';

const columnHelper = createColumnHelper<Asset>();

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Asset',
    cell: ({ row }) => {
      const { icon, name } = row.original;
      return (
        <NameWrapper>
          <Icon src={icon} alt={name} />
          <Property>{name}</Property>
        </NameWrapper>
      );
    },
  }),
  columnHelper.accessor('amount', {
    header: () => 'Amount',
    cell: ({ row }) => {
      const { amount, symbol } = row.original;
      return <Property>{`${amount} ${symbol.toUpperCase()}`}</Property>;
    },
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: info => <Property>{formatUSD(info.getValue())}</Property>,
  }),
  columnHelper.accessor(row => row.price * row.amount, {
    id: 'value',
    header: () => 'Value',
    cell: info => <Property>{formatUSD(info.getValue())}</Property>,
  }),
];

type AssetTableProps = {
  assets: Asset[];
  onRowClick?: (asset: Asset) => void;
};

export const AssetTable = ({ assets, onRowClick }: AssetTableProps) => {
  const table = useReactTable({
    data: assets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table cellSpacing="0">
      <THead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <TableHeaderCell
                    role="button"
                    tabIndex={0}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (header.column.getCanSort()) header.column.getToggleSortingHandler();
                      }
                    }}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Sort ascending'
                          : header.column.getNextSortingOrder() === 'desc'
                            ? 'Sort descending'
                            : 'Clear sort'
                        : undefined
                    }
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: <Chevron src={'assets/icons/chevron-up.svg'} alt="Sort ascending" width="14" height="14" />,
                      desc: (
                        <Chevron src={'assets/icons/chevron-down.svg'} alt="Sort descending" width="14" height="14" />
                      ),
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHeaderCell>
                )}
              </th>
            ))}
          </tr>
        ))}
      </THead>
      <TBody>
        {table.getRowModel().rows.map(row => (
          <tr
            role="button"
            tabIndex={0}
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onRowClick?.(row.original);
              }
            }}
          >
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
