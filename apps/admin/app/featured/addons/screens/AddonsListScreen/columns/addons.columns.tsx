'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { Button } from '@furever/ui/components/button';
import { Badge } from '@furever/ui/components/badge';
import { Edit } from 'lucide-react';
import { Addon, GeneralStatus } from '@furever/types';
import Link from 'next/link';
import { StatusBadge } from '@/app/shared/components/StatusBadge';

function AddonActionsCell({ addon }: { addon: Addon }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <Link href={`/addons/${addon.id}`}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Link>
      </Button>
    </div>
  );
}

export const addonsColumns: ColumnDef<Addon>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.name}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return (
        <div
          className="max-w-[300px] truncate"
          title={description}
        >
          {description || 'No description'}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at') as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const addon = row.original;
      return <AddonActionsCell addon={addon} />;
    },
  },
];
