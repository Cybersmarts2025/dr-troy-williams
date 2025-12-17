import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { ShieldCheck, ShieldAlert, RefreshCw, Globe, Database, User, KeyRound } from "lucide-react";

type CheckStatus = "idle" | "ok" | "warn" | "error" | "running";

interface HealthCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail?: string;
}

const SystemHealth: React.FC = () => {
  const [checks, setChecks] = useState<HealthCheck[]>([
    { id: "env", label: "Environment Variables", status: "idle" },
    { id: "connectivity", label: "Supabase Connectivity", status: "idle" },
    { id: "auth", label: "Auth Session", status: "idle" },
    { id: "rls", label: "RLS Visibility (user_roles)", status: "idle" },
  ]);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const reactVersion = (React as any).version || "unknown";
  const nodeEnv = import.meta.env.MODE;

  const setCheck = (id: string, patch: Partial<HealthCheck>) => {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const runEnvCheck = useCallback(async () => {
    setCheck("env", { status: "running", detail: undefined });
    const missing: string[] = [];
    if (!supabaseUrl) missing.push("VITE_SUPABASE_URL");
    if (!supabaseAnon) missing.push("VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY)");

    if (missing.length) {
      setCheck("env", { status: "warn", detail: `Missing: ${missing.join(", ")}` });
      toast.warning("Some env variables are missing. Check .env");
    } else {
      setCheck("env", { status: "ok", detail: "Supabase env present" });
    }
  }, [supabaseUrl, supabaseAnon]);

  const runConnectivityCheck = useCallback(async () => {
    setCheck("connectivity", { status: "running", detail: undefined });
    // Safe public table due to policy: website_content has SELECT true
    const { error } = await supabase
      .from("website_content")
      .select("id", { count: "exact", head: true })
      .limit(1);

    if (error) {
      setCheck("connectivity", { status: "error", detail: error.message });
      toast.error("Supabase connectivity failed");
      return;
    }
    setCheck("connectivity", { status: "ok", detail: "Supabase reachable" });
  }, []);

  const runAuthCheck = useCallback(async () => {
    setCheck("auth", { status: "running", detail: undefined });
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      setCheck("auth", { status: "ok", detail: `Signed in as ${data.session.user.email || data.session.user.id}` });
    } else {
      setCheck("auth", { status: "warn", detail: "Not signed in" });
    }
  }, []);

  const runRlsCheck = useCallback(async () => {
    setCheck("rls", { status: "running", detail: undefined });
    // user_roles has RLS: users can view their own roles; admins can view all
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      setCheck("rls", { status: "warn", detail: "Sign in to test RLS-protected tables" });
      return;
    }
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .limit(1);

    if (error) {
      setCheck("rls", { status: "error", detail: error.message });
      toast.error("RLS check failed");
      return;
    }
    if (!data || data.length === 0) {
      setCheck("rls", { status: "ok", detail: "Accessible. No roles found for user (or not admin)" });
    } else {
      setCheck("rls", { status: "ok", detail: `Accessible. Role: ${data[0].role}` });
    }
  }, []);

  const runAll = useCallback(async () => {
    await runEnvCheck();
    await runConnectivityCheck();
    await runAuthCheck();
    await runRlsCheck();
  }, [runEnvCheck, runConnectivityCheck, runAuthCheck, runRlsCheck]);

  useEffect(() => {
    runAll();
  }, [runAll]);

  const overall = useMemo<CheckStatus>(() => {
    if (checks.some((c) => c.status === "error")) return "error";
    if (checks.some((c) => c.status === "warn")) return "warn";
    if (checks.every((c) => c.status === "ok")) return "ok";
    return "idle";
  }, [checks]);

  const StatusIcon = overall === "ok" ? ShieldCheck : overall === "warn" ? ShieldAlert : ShieldAlert;
  const statusLabel = overall === "ok" ? "All Good" : overall === "warn" ? "Warnings" : "Attention Needed";
  const statusColor =
    overall === "ok" ? "text-green-600" : overall === "warn" ? "text-amber-600" : "text-red-600";

  const statusBadge = (status: CheckStatus) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-600">OK</Badge>;
      case "warn":
        return <Badge className="bg-amber-600">WARN</Badge>;
      case "error":
        return <Badge className="bg-red-600">ERROR</Badge>;
      case "running":
        return <Badge variant="outline">Running…</Badge>;
      default:
        return <Badge variant="secondary">Idle</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <StatusIcon className={`h-6 w-6 ${statusColor}`} />
              System Health
            </CardTitle>
            <Button variant="outline" onClick={runAll}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Checks
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <div className="font-medium">Environment</div>
              </div>
              <div className="text-sm text-gray-700">
                <div>Mode: <Badge variant="secondary">{nodeEnv}</Badge></div>
                <div className="mt-1 break-all">VITE_SUPABASE_URL: {supabaseUrl ? "set" : "missing"}</div>
                <div className="mt-1">Anon Key: {supabaseAnon ? "set" : "missing"}</div>
              </div>
              <div className="mt-2">{statusBadge(checks.find(c => c.id === "env")?.status || "idle")}</div>
              {checks.find(c => c.id === "env")?.detail && (
                <div className="mt-1 text-xs text-gray-600">{checks.find(c => c.id === "env")?.detail}</div>
              )}
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-indigo-600" />
                <div className="font-medium">Supabase Connectivity</div>
              </div>
              <div className="text-sm text-gray-700">
                Public read test against website_content using a HEAD query.
              </div>
              <div className="mt-2">{statusBadge(checks.find(c => c.id === "connectivity")?.status || "idle")}</div>
              {checks.find(c => c.id === "connectivity")?.detail && (
                <div className="mt-1 text-xs text-gray-600">{checks.find(c => c.id === "connectivity")?.detail}</div>
              )}
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-emerald-600" />
                <div className="font-medium">Auth Session</div>
              </div>
              <div className="text-sm text-gray-700">
                Checks for a signed-in user. Some features require a session.
              </div>
              <div className="mt-2">{statusBadge(checks.find(c => c.id === "auth")?.status || "idle")}</div>
              {checks.find(c => c.id === "auth")?.detail && (
                <div className="mt-1 text-xs text-gray-600">{checks.find(c => c.id === "auth")?.detail}</div>
              )}
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2 mb-2">
                <KeyRound className="h-4 w-4 text-purple-600" />
                <div className="font-medium">RLS Visibility</div>
              </div>
              <div className="text-sm text-gray-700">
                Attempts to select role data from user_roles. Requires an authenticated session by design.
              </div>
              <div className="mt-2">{statusBadge(checks.find(c => c.id === "rls")?.status || "idle")}</div>
              {checks.find(c => c.id === "rls")?.detail && (
                <div className="mt-1 text-xs text-gray-600">{checks.find(c => c.id === "rls")?.detail}</div>
              )}
            </div>
          </div>

          <Separator />

          <div className="text-sm text-gray-700">
            <div>React version: <Badge variant="secondary">{reactVersion}</Badge></div>
            <div className="mt-1">
              Tip: Auth-required checks will show warnings when signed out. Sign in to validate RLS and secure routes.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;