import React, { useState } from 'react';
import { Shield, FileCode, Settings, Beaker, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AddRuleWizardProps {
  onRuleAdd: (rule: any) => void;
}

const ruleTemplates = [
  {
    id: 'prompt-injection',
    name: 'Prompt Injection Detection',
    type: 'input',
    description: 'Detect and block attempts to manipulate or inject malicious prompts',
    sensitivity: 'high',
    action: 'block',
    category: 'Prompt Injection'
  },
  {
    id: 'pii-detection',
    name: 'PII Scanner',
    type: 'input',
    description: 'Identify and redact personal identifiable information from inputs',
    sensitivity: 'high',
    action: 'redact',
    category: 'PII Scanner'
  },
  {
    id: 'content-safety',
    name: 'Content Safety Filter',
    type: 'output',
    description: 'Filter harmful or inappropriate content from LLM responses',
    sensitivity: 'medium',
    action: 'modify',
    category: 'Content Filter'
  },
  {
    id: 'data-leakage',
    name: 'Data Leakage Prevention',
    type: 'output',
    description: 'Prevent sensitive information from being exposed in responses',
    sensitivity: 'high',
    action: 'block',
    category: 'DLP'
  }
];

const AddRuleWizard: React.FC<AddRuleWizardProps> = ({ onRuleAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [ruleConfig, setRuleConfig] = useState({
    name: '',
    type: 'input',
    category: '',
    sensitivity: 'medium',
    action: 'block',
    description: '',
    pattern: '',
    customLogic: '',
    status: 'active'
  });
  const [testResults, setTestResults] = useState<any>(null);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setRuleConfig({
      ...ruleConfig,
      name: template.name,
      type: template.type,
      category: template.category,
      sensitivity: template.sensitivity,
      action: template.action,
      description: template.description
    });
    setCurrentStep(2);
  };

  const handleTestRule = () => {
    // Simulate rule testing
    const results = {
      status: 'success',
      matches: 3,
      sampleInputs: [
        { input: 'Test input 1', result: 'blocked' },
        { input: 'Test input 2', result: 'passed' },
        { input: 'Test input 3', result: 'modified' }
      ],
      performance: {
        avgLatency: '45ms',
        cpuUsage: '2%'
      }
    };
    setTestResults(results);
  };

  const handleSave = () => {
    const newRule = {
      ...ruleConfig,
      status: 'active',
      lastModified: new Date().toISOString().split('T')[0]
    };
    onRuleAdd(newRule);
    setIsOpen(false);
    // Reset form
    setCurrentStep(1);
    setSelectedTemplate(null);
    setRuleConfig({
      name: '',
      type: 'input',
      category: '',
      sensitivity: 'medium',
      action: 'block',
      description: '',
      pattern: '',
      customLogic: '',
      status: 'active'
    });
    setTestResults(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {ruleTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedTemplate?.id === template.id ? 'border-2 border-primary' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                      <Badge variant={template.type === 'input' ? 'default' : 'secondary'}>
                        {template.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCurrentStep(2)}
            >
              Start from scratch
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={ruleConfig.name}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, name: e.target.value })}
                  placeholder="Enter rule name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Rule Type</Label>
                <RadioGroup
                  value={ruleConfig.type}
                  onValueChange={(value) => setRuleConfig({ ...ruleConfig, type: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="input" id="input" />
                    <Label htmlFor="input">Input Security</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="output" id="output" />
                    <Label htmlFor="output">Output Security</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={ruleConfig.category}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, category: e.target.value })}
                  placeholder="Enter category"
                />
              </div>

              <div className="space-y-2">
                <Label>Sensitivity Level</Label>
                <Select
                  value={ruleConfig.sensitivity}
                  onValueChange={(value) => setRuleConfig({ ...ruleConfig, sensitivity: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sensitivity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Action</Label>
                <Select
                  value={ruleConfig.action}
                  onValueChange={(value) => setRuleConfig({ ...ruleConfig, action: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="modify">Modify</SelectItem>
                    <SelectItem value="alert">Alert Only</SelectItem>
                    <SelectItem value="redact">Redact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={ruleConfig.description}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, description: e.target.value })}
                  placeholder="Describe the purpose of this rule"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Detection Pattern</Label>
                <Textarea
                  value={ruleConfig.pattern}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, pattern: e.target.value })}
                  placeholder="Regular expression or pattern to match"
                />
              </div>

              <div className="space-y-2">
                <Label>Custom Logic</Label>
                <Textarea
                  value={ruleConfig.customLogic}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, customLogic: e.target.value })}
                  placeholder="Additional logic or conditions"
                  className="font-mono"
                  rows={6}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Button onClick={handleTestRule}>
                      <Beaker className="mr-2 h-4 w-4" />
                      Run Test
                    </Button>
                    {testResults && (
                      <Badge variant="outline" className="ml-2">
                        {testResults.status}
                      </Badge>
                    )}
                  </div>

                  {testResults && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Matches Found</Label>
                          <div className="text-2xl font-bold">{testResults.matches}</div>
                        </div>
                        <div className="space-y-2">
                          <Label>Performance</Label>
                          <div className="space-y-1">
                            <div className="text-sm">Latency: {testResults.performance.avgLatency}</div>
                            <div className="text-sm">CPU Usage: {testResults.performance.cpuUsage}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Test Results</Label>
                        <div className="space-y-2">
                          {testResults.sampleInputs.map((sample: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded">
                              <span className="text-sm">{sample.input}</span>
                              <Badge variant={sample.result === 'blocked' ? 'destructive' : 'outline'}>
                                {sample.result}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Add New Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Security Rule</DialogTitle>
          <DialogDescription>
            Create a new security rule to protect your LLM interactions
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[
              { icon: FileCode, label: 'Template' },
              { icon: Settings, label: 'Basic Config' },
              { icon: Shield, label: 'Rule Logic' },
              { icon: Beaker, label: 'Test' }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                    ${currentStep > index + 1 ? 'bg-primary border-primary' : 
                      currentStep === index + 1 ? 'border-primary' : 'border-muted'}
                  `}
                >
                  <step.icon
                    className={`h-5 w-5 ${
                      currentStep >= index + 1 ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </div>
                <span className="text-xs mt-2">{step.label}</span>
              </div>
            ))}
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep(currentStep + 1);
                } else {
                  handleSave();
                }
              }}
            >
              {currentStep === 4 ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Rule
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRuleWizard;