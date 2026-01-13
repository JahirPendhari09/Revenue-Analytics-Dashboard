'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '../labels/EditableLabel';
import { formatCurrency } from '@/lib/utils';

interface Transaction {
  id: number;
  date: string;
  customer: string;
  amount: number;
  status: string;
}

interface DataTableProps {
  data: Transaction[];
  title?: string;
}

export function DataTable({ data, title = 'Recent Transactions' }: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <EditableLabel labelKey="table_column_date" />
              </TableHead>
              <TableHead>
                <EditableLabel labelKey="table_column_customer" />
              </TableHead>
              <TableHead className="text-right">
                <EditableLabel labelKey="table_column_amount" />
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.date}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}