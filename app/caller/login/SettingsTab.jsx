import { useState } from "react";
import { Shield, Phone, Download, Trash2, HelpCircle, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function SettingsTab() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    callTime: "7:00 PM - 8:00 PM",
    reminderNotifications: true,
    weekendCalls: true,
  });

  const handleSavePreferences = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleDownloadData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data will be downloaded shortly.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center space-x-3 mt-2">
                <Input 
                  id="phone"
                  value={"+1 XXX-XXX-1234"} 
                  disabled
                  className="flex-1 bg-gray-50 text-gray-500"
                />
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Subscription Status</Label>
              <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg mt-2">
                <Badge variant="outline" className="text-secondary border-secondary">
                  Free Trial
                </Badge>
                <span className="text-sm text-gray-600">
                  {8} calls remaining
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Call Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="call-time">Preferred Call Time</Label>
              <Select 
                value={preferences.callTime} 
                onValueChange={(value) => setPreferences({...preferences, callTime: value})}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</SelectItem>
                  <SelectItem value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</SelectItem>
                  <SelectItem value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="reminders"
                  checked={preferences.reminderNotifications}
                  onCheckedChange={(checked) => 
                    setPreferences({...preferences, reminderNotifications: !!checked})
                  }
                />
                <Label htmlFor="reminders" className="text-sm">Send reminder notifications</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="weekends"
                  checked={preferences.weekendCalls}
                  onCheckedChange={(checked) => 
                    setPreferences({...preferences, weekendCalls: !!checked})
                  }
                />
                <Label htmlFor="weekends" className="text-sm">Enable weekend calls</Label>
              </div>
            </div>

            <Button onClick={handleSavePreferences} className="w-full">
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="text-accent h-5 w-5" />
                <span className="font-medium text-gray-900">HIPAA Compliant</span>
              </div>
              <p className="text-sm text-gray-600">Your data is protected under healthcare privacy regulations.</p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleDownloadData}
              className="w-full justify-start"
            >
              <Download className="h-4 w-4 mr-2" />
              Download My Data
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="w-full justify-start"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-3">
              <HelpCircle className="h-5 w-5 mr-3 text-gray-400" />
              <div className="text-left">
                <div className="font-medium">FAQ & Help Center</div>
                <div className="text-sm text-gray-500">Find answers to common questions</div>
              </div>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto p-3">
              <Mail className="h-5 w-5 mr-3 text-gray-400" />
              <div className="text-left">
                <div className="font-medium">Contact Support</div>
                <div className="text-sm text-gray-500">Get help from our team</div>
              </div>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto p-3">
              <FileText className="h-5 w-5 mr-3 text-gray-400" />
              <div className="text-left">
                <div className="font-medium">Privacy Policy</div>
                <div className="text-sm text-gray-500">Read our privacy policy</div>
              </div>
            </Button>

            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {}}
                className="w-full text-destructive hover:text-destructive"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
