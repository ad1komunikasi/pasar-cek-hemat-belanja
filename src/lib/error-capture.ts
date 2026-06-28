// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

// Hook into console.error to capture any errors swallowed and logged by h3/Nitro/Vite
const originalConsoleError = console.error;
console.error = (...args) => {
  originalConsoleError(...args);
  const firstError = args.find(
    (arg) => arg instanceof Error || (arg && typeof arg === "object" && "stack" in arg),
  );
  if (firstError) {
    record(firstError);
  } else {
    const stringMessage = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
      .join(" ");
    if (
      stringMessage.includes("Error") ||
      stringMessage.includes("Missing") ||
      stringMessage.includes("Failed") ||
      stringMessage.includes("unhandled")
    ) {
      record(new Error(stringMessage));
    }
  }
};

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
