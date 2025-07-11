
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModal = ({ open, onOpenChange, defaultTab = 'login' }: AuthModalProps) => {
  const { signIn, signUp } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  React.useEffect(() => { setTab(defaultTab); }, [defaultTab]);

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginEmail) newErrors.loginEmail = "Email is required";
    if (!loginPassword) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!signupName) newErrors.signupName = "Full name is required";
    if (!signupEmail) newErrors.signupEmail = "Email is required";
    if (!signupPassword) newErrors.signupPassword = "Password is required";
    if (signupPassword.length < 6) newErrors.signupPassword = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (signupPassword !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);

    if (!error) {
      onOpenChange(false);
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, signupName);
    setLoading(false);

    if (!error) {
      onOpenChange(false);
      setSignupEmail("");
      setSignupPassword("");
      setSignupName("");
      setConfirmPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full max-w-md mx-auto my-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">Welcome to AI SOP Generator</DialogTitle>
        </DialogHeader>
        
        <Tabs value={tab} onValueChange={v => setTab(v as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#101828] border border-white/20 shadow-sm rounded-lg mb-6">
            <TabsTrigger value="login" className="text-white font-bold data-[state=active]:bg-brand-green/80 data-[state=active]:text-[#101828] data-[state=active]:shadow data-[state=active]:font-bold transition-colors">Login</TabsTrigger>
            <TabsTrigger value="signup" className="text-white font-bold data-[state=active]:bg-brand-green/80 data-[state=active]:text-[#101828] data-[state=active]:shadow data-[state=active]:font-bold transition-colors">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Login to your account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={errors.loginEmail ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.loginEmail && <p className="text-red-500 text-sm mt-1 text-center">{errors.loginEmail}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={errors.loginPassword ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.loginPassword && <p className="text-red-500 text-sm mt-1 text-center">{errors.loginPassword}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Create an account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className={errors.signupName ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.signupName && <p className="text-red-500 text-sm mt-1 text-center">{errors.signupName}</p>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className={errors.signupEmail ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.signupEmail && <p className="text-red-500 text-sm mt-1 text-center">{errors.signupEmail}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className={errors.signupPassword ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.signupPassword && <p className="text-red-500 text-sm mt-1 text-center">{errors.signupPassword}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 text-center">{errors.confirmPassword}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
