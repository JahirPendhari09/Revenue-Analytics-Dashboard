
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
import { CustomerData } from '@/types/customers';

interface CustomersTableProps {
  data: CustomerData[];
  title?: string;
}

export function CustomersTable({ data, title = 'Customer List' }: CustomersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <EditableLabel labelKey="table_column_name" />
                </TableHead>
                <TableHead>
                  <EditableLabel labelKey="table_column_email" />
                </TableHead>
                <TableHead>
                  <EditableLabel labelKey="table_column_status" />
                </TableHead>
                <TableHead className="text-right">
                  <EditableLabel labelKey="table_column_orders" />
                </TableHead>
                <TableHead className="text-right">
                  <EditableLabel labelKey="table_column_spent" />
                </TableHead>
                <TableHead>Segment</TableHead>
                <TableHead className="text-sm text-muted-foreground">Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{customer.orders}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(customer.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {customer.segment}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(customer.lastOrder).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}