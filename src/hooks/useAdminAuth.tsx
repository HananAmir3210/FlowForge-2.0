// "use client";

// import {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   ReactNode,
// } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import type { User } from "@supabase/supabase-js";
// import type { Database } from "@/integrations/supabase/types";

// type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

// interface AdminUser {
//   id: string;
//   email: string;
//   role: string;
//   full_name?: string | null;
//   company?: string | null;
// }

// interface AdminAuthContextType {
//   user: AdminUser | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   error: string | null;
// }

// // Create context
// const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
//   undefined
// );

// // Hook to access context
// export const useAdminAuth = (): AdminAuthContextType => {
//   const context = useContext(AdminAuthContext);
//   if (context === undefined) {
//     throw new Error("useAdminAuth must be used within an AdminAuthProvider");
//   }
//   return context;
// };

// // Provider component
// export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<AdminUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Check if user has admin role
//   const checkAdminRole = async (
//     userId: string
//   ): Promise<UserProfile | null> => {
//     try {
//       console.log("🔍 Checking admin role for user:", userId);
//       const { data: profile, error } = await supabase
//         .from("user_profiles")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       console.log("📊 Profile query result:", { profile, error });

//       if (error) {
//         console.error("❌ Error fetching user profile:", error);
//         return null;
//       }

//       console.log("👤 User profile found:", profile);
//       console.log("🔑 User role:", profile?.role);

//       // Check if user has admin or super_admin role
//       if (profile?.role === "admin" || profile?.role === "super_admin") {
//         console.log("✅ User has admin privileges");
//         return profile;
//       }

//       console.log("❌ User does not have admin privileges");
//       return null;
//     } catch (error) {
//       console.error("❌ Error checking admin role:", error);
//       return null;
//     }
//   };

//   // Set admin user from auth user and profile
//   const setAdminUser = (authUser: User, profile: UserProfile) => {
//     setUser({
//       id: authUser.id,
//       email: authUser.email || "",
//       role: profile.role || "user",
//       full_name: profile.full_name,
//       company: profile.company,
//     });
//   };

//   useEffect(() => {
//     let isMounted = true;
//     let timeoutId: NodeJS.Timeout;

//     const checkAuth = async () => {
//       try {
//         console.log("🔍 Starting auth check...");
//         setError(null);

//         // Set a timeout to prevent infinite loading
//         timeoutId = setTimeout(() => {
//           if (isMounted) {
//             console.log("⏰ Auth check timeout - forcing loading to false");
//             setIsLoading(false);
//             setError("Authentication check timed out. Please try again.");
//           }
//         }, 10000); // 10 second timeout

//         // Get current session
//         const {
//           data: { session },
//           error: sessionError,
//         } = await supabase.auth.getSession();

//         console.log(
//           "📋 Session data:",
//           session ? "Session exists" : "No session",
//           sessionError
//         );

//         if (sessionError) {
//           console.error("❌ Session error:", sessionError);
//           if (isMounted) {
//             setUser(null);
//             setError("Session error occurred");
//             setIsLoading(false);
//             clearTimeout(timeoutId);
//           }
//           return;
//         }

//         if (session?.user) {
//           console.log("👤 User found, checking admin role...");
//           // Check if user has admin role
//           const profile = await checkAdminRole(session.user.id);
//           console.log(
//             "🔑 Profile check result:",
//             profile ? `Admin role: ${profile.role}` : "No admin access"
//           );

//           if (isMounted) {
//             clearTimeout(timeoutId);
//             if (profile) {
//               setAdminUser(session.user, profile);
//               console.log("✅ Admin user set successfully");
//               setError(null);
//             } else {
//               setUser(null);
//               setError("Access denied. Admin privileges required.");
//               console.log("❌ Access denied - not admin");
//             }
//             setIsLoading(false);
//           }
//         } else {
//           console.log("👤 No user session found");
//           if (isMounted) {
//             clearTimeout(timeoutId);
//             setUser(null);
//             setError(null);
//             setIsLoading(false);
//           }
//         }
//       } catch (error) {
//         console.error("❌ Auth check failed:", error);
//         if (isMounted) {
//           clearTimeout(timeoutId);
//           setUser(null);
//           setError("Authentication check failed.");
//           setIsLoading(false);
//         }
//       }
//     };

