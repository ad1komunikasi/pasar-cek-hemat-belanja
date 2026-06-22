export function renderErrorPage(error?: Error | unknown): string {
  let errorHtml = "";
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error && error.stack ? error.stack : "";
    errorHtml = `
      <div style="margin-top: 1.5rem; padding: 1rem; background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; text-align: left; font-size: 12px; border-radius: 0.375rem; overflow-x: auto;">
        <p style="font-weight: bold; margin: 0 0 0.5rem 0;">Error Details:</p>
        <pre style="margin: 0; white-space: pre-wrap; font-family: monospace;">${message}</pre>
        ${stack ? `<details style="margin-top: 0.5rem;"><summary style="cursor: pointer; font-weight: bold;">Stack Trace</summary><pre style="margin: 0.5rem 0 0 0; font-size: 10px; opacity: 0.8; white-space: pre-wrap;">${stack}</pre></details>` : ""}
      </div>
    `;
  }
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; background: #fff; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
      ${errorHtml}
    </div>
  </body>
</html>`;
}
