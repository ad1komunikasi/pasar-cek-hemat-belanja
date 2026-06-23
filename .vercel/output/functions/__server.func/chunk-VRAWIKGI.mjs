import {
  cn
} from "./chunk-G46AXIAP.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/textarea-DSyJ1nlY.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var React = __toESM(require_react(), 1);
var Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";

export {
  Textarea
};