//     checkAuth();

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       console.log("🔄 Auth state changed:", event);

//       if (event === "SIGNED_IN" && session?.user) {
//         if (isMounted) {
//           setIsLoading(true);
//           setError(null);
//         }

//         const profile = await checkAdminRole(session.user.id);

//         if (isMounted) {
//           if (profile) {
//             setAdminUser(session.user, profile);
//             setError(null);
//           } else {
//             setUser(null);
//             setError("Access denied. Admin privileges required.");
//           }
//           setIsLoading(false);
//         }
//       } else if (event === "SIGNED_OUT") {
//         if (isMounted) {
//           setUser(null);
//           setError(null);
//           setIsLoading(false);
//         }
//       } else if (event === "TOKEN_REFRESHED" && session?.user) {
//         console.log("🔄 Token refreshed, re-checking admin role...");
//         const profile = await checkAdminRole(session.user.id);
//         if (isMounted && profile) {
//           setAdminUser(session.user, profile);
//           setError(null);
//         }
//       }
//     });

//     return () => {
//       isMounted = false;
//       clearTimeout(timeoutId);
//       subscription.unsubscribe();
//     };
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { data, error: signInError } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//       if (signInError) {
//         throw signInError;
//       }

//       if (data.user) {
//         // Check if user has admin role
//         const profile = await checkAdminRole(data.user.id);

//         if (profile) {
//           setAdminUser(data.user, profile);
//         } else {
//           // Sign out the user if they don't have admin role
//           await supabase.auth.signOut();
//           throw new Error("Access denied. Admin privileges required.");
//         }
//       }
//     } catch (error: any) {
//       console.error("Login error:", error);
//       setError(error.message || "Login failed");
//       setUser(null);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       setError(null);
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//     } catch (error: any) {
//       console.error("Logout error:", error);
//       setError(error.message || "Logout failed");
//     }
//   };

//   return (
//     <AdminAuthContext.Provider
//       value={{ user, isLoading, login, logout, error }}
//     >
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };

"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useRef,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

interface AdminUser {
  id: string;
  email: string;
  role: string;
  full_name?: string | null;
  company?: string | null;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

// Create context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// Hook to access context
export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

// Provider component
export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Flags to prevent infinite loading and race conditions
  const isInitialized = useRef(false);
  const isAuthChecking = useRef(false);
  const isMounted = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function to prevent memory leaks
  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Safe state setter that checks if component is still mounted
  const safeSetState = (callback: () => void) => {
    if (isMounted.current) {
      callback();
    }
  };

  // Force stop loading with optional error message
  const forceStopLoading = (errorMessage?: string) => {
    safeSetState(() => {
      setIsLoading(false);
      if (errorMessage) {
        setError(errorMessage);
      }
      isAuthChecking.current = false;
    });
    cleanup();
  };

  // Check if user has admin role
  const checkAdminRole = async (
    userId: string
  ): Promise<UserProfile | null> => {
    try {
      console.log("🔍 Checking admin role for user:", userId);

      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      console.log("📊 Profile query result:", { profile, error });

      if (error) {
        console.error("❌ Error fetching user profile:", error);
        return null;
      }

      console.log("👤 User profile found:", profile);
      console.log("🔑 User role:", profile?.role);

      // Check if user has admin or super_admin role
      if (profile?.role === "admin" || profile?.role === "super_admin") {
        console.log("✅ User has admin privileges");
        return profile;
      }

      console.log("❌ User does not have admin privileges");
      return null;
    } catch (error) {
      console.error("❌ Error checking admin role:", error);
      return null;
    }
  };

  // Set admin user from auth user and profile
  const setAdminUser = (authUser: User, profile: UserProfile) => {
    safeSetState(() => {
      setUser({
        id: authUser.id,
        email: authUser.email || "",
        role: profile.role || "user",
        full_name: profile.full_name,
        company: profile.company,
      });
    });
  };

