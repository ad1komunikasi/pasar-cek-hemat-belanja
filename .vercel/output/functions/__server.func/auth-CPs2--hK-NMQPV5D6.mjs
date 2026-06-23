import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  external_exports
} from "./chunk-UGZLKGSL.mjs";
import {
  Presence,
  composeEventHandlers,
  createCollection,
  createContextScope,
  useCallbackRef,
  useControllableState,
  useDirection,
  useId
} from "./chunk-3WLNBR7O.mjs";
import {
  useAuth
} from "./chunk-PVA6CGQ6.mjs";
import {
  Label
} from "./chunk-IIG5XPYQ.mjs";
import {
  Primitive
} from "./chunk-SJQOHQ2J.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
import "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import {
  useComposedRefs
} from "./chunk-IHLGWONG.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import {
  cn
} from "./chunk-Y5N26HX3.mjs";
import {
  Link,
  useNavigate,
  useRouter
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/auth-CPs2--hK.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var React3 = __toESM(require_react(), 1);
var import_react = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-tabs/dist/index.mjs
var React2 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = React.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = React.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = React.useState(0);
  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: React.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: React.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: React.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: React.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    React.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;

// node_modules/@radix-ui/react-tabs/dist/index.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = React2.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList = React2.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger = React2.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = React2.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = React2.useRef(isSelected);
    React2.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs;
var List = TabsList;
var Trigger = TabsTrigger;
var Content = TabsContent;

// dist/server/assets/auth-CPs2--hK.js
var Tabs2 = Root2;
var TabsList2 = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList2.displayName = List.displayName;
var TabsTrigger2 = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger2.displayName = Trigger.displayName;
var TabsContent2 = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent2.displayName = Content.displayName;
var emailSchema = external_exports.string().trim().email("Email tidak valid").max(255);
var passSchema = external_exports.string().min(6, "Password minimal 6 karakter").max(72);
function AuthPage() {
  const {
    user,
    loading
  } = useAuth();
  const router = useRouter();
  (0, import_react.useEffect)(() => {
    if (!loading && user) router.navigate({
      to: "/dashboard"
    });
  }, [user, loading, router]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "hidden bg-[var(--color-brand-blue)] p-12 text-white lg:flex lg:flex-col lg:justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded bg-white text-sm font-black text-[var(--color-brand-blue)]", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h1", { className: "text-5xl font-black leading-tight", children: [
          "Cek Harga Dulu,",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("br", {}),
          "Belanja Lebih Hemat."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-6 max-w-md text-white/80", children: "Pantau harga sembako terbaru, bandingkan antar pasar terdekat, dan temukan keranjang belanja paling hemat hari ini." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-sm text-white/60", children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PasarCek"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center justify-center bg-[var(--color-gray-50)] p-6", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Link, { to: "/", className: "mb-8 inline-flex items-center gap-2 text-sm font-semibold lg:hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Tabs2, { defaultValue: "login", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(TabsList2, { className: "mb-6 grid w-full grid-cols-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabsTrigger2, { value: "login", children: "Masuk" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabsTrigger2, { value: "register", children: "Daftar" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabsTrigger2, { value: "forgot", children: "Lupa" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabsContent2, { value: "login", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LoginForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabsContent2, { value: "register", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RegisterForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabsContent2, { value: "forgot", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ForgotForm, {}) })
      ] })
    ] }) })
  ] });
}
function GoogleButton() {
  const [busy, setBusy] = (0, import_react.useState)(false);
  async function signIn() {
    setBusy(true);
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard"
      }
    });
    if (res.error) {
      toast.error("Gagal masuk dengan Google");
      setBusy(false);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Button, { type: "button", variant: "outline", className: "w-full", onClick: signIn, disabled: busy, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "#FBBC05", d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" })
    ] }),
    "Lanjutkan dengan Google"
  ] });
}
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = (0, import_react.useState)("");
  const [password, setPassword] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  async function submit(e) {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      passSchema.parse(password);
    } catch (err) {
      toast.error(err.errors?.[0]?.message ?? "Input tidak valid");
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali!");
    navigate({
      to: "/dashboard"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-black", children: "Masuk ke akun Anda" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(GoogleButton, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative my-4 text-center text-xs text-[var(--color-gray-500)]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "bg-[var(--color-gray-50)] px-2", children: "atau email" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { children: "Email" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { children: "Password" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Memproses..." : "Masuk" })
  ] });
}
function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = (0, import_react.useState)("");
  const [email, setEmail] = (0, import_react.useState)("");
  const [password, setPassword] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  async function submit(e) {
    e.preventDefault();
    if (fullName.trim().length < 2) return toast.error("Nama minimal 2 karakter");
    try {
      emailSchema.parse(email);
      passSchema.parse(password);
    } catch (err) {
      toast.error(err.errors?.[0]?.message ?? "Input tidak valid");
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: {
          full_name: fullName
        }
      }
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Pendaftaran berhasil! Silakan cek email Anda.");
    navigate({
      to: "/dashboard"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-black", children: "Buat akun gratis" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(GoogleButton, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative my-4 text-center text-xs text-[var(--color-gray-500)]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "bg-[var(--color-gray-50)] px-2", children: "atau email" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { children: "Nama lengkap" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), required: true, maxLength: 100 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { children: "Email" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { children: "Password" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-[var(--color-gray-500)]", children: "Dengan mendaftar Anda setuju dengan syarat & ketentuan PasarCek." }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Memproses..." : "Daftar" })
  ] });
}
function ForgotForm() {
  const [email, setEmail] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  async function submit(e) {
    e.preventDefault();
    try {
      emailSchema.parse(email);
    } catch (err) {
      toast.error(err.errors?.[0]?.message);
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password"
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Link reset password telah dikirim ke email Anda.");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-black", children: "Lupa password" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-[var(--color-gray-500)]", children: "Masukkan email Anda, kami akan kirim tautan untuk mengatur ulang password." }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { children: "Email" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Mengirim..." : "Kirim Link Reset" })
  ] });
}
export {
  AuthPage as component
};
