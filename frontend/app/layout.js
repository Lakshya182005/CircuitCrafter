import { AuthProvider } from '@/contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './globals.css';
import { Toaster } from "@/components/ui/feedback/toaster";
import { Toaster as Sonner } from "@/components/ui/feedback/sonner";
import { TooltipProvider } from "@/components/ui/overlay/tooltip";

export const metadata = {
  title: 'CircuitCrafter',
  description: 'Modern Digital Logic Simulator',
};

export default function RootLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId="58608535962-lqlcdu8mkq856orsbm3qv4h6on1aukat.apps.googleusercontent.com">
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </body>
        </html>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