  useEffect(() => {
    isMounted.current = true;

    const checkAuth = async () => {
      // Prevent multiple simultaneous auth checks
      if (isAuthChecking.current) {
        console.log("🔒 Auth check already in progress, skipping...");
        return;
      }

      // If already initialized and not loading, don't check again
      if (isInitialized.current && !isLoading) {
        console.log("✅ Already initialized, skipping auth check");
        return;
      }

      isAuthChecking.current = true;

      try {
        console.log("🔍 Starting auth check...");
        safeSetState(() => {
          setError(null);
          if (!isInitialized.current) {
            setIsLoading(true);
          }
        });

        // Set a timeout to prevent infinite loading
        timeoutRef.current = setTimeout(() => {
          console.log("⏰ Auth check timeout - forcing loading to false");
          forceStopLoading(
            "Authentication check timed out. Please refresh the page."
          );
        }, 8000); // 8 second timeout

        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log(
          "📋 Session data:",
          session ? "Session exists" : "No session",
          sessionError
        );

        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          safeSetState(() => {
            setUser(null);
            setError("Session error occurred. Please try logging in again.");
            setIsLoading(false);
            isInitialized.current = true;
          });
          cleanup();
          isAuthChecking.current = false;
          return;
        }

        if (session?.user) {
          console.log("👤 User found, checking admin role...");
          // Check if user has admin role
          const profile = await checkAdminRole(session.user.id);
          console.log(
            "🔑 Profile check result:",
            profile ? `Admin role: ${profile.role}` : "No admin access"
          );

          safeSetState(() => {
            if (profile) {
              setAdminUser(session.user, profile);
              console.log("✅ Admin user set successfully");
              setError(null);
            } else {
              setUser(null);
              setError("Access denied. Admin privileges required.");
              console.log("❌ Access denied - not admin");
            }
            setIsLoading(false);
            isInitialized.current = true;
          });
        } else {
          console.log("👤 No user session found");
          safeSetState(() => {
            setUser(null);
            setError(null);
            setIsLoading(false);
            isInitialized.current = true;
          });
        }

        cleanup();
        isAuthChecking.current = false;
      } catch (error) {
        console.error("❌ Auth check failed:", error);
        safeSetState(() => {
          setUser(null);
          setError("Authentication check failed. Please refresh the page.");
          setIsLoading(false);
          isInitialized.current = true;
        });
        cleanup();
        isAuthChecking.current = false;
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state changed:", event);

      if (event === "SIGNED_IN" && session?.user) {
        if (!isAuthChecking.current) {
          isAuthChecking.current = true;
          safeSetState(() => {
            setIsLoading(true);
            setError(null);
          });

          const profile = await checkAdminRole(session.user.id);

          safeSetState(() => {
            if (profile) {
              setAdminUser(session.user, profile);
              setError(null);
            } else {
              setUser(null);
              setError("Access denied. Admin privileges required.");
            }
            setIsLoading(false);
            isInitialized.current = true;
          });
          isAuthChecking.current = false;
        }
      } else if (event === "SIGNED_OUT") {
        safeSetState(() => {
          setUser(null);
          setError(null);
          setIsLoading(false);
          isInitialized.current = true;
        });
        isAuthChecking.current = false;
      } else if (event === "TOKEN_REFRESHED" && session?.user) {
        console.log("🔄 Token refreshed, re-checking admin role...");
        if (!isAuthChecking.current) {
          const profile = await checkAdminRole(session.user.id);
          if (profile) {
            setAdminUser(session.user, profile);
            safeSetState(() => {
              setError(null);
            });
          }
        }
      }
    });

    return () => {
      isMounted.current = false;
      cleanup();
      subscription.unsubscribe();
      isAuthChecking.current = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (isAuthChecking.current) {
      throw new Error("Authentication in progress. Please wait.");
    }

    try {
      isAuthChecking.current = true;
      setIsLoading(true);
      setError(null);

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        // Check if user has admin role
        const profile = await checkAdminRole(data.user.id);

        if (profile) {
          setAdminUser(data.user, profile);
          isInitialized.current = true;
        } else {
          // Sign out the user if they don't have admin role
          await supabase.auth.signOut();
          throw new Error("Access denied. Admin privileges required.");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
      isAuthChecking.current = false;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      isInitialized.current = false; // Reset initialization flag
    } catch (error: any) {
      console.error("Logout error:", error);
      setError(error.message || "Logout failed");
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ user, isLoading, login, logout, error }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
