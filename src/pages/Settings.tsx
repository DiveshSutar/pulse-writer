import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Upload,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    commentNotifications: true,
    likeNotifications: false,
    followNotifications: true
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about React and Node.js. Love sharing knowledge through blogging.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // In a real app, this would update the theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System theme detection
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    toast.success("Theme updated successfully!");
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification settings updated!");
  };

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = () => {
    toast.success("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Change Avatar</span>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG or GIF (max 2MB)
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    {profile.bio.length}/500 characters
                  </p>
                </div>

                <Button onClick={handleProfileUpdate} className="w-full">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your blog posts and activities
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comment-notifications">Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone comments on your posts
                    </p>
                  </div>
                  <Switch
                    id="comment-notifications"
                    checked={notifications.commentNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("commentNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="like-notifications">Like Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone likes your posts
                    </p>
                  </div>
                  <Switch
                    id="like-notifications"
                    checked={notifications.likeNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("likeNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="follow-notifications">Follow Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone follows you
                    </p>
                  </div>
                  <Switch
                    id="follow-notifications"
                    checked={notifications.followNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("followNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Choose your theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`flex flex-col items-center space-y-2 p-4 border rounded-lg hover:bg-accent transition-colors ${
                        theme === "light" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Sun className="h-6 w-6" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`flex flex-col items-center space-y-2 p-4 border rounded-lg hover:bg-accent transition-colors ${
                        theme === "dark" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Moon className="h-6 w-6" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`flex flex-col items-center space-y-2 p-4 border rounded-lg hover:bg-accent transition-colors ${
                        theme === "system" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Monitor className="h-6 w-6" />
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button onClick={handlePasswordChange} className="w-full">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}