import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Edit3, Settings, LogOut, Sun, Moon, ArrowLeft, Eye, EyeOff, Trash2 } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  onViewAccount: () => void;
}

const ProfileModal = ({
  isOpen,
  onClose,
  user,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  onViewAccount
}: ProfileModalProps) => {
  const [currentPanel, setCurrentPanel] = React.useState<'profile' | 'settings'>('profile');
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(user?.name || "");
  
  // Account settings state
  const [accountSettings, setAccountSettings] = React.useState({
    fullName: user?.name || "",
    email: user?.email || "",
    language: "en",
    theme: isDarkMode ? "dark" : "light",
    notifications: {
      email: true,
      inApp: true,
      marketing: false
    }
  });
  
  // Password change state
  const [passwordForm, setPasswordForm] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false
  });

  React.useEffect(() => {
    if (user?.name) {
      setEditedName(user.name);
      setAccountSettings(prev => ({ ...prev, fullName: user.name, email: user.email }));
    }
  }, [user?.name, user?.email]);

  React.useEffect(() => {
    setAccountSettings(prev => ({ ...prev, theme: isDarkMode ? "dark" : "light" }));
  }, [isDarkMode]);

  const handleSaveProfile = () => {
    console.log("Saving profile:", { name: editedName });
    setIsEditing(false);
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleViewAccountSettings = () => {
    setCurrentPanel('settings');
  };

  const handleBackToProfile = () => {
    setCurrentPanel('profile');
  };

  const handleSaveAccountSettings = () => {
    console.log("Saving account settings:", accountSettings);
    // Here you would typically save to backend
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    console.log("Changing password");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account");
      onLogout();
      onClose();
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-[95vw] max-w-md sm:max-w-lg overflow-hidden p-0 max-h-[90vh] ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}>
        <DialogHeader className="sr-only">
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Manage your profile settings</DialogDescription>
        </DialogHeader>
        
        <div className="relative w-full h-[85vh] sm:h-[600px] max-h-[600px]">
          {/* Profile Panel */}
          <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            currentPanel === 'profile' ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-4 sm:p-6 h-full">
              {/* Avatar Section */}
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-blue-500 text-white text-lg sm:text-xl font-semibold">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                
                {/* Name Field */}
                <div className="w-full space-y-2">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-left block text-sm">Full Name</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-center text-sm sm:text-base"
                      />
                      <div className="flex gap-2 justify-center flex-wrap">
                        <Button size="sm" onClick={handleSaveProfile} className={`text-xs sm:text-sm ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false);
                            setEditedName(user.name);
                          }}
                          className={`text-xs sm:text-sm ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' : ''}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-gray-200' : ''}`}>{user.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                        className={`text-xs sm:text-sm text-blue-600 hover:text-blue-700 ${isDarkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800' : ''}`}
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Email */}
                <p className={`text-xs sm:text-sm mt-2 break-all ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
              </div>

              {/* Account Button */}
              <Button 
                variant="outline" 
                className={`w-full justify-start mb-3 sm:mb-4 text-sm ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' : ''}`}
                onClick={handleViewAccountSettings}
              >
                <Settings className="w-4 h-4 mr-2" />
                View Account Settings
              </Button>

              <Separator className="mb-3 sm:mb-4" />

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between py-2 mb-3 sm:mb-4">
                <div className="flex items-center space-x-2">
                  {isDarkMode ? (
                    <Moon className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  ) : (
                    <Sun className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  )}
                  <Label htmlFor="dark-mode" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : ''}`}>
                    Dark Mode
                  </Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>

              <Separator className="mb-3 sm:mb-4" />

              {/* Logout Button */}
              <Button 
                variant="ghost" 
                className={`w-full justify-start text-sm text-red-600 hover:text-red-700 ${isDarkMode ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300' : 'hover:bg-red-50'}`}
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>

          {/* Account Settings Panel */}
          <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            currentPanel === 'settings' ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-4 sm:p-6 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center mb-4 sm:mb-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToProfile}
                  className={`mr-2 sm:mr-3 p-1 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : ''}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-base sm:text-lg font-semibold">Account Settings</h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Personal Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Personal Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                    <Input
                      id="fullName"
                      value={accountSettings.fullName}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, fullName: e.target.value }))}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                      id="email"
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, email: e.target.value }))}
                      type="email"
                      className="text-sm"
                    />
                  </div>
                </div>

                <Separator />

                {/* Change Password */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Change Password</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="text-sm pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : ''}`}
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="text-sm pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : ''}`}
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="text-sm pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : ''}`}
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handlePasswordChange} className={`w-full text-sm ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                    Update Password
                  </Button>
                </div>

                <Separator />

                {/* Preferences */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Preferences</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm">Language</Label>
                    <Select 
                      value={accountSettings.language} 
                      onValueChange={(value) => setAccountSettings(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-sm">Theme</Label>
                    <Select 
                      value={accountSettings.theme} 
                      onValueChange={(value) => {
                        setAccountSettings(prev => ({ ...prev, theme: value }));
                        if (value === "dark" && !isDarkMode) onToggleDarkMode();
                        if (value === "light" && isDarkMode) onToggleDarkMode();
                      }}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Notification Settings */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailNotifications"
                        checked={accountSettings.notifications.email}
                        onCheckedChange={(checked) => 
                          setAccountSettings(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, email: checked as boolean }
                          }))
                        }
                      />
                      <Label htmlFor="emailNotifications" className="text-sm">Email notifications</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inAppNotifications"
                        checked={accountSettings.notifications.inApp}
                        onCheckedChange={(checked) => 
                          setAccountSettings(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, inApp: checked as boolean }
                          }))
                        }
                      />
                      <Label htmlFor="inAppNotifications" className="text-sm">In-app notifications</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketingNotifications"
                        checked={accountSettings.notifications.marketing}
                        onCheckedChange={(checked) => 
                          setAccountSettings(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, marketing: checked as boolean }
                          }))
                        }
                      />
                      <Label htmlFor="marketingNotifications" className="text-sm">Marketing emails</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Save Settings */}
                <Button onClick={handleSaveAccountSettings} className={`w-full text-sm ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                  Save Changes
                </Button>

                <Separator />

                {/* Danger Zone */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm font-medium text-red-600">Danger Zone</h3>
                  <Button 
                    variant="outline" 
                    onClick={handleDeleteAccount}
                    className={`w-full text-sm text-red-600 border-red-300 ${isDarkMode ? 'hover:bg-red-900/20 bg-gray-800 border-gray-600 text-red-400 hover:text-red-300' : 'hover:bg-red-50'}`}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
