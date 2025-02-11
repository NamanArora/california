"use client"
import React, { useState } from 'react';
import {
  Search,
  ListFilter,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import AddRuleWizard from './AddRuleWizard';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TypeScript interfaces
interface SecurityRule {
  id: number;
  name: string;
  type: 'input' | 'output';
  category: string;
  status: 'active' | 'inactive';
  sensitivity: 'high' | 'medium' | 'low';
  action: 'block' | 'redact' | 'alert';
  lastModified: string;
}

const SecurityFilters = () => (
  <Select defaultValue="all">
    <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent className="bg-popover text-popover-foreground border-border">
      <SelectItem value="all">All Incidents</SelectItem>
      <SelectItem value="open">Open</SelectItem>
      <SelectItem value="investigating">Investigating</SelectItem>
      <SelectItem value="resolved">Resolved</SelectItem>
    </SelectContent>
  </Select>
);

type TabValue = 'all' | 'input' | 'output';
type StatusFilter = 'all' | 'active' | 'inactive';

// Initial security rules data
const initialSecurityRules: SecurityRule[] = [
  {
    id: 1,
    name: "Block Prompt Injection",
    type: "input",
    category: "Prompt Injection",
    status: "active",
    sensitivity: "high",
    action: "block",
    lastModified: "2024-02-11",
  },
  {
    id: 2,
    name: "PII Detection",
    type: "input",
    category: "PII Scanner",
    status: "active",
    sensitivity: "high",
    action: "redact",
    lastModified: "2024-02-11",
  },
  {
    id: 3,
    name: "Content Safety Filter",
    type: "output",
    category: "Content Filter",
    status: "active",
    sensitivity: "medium",
    action: "alert",
    lastModified: "2024-02-10",
  },
  {
    id: 4,
    name: "Data Leakage Prevention",
    type: "output",
    category: "DLP",
    status: "inactive",
    sensitivity: "high",
    action: "block",
    lastModified: "2024-02-09",
  },
];

const SecurityRulesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [rules, setRules] = useState<SecurityRule[]>(initialSecurityRules);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const handleAddRule = (newRule: Omit<SecurityRule, 'id' | 'lastModified'>) => {
    setRules(prevRules => [
      ...prevRules,
      {
        ...newRule,
        id: Math.max(...prevRules.map(r => r.id)) + 1,
        lastModified: new Date().toISOString().split('T')[0]
      }
    ]);
  };

  const getStatusIcon = (status: SecurityRule['status']): JSX.Element => {
    return status === 'active' ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-gray-500" />
    );
  };

  const getSeverityBadge = (severity: SecurityRule['sensitivity']): JSX.Element => {
    const variants: Record<SecurityRule['sensitivity'], "destructive" | "secondary" | "outline"> = {
      high: "destructive",
      medium: "secondary",
      low: "outline"
    };
    return (
      <Badge variant={variants[severity]}>
        {severity}
      </Badge>
    );
  };

  // Filter rules based on search query, status, and active tab
  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter;
    const matchesType = activeTab === "all" || rule.type === activeTab;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Security Rules</h1>
          <p className="text-muted-foreground">
            Manage and configure security rules for input and output processing
          </p>
        </div>
        <AddRuleWizard onRuleAdd={handleAddRule} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Input
            placeholder="Search rules..."
            className="w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
            <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={(value) => setActiveTab(value as TabValue)}>
        <TabsList>
          <TabsTrigger value="all">All Rules</TabsTrigger>
          <TabsTrigger value="input">Input Security</TabsTrigger>
          <TabsTrigger value="output">Output Security</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Rules Overview</CardTitle>
              <CardDescription>
                View and manage all security rules across input and output processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Rule Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sensitivity</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {rule.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(rule.status)}
                          <span className={rule.status === 'active' ? 'text-green-500' : 'text-gray-500'}>
                            {rule.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getSeverityBadge(rule.sensitivity)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {rule.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit Rule</DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuItem>Test Rule</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Rule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="input" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Input Security Rules</CardTitle>
              <CardDescription>
                Configure rules for securing input prompts and data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same table as above but filtered for input rules */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Output Security Rules</CardTitle>
              <CardDescription>
                Configure rules for securing LLM responses and output data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same table as above but filtered for output rules */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityRulesPage;