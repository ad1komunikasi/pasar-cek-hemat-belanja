import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Primitive
} from "./chunk-SJQOHQ2J.mjs";
import {
  cva
} from "./chunk-NXBQQK3G.mjs";
import {
  cn
} from "./chunk-Y5N26HX3.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// node_modules/@radix-ui/react-label/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var NAME = "Label";
var Label = React.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        props.onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label.displayName = NAME;
var Root = Label;

// dist/server/assets/label-JU3yqRBo.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var React2 = __toESM(require_react(), 1);
var labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label2 = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label2.displayName = Root.displayName;

export {
  Label2 as Label
};
