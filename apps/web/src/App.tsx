import { useEffect, useState } from "react";

import type { HealthResponse } from "@acme/shared";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Failed to load";
  }
}

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/health");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setHealth((await r.json()) as HealthResponse);
      } catch (e: unknown) {
        setError(getErrorMessage(e));
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Task Organizer</h1>
      {!health && !error && <p>Loading…</p>}
      {error && <p role="alert">Error: {error}</p>}
      {health && (
        <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
    </div>
  );
}
