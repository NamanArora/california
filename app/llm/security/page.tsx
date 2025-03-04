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
import SecurityRuleBuilder from './SecurityRuleBuilder';

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
      <SecurityRuleBuilder />

    </div>
  );
};

export default SecurityRulesPage;