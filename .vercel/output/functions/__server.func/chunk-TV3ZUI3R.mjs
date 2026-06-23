import {
  require_react_dom
} from "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __commonJS,
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var require_use_sync_external_store_shim_production = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js"(exports) {
    "use strict";
    var React3 = require_react();
    function is(x3, y3) {
      return x3 === y3 && (0 !== x3 || 1 / x3 === 1 / y3) || x3 !== x3 && y3 !== y3;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useState5 = React3.useState;
    var useEffect5 = React3.useEffect;
    var useLayoutEffect3 = React3.useLayoutEffect;
    var useDebugValue = React3.useDebugValue;
    function useSyncExternalStore$2(subscribe2, getSnapshot) {
      var value = getSnapshot(), _useState = useState5({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
      useLayoutEffect3(
        function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        },
        [subscribe2, value, getSnapshot]
      );
      useEffect5(
        function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          return subscribe2(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          });
        },
        [subscribe2]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe2, getSnapshot) {
      return getSnapshot();
    }
    var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React3.useSyncExternalStore ? React3.useSyncExternalStore : shim;
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function is(x3, y3) {
        return x3 === y3 && (0 !== x3 || 1 / x3 === 1 / y3) || x3 !== x3 && y3 !== y3;
      }
      function useSyncExternalStore$2(subscribe2, getSnapshot) {
        didWarnOld18Alpha || void 0 === React3.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState5({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect3(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe2, value, getSnapshot]
        );
        useEffect5(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe2(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe2]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe2, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React3 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState5 = React3.useState, useEffect5 = React3.useEffect, useLayoutEffect3 = React3.useLayoutEffect, useDebugValue = React3.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React3.useSyncExternalStore ? React3.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_use_sync_external_store_shim_production();
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
var require_with_selector_production = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js"(exports) {
    "use strict";
    var React3 = require_react();
    var shim = require_shim();
    function is(x3, y3) {
      return x3 === y3 && (0 !== x3 || 1 / x3 === 1 / y3) || x3 !== x3 && y3 !== y3;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useSyncExternalStore = shim.useSyncExternalStore;
    var useRef7 = React3.useRef;
    var useEffect5 = React3.useEffect;
    var useMemo4 = React3.useMemo;
    var useDebugValue = React3.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe2, getSnapshot, getServerSnapshot, selector, isEqual) {
      var instRef = useRef7(null);
      if (null === instRef.current) {
        var inst = { hasValue: false, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo4(
        function() {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = true;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return memoizedSelection = currentSelection;
              }
              return memoizedSelection = nextSnapshot;
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return memoizedSnapshot = nextSnapshot, currentSelection;
            memoizedSnapshot = nextSnapshot;
            return memoizedSelection = nextSelection;
          }
          var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function() {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe2, instRef[0], instRef[1]);
      useEffect5(
        function() {
          inst.hasValue = true;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function is(x3, y3) {
        return x3 === y3 && (0 !== x3 || 1 / x3 === 1 / y3) || x3 !== x3 && y3 !== y3;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React3 = require_react(), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef7 = React3.useRef, useEffect5 = React3.useEffect, useMemo4 = React3.useMemo, useDebugValue = React3.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe2, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef7(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo4(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore(subscribe2, instRef[0], instRef[1]);
        useEffect5(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_with_selector_production();
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/@tanstack/router-core/dist/esm/invariant.js
function invariant() {
  throw new Error("Invariant failed");
}

// node_modules/@tanstack/router-core/dist/esm/not-found.js
function isNotFound(obj) {
  return obj?.isNotFound === true;
}

// node_modules/@tanstack/router-core/dist/esm/root.js
var rootRouteId = "__root__";

// node_modules/@tanstack/router-core/dist/esm/redirect.js
function redirect(opts) {
  opts.statusCode = opts.statusCode || opts.code || 307;
  if (!opts._builtLocation && !opts.reloadDocument && typeof opts.href === "string") try {
    new URL(opts.href);
    opts.reloadDocument = true;
  } catch {
  }
  const headers = new Headers(opts.headers);
  if (opts.href && headers.get("Location") === null) headers.set("Location", opts.href);
  const response = new Response(null, {
    status: opts.statusCode,
    headers
  });
  response.options = opts;
  if (opts.throw) throw response;
  return response;
}
function isRedirect(obj) {
  return obj instanceof Response && !!obj.options;
}
function isResolvedRedirect(obj) {
  return isRedirect(obj) && !!obj.options.href;
}

// node_modules/@tanstack/router-core/dist/esm/isServer/server.js
var isServer = process.env.NODE_ENV === "test" ? void 0 : true;

// node_modules/@tanstack/router-core/dist/esm/utils.js
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d2) {
  return typeof d2 === "function";
}
function functionalUpdate(updater, previous) {
  if (isFunction(updater)) return updater(previous);
  return updater;
}
var hasOwn = Object.prototype.hasOwnProperty;
var isEnumerable = Object.prototype.propertyIsEnumerable;
function hasKeys(obj) {
  for (const key in obj) if (hasOwn.call(obj, key)) return true;
  return false;
}
var createNull = () => /* @__PURE__ */ Object.create(null);
var nullReplaceEqualDeep = (prev, next) => replaceEqualDeep(prev, next, createNull);
function replaceEqualDeep(prev, _next, _makeObj = () => ({}), _depth = 0) {
  if (isServer) return _next;
  if (prev === _next) return prev;
  if (_depth > 500) return _next;
  const next = _next;
  const array = isPlainArray(prev) && isPlainArray(next);
  if (!array && !(isPlainObject(prev) && isPlainObject(next))) return next;
  const prevItems = array ? prev : getEnumerableOwnKeys(prev);
  if (!prevItems) return next;
  const nextItems = array ? next : getEnumerableOwnKeys(next);
  if (!nextItems) return next;
  const prevSize = prevItems.length;
  const nextSize = nextItems.length;
  const copy = array ? new Array(nextSize) : _makeObj();
  let equalItems = 0;
  for (let i2 = 0; i2 < nextSize; i2++) {
    const key = array ? i2 : nextItems[i2];
    const p3 = prev[key];
    const n2 = next[key];
    if (p3 === n2) {
      copy[key] = p3;
      if (array ? i2 < prevSize : hasOwn.call(prev, key)) equalItems++;
      continue;
    }
    if (p3 === null || n2 === null || typeof p3 !== "object" || typeof n2 !== "object") {
      copy[key] = n2;
      continue;
    }
    const v3 = replaceEqualDeep(p3, n2, _makeObj, _depth + 1);
    copy[key] = v3;
    if (v3 === p3) equalItems++;
  }
  return prevSize === nextSize && equalItems === prevSize ? prev : copy;
}
function getEnumerableOwnKeys(o3) {
  const names = Object.getOwnPropertyNames(o3);
  for (const name of names) if (!isEnumerable.call(o3, name)) return false;
  const symbols = Object.getOwnPropertySymbols(o3);
  if (symbols.length === 0) return names;
  const keys = names;
  for (const symbol of symbols) {
    if (!isEnumerable.call(o3, symbol)) return false;
    keys.push(symbol);
  }
  return keys;
}
function isPlainObject(o3) {
  if (!hasObjectPrototype(o3)) return false;
  const ctor = o3.constructor;
  if (typeof ctor === "undefined") return true;
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) return false;
  if (!prot.hasOwnProperty("isPrototypeOf")) return false;
  return true;
}
function hasObjectPrototype(o3) {
  return Object.prototype.toString.call(o3) === "[object Object]";
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function deepEqual(a, b2, opts) {
  if (a === b2) return true;
  if (typeof a !== typeof b2) return false;
  if (Array.isArray(a) && Array.isArray(b2)) {
    if (a.length !== b2.length) return false;
    for (let i2 = 0, l2 = a.length; i2 < l2; i2++) if (!deepEqual(a[i2], b2[i2], opts)) return false;
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b2)) {
    const ignoreUndefined = opts?.ignoreUndefined ?? true;
    if (opts?.partial) {
      for (const k3 in b2) if (!ignoreUndefined || b2[k3] !== void 0) {
        if (!deepEqual(a[k3], b2[k3], opts)) return false;
      }
      return true;
    }
    let aCount = 0;
    if (!ignoreUndefined) aCount = Object.keys(a).length;
    else for (const k3 in a) if (a[k3] !== void 0) aCount++;
    let bCount = 0;
    for (const k3 in b2) if (!ignoreUndefined || b2[k3] !== void 0) {
      bCount++;
      if (bCount > aCount || !deepEqual(a[k3], b2[k3], opts)) return false;
    }
    return aCount === bCount;
  }
  return false;
}
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = "pending";
  controlledPromise.resolve = (value) => {
    controlledPromise.status = "resolved";
    controlledPromise.value = value;
    resolveLoadPromise(value);
    onResolve?.(value);
  };
  controlledPromise.reject = (e) => {
    controlledPromise.status = "rejected";
    rejectLoadPromise(e);
  };
  return controlledPromise;
}
function isModuleNotFoundError(error) {
  if (typeof error?.message !== "string") return false;
  return error.message.startsWith("Failed to fetch dynamically imported module") || error.message.startsWith("error loading dynamically imported module") || error.message.startsWith("Importing a module script failed");
}
function isPromise(value) {
  return Boolean(value && typeof value === "object" && typeof value.then === "function");
}
function findLast(array, predicate) {
  for (let i2 = array.length - 1; i2 >= 0; i2--) {
    const item = array[i2];
    if (predicate(item)) return item;
  }
}
function sanitizePathSegment(segment) {
  return segment.replace(/[\x00-\x1f\x7f]/g, "");
}
function decodeSegment(segment) {
  let decoded;
  try {
    decoded = decodeURI(segment);
  } catch {
    decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
      try {
        return decodeURI(match);
      } catch {
        return match;
      }
    });
  }
  return sanitizePathSegment(decoded);
}
var DEFAULT_PROTOCOL_ALLOWLIST = [
  "http:",
  "https:",
  "mailto:",
  "tel:"
];
function isDangerousProtocol(url, allowlist) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return !allowlist.has(parsed.protocol);
  } catch {
    return false;
  }
}
var HTML_ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var HTML_ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(str) {
  return str.replace(HTML_ESCAPE_REGEX, (match) => HTML_ESCAPE_LOOKUP[match]);
}
function decodePath(path) {
  if (!path) return {
    path,
    handledProtocolRelativeURL: false
  };
  if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
    path,
    handledProtocolRelativeURL: false
  };
  const re2 = /%25|%5C/gi;
  let cursor = 0;
  let result = "";
  let match;
  while (null !== (match = re2.exec(path))) {
    result += decodeSegment(path.slice(cursor, match.index)) + match[0];
    cursor = re2.lastIndex;
  }
  result = result + decodeSegment(cursor ? path.slice(cursor) : path);
  let handledProtocolRelativeURL = false;
  if (result.startsWith("//")) {
    handledProtocolRelativeURL = true;
    result = "/" + result.replace(/^\/+/, "");
  }
  return {
    path: result,
    handledProtocolRelativeURL
  };
}
function encodePathLikeUrl(path) {
  if (!/\s|[^\u0000-\u007F]/.test(path)) return path;
  return path.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent);
}
function arraysEqual(a, b2) {
  if (a === b2) return true;
  if (a.length !== b2.length) return false;
  for (let i2 = 0; i2 < a.length; i2++) if (a[i2] !== b2[i2]) return false;
  return true;
}

// node_modules/@tanstack/router-core/dist/esm/lru-cache.js
function createLRUCache(max) {
  const cache = /* @__PURE__ */ new Map();
  let oldest;
  let newest;
  const touch = (entry) => {
    if (!entry.next) return;
    if (!entry.prev) {
      entry.next.prev = void 0;
      oldest = entry.next;
      entry.next = void 0;
      if (newest) {
        entry.prev = newest;
        newest.next = entry;
      }
    } else {
      entry.prev.next = entry.next;
      entry.next.prev = entry.prev;
      entry.next = void 0;
      if (newest) {
        newest.next = entry;
        entry.prev = newest;
      }
    }
    newest = entry;
  };
  return {
    get(key) {
      const entry = cache.get(key);
      if (!entry) return void 0;
      touch(entry);
      return entry.value;
    },
    set(key, value) {
      if (cache.size >= max && oldest) {
        const toDelete = oldest;
        cache.delete(toDelete.key);
        if (toDelete.next) {
          oldest = toDelete.next;
          toDelete.next.prev = void 0;
        }
        if (toDelete === newest) newest = void 0;
      }
      const existing = cache.get(key);
      if (existing) {
        existing.value = value;
        touch(existing);
      } else {
        const entry = {
          key,
          value,
          prev: newest
        };
        if (newest) newest.next = entry;
        newest = entry;
        if (!oldest) oldest = entry;
        cache.set(key, entry);
      }
    },
    clear() {
      cache.clear();
      oldest = void 0;
      newest = void 0;
    }
  };
}

// node_modules/@tanstack/router-core/dist/esm/new-process-route-tree.js
var SEGMENT_TYPE_INDEX = 4;
var SEGMENT_TYPE_PATHLESS = 5;
function getOpenAndCloseBraces(part) {
  const openBrace = part.indexOf("{");
  if (openBrace === -1) return null;
  const closeBrace = part.indexOf("}", openBrace);
  if (closeBrace === -1) return null;
  if (openBrace + 1 >= part.length) return null;
  return [openBrace, closeBrace];
}
function parseSegment(path, start, output = new Uint16Array(6)) {
  const next = path.indexOf("/", start);
  const end = next === -1 ? path.length : next;
  const part = path.substring(start, end);
  if (!part || !part.includes("$")) {
    output[0] = 0;
    output[1] = start;
    output[2] = start;
    output[3] = end;
    output[4] = end;
    output[5] = end;
    return output;
  }
  if (part === "$") {
    const total = path.length;
    output[0] = 2;
    output[1] = start;
    output[2] = start;
    output[3] = total;
    output[4] = total;
    output[5] = total;
    return output;
  }
  if (part.charCodeAt(0) === 36) {
    output[0] = 1;
    output[1] = start;
    output[2] = start + 1;
    output[3] = end;
    output[4] = end;
    output[5] = end;
    return output;
  }
  const braces = getOpenAndCloseBraces(part);
  if (braces) {
    const [openBrace, closeBrace] = braces;
    const firstChar = part.charCodeAt(openBrace + 1);
    if (firstChar === 45) {
      if (openBrace + 2 < part.length && part.charCodeAt(openBrace + 2) === 36) {
        const paramStart = openBrace + 3;
        const paramEnd = closeBrace;
        if (paramStart < paramEnd) {
          output[0] = 3;
          output[1] = start + openBrace;
          output[2] = start + paramStart;
          output[3] = start + paramEnd;
          output[4] = start + closeBrace + 1;
          output[5] = end;
          return output;
        }
      }
    } else if (firstChar === 36) {
      const dollarPos = openBrace + 1;
      const afterDollar = openBrace + 2;
      if (afterDollar === closeBrace) {
        output[0] = 2;
        output[1] = start + openBrace;
        output[2] = start + dollarPos;
        output[3] = start + afterDollar;
        output[4] = start + closeBrace + 1;
        output[5] = path.length;
        return output;
      }
      output[0] = 1;
      output[1] = start + openBrace;
      output[2] = start + afterDollar;
      output[3] = start + closeBrace;
      output[4] = start + closeBrace + 1;
      output[5] = end;
      return output;
    }
  }
  output[0] = 0;
  output[1] = start;
  output[2] = start;
  output[3] = end;
  output[4] = end;
  output[5] = end;
  return output;
}
function parseSegments(defaultCaseSensitive, data, route, start, node, depth, onRoute) {
  onRoute?.(route);
  let cursor = start;
  {
    const path = route.fullPath ?? route.from;
    const length = path.length;
    const caseSensitive = route.options?.caseSensitive ?? defaultCaseSensitive;
    const parseParams = route.options?.params?.parse ?? route.options?.parseParams;
    while (cursor < length) {
      const segment = parseSegment(path, cursor, data);
      let nextNode;
      const start2 = cursor;
      const end = segment[5];
      cursor = end + 1;
      depth++;
      switch (segment[0]) {
        case 0: {
          const value = path.substring(segment[2], segment[3]);
          if (caseSensitive) {
            const existingNode = node.static?.get(value);
            if (existingNode) nextNode = existingNode;
            else {
              node.static ??= /* @__PURE__ */ new Map();
              const next = createStaticNode(route.fullPath ?? route.from);
              next.parent = node;
              next.depth = depth;
              nextNode = next;
              node.static.set(value, next);
            }
          } else {
            const name = value.toLowerCase();
            const existingNode = node.staticInsensitive?.get(name);
            if (existingNode) nextNode = existingNode;
            else {
              node.staticInsensitive ??= /* @__PURE__ */ new Map();
              const next = createStaticNode(route.fullPath ?? route.from);
              next.parent = node;
              next.depth = depth;
              nextNode = next;
              node.staticInsensitive.set(name, next);
            }
          }
          break;
        }
        case 1: {
          const prefix_raw = path.substring(start2, segment[1]);
          const suffix_raw = path.substring(segment[4], end);
          const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
          const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
          const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
          const existingNode = !parseParams && node.dynamic?.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
          if (existingNode) nextNode = existingNode;
          else {
            const next = createDynamicNode(1, route.fullPath ?? route.from, actuallyCaseSensitive, prefix, suffix);
            nextNode = next;
            next.depth = depth;
            next.parent = node;
            node.dynamic ??= [];
            node.dynamic.push(next);
          }
          break;
        }
        case 3: {
          const prefix_raw = path.substring(start2, segment[1]);
          const suffix_raw = path.substring(segment[4], end);
          const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
          const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
          const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
          const existingNode = !parseParams && node.optional?.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
          if (existingNode) nextNode = existingNode;
          else {
            const next = createDynamicNode(3, route.fullPath ?? route.from, actuallyCaseSensitive, prefix, suffix);
            nextNode = next;
            next.parent = node;
            next.depth = depth;
            node.optional ??= [];
            node.optional.push(next);
          }
          break;
        }
        case 2: {
          const prefix_raw = path.substring(start2, segment[1]);
          const suffix_raw = path.substring(segment[4], end);
          const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
          const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
          const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
          const next = createDynamicNode(2, route.fullPath ?? route.from, actuallyCaseSensitive, prefix, suffix);
          nextNode = next;
          next.parent = node;
          next.depth = depth;
          node.wildcard ??= [];
          node.wildcard.push(next);
        }
      }
      node = nextNode;
    }
    if (parseParams && route.children && !route.isRoot && route.id && route.id.charCodeAt(route.id.lastIndexOf("/") + 1) === 95) {
      const pathlessNode = createStaticNode(route.fullPath ?? route.from);
      pathlessNode.kind = SEGMENT_TYPE_PATHLESS;
      pathlessNode.parent = node;
      depth++;
      pathlessNode.depth = depth;
      node.pathless ??= [];
      node.pathless.push(pathlessNode);
      node = pathlessNode;
    }
    const isLeaf = (route.path || !route.children) && !route.isRoot;
    if (isLeaf && path.endsWith("/")) {
      const indexNode = createStaticNode(route.fullPath ?? route.from);
      indexNode.kind = SEGMENT_TYPE_INDEX;
      indexNode.parent = node;
      depth++;
      indexNode.depth = depth;
      node.index = indexNode;
      node = indexNode;
    }
    node.parse = parseParams ?? null;
    node.priority = route.options?.params?.priority ?? 0;
    if (isLeaf && !node.route) {
      node.route = route;
      node.fullPath = route.fullPath ?? route.from;
    }
  }
  if (route.children) for (const child of route.children) parseSegments(defaultCaseSensitive, data, child, cursor, node, depth, onRoute);
}
function sortDynamic(a, b2) {
  if (a.parse && !b2.parse) return -1;
  if (!a.parse && b2.parse) return 1;
  if (a.parse && b2.parse && (a.priority || b2.priority)) return b2.priority - a.priority;
  if (a.prefix && b2.prefix && a.prefix !== b2.prefix) {
    if (a.prefix.startsWith(b2.prefix)) return -1;
    if (b2.prefix.startsWith(a.prefix)) return 1;
  }
  if (a.suffix && b2.suffix && a.suffix !== b2.suffix) {
    if (a.suffix.endsWith(b2.suffix)) return -1;
    if (b2.suffix.endsWith(a.suffix)) return 1;
  }
  if (a.prefix && !b2.prefix) return -1;
  if (!a.prefix && b2.prefix) return 1;
  if (a.suffix && !b2.suffix) return -1;
  if (!a.suffix && b2.suffix) return 1;
  if (a.caseSensitive && !b2.caseSensitive) return -1;
  if (!a.caseSensitive && b2.caseSensitive) return 1;
  return 0;
}
function sortTreeNodes(node) {
  if (node.pathless) for (const child of node.pathless) sortTreeNodes(child);
  if (node.static) for (const child of node.static.values()) sortTreeNodes(child);
  if (node.staticInsensitive) for (const child of node.staticInsensitive.values()) sortTreeNodes(child);
  if (node.dynamic?.length) {
    node.dynamic.sort(sortDynamic);
    for (const child of node.dynamic) sortTreeNodes(child);
  }
  if (node.optional?.length) {
    node.optional.sort(sortDynamic);
    for (const child of node.optional) sortTreeNodes(child);
  }
  if (node.wildcard?.length) {
    node.wildcard.sort(sortDynamic);
    for (const child of node.wildcard) sortTreeNodes(child);
  }
}
function createStaticNode(fullPath) {
  return {
    kind: 0,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath,
    parent: null,
    parse: null,
    priority: 0
  };
}
function createDynamicNode(kind, fullPath, caseSensitive, prefix, suffix) {
  return {
    kind,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath,
    parent: null,
    parse: null,
    priority: 0,
    caseSensitive,
    prefix,
    suffix
  };
}
function processRouteMasks(routeList, processedTree) {
  const segmentTree = createStaticNode("/");
  const data = new Uint16Array(6);
  for (const route of routeList) parseSegments(false, data, route, 1, segmentTree, 0);
  sortTreeNodes(segmentTree);
  processedTree.masksTree = segmentTree;
  processedTree.flatCache = createLRUCache(1e3);
}
function findFlatMatch(path, processedTree) {
  path ||= "/";
  const cached = processedTree.flatCache.get(path);
  if (cached) return cached;
  const result = findMatch(path, processedTree.masksTree);
  processedTree.flatCache.set(path, result);
  return result;
}
function findSingleMatch(from, caseSensitive, fuzzy, path, processedTree) {
  from ||= "/";
  path ||= "/";
  const key = caseSensitive ? `case\0${from}` : from;
  let tree = processedTree.singleCache.get(key);
  if (!tree) {
    tree = createStaticNode("/");
    parseSegments(caseSensitive, new Uint16Array(6), { from }, 1, tree, 0);
    processedTree.singleCache.set(key, tree);
  }
  return findMatch(path, tree, fuzzy);
}
function findRouteMatch(path, processedTree, fuzzy = false) {
  const key = fuzzy ? path : `nofuzz\0${path}`;
  const cached = processedTree.matchCache.get(key);
  if (cached !== void 0) return cached;
  path ||= "/";
  let result;
  try {
    result = findMatch(path, processedTree.segmentTree, fuzzy);
  } catch (err) {
    if (err instanceof URIError) result = null;
    else throw err;
  }
  if (result) result.branch = buildRouteBranch(result.route);
  processedTree.matchCache.set(key, result);
  return result;
}
function trimPathRight(path) {
  return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function processRouteTree(routeTree, caseSensitive = false, initRoute) {
  const segmentTree = createStaticNode(routeTree.fullPath);
  const data = new Uint16Array(6);
  const routesById = {};
  const routesByPath = {};
  let index = 0;
  parseSegments(caseSensitive, data, routeTree, 1, segmentTree, 0, (route) => {
    initRoute?.(route, index);
    if (route.id in routesById) {
      if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Duplicate routes found with id: ${String(route.id)}`);
      invariant();
    }
    routesById[route.id] = route;
    if (index !== 0 && route.path) {
      const trimmedFullPath = trimPathRight(route.fullPath);
      if (!routesByPath[trimmedFullPath] || route.fullPath.endsWith("/")) routesByPath[trimmedFullPath] = route;
    }
    index++;
  });
  sortTreeNodes(segmentTree);
  return {
    processedTree: {
      segmentTree,
      singleCache: createLRUCache(1e3),
      matchCache: createLRUCache(1e3),
      flatCache: null,
      masksTree: null
    },
    routesById,
    routesByPath
  };
}
function findMatch(path, segmentTree, fuzzy = false) {
  const parts = path.split("/");
  const leaf = getNodeMatch(path, parts, segmentTree, fuzzy);
  if (!leaf) return null;
  const [rawParams] = extractParams(path, parts, leaf);
  return {
    route: leaf.node.route,
    rawParams
  };
}
function extractParams(path, parts, leaf) {
  const list = buildBranch(leaf.node);
  let nodeParts = null;
  const rawParams = /* @__PURE__ */ Object.create(null);
  let partIndex = leaf.extract?.part ?? 0;
  let nodeIndex = leaf.extract?.node ?? 0;
  let pathIndex = leaf.extract?.path ?? 0;
  let segmentCount = leaf.extract?.segment ?? 0;
  for (; nodeIndex < list.length; partIndex++, nodeIndex++, pathIndex++, segmentCount++) {
    const node = list[nodeIndex];
    if (node.kind === SEGMENT_TYPE_INDEX) break;
    if (node.kind === SEGMENT_TYPE_PATHLESS) {
      segmentCount--;
      partIndex--;
      pathIndex--;
      continue;
    }
    const part = parts[partIndex];
    const currentPathIndex = pathIndex;
    if (part) pathIndex += part.length;
    if (node.kind === 1) {
      nodeParts ??= leaf.node.fullPath.split("/");
      const nodePart = nodeParts[segmentCount];
      const preLength = node.prefix?.length ?? 0;
      if (nodePart.charCodeAt(preLength) === 123) {
        const sufLength = node.suffix?.length ?? 0;
        const name = nodePart.substring(preLength + 2, nodePart.length - sufLength - 1);
        const value = part.substring(preLength, part.length - sufLength);
        rawParams[name] = decodeURIComponent(value);
      } else {
        const name = nodePart.substring(1);
        rawParams[name] = decodeURIComponent(part);
      }
    } else if (node.kind === 3) {
      if (leaf.skipped & 1 << nodeIndex) {
        partIndex--;
        pathIndex = currentPathIndex - 1;
        continue;
      }
      nodeParts ??= leaf.node.fullPath.split("/");
      const nodePart = nodeParts[segmentCount];
      const preLength = node.prefix?.length ?? 0;
      const sufLength = node.suffix?.length ?? 0;
      const name = nodePart.substring(preLength + 3, nodePart.length - sufLength - 1);
      const value = node.suffix || node.prefix ? part.substring(preLength, part.length - sufLength) : part;
      if (value) rawParams[name] = decodeURIComponent(value);
    } else if (node.kind === 2) {
      const n2 = node;
      const value = path.substring(currentPathIndex + (n2.prefix?.length ?? 0), path.length - (n2.suffix?.length ?? 0));
      const splat = decodeURIComponent(value);
      rawParams["*"] = splat;
      rawParams._splat = splat;
      break;
    }
  }
  if (leaf.rawParams) Object.assign(rawParams, leaf.rawParams);
  return [rawParams, {
    part: partIndex,
    node: nodeIndex,
    path: pathIndex,
    segment: segmentCount
  }];
}
function buildRouteBranch(route) {
  const list = [route];
  while (route.parentRoute) {
    route = route.parentRoute;
    list.push(route);
  }
  list.reverse();
  return list;
}
function buildBranch(node) {
  const list = Array(node.depth + 1);
  do {
    list[node.depth] = node;
    node = node.parent;
  } while (node);
  return list;
}
function getNodeMatch(path, parts, segmentTree, fuzzy) {
  if (path === "/" && segmentTree.index) return {
    node: segmentTree.index,
    skipped: 0
  };
  const trailingSlash = !last(parts);
  const pathIsIndex = trailingSlash && path !== "/";
  const partsLength = parts.length - (trailingSlash ? 1 : 0);
  const stack = [{
    node: segmentTree,
    index: 1,
    skipped: 0,
    depth: 1,
    statics: 0,
    dynamics: 0,
    optionals: 0
  }];
  let bestFuzzy = null;
  let bestMatch = null;
  while (stack.length) {
    const frame = stack.pop();
    const { node, index, skipped, depth, statics, dynamics, optionals } = frame;
    let { extract, rawParams } = frame;
    if (node.kind === 2 && node.route && !isFrameMoreSpecific(bestMatch, frame)) continue;
    if (node.parse) {
      if (!validateParseParams(path, parts, frame)) continue;
      rawParams = frame.rawParams;
      extract = frame.extract;
    }
    if (fuzzy && node.route && node.kind !== SEGMENT_TYPE_INDEX && isFrameMoreSpecific(bestFuzzy, frame)) bestFuzzy = frame;
    const isBeyondPath = index === partsLength;
    if (isBeyondPath) {
      if (node.route && (!pathIsIndex || node.kind === SEGMENT_TYPE_INDEX || node.kind === 2) && isFrameMoreSpecific(bestMatch, frame)) bestMatch = frame;
      if (!node.optional && !node.wildcard && !node.index && !node.pathless) continue;
    }
    const part = isBeyondPath ? void 0 : parts[index];
    let lowerPart;
    if (isBeyondPath && node.index) {
      const indexFrame = {
        node: node.index,
        index,
        skipped,
        depth: depth + 1,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      };
      let indexValid = true;
      if (node.index.parse) {
        if (!validateParseParams(path, parts, indexFrame)) indexValid = false;
      }
      if (indexValid) {
        if (!dynamics && !optionals && !skipped && isPerfectStaticMatch(statics, partsLength)) return indexFrame;
        if (isFrameMoreSpecific(bestMatch, indexFrame)) bestMatch = indexFrame;
      }
    }
    if (node.wildcard) for (let i2 = node.wildcard.length - 1; i2 >= 0; i2--) {
      const segment = node.wildcard[i2];
      const { prefix, suffix } = segment;
      if (prefix) {
        if (isBeyondPath) continue;
        if (!(segment.caseSensitive ? part : lowerPart ??= part.toLowerCase()).startsWith(prefix)) continue;
      }
      if (suffix) {
        if (isBeyondPath) continue;
        const end = parts.slice(index).join("/").slice(-suffix.length);
        if ((segment.caseSensitive ? end : end.toLowerCase()) !== suffix) continue;
      }
      stack.push({
        node: segment,
        index: partsLength,
        skipped,
        depth: depth + 1,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (node.optional) {
      const nextSkipped = skipped | 1 << depth;
      const nextDepth = depth + 1;
      for (let i2 = node.optional.length - 1; i2 >= 0; i2--) {
        const segment = node.optional[i2];
        stack.push({
          node: segment,
          index,
          skipped: nextSkipped,
          depth: nextDepth,
          statics,
          dynamics,
          optionals,
          extract,
          rawParams
        });
      }
      if (!isBeyondPath) for (let i2 = node.optional.length - 1; i2 >= 0; i2--) {
        const segment = node.optional[i2];
        const { prefix, suffix } = segment;
        if (prefix || suffix) {
          const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
          if (prefix && !casePart.startsWith(prefix)) continue;
          if (suffix && !casePart.endsWith(suffix)) continue;
        }
        stack.push({
          node: segment,
          index: index + 1,
          skipped,
          depth: nextDepth,
          statics,
          dynamics,
          optionals: optionals + segmentScore(partsLength, index),
          extract,
          rawParams
        });
      }
    }
    if (!isBeyondPath && node.dynamic && part) for (let i2 = node.dynamic.length - 1; i2 >= 0; i2--) {
      const segment = node.dynamic[i2];
      const { prefix, suffix } = segment;
      if (prefix || suffix) {
        const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
        if (prefix && !casePart.startsWith(prefix)) continue;
        if (suffix && !casePart.endsWith(suffix)) continue;
      }
      stack.push({
        node: segment,
        index: index + 1,
        skipped,
        depth: depth + 1,
        statics,
        dynamics: dynamics + segmentScore(partsLength, index),
        optionals,
        extract,
        rawParams
      });
    }
    if (!isBeyondPath && node.staticInsensitive) {
      const match = node.staticInsensitive.get(lowerPart ??= part.toLowerCase());
      if (match) stack.push({
        node: match,
        index: index + 1,
        skipped,
        depth: depth + 1,
        statics: statics + segmentScore(partsLength, index),
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (!isBeyondPath && node.static) {
      const match = node.static.get(part);
      if (match) stack.push({
        node: match,
        index: index + 1,
        skipped,
        depth: depth + 1,
        statics: statics + segmentScore(partsLength, index),
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (node.pathless) {
      const nextDepth = depth + 1;
      for (let i2 = node.pathless.length - 1; i2 >= 0; i2--) {
        const segment = node.pathless[i2];
        stack.push({
          node: segment,
          index,
          skipped,
          depth: nextDepth,
          statics,
          dynamics,
          optionals,
          extract,
          rawParams
        });
      }
    }
  }
  if (bestMatch) return bestMatch;
  if (fuzzy && bestFuzzy) {
    let sliceIndex = bestFuzzy.index;
    for (let i2 = 0; i2 < bestFuzzy.index; i2++) sliceIndex += parts[i2].length;
    const splat = sliceIndex === path.length ? "/" : path.slice(sliceIndex);
    bestFuzzy.rawParams ??= /* @__PURE__ */ Object.create(null);
    bestFuzzy.rawParams["**"] = decodeURIComponent(splat);
    return bestFuzzy;
  }
  return null;
}
function segmentScore(partsLength, index) {
  return 2 ** (partsLength - index - 1);
}
function isPerfectStaticMatch(statics, partsLength) {
  return statics === 2 ** (partsLength - 1) - 1;
}
function validateParseParams(path, parts, frame) {
  let rawParams;
  let state;
  try {
    [rawParams, state] = extractParams(path, parts, frame);
  } catch {
    return null;
  }
  frame.rawParams = rawParams;
  frame.extract = state;
  if (!frame.node.parse) return true;
  try {
    if (frame.node.parse(rawParams) === false) return null;
  } catch {
  }
  return true;
}
function isFrameMoreSpecific(prev, next) {
  if (!prev) return true;
  return next.statics > prev.statics || next.statics === prev.statics && (next.dynamics > prev.dynamics || next.dynamics === prev.dynamics && (next.optionals > prev.optionals || next.optionals === prev.optionals && ((next.node.kind === SEGMENT_TYPE_INDEX) > (prev.node.kind === SEGMENT_TYPE_INDEX) || next.node.kind === SEGMENT_TYPE_INDEX === (prev.node.kind === SEGMENT_TYPE_INDEX) && next.depth > prev.depth)));
}

// node_modules/@tanstack/router-core/dist/esm/path.js
function joinPaths(paths) {
  return cleanPath(paths.filter((val) => {
    return val !== void 0;
  }).join("/"));
}
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight2(path) {
  const len = path.length;
  return len > 1 && path[len - 1] === "/" ? path.replace(/\/{1,}$/, "") : path;
}
function trimPath(path) {
  return trimPathRight2(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
  if (value?.endsWith("/") && value !== "/" && value !== `${basepath}/`) return value.slice(0, -1);
  return value;
}
function exactPathTest(pathName1, pathName2, basepath) {
  return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
function resolvePath({ base, to: to2, trailingSlash = "never", cache }) {
  const isAbsolute = to2.startsWith("/");
  const isBase = !isAbsolute && to2 === ".";
  let key;
  if (cache) {
    key = isAbsolute ? to2 : isBase ? base : base + "\0" + to2;
    const cached = cache.get(key);
    if (cached) return cached;
  }
  let baseSegments;
  if (isBase) baseSegments = base.split("/");
  else if (isAbsolute) baseSegments = to2.split("/");
  else {
    baseSegments = base.split("/");
    while (baseSegments.length > 1 && last(baseSegments) === "") baseSegments.pop();
    const toSegments = to2.split("/");
    for (let index = 0, length = toSegments.length; index < length; index++) {
      const value = toSegments[index];
      if (value === "") {
        if (!index) baseSegments = [value];
        else if (index === length - 1) baseSegments.push(value);
      } else if (value === "..") baseSegments.pop();
      else if (value === ".") {
      } else baseSegments.push(value);
    }
  }
  if (baseSegments.length > 1) {
    if (last(baseSegments) === "") {
      if (trailingSlash === "never") baseSegments.pop();
    } else if (trailingSlash === "always") baseSegments.push("");
  }
  const result = cleanPath(baseSegments.join("/")) || "/";
  if (key && cache) cache.set(key, result);
  return result;
}
function compileDecodeCharMap(pathParamsAllowedCharacters) {
  const charMap = new Map(pathParamsAllowedCharacters.map((char) => [encodeURIComponent(char), char]));
  const pattern = Array.from(charMap.keys()).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(pattern, "g");
  return (encoded) => encoded.replace(regex, (match) => charMap.get(match) ?? match);
}
function encodeParam(key, params, decoder) {
  const value = params[key];
  if (typeof value !== "string") return value;
  if (key === "_splat") {
    if (/^[a-zA-Z0-9\-._~!/]*$/.test(value)) return value;
    return value.split("/").map((segment) => encodePathParam(segment, decoder)).join("/");
  } else return encodePathParam(value, decoder);
}
function interpolatePath({ path, params, decoder, ...rest }) {
  let isMissingParams = false;
  const usedParams = /* @__PURE__ */ Object.create(null);
  if (!path || path === "/") return {
    interpolatedPath: "/",
    usedParams,
    isMissingParams
  };
  if (!path.includes("$")) return {
    interpolatedPath: path,
    usedParams,
    isMissingParams
  };
  if (isServer ?? rest.server) {
    if (path.indexOf("{") === -1) {
      const length2 = path.length;
      let cursor2 = 0;
      let joined2 = "";
      while (cursor2 < length2) {
        while (cursor2 < length2 && path.charCodeAt(cursor2) === 47) cursor2++;
        if (cursor2 >= length2) break;
        const start = cursor2;
        let end = path.indexOf("/", cursor2);
        if (end === -1) end = length2;
        cursor2 = end;
        const part = path.substring(start, end);
        if (!part) continue;
        if (part.charCodeAt(0) === 36) if (part.length === 1) {
          const splat = params._splat;
          usedParams._splat = splat;
          usedParams["*"] = splat;
          if (!splat) {
            isMissingParams = true;
            continue;
          }
          const value = encodeParam("_splat", params, decoder);
          joined2 += "/" + value;
        } else {
          const key = part.substring(1);
          if (!isMissingParams && !(key in params)) isMissingParams = true;
          usedParams[key] = params[key];
          const value = encodeParam(key, params, decoder) ?? "undefined";
          joined2 += "/" + value;
        }
        else joined2 += "/" + part;
      }
      if (path.endsWith("/")) joined2 += "/";
      return {
        usedParams,
        interpolatedPath: joined2 || "/",
        isMissingParams
      };
    }
  }
  const length = path.length;
  let cursor = 0;
  let segment;
  let joined = "";
  while (cursor < length) {
    const start = cursor;
    segment = parseSegment(path, start, segment);
    const end = segment[5];
    cursor = end + 1;
    if (start === end) continue;
    const kind = segment[0];
    if (kind === 0) {
      joined += "/" + path.substring(start, end);
      continue;
    }
    if (kind === 2) {
      const splat = params._splat;
      usedParams._splat = splat;
      usedParams["*"] = splat;
      const prefix = path.substring(start, segment[1]);
      const suffix = path.substring(segment[4], end);
      if (!splat) {
        isMissingParams = true;
        if (prefix || suffix) joined += "/" + prefix + suffix;
        continue;
      }
      const value = encodeParam("_splat", params, decoder);
      joined += "/" + prefix + value + suffix;
      continue;
    }
    if (kind === 1) {
      const key = path.substring(segment[2], segment[3]);
      if (!isMissingParams && !(key in params)) isMissingParams = true;
      usedParams[key] = params[key];
      const prefix = path.substring(start, segment[1]);
      const suffix = path.substring(segment[4], end);
      const value = encodeParam(key, params, decoder) ?? "undefined";
      joined += "/" + prefix + value + suffix;
      continue;
    }
    if (kind === 3) {
      const key = path.substring(segment[2], segment[3]);
      const valueRaw = params[key];
      if (valueRaw == null) continue;
      usedParams[key] = valueRaw;
      const prefix = path.substring(start, segment[1]);
      const suffix = path.substring(segment[4], end);
      const value = encodeParam(key, params, decoder) ?? "";
      joined += "/" + prefix + value + suffix;
      continue;
    }
  }
  if (path.endsWith("/")) joined += "/";
  return {
    usedParams,
    interpolatedPath: joined || "/",
    isMissingParams
  };
}
function encodePathParam(value, decoder) {
  const encoded = encodeURIComponent(value);
  return decoder?.(encoded) ?? encoded;
}

// node_modules/@tanstack/router-core/dist/esm/rewrite.js
function composeRewrites(rewrites) {
  return {
    input: ({ url }) => {
      for (const rewrite of rewrites) url = executeRewriteInput(rewrite, url);
      return url;
    },
    output: ({ url }) => {
      for (let i2 = rewrites.length - 1; i2 >= 0; i2--) url = executeRewriteOutput(rewrites[i2], url);
      return url;
    }
  };
}
function rewriteBasepath(opts) {
  const trimmedBasepath = trimPath(opts.basepath);
  const normalizedBasepath = `/${trimmedBasepath}`;
  const checkBasepath = opts.caseSensitive ? normalizedBasepath : normalizedBasepath.toLowerCase();
  const checkBasepathWithSlash = `${checkBasepath}/`;
  return {
    input: ({ url }) => {
      const pathname = opts.caseSensitive ? url.pathname : url.pathname.toLowerCase();
      if (pathname === checkBasepath) url.pathname = "/";
      else if (pathname.startsWith(checkBasepathWithSlash)) url.pathname = url.pathname.slice(normalizedBasepath.length);
      return url;
    },
    output: ({ url }) => {
      url.pathname = joinPaths([
        "/",
        trimmedBasepath,
        url.pathname
      ]);
      return url;
    }
  };
}
function executeRewriteInput(rewrite, url) {
  const res = rewrite?.input?.({ url });
  if (res) {
    if (typeof res === "string") return new URL(res);
    else if (res instanceof URL) return res;
  }
  return url;
}
function executeRewriteOutput(rewrite, url) {
  const res = rewrite?.output?.({ url });
  if (res) {
    if (typeof res === "string") return new URL(res);
    else if (res instanceof URL) return res;
  }
  return url;
}

// node_modules/@tanstack/history/dist/esm/index.js
var stateIndexKey = "__TSR_index";
var popStateEvent = "popstate";
var beforeUnloadEvent = "beforeunload";
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({
      location,
      action
    }));
  };
  const handleIndexChange = (action) => {
    if (opts.notifyOnIndexChange ?? true) notify(action);
    else location = opts.getLocation();
  };
  const tryNavigation = async ({ task, navigateOpts, ...actionInfo }) => {
    if (navigateOpts?.ignoreBlocker ?? false) {
      task();
      return;
    }
    const blockers = opts.getBlockers?.() ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) for (const blocker of blockers) {
      const nextLocation = parseHref(actionInfo.path, actionInfo.state);
      if (await blocker.blockerFn({
        currentLocation: location,
        nextLocation,
        action: actionInfo.type
      })) {
        opts.onBlocked?.();
        return;
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex + 1, state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex, state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index);
          handleIndexChange({
            type: "GO",
            index
          });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back(navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward(navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    canGoBack: () => location.state[stateIndexKey] !== 0,
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      if (!opts.setBlockers) return () => {
      };
      const blockers = opts.getBlockers?.() ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        const blockers2 = opts.getBlockers?.() ?? [];
        opts.setBlockers?.(blockers2.filter((b2) => b2 !== blocker));
      };
    },
    flush: () => opts.flush?.(),
    destroy: () => opts.destroy?.(),
    notify
  };
}
function assignKeyAndIndex(index, state) {
  if (!state) state = {};
  const key = createRandomKey();
  return {
    ...state,
    key,
    __TSR_key: key,
    [stateIndexKey]: index
  };
}
function createBrowserHistory(opts) {
  const win = opts?.window ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  const createHref = opts?.createHref ?? ((path) => path);
  const parseLocation = opts?.parseLocation ?? (() => parseHref(`${win.location.pathname}${win.location.search}${win.location.hash}`, win.history.state));
  if (!win.history.state?.__TSR_key && !win.history.state?.key) {
    const addedKey = createRandomKey();
    win.history.replaceState({
      [stateIndexKey]: 0,
      key: addedKey,
      __TSR_key: addedKey
    }, "");
  }
  let currentLocation = parseLocation();
  let rollbackLocation;
  let nextPopIsGo = false;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  let ignoreNextBeforeUnload = false;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush2 = () => {
    if (!next) return;
    history2._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(next.state, "", next.href);
    history2._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) rollbackLocation = currentLocation;
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: next?.isPush || type === "push"
    };
    if (!scheduled) scheduled = Promise.resolve().then(() => flush2());
  };
  const onPushPop = (type) => {
    currentLocation = parseLocation();
    history2.notify({ type });
  };
  const onPushPopEvent = async () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    const nextLocation = parseLocation();
    const delta = nextLocation.state[stateIndexKey] - currentLocation.state[stateIndexKey];
    const isForward = delta === 1;
    const isBack = delta === -1;
    const isGo = !isForward && !isBack || nextPopIsGo;
    nextPopIsGo = false;
    const action = isGo ? "GO" : isBack ? "BACK" : "FORWARD";
    const notify = isGo ? {
      type: "GO",
      index: delta
    } : { type: isBack ? "BACK" : "FORWARD" };
    if (skipBlockerNextPop) skipBlockerNextPop = false;
    else {
      const blockers2 = _getBlockers();
      if (typeof document !== "undefined" && blockers2.length) {
        for (const blocker of blockers2) if (await blocker.blockerFn({
          currentLocation,
          nextLocation,
          action
        })) {
          ignoreNextPop = true;
          win.history.go(1);
          history2.notify(notify);
          return;
        }
      }
    }
    currentLocation = parseLocation();
    history2.notify(notify);
  };
  const onBeforeUnload = (e) => {
    if (ignoreNextBeforeUnload) {
      ignoreNextBeforeUnload = false;
      return;
    }
    let shouldBlock = false;
    const blockers2 = _getBlockers();
    if (typeof document !== "undefined" && blockers2.length) for (const blocker of blockers2) {
      const shouldHaveBeforeUnload = blocker.enableBeforeUnload ?? true;
      if (shouldHaveBeforeUnload === true) {
        shouldBlock = true;
        break;
      }
      if (typeof shouldHaveBeforeUnload === "function" && shouldHaveBeforeUnload() === true) {
        shouldBlock = true;
        break;
      }
    }
    if (shouldBlock) {
      e.preventDefault();
      return e.returnValue = "";
    }
  };
  const history2 = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      return win.history.back();
    },
    forward: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      win.history.forward();
    },
    go: (n2) => {
      nextPopIsGo = true;
      win.history.go(n2);
    },
    createHref: (href) => createHref(href),
    flush: flush2,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
      win.removeEventListener(popStateEvent, onPushPopEvent);
    },
    onBlocked: () => {
      if (rollbackLocation && currentLocation !== rollbackLocation) currentLocation = rollbackLocation;
    },
    getBlockers: _getBlockers,
    setBlockers: _setBlockers,
    notifyOnIndexChange: false
  });
  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history2._ignoreSubscribers) onPushPop("PUSH");
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history2._ignoreSubscribers) onPushPop("REPLACE");
    return res;
  };
  return history2;
}
function createMemoryHistory(opts = { initialEntries: ["/"] }) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
  const states = entries.map((_entry, index2) => assignKeyAndIndex(index2, void 0));
  const getLocation = () => parseHref(entries[index], states[index]);
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  return createHistory({
    getLocation,
    getLength: () => entries.length,
    pushState: (path, state) => {
      if (index < entries.length - 1) {
        entries.splice(index + 1);
        states.splice(index + 1);
      }
      states.push(state);
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      states[index] = state;
      entries[index] = path;
    },
    back: () => {
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n2) => {
      index = Math.min(Math.max(index + n2, 0), entries.length - 1);
    },
    createHref: (path) => path,
    getBlockers: _getBlockers,
    setBlockers: _setBlockers
  });
}
function sanitizePath(path) {
  let sanitized = path.replace(/[\x00-\x1f\x7f]/g, "");
  if (sanitized.startsWith("//")) sanitized = "/" + sanitized.replace(/^\/+/, "");
  return sanitized;
}
function parseHref(href, state) {
  const sanitizedHref = sanitizePath(href);
  const hashIndex = sanitizedHref.indexOf("#");
  const searchIndex = sanitizedHref.indexOf("?");
  const addedKey = createRandomKey();
  return {
    href: sanitizedHref,
    pathname: sanitizedHref.substring(0, hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : sanitizedHref.length),
    hash: hashIndex > -1 ? sanitizedHref.substring(hashIndex) : "",
    search: searchIndex > -1 ? sanitizedHref.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || {
      [stateIndexKey]: 0,
      key: addedKey,
      __TSR_key: addedKey
    }
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

// node_modules/@tanstack/router-core/dist/esm/manifest.js
function getAssetCrossOrigin(assetCrossOrigin, kind) {
  if (!assetCrossOrigin) return;
  if (typeof assetCrossOrigin === "string") return assetCrossOrigin;
  return assetCrossOrigin[kind];
}
function getManifestScriptFormat(manifest) {
  return manifest?.scriptFormat ?? "module";
}
function getScriptPreloadAttrs(manifest, link2, assetCrossOrigin) {
  const preloadLink = resolveManifestAssetLink(link2);
  const crossOrigin = getAssetCrossOrigin(assetCrossOrigin, "script") ?? preloadLink.crossOrigin;
  return {
    ...getManifestScriptFormat(manifest) === "iife" ? {
      rel: "preload",
      as: "script"
    } : { rel: "modulepreload" },
    href: preloadLink.href,
    ...crossOrigin ? { crossOrigin } : {}
  };
}
function resolveManifestAssetLink(link2) {
  if (typeof link2 === "string") return {
    href: link2,
    crossOrigin: void 0
  };
  return link2;
}
function appendUniqueUserTags(target, tags) {
  if (tags.length === 0) return;
  if (tags.length === 1) {
    target.push(tags[0]);
    return;
  }
  const seen = /* @__PURE__ */ new Set();
  for (const tag of tags) {
    const key = JSON.stringify(tag);
    if (seen.has(key)) continue;
    seen.add(key);
    target.push(tag);
  }
}
function getStylesheetHref(asset) {
  return resolveManifestCssLink(asset).href;
}
function resolveManifestCssLink(link2) {
  if (typeof link2 === "string") return {
    href: link2,
    crossOrigin: void 0
  };
  return link2;
}
function createInlineCssStyleAsset(css) {
  return {
    attrs: { suppressHydrationWarning: true },
    children: css
  };
}
function createInlineCssPlaceholderAsset() {
  return { attrs: { suppressHydrationWarning: true } };
}

// node_modules/seroval/dist/esm/production/index.mjs
var M = ((i2) => (i2[i2.AggregateError = 1] = "AggregateError", i2[i2.ArrowFunction = 2] = "ArrowFunction", i2[i2.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", i2[i2.ObjectAssign = 8] = "ObjectAssign", i2[i2.BigIntTypedArray = 16] = "BigIntTypedArray", i2[i2.RegExp = 32] = "RegExp", i2))(M || {});
var v = Symbol.asyncIterator;
var pr = Symbol.hasInstance;
var R = Symbol.isConcatSpreadable;
var C = Symbol.iterator;
var dr = Symbol.match;
var gr = Symbol.matchAll;
var yr = Symbol.replace;
var Nr = Symbol.search;
var br = Symbol.species;
var vr = Symbol.split;
var Cr = Symbol.toPrimitive;
var P = Symbol.toStringTag;
var Ar = Symbol.unscopables;
var tt = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" };
var ve = { [v]: 0, [pr]: 1, [R]: 2, [C]: 3, [dr]: 4, [gr]: 5, [yr]: 6, [Nr]: 7, [br]: 8, [vr]: 9, [Cr]: 10, [P]: 11, [Ar]: 12 };
var nt = { 0: v, 1: pr, 2: R, 3: C, 4: dr, 5: gr, 6: yr, 7: Nr, 8: br, 9: vr, 10: Cr, 11: P, 12: Ar };
var ot = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" };
var o = void 0;
var at = { 2: true, 3: false, 1: o, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN };
var Ce = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" };
var st = { 0: Error, 1: EvalError, 2: RangeError, 3: ReferenceError, 4: SyntaxError, 5: TypeError, 6: URIError };
function c(e, r, t, n2, a, s, i2, u2, l2, g2, S, d2) {
  return { t: e, i: r, s: t, c: n2, m: a, p: s, e: i2, a: u2, f: l2, b: g2, o: S, l: d2 };
}
function B(e) {
  return c(2, o, e, o, o, o, o, o, o, o, o, o);
}
var H = B(2);
var J = B(3);
var Ae = B(1);
var Ee = B(0);
var it = B(4);
var ut = B(5);
var lt = B(6);
var ct = B(7);
function mn(e) {
  switch (e) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return o;
  }
}
function y(e) {
  let r = "", t = 0, n2;
  for (let a = 0, s = e.length; a < s; a++) n2 = mn(e[a]), n2 && (r += e.slice(t, a) + n2, t = a + 1);
  return t === 0 ? r = e : r += e.slice(t), r;
}
function pn(e) {
  switch (e) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return e;
  }
}
function D(e) {
  return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, pn);
}
var L = "__SEROVAL_REFS__";
var le = "$R";
var Ie = `self.${le}`;
function dn(e) {
  return e == null ? `${Ie}=${Ie}||[]` : `(${Ie}=${Ie}||{})["${y(e)}"]=[]`;
}
var Er = /* @__PURE__ */ new Map();
var U = /* @__PURE__ */ new Map();
function Ir(e) {
  return Er.has(e);
}
function yn(e) {
  return U.has(e);
}
function ft(e) {
  if (Ir(e)) return Er.get(e);
  throw new Re(e);
}
function St(e) {
  if (yn(e)) return U.get(e);
  throw new Pe(e);
}
typeof globalThis != "undefined" ? Object.defineProperty(globalThis, L, { value: U, configurable: true, writable: false, enumerable: false }) : typeof window != "undefined" ? Object.defineProperty(window, L, { value: U, configurable: true, writable: false, enumerable: false }) : typeof self != "undefined" ? Object.defineProperty(self, L, { value: U, configurable: true, writable: false, enumerable: false }) : typeof global != "undefined" && Object.defineProperty(global, L, { value: U, configurable: true, writable: false, enumerable: false });
function xe(e) {
  return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function Nn(e) {
  let r = Ce[xe(e)];
  return e.name !== r ? { name: e.name } : e.constructor.name !== r ? { name: e.constructor.name } : {};
}
function Z(e, r) {
  let t = Nn(e), n2 = Object.getOwnPropertyNames(e);
  for (let a = 0, s = n2.length, i2; a < s; a++) i2 = n2[a], i2 !== "name" && i2 !== "message" && (i2 === "stack" ? r & 4 && (t = t || {}, t[i2] = e[i2]) : (t = t || {}, t[i2] = e[i2]));
  return t;
}
function Te(e) {
  return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function Oe(e) {
  switch (e) {
    case Number.POSITIVE_INFINITY:
      return ut;
    case Number.NEGATIVE_INFINITY:
      return lt;
  }
  return e !== e ? ct : Object.is(e, -0) ? it : c(0, o, e, o, o, o, o, o, o, o, o, o);
}
function $(e) {
  return c(1, o, y(e), o, o, o, o, o, o, o, o, o);
}
function we(e) {
  return c(3, o, "" + e, o, o, o, o, o, o, o, o, o);
}
function pt(e) {
  return c(4, e, o, o, o, o, o, o, o, o, o, o);
}
function he(e, r) {
  let t = r.valueOf();
  return c(5, e, t !== t ? "" : r.toISOString(), o, o, o, o, o, o, o, o, o);
}
function ze(e, r) {
  return c(6, e, o, y(r.source), r.flags, o, o, o, o, o, o, o);
}
function dt(e, r) {
  return c(17, e, ve[r], o, o, o, o, o, o, o, o, o);
}
function gt(e, r) {
  return c(18, e, y(ft(r)), o, o, o, o, o, o, o, o, o);
}
function ce(e, r, t) {
  return c(25, e, t, y(r), o, o, o, o, o, o, o, o);
}
function _e(e, r, t) {
  return c(9, e, o, o, o, o, o, t, o, o, Te(r), o);
}
function ke(e, r) {
  return c(21, e, o, o, o, o, o, o, r, o, o, o);
}
function De(e, r, t) {
  return c(15, e, o, r.constructor.name, o, o, o, o, t, r.byteOffset, o, r.length);
}
function Fe(e, r, t) {
  return c(16, e, o, r.constructor.name, o, o, o, o, t, r.byteOffset, o, r.byteLength);
}
function Be(e, r, t) {
  return c(20, e, o, o, o, o, o, o, t, r.byteOffset, o, r.byteLength);
}
function Ve(e, r, t) {
  return c(13, e, xe(r), o, y(r.message), t, o, o, o, o, o, o);
}
function Me(e, r, t) {
  return c(14, e, xe(r), o, y(r.message), t, o, o, o, o, o, o);
}
function Le(e, r) {
  return c(7, e, o, o, o, o, o, r, o, o, o, o);
}
function Ue(e, r) {
  return c(28, o, o, o, o, o, o, [e, r], o, o, o, o);
}
function je(e, r) {
  return c(30, o, o, o, o, o, o, [e, r], o, o, o, o);
}
function Ye(e, r, t) {
  return c(31, e, o, o, o, o, o, t, r, o, o, o);
}
function qe(e, r) {
  return c(32, e, o, o, o, o, o, o, r, o, o, o);
}
function We(e, r) {
  return c(33, e, o, o, o, o, o, o, r, o, o, o);
}
function Ge(e, r) {
  return c(34, e, o, o, o, o, o, o, r, o, o, o);
}
function Ke(e, r, t, n2) {
  return c(35, e, t, o, o, o, o, r, o, o, o, n2);
}
var { toString: bs } = Object.prototype;
var bn = { parsing: 1, serialization: 2, deserialization: 3 };
function vn(e) {
  return `Seroval Error (step: ${bn[e]})`;
}
var Cn = (e, r) => vn(e);
var fe = class extends Error {
  constructor(t, n2) {
    super(Cn(t, n2));
    this.cause = n2;
  }
};
var z = class extends fe {
  constructor(r) {
    super("parsing", r);
  }
};
var He = class extends fe {
  constructor(r) {
    super("deserialization", r);
  }
};
function _(e) {
  return `Seroval Error (specific: ${e})`;
}
var x = class extends Error {
  constructor(t) {
    super(_(1));
    this.value = t;
  }
};
var h = class extends Error {
  constructor(r) {
    super(_(2));
  }
};
var X = class extends Error {
  constructor(r) {
    super(_(3));
  }
};
var V = class extends Error {
  constructor(r) {
    super(_(4));
  }
};
var Re = class extends Error {
  constructor(t) {
    super(_(5));
    this.value = t;
  }
};
var Pe = class extends Error {
  constructor(r) {
    super(_(6));
  }
};
var Je = class extends Error {
  constructor(r) {
    super(_(7));
  }
};
var O = class extends Error {
  constructor(r) {
    super(_(8));
  }
};
var Q = class extends Error {
  constructor(r) {
    super(_(9));
  }
};
var j = class {
  constructor(r, t) {
    this.value = r;
    this.replacement = t;
  }
};
var ee = () => {
  let e = { p: 0, s: 0, f: 0 };
  return e.p = new Promise((r, t) => {
    e.s = r, e.f = t;
  }), e;
};
var An = (e, r) => {
  e.s(r), e.p.s = 1, e.p.v = r;
};
var En = (e, r) => {
  e.f(r), e.p.s = 2, e.p.v = r;
};
var Nt = ee.toString();
var bt = An.toString();
var vt = En.toString();
var Pr = () => {
  let e = [], r = [], t = true, n2 = false, a = 0, s = (l2, g2, S) => {
    for (S = 0; S < a; S++) r[S] && r[S][g2](l2);
  }, i2 = (l2, g2, S, d2) => {
    for (g2 = 0, S = e.length; g2 < S; g2++) d2 = e[g2], !t && g2 === S - 1 ? l2[n2 ? "return" : "throw"](d2) : l2.next(d2);
  }, u2 = (l2, g2) => (t && (g2 = a++, r[g2] = l2), i2(l2), () => {
    t && (r[g2] = r[a], r[a--] = void 0);
  });
  return { __SEROVAL_STREAM__: true, on: (l2) => u2(l2), next: (l2) => {
    t && (e.push(l2), s(l2, "next"));
  }, throw: (l2) => {
    t && (e.push(l2), s(l2, "throw"), t = false, n2 = false, r.length = 0);
  }, return: (l2) => {
    t && (e.push(l2), s(l2, "return"), t = false, n2 = true, r.length = 0);
  } };
};
var Ct = Pr.toString();
var xr = (e) => (r) => () => {
  let t = 0, n2 = { [e]: () => n2, next: () => {
    if (t > r.d) return { done: true, value: void 0 };
    let a = t++, s = r.v[a];
    if (a === r.t) throw s;
    return { done: a === r.d, value: s };
  } };
  return n2;
};
var At = xr.toString();
var Tr = (e, r) => (t) => () => {
  let n2 = 0, a = -1, s = false, i2 = [], u2 = [], l2 = (S = 0, d2 = u2.length) => {
    for (; S < d2; S++) u2[S].s({ done: true, value: void 0 });
  };
  t.on({ next: (S) => {
    let d2 = u2.shift();
    d2 && d2.s({ done: false, value: S }), i2.push(S);
  }, throw: (S) => {
    let d2 = u2.shift();
    d2 && d2.f(S), l2(), a = i2.length, s = true, i2.push(S);
  }, return: (S) => {
    let d2 = u2.shift();
    d2 && d2.s({ done: true, value: S }), l2(), a = i2.length, i2.push(S);
  } });
  let g2 = { [e]: () => g2, next: () => {
    if (a === -1) {
      let G2 = n2++;
      if (G2 >= i2.length) {
        let rt = r();
        return u2.push(rt), rt.p;
      }
      return { done: false, value: i2[G2] };
    }
    if (n2 > a) return { done: true, value: void 0 };
    let S = n2++, d2 = i2[S];
    if (S !== a) return { done: false, value: d2 };
    if (s) throw d2;
    return { done: true, value: d2 };
  } };
  return g2;
};
var Et = Tr.toString();
var Or = (e) => {
  let r = atob(e), t = r.length, n2 = new Uint8Array(t);
  for (let a = 0; a < t; a++) n2[a] = r.charCodeAt(a);
  return n2.buffer;
};
var It = Or.toString();
function Ze(e) {
  return "__SEROVAL_SEQUENCE__" in e;
}
function wr(e, r, t) {
  return { __SEROVAL_SEQUENCE__: true, v: e, t: r, d: t };
}
function $e(e) {
  let r = [], t = -1, n2 = -1, a = e[C]();
  for (; ; ) try {
    let s = a.next();
    if (r.push(s.value), s.done) {
      n2 = r.length - 1;
      break;
    }
  } catch (s) {
    t = r.length, r.push(s);
  }
  return wr(r, t, n2);
}
var In = xr(C);
function Rt(e) {
  return In(e);
}
var Pt = {};
var xt = {};
var Tt = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
var Ot = { 0: "[]", 1: Nt, 2: bt, 3: vt, 4: Ct, 5: It };
function Xe(e) {
  return "__SEROVAL_STREAM__" in e;
}
function re() {
  return Pr();
}
function Qe(e) {
  let r = re(), t = e[v]();
  async function n2() {
    try {
      let a = await t.next();
      a.done ? r.return(a.value) : (r.next(a.value), await n2());
    } catch (a) {
      r.throw(a);
    }
  }
  return n2().catch(() => {
  }), r;
}
var Rn = Tr(v, ee);
function wt(e) {
  return Rn(e);
}
async function hr(e) {
  try {
    return [1, await e];
  } catch (r) {
    return [0, r];
  }
}
function me(e, r) {
  return { plugins: r.plugins, mode: e, marked: /* @__PURE__ */ new Set(), features: 63 ^ (r.disabledFeatures || 0), refs: r.refs || /* @__PURE__ */ new Map(), depthLimit: r.depthLimit || 1e3 };
}
function pe(e, r) {
  e.marked.add(r);
}
function zr(e, r) {
  let t = e.refs.size;
  return e.refs.set(r, t), t;
}
function er(e, r) {
  let t = e.refs.get(r);
  return t != null ? (pe(e, t), { type: 1, value: pt(t) }) : { type: 0, value: zr(e, r) };
}
function Y(e, r) {
  let t = er(e, r);
  return t.type === 1 ? t : Ir(r) ? { type: 2, value: gt(t.value, r) } : t;
}
function I(e, r) {
  let t = Y(e, r);
  if (t.type !== 0) return t.value;
  if (r in ve) return dt(t.value, r);
  throw new x(r);
}
function k(e, r) {
  let t = er(e, Tt[r]);
  return t.type === 1 ? t.value : c(26, t.value, r, o, o, o, o, o, o, o, o, o);
}
function rr(e) {
  let r = er(e, Pt);
  return r.type === 1 ? r.value : c(27, r.value, o, o, o, o, o, o, I(e, C), o, o, o);
}
function tr(e) {
  let r = er(e, xt);
  return r.type === 1 ? r.value : c(29, r.value, o, o, o, o, o, [k(e, 1), I(e, v)], o, o, o, o);
}
function nr(e, r, t, n2) {
  return c(t ? 11 : 10, e, o, o, o, n2, o, o, o, o, Te(r), o);
}
function or(e, r, t, n2) {
  return c(8, r, o, o, o, o, { k: t, v: n2 }, o, k(e, 0), o, o, o);
}
function zt(e, r, t) {
  return c(22, r, t, o, o, o, o, o, k(e, 1), o, o, o);
}
function ar(e, r, t) {
  let n2 = new Uint8Array(t), a = "";
  for (let s = 0, i2 = n2.length; s < i2; s++) a += String.fromCharCode(n2[s]);
  return c(19, r, y(btoa(a)), o, o, o, o, o, k(e, 5), o, o, o);
}
function te(e, r) {
  return { base: me(e, r), child: void 0 };
}
var kr = class {
  constructor(r, t) {
    this._p = r;
    this.depth = t;
  }
  parse(r) {
    return N(this._p, this.depth, r);
  }
};
async function xn(e, r, t) {
  let n2 = [];
  for (let a = 0, s = t.length; a < s; a++) a in t ? n2[a] = await N(e, r, t[a]) : n2[a] = 0;
  return n2;
}
async function Tn(e, r, t, n2) {
  return _e(t, n2, await xn(e, r, n2));
}
async function Dr(e, r, t) {
  let n2 = Object.entries(t), a = [], s = [];
  for (let i2 = 0, u2 = n2.length; i2 < u2; i2++) a.push(y(n2[i2][0])), s.push(await N(e, r, n2[i2][1]));
  return C in t && (a.push(I(e.base, C)), s.push(Ue(rr(e.base), await N(e, r, $e(t))))), v in t && (a.push(I(e.base, v)), s.push(je(tr(e.base), await N(e, r, Qe(t))))), P in t && (a.push(I(e.base, P)), s.push($(t[P]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? H : J)), { k: a, v: s };
}
async function _r(e, r, t, n2, a) {
  return nr(t, n2, a, await Dr(e, r, n2));
}
async function On(e, r, t, n2) {
  return ke(t, await N(e, r, n2.valueOf()));
}
async function wn(e, r, t, n2) {
  return De(t, n2, await N(e, r, n2.buffer));
}
async function hn(e, r, t, n2) {
  return Fe(t, n2, await N(e, r, n2.buffer));
}
async function zn(e, r, t, n2) {
  return Be(t, n2, await N(e, r, n2.buffer));
}
async function _t(e, r, t, n2) {
  let a = Z(n2, e.base.features);
  return Ve(t, n2, a ? await Dr(e, r, a) : o);
}
async function _n(e, r, t, n2) {
  let a = Z(n2, e.base.features);
  return Me(t, n2, a ? await Dr(e, r, a) : o);
}
async function kn(e, r, t, n2) {
  let a = [], s = [];
  for (let [i2, u2] of n2.entries()) a.push(await N(e, r, i2)), s.push(await N(e, r, u2));
  return or(e.base, t, a, s);
}
async function Dn(e, r, t, n2) {
  let a = [];
  for (let s of n2.keys()) a.push(await N(e, r, s));
  return Le(t, a);
}
async function kt(e, r, t, n2) {
  let a = e.base.plugins;
  if (a) for (let s = 0, i2 = a.length; s < i2; s++) {
    let u2 = a[s];
    if (u2.parse.async && u2.test(n2)) return ce(t, u2.tag, await u2.parse.async(n2, new kr(e, r), { id: t }));
  }
  return o;
}
async function Fn(e, r, t, n2) {
  let [a, s] = await hr(n2);
  return c(12, t, a, o, o, o, o, o, await N(e, r, s), o, o, o);
}
function Bn(e, r, t, n2, a) {
  let s = [], i2 = t.on({ next: (u2) => {
    pe(this.base, r), N(this, e, u2).then((l2) => {
      s.push(qe(r, l2));
    }, (l2) => {
      a(l2), i2();
    });
  }, throw: (u2) => {
    pe(this.base, r), N(this, e, u2).then((l2) => {
      s.push(We(r, l2)), n2(s), i2();
    }, (l2) => {
      a(l2), i2();
    });
  }, return: (u2) => {
    pe(this.base, r), N(this, e, u2).then((l2) => {
      s.push(Ge(r, l2)), n2(s), i2();
    }, (l2) => {
      a(l2), i2();
    });
  } });
}
async function Vn(e, r, t, n2) {
  return Ye(t, k(e.base, 4), await new Promise(Bn.bind(e, r, t, n2)));
}
async function Mn(e, r, t, n2) {
  let a = [];
  for (let s = 0, i2 = n2.v.length; s < i2; s++) a[s] = await N(e, r, n2.v[s]);
  return Ke(t, a, n2.t, n2.d);
}
async function Ln(e, r, t, n2) {
  if (Array.isArray(n2)) return Tn(e, r, t, n2);
  if (Xe(n2)) return Vn(e, r, t, n2);
  if (Ze(n2)) return Mn(e, r, t, n2);
  let a = n2.constructor;
  if (a === j) return N(e, r, n2.replacement);
  let s = await kt(e, r, t, n2);
  if (s) return s;
  switch (a) {
    case Object:
      return _r(e, r, t, n2, false);
    case o:
      return _r(e, r, t, n2, true);
    case Date:
      return he(t, n2);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return _t(e, r, t, n2);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return On(e, r, t, n2);
    case ArrayBuffer:
      return ar(e.base, t, n2);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return wn(e, r, t, n2);
    case DataView:
      return zn(e, r, t, n2);
    case Map:
      return kn(e, r, t, n2);
    case Set:
      return Dn(e, r, t, n2);
    default:
      break;
  }
  if (a === Promise || n2 instanceof Promise) return Fn(e, r, t, n2);
  let i2 = e.base.features;
  if (i2 & 32 && a === RegExp) return ze(t, n2);
  if (i2 & 16) switch (a) {
    case BigInt64Array:
    case BigUint64Array:
      return hn(e, r, t, n2);
    default:
      break;
  }
  if (i2 & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n2 instanceof AggregateError)) return _n(e, r, t, n2);
  if (n2 instanceof Error) return _t(e, r, t, n2);
  if (C in n2 || v in n2) return _r(e, r, t, n2, !!a);
  throw new x(n2);
}
async function Un(e, r, t) {
  let n2 = Y(e.base, t);
  if (n2.type !== 0) return n2.value;
  let a = await kt(e, r, n2.value, t);
  if (a) return a;
  throw new x(t);
}
async function N(e, r, t) {
  switch (typeof t) {
    case "boolean":
      return t ? H : J;
    case "undefined":
      return Ae;
    case "string":
      return $(t);
    case "number":
      return Oe(t);
    case "bigint":
      return we(t);
    case "object": {
      if (t) {
        let n2 = Y(e.base, t);
        return n2.type === 0 ? await Ln(e, r + 1, n2.value, t) : n2.value;
      }
      return Ee;
    }
    case "symbol":
      return I(e.base, t);
    case "function":
      return Un(e, r, t);
    default:
      throw new x(t);
  }
}
async function ne(e, r) {
  try {
    return await N(e, 0, r);
  } catch (t) {
    throw t instanceof z ? t : new z(t);
  }
}
var oe = ((t) => (t[t.Vanilla = 1] = "Vanilla", t[t.Cross = 2] = "Cross", t))(oe || {});
function ai(e) {
  return e;
}
function Dt(e, r) {
  for (let t = 0, n2 = r.length; t < n2; t++) {
    let a = r[t];
    e.has(a) || (e.add(a), a.extends && Dt(e, a.extends));
  }
}
function A(e) {
  if (e) {
    let r = /* @__PURE__ */ new Set();
    return Dt(r, e), [...r];
  }
}
function Ft(e) {
  switch (e) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new Je(e);
  }
}
var jn = 1e6;
var Yn = 1e4;
var qn = 2e4;
function Vt(e, r) {
  switch (r) {
    case 3:
      return Object.freeze(e);
    case 1:
      return Object.preventExtensions(e);
    case 2:
      return Object.seal(e);
    default:
      return e;
  }
}
var Wn = 1e3;
function Mt(e, r) {
  var n2;
  let t = r.refs || /* @__PURE__ */ new Map();
  return "types" in t || Object.assign(t, { types: /* @__PURE__ */ new Map() }), { mode: e, plugins: r.plugins, refs: t, features: (n2 = r.features) != null ? n2 : 63 ^ (r.disabledFeatures || 0), depthLimit: r.depthLimit || Wn };
}
function Lt(e) {
  return { mode: 1, base: Mt(1, e), child: o, state: { marked: new Set(e.markedRefs) } };
}
var Fr = class {
  constructor(r, t) {
    this._p = r;
    this.depth = t;
  }
  deserialize(r) {
    return p(this._p, this.depth, r);
  }
};
function jt(e, r) {
  if (r < 0 || !Number.isFinite(r) || !Number.isInteger(r)) throw new O({ t: 4, i: r });
  if (e.refs.has(r)) throw new Error("Conflicted ref id: " + r);
}
function Gn(e, r, t) {
  return jt(e.base, r), e.state.marked.has(r) && e.base.refs.set(r, t), t;
}
function Kn(e, r, t) {
  return jt(e.base, r), e.base.refs.set(r, t), t;
}
function b(e, r, t) {
  return e.mode === 1 ? Gn(e, r, t) : Kn(e, r, t);
}
function Br(e, r, t) {
  if (Object.hasOwn(r, t)) return r[t];
  throw new O(e);
}
function Hn(e, r) {
  return b(e, r.i, St(D(r.s)));
}
function Jn(e, r, t) {
  let n2 = t.a, a = n2.length, s = b(e, t.i, new Array(a));
  for (let i2 = 0, u2; i2 < a; i2++) u2 = n2[i2], u2 && (s[i2] = p(e, r, u2));
  return Vt(s, t.o), s;
}
function Zn(e) {
  switch (e) {
    case "constructor":
    case "__proto__":
    case "prototype":
    case "__defineGetter__":
    case "__defineSetter__":
    case "__lookupGetter__":
    case "__lookupSetter__":
      return false;
    default:
      return true;
  }
}
function $n(e) {
  switch (e) {
    case v:
    case R:
    case P:
    case C:
      return true;
    default:
      return false;
  }
}
function Bt(e, r, t) {
  Zn(r) ? e[r] = t : Object.defineProperty(e, r, { value: t, configurable: true, enumerable: true, writable: true });
}
function Xn(e, r, t, n2, a) {
  if (typeof n2 == "string") Bt(t, D(n2), p(e, r, a));
  else {
    let s = p(e, r, n2);
    switch (typeof s) {
      case "string":
        Bt(t, s, p(e, r, a));
        break;
      case "symbol":
        $n(s) && (t[s] = p(e, r, a));
        break;
      default:
        throw new O(n2);
    }
  }
}
function Yt(e, r, t) {
  e.base.refs.types.set(r, t);
}
function de(e, r, t, n2) {
  if (e.base.refs.types.get(t) !== n2) throw new O(r);
}
function qt(e, r, t, n2) {
  let a = t.k;
  if (a.length > 0) for (let i2 = 0, u2 = t.v, l2 = a.length; i2 < l2; i2++) Xn(e, r, n2, a[i2], u2[i2]);
  return n2;
}
function Qn(e, r, t) {
  let n2 = b(e, t.i, t.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
  return qt(e, r, t.p, n2), Vt(n2, t.o), n2;
}
function eo(e, r) {
  return b(e, r.i, new Date(r.s));
}
function ro(e, r) {
  if (e.base.features & 32) {
    let t = D(r.c);
    if (t.length > qn) throw new O(r);
    return b(e, r.i, new RegExp(t, r.m));
  }
  throw new h(r);
}
function to(e, r, t) {
  let n2 = b(e, t.i, /* @__PURE__ */ new Set());
  for (let a = 0, s = t.a, i2 = s.length; a < i2; a++) n2.add(p(e, r, s[a]));
  return n2;
}
function no(e, r, t) {
  let n2 = b(e, t.i, /* @__PURE__ */ new Map());
  for (let a = 0, s = t.e.k, i2 = t.e.v, u2 = s.length; a < u2; a++) n2.set(p(e, r, s[a]), p(e, r, i2[a]));
  return n2;
}
function oo(e, r) {
  if (r.s.length > jn) throw new O(r);
  return b(e, r.i, Or(D(r.s)));
}
function ao(e, r, t) {
  var u2;
  let n2 = Ft(t.c), a = p(e, r, t.f), s = (u2 = t.b) != null ? u2 : 0;
  if (s < 0 || s > a.byteLength) throw new O(t);
  return b(e, t.i, new n2(a, s, t.l));
}
function so(e, r, t) {
  var i2;
  let n2 = p(e, r, t.f), a = (i2 = t.b) != null ? i2 : 0;
  if (a < 0 || a > n2.byteLength) throw new O(t);
  return b(e, t.i, new DataView(n2, a, t.l));
}
function Wt(e, r, t, n2) {
  if (t.p) {
    let a = qt(e, r, t.p, {});
    Object.defineProperties(n2, Object.getOwnPropertyDescriptors(a));
  }
  return n2;
}
function io(e, r, t) {
  let n2 = b(e, t.i, new AggregateError([], D(t.m)));
  return Wt(e, r, t, n2);
}
function uo(e, r, t) {
  let n2 = Br(t, st, t.s), a = b(e, t.i, new n2(D(t.m)));
  return Wt(e, r, t, a);
}
function lo(e, r, t) {
  let n2 = ee(), a = b(e, t.i, n2.p), s = p(e, r, t.f);
  return t.s ? n2.s(s) : n2.f(s), a;
}
function co(e, r, t) {
  return b(e, t.i, Object(p(e, r, t.f)));
}
function fo(e, r, t) {
  let n2 = e.base.plugins;
  if (n2) {
    let a = D(t.c);
    for (let s = 0, i2 = n2.length; s < i2; s++) {
      let u2 = n2[s];
      if (u2.tag === a) return b(e, t.i, u2.deserialize(t.s, new Fr(e, r), { id: t.i }));
    }
  }
  throw new X(t.c);
}
function So(e, r) {
  let t = b(e, r.i, b(e, r.s, ee()).p);
  return Yt(e, r.s, 22), t;
}
function mo(e, r, t) {
  let n2 = e.base.refs.get(t.i);
  if (n2) return de(e, t, t.i, 22), n2.s(p(e, r, t.a[1])), o;
  throw new V("Promise");
}
function po(e, r, t) {
  let n2 = e.base.refs.get(t.i);
  if (n2) return de(e, t, t.i, 22), n2.f(p(e, r, t.a[1])), o;
  throw new V("Promise");
}
function go(e, r, t) {
  p(e, r, t.a[0]);
  let n2 = p(e, r, t.a[1]);
  return Rt(n2);
}
function yo(e, r, t) {
  p(e, r, t.a[0]);
  let n2 = p(e, r, t.a[1]);
  return wt(n2);
}
function No(e, r, t) {
  let n2 = b(e, t.i, re());
  Yt(e, t.i, 31);
  let a = t.a, s = a.length;
  if (s) for (let i2 = 0; i2 < s; i2++) p(e, r, a[i2]);
  return n2;
}
function bo(e, r, t) {
  let n2 = e.base.refs.get(t.i);
  if (n2) return de(e, t, t.i, 31), n2.next(p(e, r, t.f)), o;
  throw new V("Stream");
}
function vo(e, r, t) {
  let n2 = e.base.refs.get(t.i);
  if (n2) return de(e, t, t.i, 31), n2.throw(p(e, r, t.f)), o;
  throw new V("Stream");
}
function Co(e, r, t) {
  let n2 = e.base.refs.get(t.i);
  if (n2) return de(e, t, t.i, 31), n2.return(p(e, r, t.f)), o;
  throw new V("Stream");
}
function Ao(e, r, t) {
  return p(e, r, t.f), o;
}
function Eo(e, r, t) {
  return p(e, r, t.a[1]), o;
}
function Io(e, r, t) {
  let n2 = b(e, t.i, wr([], t.s, t.l));
  for (let a = 0, s = t.a.length; a < s; a++) n2.v[a] = p(e, r, t.a[a]);
  return n2;
}
function p(e, r, t) {
  if (r > e.base.depthLimit) throw new Q(e.base.depthLimit);
  switch (r += 1, t.t) {
    case 2:
      return Br(t, at, t.s);
    case 0:
      return Number(t.s);
    case 1:
      return D(String(t.s));
    case 3:
      if (String(t.s).length > Yn) throw new O(t);
      return BigInt(t.s);
    case 4:
      return e.base.refs.get(t.i);
    case 18:
      return Hn(e, t);
    case 9:
      return Jn(e, r, t);
    case 10:
    case 11:
      return Qn(e, r, t);
    case 5:
      return eo(e, t);
    case 6:
      return ro(e, t);
    case 7:
      return to(e, r, t);
    case 8:
      return no(e, r, t);
    case 19:
      return oo(e, t);
    case 16:
    case 15:
      return ao(e, r, t);
    case 20:
      return so(e, r, t);
    case 14:
      return io(e, r, t);
    case 13:
      return uo(e, r, t);
    case 12:
      return lo(e, r, t);
    case 17:
      return Br(t, nt, t.s);
    case 21:
      return co(e, r, t);
    case 25:
      return fo(e, r, t);
    case 22:
      return So(e, t);
    case 23:
      return mo(e, r, t);
    case 24:
      return po(e, r, t);
    case 28:
      return go(e, r, t);
    case 30:
      return yo(e, r, t);
    case 31:
      return No(e, r, t);
    case 32:
      return bo(e, r, t);
    case 33:
      return vo(e, r, t);
    case 34:
      return Co(e, r, t);
    case 27:
      return Ao(e, r, t);
    case 29:
      return Eo(e, r, t);
    case 35:
      return Io(e, r, t);
    default:
      throw new h(t);
  }
}
function sr(e, r) {
  try {
    return p(e, 0, r);
  } catch (t) {
    throw new He(t);
  }
}
var Ro = () => T;
var Po = Ro.toString();
var Gt = /=>/.test(Po);
function ir(e, r) {
  return Gt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
}
function Kt(e, r) {
  return Gt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
}
var Zt = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
var Ht = Zt.length;
var $t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
var Jt = $t.length;
function Vr(e) {
  let r = e % Ht, t = Zt[r];
  for (e = (e - r) / Ht; e > 0; ) r = e % Jt, t += $t[r], e = (e - r) / Jt;
  return t;
}
var xo = /^[$A-Z_][0-9A-Z_$]*$/i;
function Mr(e) {
  let r = e[0];
  return (r === "$" || r === "_" || r >= "A" && r <= "Z" || r >= "a" && r <= "z") && xo.test(e);
}
function ye(e) {
  switch (e.t) {
    case 0:
      return e.s + "=" + e.v;
    case 2:
      return e.s + ".set(" + e.k + "," + e.v + ")";
    case 1:
      return e.s + ".add(" + e.v + ")";
    case 3:
      return e.s + ".delete(" + e.k + ")";
  }
}
function To(e) {
  let r = [], t = e[0];
  for (let n2 = 1, a = e.length, s, i2 = t; n2 < a; n2++) s = e[n2], s.t === 0 && s.v === i2.v ? t = { t: 0, s: s.s, k: o, v: ye(t) } : s.t === 2 && s.s === i2.s ? t = { t: 2, s: ye(t), k: s.k, v: s.v } : s.t === 1 && s.s === i2.s ? t = { t: 1, s: ye(t), k: o, v: s.v } : s.t === 3 && s.s === i2.s ? t = { t: 3, s: ye(t), k: s.k, v: o } : (r.push(t), t = s), i2 = s;
  return r.push(t), r;
}
function on(e) {
  if (e.length) {
    let r = "", t = To(e);
    for (let n2 = 0, a = t.length; n2 < a; n2++) r += ye(t[n2]) + ",";
    return r;
  }
  return o;
}
var Oo = "Object.create(null)";
var wo = "new Set";
var ho = "new Map";
var zo = "Promise.resolve";
var _o = "Promise.reject";
var ko = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: o };
function an(e, r) {
  return { mode: e, plugins: r.plugins, features: r.features, marked: new Set(r.markedRefs), stack: [], flags: [], assignments: [] };
}
function lr(e) {
  return { mode: 2, base: an(2, e), state: e, child: o };
}
var Lr = class {
  constructor(r) {
    this._p = r;
  }
  serialize(r) {
    return f(this._p, r);
  }
};
function Fo(e, r) {
  let t = e.valid.get(r);
  t == null && (t = e.valid.size, e.valid.set(r, t));
  let n2 = e.vars[t];
  return n2 == null && (n2 = Vr(t), e.vars[t] = n2), n2;
}
function Bo(e) {
  return le + "[" + e + "]";
}
function m(e, r) {
  return e.mode === 1 ? Fo(e.state, r) : Bo(r);
}
function w(e, r) {
  e.marked.add(r);
}
function Ur(e, r) {
  return e.marked.has(r);
}
function Yr(e, r, t) {
  r !== 0 && (w(e.base, t), e.base.flags.push({ type: r, value: m(e, t) }));
}
function Vo(e) {
  let r = "";
  for (let t = 0, n2 = e.flags, a = n2.length; t < a; t++) {
    let s = n2[t];
    r += ko[s.type] + "(" + s.value + "),";
  }
  return r;
}
function sn(e) {
  let r = on(e.assignments), t = Vo(e);
  return r ? t ? r + t : r : t;
}
function qr(e, r, t) {
  e.assignments.push({ t: 0, s: r, k: o, v: t });
}
function Mo(e, r, t) {
  e.base.assignments.push({ t: 1, s: m(e, r), k: o, v: t });
}
function ge(e, r, t, n2) {
  e.base.assignments.push({ t: 2, s: m(e, r), k: t, v: n2 });
}
function Xt(e, r, t) {
  e.base.assignments.push({ t: 3, s: m(e, r), k: t, v: o });
}
function Ne(e, r, t, n2) {
  qr(e.base, m(e, r) + "[" + t + "]", n2);
}
function jr(e, r, t, n2) {
  qr(e.base, m(e, r) + "." + t, n2);
}
function Lo(e, r, t, n2) {
  qr(e.base, m(e, r) + ".v[" + t + "]", n2);
}
function F(e, r) {
  return r.t === 4 && e.stack.includes(r.i);
}
function ae(e, r, t) {
  return e.mode === 1 && !Ur(e.base, r) ? t : m(e, r) + "=" + t;
}
function Uo(e) {
  return L + '.get("' + e.s + '")';
}
function Qt(e, r, t, n2) {
  return t ? F(e.base, t) ? (w(e.base, r), Ne(e, r, n2, m(e, t.i)), "") : f(e, t) : "";
}
function jo(e, r) {
  let t = r.i, n2 = r.a, a = n2.length;
  if (a > 0) {
    e.base.stack.push(t);
    let s = Qt(e, t, n2[0], 0), i2 = s === "";
    for (let u2 = 1, l2; u2 < a; u2++) l2 = Qt(e, t, n2[u2], u2), s += "," + l2, i2 = l2 === "";
    return e.base.stack.pop(), Yr(e, r.o, r.i), "[" + s + (i2 ? ",]" : "]");
  }
  return "[]";
}
function en(e, r, t, n2) {
  if (typeof t == "string") {
    let a = Number(t), s = a >= 0 && a.toString() === t || Mr(t);
    if (F(e.base, n2)) {
      let i2 = m(e, n2.i);
      return w(e.base, r.i), s && a !== a ? jr(e, r.i, t, i2) : Ne(e, r.i, s ? t : '"' + t + '"', i2), "";
    }
    return (s ? t : '"' + t + '"') + ":" + f(e, n2);
  }
  return "[" + f(e, t) + "]:" + f(e, n2);
}
function un(e, r, t) {
  let n2 = t.k, a = n2.length;
  if (a > 0) {
    let s = t.v;
    e.base.stack.push(r.i);
    let i2 = en(e, r, n2[0], s[0]);
    for (let u2 = 1, l2 = i2; u2 < a; u2++) l2 = en(e, r, n2[u2], s[u2]), i2 += (l2 && i2 && ",") + l2;
    return e.base.stack.pop(), "{" + i2 + "}";
  }
  return "{}";
}
function Yo(e, r) {
  return Yr(e, r.o, r.i), un(e, r, r.p);
}
function qo(e, r, t, n2) {
  let a = un(e, r, t);
  return a !== "{}" ? "Object.assign(" + n2 + "," + a + ")" : n2;
}
function Wo(e, r, t, n2, a) {
  let s = e.base, i2 = f(e, a), u2 = Number(n2), l2 = u2 >= 0 && u2.toString() === n2 || Mr(n2);
  if (F(s, a)) l2 && u2 !== u2 ? jr(e, r.i, n2, i2) : Ne(e, r.i, l2 ? n2 : '"' + n2 + '"', i2);
  else {
    let g2 = s.assignments;
    s.assignments = t, l2 && u2 !== u2 ? jr(e, r.i, n2, i2) : Ne(e, r.i, l2 ? n2 : '"' + n2 + '"', i2), s.assignments = g2;
  }
}
function Go(e, r, t, n2, a) {
  if (typeof n2 == "string") Wo(e, r, t, n2, a);
  else {
    let s = e.base, i2 = s.stack;
    s.stack = [];
    let u2 = f(e, a);
    s.stack = i2;
    let l2 = s.assignments;
    s.assignments = t, Ne(e, r.i, f(e, n2), u2), s.assignments = l2;
  }
}
function Ko(e, r, t) {
  let n2 = t.k, a = n2.length;
  if (a > 0) {
    let s = [], i2 = t.v;
    e.base.stack.push(r.i);
    for (let u2 = 0; u2 < a; u2++) Go(e, r, s, n2[u2], i2[u2]);
    return e.base.stack.pop(), on(s);
  }
  return o;
}
function Wr(e, r, t) {
  if (r.p) {
    let n2 = e.base;
    if (n2.features & 8) t = qo(e, r, r.p, t);
    else {
      w(n2, r.i);
      let a = Ko(e, r, r.p);
      if (a) return "(" + ae(e, r.i, t) + "," + a + m(e, r.i) + ")";
    }
  }
  return t;
}
function Ho(e, r) {
  return Yr(e, r.o, r.i), Wr(e, r, Oo);
}
function Jo(e) {
  return 'new Date("' + e.s + '")';
}
function Zo(e, r) {
  if (e.base.features & 32) return "/" + r.c + "/" + r.m;
  throw new h(r);
}
function rn(e, r, t) {
  let n2 = e.base;
  return F(n2, t) ? (w(n2, r), Mo(e, r, m(e, t.i)), "") : f(e, t);
}
function $o(e, r) {
  let t = wo, n2 = r.a, a = n2.length, s = r.i;
  if (a > 0) {
    e.base.stack.push(s);
    let i2 = rn(e, s, n2[0]);
    for (let u2 = 1, l2 = i2; u2 < a; u2++) l2 = rn(e, s, n2[u2]), i2 += (l2 && i2 && ",") + l2;
    e.base.stack.pop(), i2 && (t += "([" + i2 + "])");
  }
  return t;
}
function tn(e, r, t, n2, a) {
  let s = e.base;
  if (F(s, t)) {
    let i2 = m(e, t.i);
    if (w(s, r), F(s, n2)) {
      let l2 = m(e, n2.i);
      return ge(e, r, i2, l2), "";
    }
    if (n2.t !== 4 && n2.i != null && Ur(s, n2.i)) {
      let l2 = "(" + f(e, n2) + ",[" + a + "," + a + "])";
      return ge(e, r, i2, m(e, n2.i)), Xt(e, r, a), l2;
    }
    let u2 = s.stack;
    return s.stack = [], ge(e, r, i2, f(e, n2)), s.stack = u2, "";
  }
  if (F(s, n2)) {
    let i2 = m(e, n2.i);
    if (w(s, r), t.t !== 4 && t.i != null && Ur(s, t.i)) {
      let l2 = "(" + f(e, t) + ",[" + a + "," + a + "])";
      return ge(e, r, m(e, t.i), i2), Xt(e, r, a), l2;
    }
    let u2 = s.stack;
    return s.stack = [], ge(e, r, f(e, t), i2), s.stack = u2, "";
  }
  return "[" + f(e, t) + "," + f(e, n2) + "]";
}
function Xo(e, r) {
  let t = ho, n2 = r.e.k, a = n2.length, s = r.i, i2 = r.f, u2 = m(e, i2.i), l2 = e.base;
  if (a > 0) {
    let g2 = r.e.v;
    l2.stack.push(s);
    let S = tn(e, s, n2[0], g2[0], u2);
    for (let d2 = 1, G2 = S; d2 < a; d2++) G2 = tn(e, s, n2[d2], g2[d2], u2), S += (G2 && S && ",") + G2;
    l2.stack.pop(), S && (t += "([" + S + "])");
  }
  return i2.t === 26 && (w(l2, i2.i), t = "(" + f(e, i2) + "," + t + ")"), t;
}
function Qo(e, r) {
  return q(e, r.f) + '("' + r.s + '")';
}
function ea(e, r) {
  return "new " + r.c + "(" + f(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ra(e, r) {
  return "new DataView(" + f(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ta(e, r) {
  let t = r.i;
  e.base.stack.push(t);
  let n2 = Wr(e, r, 'new AggregateError([],"' + r.m + '")');
  return e.base.stack.pop(), n2;
}
function na(e, r) {
  return Wr(e, r, "new " + Ce[r.s] + '("' + r.m + '")');
}
function oa(e, r) {
  let t, n2 = r.f, a = r.i, s = r.s ? zo : _o, i2 = e.base;
  if (F(i2, n2)) {
    let u2 = m(e, n2.i);
    t = s + (r.s ? "().then(" + ir([], u2) + ")" : "().catch(" + Kt([], "throw " + u2) + ")");
  } else {
    i2.stack.push(a);
    let u2 = f(e, n2);
    i2.stack.pop(), t = s + "(" + u2 + ")";
  }
  return t;
}
function aa(e, r) {
  return "Object(" + f(e, r.f) + ")";
}
function q(e, r) {
  let t = f(e, r);
  return r.t === 4 ? t : "(" + t + ")";
}
function sa(e, r) {
  if (e.mode === 1) throw new h(r);
  return "(" + ae(e, r.s, q(e, r.f) + "()") + ").p";
}
function ia(e, r) {
  if (e.mode === 1) throw new h(r);
  return q(e, r.a[0]) + "(" + m(e, r.i) + "," + f(e, r.a[1]) + ")";
}
function ua(e, r) {
  if (e.mode === 1) throw new h(r);
  return q(e, r.a[0]) + "(" + m(e, r.i) + "," + f(e, r.a[1]) + ")";
}
function la(e, r) {
  let t = e.base.plugins;
  if (t) for (let n2 = 0, a = t.length; n2 < a; n2++) {
    let s = t[n2];
    if (s.tag === r.c) return e.child == null && (e.child = new Lr(e)), s.serialize(r.s, e.child, { id: r.i });
  }
  throw new X(r.c);
}
function ca(e, r) {
  let t = "", n2 = false;
  return r.f.t !== 4 && (w(e.base, r.f.i), t = "(" + f(e, r.f) + ",", n2 = true), t += ae(e, r.i, "(" + At + ")(" + m(e, r.f.i) + ")"), n2 && (t += ")"), t;
}
function fa(e, r) {
  return q(e, r.a[0]) + "(" + f(e, r.a[1]) + ")";
}
function Sa(e, r) {
  let t = r.a[0], n2 = r.a[1], a = e.base, s = "";
  t.t !== 4 && (w(a, t.i), s += "(" + f(e, t)), n2.t !== 4 && (w(a, n2.i), s += (s ? "," : "(") + f(e, n2)), s && (s += ",");
  let i2 = ae(e, r.i, "(" + Et + ")(" + m(e, n2.i) + "," + m(e, t.i) + ")");
  return s ? s + i2 + ")" : i2;
}
function ma(e, r) {
  return q(e, r.a[0]) + "(" + f(e, r.a[1]) + ")";
}
function pa(e, r) {
  let t = ae(e, r.i, q(e, r.f) + "()"), n2 = r.a.length;
  if (n2) {
    let a = f(e, r.a[0]);
    for (let s = 1; s < n2; s++) a += "," + f(e, r.a[s]);
    return "(" + t + "," + a + "," + m(e, r.i) + ")";
  }
  return t;
}
function da(e, r) {
  return m(e, r.i) + ".next(" + f(e, r.f) + ")";
}
function ga(e, r) {
  return m(e, r.i) + ".throw(" + f(e, r.f) + ")";
}
function ya(e, r) {
  return m(e, r.i) + ".return(" + f(e, r.f) + ")";
}
function nn(e, r, t, n2) {
  let a = e.base;
  return F(a, n2) ? (w(a, r), Lo(e, r, t, m(e, n2.i)), "") : f(e, n2);
}
function Na(e, r) {
  let t = r.a, n2 = t.length, a = r.i;
  if (n2 > 0) {
    e.base.stack.push(a);
    let s = nn(e, a, 0, t[0]);
    for (let i2 = 1, u2 = s; i2 < n2; i2++) u2 = nn(e, a, i2, t[i2]), s += (u2 && s && ",") + u2;
    if (e.base.stack.pop(), s) return "{__SEROVAL_SEQUENCE__:!0,v:[" + s + "],t:" + r.s + ",d:" + r.l + "}";
  }
  return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function ba(e, r) {
  switch (r.t) {
    case 17:
      return tt[r.s];
    case 18:
      return Uo(r);
    case 9:
      return jo(e, r);
    case 10:
      return Yo(e, r);
    case 11:
      return Ho(e, r);
    case 5:
      return Jo(r);
    case 6:
      return Zo(e, r);
    case 7:
      return $o(e, r);
    case 8:
      return Xo(e, r);
    case 19:
      return Qo(e, r);
    case 16:
    case 15:
      return ea(e, r);
    case 20:
      return ra(e, r);
    case 14:
      return ta(e, r);
    case 13:
      return na(e, r);
    case 12:
      return oa(e, r);
    case 21:
      return aa(e, r);
    case 22:
      return sa(e, r);
    case 25:
      return la(e, r);
    case 26:
      return Ot[r.s];
    case 35:
      return Na(e, r);
    default:
      throw new h(r);
  }
}
function f(e, r) {
  switch (r.t) {
    case 2:
      return ot[r.s];
    case 0:
      return "" + r.s;
    case 1:
      return '"' + r.s + '"';
    case 3:
      return r.s + "n";
    case 4:
      return m(e, r.i);
    case 23:
      return ia(e, r);
    case 24:
      return ua(e, r);
    case 27:
      return ca(e, r);
    case 28:
      return fa(e, r);
    case 29:
      return Sa(e, r);
    case 30:
      return ma(e, r);
    case 31:
      return pa(e, r);
    case 32:
      return da(e, r);
    case 33:
      return ga(e, r);
    case 34:
      return ya(e, r);
    default:
      return ae(e, r.i, ba(e, r));
  }
}
function fr(e, r) {
  let t = f(e, r), n2 = r.i;
  if (n2 == null) return t;
  let a = sn(e.base), s = m(e, n2), i2 = e.state.scopeId, u2 = i2 == null ? "" : le, l2 = a ? "(" + t + "," + a + s + ")" : t;
  if (u2 === "") return r.t === 10 && !a ? "(" + l2 + ")" : l2;
  let g2 = i2 == null ? "()" : "(" + le + '["' + y(i2) + '"])';
  return "(" + ir([u2], l2) + ")" + g2;
}
var Kr = class {
  constructor(r, t) {
    this._p = r;
    this.depth = t;
  }
  parse(r) {
    return E(this._p, this.depth, r);
  }
};
var Hr = class {
  constructor(r, t) {
    this._p = r;
    this.depth = t;
  }
  parse(r) {
    return E(this._p, this.depth, r);
  }
  parseWithError(r) {
    return W(this._p, this.depth, r);
  }
  isAlive() {
    return this._p.state.alive;
  }
  pushPendingState() {
    Qr(this._p);
  }
  popPendingState() {
    be(this._p);
  }
  onParse(r) {
    se(this._p, r);
  }
  onError(r) {
    $r(this._p, r);
  }
};
function va(e) {
  return { alive: true, pending: 0, initial: true, buffer: [], onParse: e.onParse, onError: e.onError, onDone: e.onDone };
}
function Jr(e) {
  return { type: 2, base: me(2, e), state: va(e) };
}
function Ca(e, r, t) {
  let n2 = [];
  for (let a = 0, s = t.length; a < s; a++) a in t ? n2[a] = E(e, r, t[a]) : n2[a] = 0;
  return n2;
}
function Aa(e, r, t, n2) {
  return _e(t, n2, Ca(e, r, n2));
}
function Zr(e, r, t) {
  let n2 = Object.entries(t), a = [], s = [];
  for (let i2 = 0, u2 = n2.length; i2 < u2; i2++) a.push(y(n2[i2][0])), s.push(E(e, r, n2[i2][1]));
  return C in t && (a.push(I(e.base, C)), s.push(Ue(rr(e.base), E(e, r, $e(t))))), v in t && (a.push(I(e.base, v)), s.push(je(tr(e.base), E(e, r, e.type === 1 ? re() : Qe(t))))), P in t && (a.push(I(e.base, P)), s.push($(t[P]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? H : J)), { k: a, v: s };
}
function Gr(e, r, t, n2, a) {
  return nr(t, n2, a, Zr(e, r, n2));
}
function Ea(e, r, t, n2) {
  return ke(t, E(e, r, n2.valueOf()));
}
function Ia(e, r, t, n2) {
  return De(t, n2, E(e, r, n2.buffer));
}
function Ra(e, r, t, n2) {
  return Fe(t, n2, E(e, r, n2.buffer));
}
function Pa(e, r, t, n2) {
  return Be(t, n2, E(e, r, n2.buffer));
}
function ln(e, r, t, n2) {
  let a = Z(n2, e.base.features);
  return Ve(t, n2, a ? Zr(e, r, a) : o);
}
function xa(e, r, t, n2) {
  let a = Z(n2, e.base.features);
  return Me(t, n2, a ? Zr(e, r, a) : o);
}
function Ta(e, r, t, n2) {
  let a = [], s = [];
  for (let [i2, u2] of n2.entries()) a.push(E(e, r, i2)), s.push(E(e, r, u2));
  return or(e.base, t, a, s);
}
function Oa(e, r, t, n2) {
  let a = [];
  for (let s of n2.keys()) a.push(E(e, r, s));
  return Le(t, a);
}
function wa(e, r, t, n2) {
  let a = Ye(t, k(e.base, 4), []);
  return e.type === 1 || (Qr(e), n2.on({ next: (s) => {
    if (e.state.alive) {
      let i2 = W(e, r, s);
      i2 && se(e, qe(t, i2));
    }
  }, throw: (s) => {
    if (e.state.alive) {
      let i2 = W(e, r, s);
      i2 && se(e, We(t, i2));
    }
    be(e);
  }, return: (s) => {
    if (e.state.alive) {
      let i2 = W(e, r, s);
      i2 && se(e, Ge(t, i2));
    }
    be(e);
  } })), a;
}
function ha(e, r, t) {
  if (this.state.alive) {
    let n2 = W(this, r, t);
    n2 && se(this, c(23, e, o, o, o, o, o, [k(this.base, 2), n2], o, o, o, o)), be(this);
  }
}
function za(e, r, t) {
  if (this.state.alive) {
    let n2 = W(this, r, t);
    n2 && se(this, c(24, e, o, o, o, o, o, [k(this.base, 3), n2], o, o, o, o));
  }
  be(this);
}
function _a(e, r, t, n2) {
  let a = zr(e.base, {});
  return e.type === 2 && (Qr(e), n2.then(ha.bind(e, a, r), za.bind(e, a, r))), zt(e.base, t, a);
}
function ka(e, r, t, n2, a) {
  for (let s = 0, i2 = a.length; s < i2; s++) {
    let u2 = a[s];
    if (u2.parse.sync && u2.test(n2)) return ce(t, u2.tag, u2.parse.sync(n2, new Kr(e, r), { id: t }));
  }
  return o;
}
function Da(e, r, t, n2, a) {
  for (let s = 0, i2 = a.length; s < i2; s++) {
    let u2 = a[s];
    if (u2.parse.stream && u2.test(n2)) return ce(t, u2.tag, u2.parse.stream(n2, new Hr(e, r), { id: t }));
  }
  return o;
}
function cn(e, r, t, n2) {
  let a = e.base.plugins;
  return a ? e.type === 1 ? ka(e, r, t, n2, a) : Da(e, r, t, n2, a) : o;
}
function Fa(e, r, t, n2) {
  let a = [];
  for (let s = 0, i2 = n2.v.length; s < i2; s++) a[s] = E(e, r, n2.v[s]);
  return Ke(t, a, n2.t, n2.d);
}
function Ba(e, r, t, n2, a) {
  switch (a) {
    case Object:
      return Gr(e, r, t, n2, false);
    case o:
      return Gr(e, r, t, n2, true);
    case Date:
      return he(t, n2);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return ln(e, r, t, n2);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return Ea(e, r, t, n2);
    case ArrayBuffer:
      return ar(e.base, t, n2);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return Ia(e, r, t, n2);
    case DataView:
      return Pa(e, r, t, n2);
    case Map:
      return Ta(e, r, t, n2);
    case Set:
      return Oa(e, r, t, n2);
    default:
      break;
  }
  if (a === Promise || n2 instanceof Promise) return _a(e, r, t, n2);
  let s = e.base.features;
  if (s & 32 && a === RegExp) return ze(t, n2);
  if (s & 16) switch (a) {
    case BigInt64Array:
    case BigUint64Array:
      return Ra(e, r, t, n2);
    default:
      break;
  }
  if (s & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n2 instanceof AggregateError)) return xa(e, r, t, n2);
  if (n2 instanceof Error) return ln(e, r, t, n2);
  if (C in n2 || v in n2) return Gr(e, r, t, n2, !!a);
  throw new x(n2);
}
function Va(e, r, t, n2) {
  if (Array.isArray(n2)) return Aa(e, r, t, n2);
  if (Xe(n2)) return wa(e, r, t, n2);
  if (Ze(n2)) return Fa(e, r, t, n2);
  let a = n2.constructor;
  if (a === j) return E(e, r, n2.replacement);
  let s = cn(e, r, t, n2);
  return s || Ba(e, r, t, n2, a);
}
function Ma(e, r, t) {
  let n2 = Y(e.base, t);
  if (n2.type !== 0) return n2.value;
  let a = cn(e, r, n2.value, t);
  if (a) return a;
  throw new x(t);
}
function E(e, r, t) {
  if (r >= e.base.depthLimit) throw new Q(e.base.depthLimit);
  switch (typeof t) {
    case "boolean":
      return t ? H : J;
    case "undefined":
      return Ae;
    case "string":
      return $(t);
    case "number":
      return Oe(t);
    case "bigint":
      return we(t);
    case "object": {
      if (t) {
        let n2 = Y(e.base, t);
        return n2.type === 0 ? Va(e, r + 1, n2.value, t) : n2.value;
      }
      return Ee;
    }
    case "symbol":
      return I(e.base, t);
    case "function":
      return Ma(e, r, t);
    default:
      throw new x(t);
  }
}
function se(e, r) {
  e.state.initial ? e.state.buffer.push(r) : Xr(e, r, false);
}
function $r(e, r) {
  if (e.state.onError) e.state.onError(r);
  else throw r instanceof z ? r : new z(r);
}
function fn(e) {
  e.state.onDone && e.state.onDone();
}
function Xr(e, r, t) {
  try {
    e.state.onParse(r, t);
  } catch (n2) {
    $r(e, n2);
  }
}
function Qr(e) {
  e.state.pending++;
}
function be(e) {
  --e.state.pending <= 0 && fn(e);
}
function W(e, r, t) {
  try {
    return E(e, r, t);
  } catch (n2) {
    return $r(e, n2), o;
  }
}
function et(e, r) {
  let t = W(e, 0, r);
  t && (Xr(e, t, true), e.state.initial = false, La(e, e.state), e.state.pending <= 0 && Sr(e));
}
function La(e, r) {
  for (let t = 0, n2 = r.buffer.length; t < n2; t++) Xr(e, r.buffer[t], false);
}
function Sr(e) {
  e.state.alive && (fn(e), e.state.alive = false);
}
async function su(e, r = {}) {
  let t = A(r.plugins), n2 = te(2, { plugins: t, disabledFeatures: r.disabledFeatures, refs: r.refs });
  return await ne(n2, e);
}
function Sn(e, r) {
  let t = A(r.plugins), n2 = Jr({ plugins: t, refs: r.refs, disabledFeatures: r.disabledFeatures, onParse(a, s) {
    let i2 = lr({ plugins: t, features: n2.base.features, scopeId: r.scopeId, markedRefs: n2.base.marked }), u2;
    try {
      u2 = fr(i2, a);
    } catch (l2) {
      r.onError && r.onError(l2);
      return;
    }
    r.onSerialize(u2, s);
  }, onError: r.onError, onDone: r.onDone });
  return et(n2, e), Sr.bind(null, n2);
}
function iu(e, r) {
  let t = A(r.plugins), n2 = Jr({ plugins: t, refs: r.refs, disabledFeatures: r.disabledFeatures, depthLimit: r.depthLimit, onParse: r.onParse, onError: r.onError, onDone: r.onDone });
  return et(n2, e), Sr.bind(null, n2);
}
function Pu(e, r = {}) {
  var i2;
  let t = A(r.plugins), n2 = r.disabledFeatures || 0, a = (i2 = e.f) != null ? i2 : 63, s = Lt({ plugins: t, markedRefs: e.m, features: a & ~n2, disabledFeatures: n2 });
  return sr(s, e.t);
}

// node_modules/@tanstack/router-core/dist/esm/ssr/constants.js
var GLOBAL_TSR = "$_TSR";
var TSR_SCRIPT_BARRIER_ID = "$tsr-stream-barrier";

// node_modules/@tanstack/router-core/dist/esm/ssr/serializer/transformer.js
function createSerializationAdapter(opts) {
  return opts;
}
// @__NO_SIDE_EFFECTS__
function makeSsrSerovalPlugin(serializationAdapter, options) {
  return /* @__PURE__ */ ai({
    tag: "$TSR/t/" + serializationAdapter.key,
    test: serializationAdapter.test,
    parse: { stream(value, ctx, _data) {
      return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
    } },
    serialize(node, ctx, _data) {
      options.didRun = true;
      return GLOBAL_TSR + '.t.get("' + serializationAdapter.key + '")(' + ctx.serialize(node.v) + ")";
    },
    deserialize: void 0
  });
}
// @__NO_SIDE_EFFECTS__
function makeSerovalPlugin(serializationAdapter) {
  return /* @__PURE__ */ ai({
    tag: "$TSR/t/" + serializationAdapter.key,
    test: serializationAdapter.test,
    parse: {
      sync(value, ctx, _data) {
        return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
      },
      async async(value, ctx, _data) {
        return { v: await ctx.parse(serializationAdapter.toSerializable(value)) };
      },
      stream(value, ctx, _data) {
        return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
      }
    },
    serialize: void 0,
    deserialize(node, ctx, _data) {
      return serializationAdapter.fromSerializable(ctx.deserialize(node.v));
    }
  });
}

// node_modules/@tanstack/router-core/dist/esm/ssr/serializer/RawStream.js
var RawStream = class {
  constructor(stream, options) {
    this.stream = stream;
    this.hint = options?.hint ?? "binary";
  }
};
var BufferCtor = globalThis.Buffer;
var hasNodeBuffer = !!BufferCtor && typeof BufferCtor.from === "function";
function uint8ArrayToBase64(bytes) {
  if (bytes.length === 0) return "";
  if (hasNodeBuffer) return BufferCtor.from(bytes).toString("base64");
  const CHUNK_SIZE = 32768;
  const chunks = [];
  for (let i2 = 0; i2 < bytes.length; i2 += CHUNK_SIZE) {
    const chunk = bytes.subarray(i2, i2 + CHUNK_SIZE);
    chunks.push(String.fromCharCode.apply(null, chunk));
  }
  return btoa(chunks.join(""));
}
function base64ToUint8Array(base64) {
  if (base64.length === 0) return new Uint8Array(0);
  if (hasNodeBuffer) {
    const buf = BufferCtor.from(base64, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i2 = 0; i2 < binary.length; i2++) bytes[i2] = binary.charCodeAt(i2);
  return bytes;
}
var RAW_STREAM_FACTORY_BINARY = /* @__PURE__ */ Object.create(null);
var RAW_STREAM_FACTORY_TEXT = /* @__PURE__ */ Object.create(null);
var RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY = (stream) => new ReadableStream({ start(controller) {
  stream.on({
    next(base64) {
      try {
        controller.enqueue(base64ToUint8Array(base64));
      } catch {
      }
    },
    throw(error) {
      controller.error(error);
    },
    return() {
      try {
        controller.close();
      } catch {
      }
    }
  });
} });
var textEncoderForFactory = new TextEncoder();
var RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT = (stream) => {
  return new ReadableStream({ start(controller) {
    stream.on({
      next(value) {
        try {
          if (typeof value === "string") controller.enqueue(textEncoderForFactory.encode(value));
          else controller.enqueue(base64ToUint8Array(value.$b64));
        } catch {
        }
      },
      throw(error) {
        controller.error(error);
      },
      return() {
        try {
          controller.close();
        } catch {
        }
      }
    });
  } });
};
var FACTORY_BINARY = `(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))`;
var FACTORY_TEXT = `(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})`;
function toBinaryStream(readable) {
  const stream = re();
  const reader = readable.getReader();
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          stream.return(void 0);
          break;
        }
        stream.next(uint8ArrayToBase64(value));
      }
    } catch (error) {
      stream.throw(error);
    } finally {
      reader.releaseLock();
    }
  })();
  return stream;
}
function toTextStream(readable) {
  const stream = re();
  const reader = readable.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          try {
            const remaining = decoder.decode();
            if (remaining.length > 0) stream.next(remaining);
          } catch {
          }
          stream.return(void 0);
          break;
        }
        try {
          const text = decoder.decode(value, { stream: true });
          if (text.length > 0) stream.next(text);
        } catch {
          stream.next({ $b64: uint8ArrayToBase64(value) });
        }
      }
    } catch (error) {
      stream.throw(error);
    } finally {
      reader.releaseLock();
    }
  })();
  return stream;
}
var RawStreamSSRPlugin = /* @__PURE__ */ ai({
  tag: "tss/RawStream",
  extends: [/* @__PURE__ */ ai({
    tag: "tss/RawStreamFactory",
    test(value) {
      return value === RAW_STREAM_FACTORY_BINARY;
    },
    parse: {
      sync(_value, _ctx, _data) {
        return {};
      },
      async async(_value, _ctx, _data) {
        return {};
      },
      stream(_value, _ctx, _data) {
        return {};
      }
    },
    serialize(_node, _ctx, _data) {
      return FACTORY_BINARY;
    },
    deserialize(_node, _ctx, _data) {
      return RAW_STREAM_FACTORY_BINARY;
    }
  }), /* @__PURE__ */ ai({
    tag: "tss/RawStreamFactoryText",
    test(value) {
      return value === RAW_STREAM_FACTORY_TEXT;
    },
    parse: {
      sync(_value, _ctx, _data) {
        return {};
      },
      async async(_value, _ctx, _data) {
        return {};
      },
      stream(_value, _ctx, _data) {
        return {};
      }
    },
    serialize(_node, _ctx, _data) {
      return FACTORY_TEXT;
    },
    deserialize(_node, _ctx, _data) {
      return RAW_STREAM_FACTORY_TEXT;
    }
  })],
  test(value) {
    return value instanceof RawStream;
  },
  parse: {
    sync(value, ctx, _data) {
      const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
      return {
        hint: ctx.parse(value.hint),
        factory: ctx.parse(factory),
        stream: ctx.parse(re())
      };
    },
    async async(value, ctx, _data) {
      const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
      const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
      return {
        hint: await ctx.parse(value.hint),
        factory: await ctx.parse(factory),
        stream: await ctx.parse(encodedStream)
      };
    },
    stream(value, ctx, _data) {
      const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
      const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
      return {
        hint: ctx.parse(value.hint),
        factory: ctx.parse(factory),
        stream: ctx.parse(encodedStream)
      };
    }
  },
  serialize(node, ctx, _data) {
    return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
  },
  deserialize(node, ctx, _data) {
    const stream = ctx.deserialize(node.stream);
    return ctx.deserialize(node.hint) === "text" ? RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT(stream) : RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY(stream);
  }
});
// @__NO_SIDE_EFFECTS__
function createRawStreamRPCPlugin(onRawStream) {
  let nextStreamId = 1;
  return /* @__PURE__ */ ai({
    tag: "tss/RawStream",
    test(value) {
      return value instanceof RawStream;
    },
    parse: {
      async async(value, ctx, _data) {
        const streamId = nextStreamId++;
        onRawStream(streamId, value.stream);
        return { streamId: await ctx.parse(streamId) };
      },
      stream(value, ctx, _data) {
        const streamId = nextStreamId++;
        onRawStream(streamId, value.stream);
        return { streamId: ctx.parse(streamId) };
      }
    },
    serialize() {
      throw new Error("RawStreamRPCPlugin.serialize should not be called. RPC uses JSON serialization, not JS code generation.");
    },
    deserialize() {
      throw new Error("RawStreamRPCPlugin.deserialize should not be called. Use createRawStreamDeserializePlugin on client.");
    }
  });
}

// node_modules/@tanstack/router-core/dist/esm/ssr/serializer/ShallowErrorPlugin.js
var ShallowErrorPlugin = /* @__PURE__ */ ai({
  tag: "$TSR/Error",
  test(value) {
    return value instanceof Error;
  },
  parse: {
    sync(value, ctx) {
      return { message: ctx.parse(value.message) };
    },
    async async(value, ctx) {
      return { message: await ctx.parse(value.message) };
    },
    stream(value, ctx) {
      return { message: ctx.parse(value.message) };
    }
  },
  serialize(node, ctx) {
    return "new Error(" + ctx.serialize(node.message) + ")";
  },
  deserialize(node, ctx) {
    return new Error(ctx.deserialize(node.message));
  }
});

// node_modules/seroval-plugins/dist/esm/production/web.mjs
var u = (e) => {
  let r = new AbortController(), a = r.abort.bind(r);
  return e.then(a, a), r;
};
function E2(e) {
  e(this.reason);
}
function D2(e) {
  this.addEventListener("abort", E2.bind(this, e), { once: true });
}
function c2(e) {
  return new Promise(D2.bind(e));
}
var i = {};
var F2 = ai({ tag: "seroval-plugins/web/AbortControllerFactoryPlugin", test(e) {
  return e === i;
}, parse: { sync() {
  return i;
}, async async() {
  return await Promise.resolve(i);
}, stream() {
  return i;
} }, serialize() {
  return u.toString();
}, deserialize() {
  return u;
} });
var A2 = ai({ tag: "seroval-plugins/web/AbortSignal", extends: [F2], test(e) {
  return typeof AbortSignal == "undefined" ? false : e instanceof AbortSignal;
}, parse: { sync(e, r) {
  return e.aborted ? { reason: r.parse(e.reason) } : {};
}, async async(e, r) {
  if (e.aborted) return { reason: await r.parse(e.reason) };
  let a = await c2(e);
  return { reason: await r.parse(a) };
}, stream(e, r) {
  if (e.aborted) return { reason: r.parse(e.reason) };
  let a = c2(e);
  return { factory: r.parse(i), controller: r.parse(a) };
} }, serialize(e, r) {
  return e.reason ? "AbortSignal.abort(" + r.serialize(e.reason) + ")" : e.controller && e.factory ? "(" + r.serialize(e.factory) + ")(" + r.serialize(e.controller) + ").signal" : "(new AbortController).signal";
}, deserialize(e, r) {
  return e.reason ? AbortSignal.abort(r.deserialize(e.reason)) : e.controller ? u(r.deserialize(e.controller)).signal : new AbortController().signal;
} });
var I2 = ai({ tag: "seroval-plugins/web/Blob", test(e) {
  return typeof Blob == "undefined" ? false : e instanceof Blob;
}, parse: { async async(e, r) {
  return { type: await r.parse(e.type), buffer: await r.parse(await e.arrayBuffer()) };
} }, serialize(e, r) {
  return "new Blob([" + r.serialize(e.buffer) + "],{type:" + r.serialize(e.type) + "})";
}, deserialize(e, r) {
  return new Blob([r.deserialize(e.buffer)], { type: r.deserialize(e.type) });
} });
function d(e) {
  return { detail: e.detail, bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var U2 = ai({ tag: "seroval-plugins/web/CustomEvent", test(e) {
  return typeof CustomEvent == "undefined" ? false : e instanceof CustomEvent;
}, parse: { sync(e, r) {
  return { type: r.parse(e.type), options: r.parse(d(e)) };
}, async async(e, r) {
  return { type: await r.parse(e.type), options: await r.parse(d(e)) };
}, stream(e, r) {
  return { type: r.parse(e.type), options: r.parse(d(e)) };
} }, serialize(e, r) {
  return "new CustomEvent(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new CustomEvent(r.deserialize(e.type), r.deserialize(e.options));
} });
var _2 = ai({ tag: "seroval-plugins/web/DOMException", test(e) {
  return typeof DOMException == "undefined" ? false : e instanceof DOMException;
}, parse: { sync(e, r) {
  return { name: r.parse(e.name), message: r.parse(e.message) };
}, async async(e, r) {
  return { name: await r.parse(e.name), message: await r.parse(e.message) };
}, stream(e, r) {
  return { name: r.parse(e.name), message: r.parse(e.message) };
} }, serialize(e, r) {
  return "new DOMException(" + r.serialize(e.message) + "," + r.serialize(e.name) + ")";
}, deserialize(e, r) {
  return new DOMException(r.deserialize(e.message), r.deserialize(e.name));
} });
function f2(e) {
  return { bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var k2 = ai({ tag: "seroval-plugins/web/Event", test(e) {
  return typeof Event == "undefined" ? false : e instanceof Event;
}, parse: { sync(e, r) {
  return { type: r.parse(e.type), options: r.parse(f2(e)) };
}, async async(e, r) {
  return { type: await r.parse(e.type), options: await r.parse(f2(e)) };
}, stream(e, r) {
  return { type: r.parse(e.type), options: r.parse(f2(e)) };
} }, serialize(e, r) {
  return "new Event(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new Event(r.deserialize(e.type), r.deserialize(e.options));
} });
var V2 = ai({ tag: "seroval-plugins/web/File", test(e) {
  return typeof File == "undefined" ? false : e instanceof File;
}, parse: { async async(e, r) {
  return { name: await r.parse(e.name), options: await r.parse({ type: e.type, lastModified: e.lastModified }), buffer: await r.parse(await e.arrayBuffer()) };
} }, serialize(e, r) {
  return "new File([" + r.serialize(e.buffer) + "]," + r.serialize(e.name) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new File([r.deserialize(e.buffer)], r.deserialize(e.name), r.deserialize(e.options));
} });
var m2 = V2;
function y2(e) {
  let r = [];
  return e.forEach((a, t) => {
    r.push([t, a]);
  }), r;
}
var o2 = {};
var v2 = (e, r = new FormData(), a = 0, t = e.length, s) => {
  for (; a < t; a++) s = e[a], r.append(s[0], s[1]);
  return r;
};
var G = ai({ tag: "seroval-plugins/web/FormDataFactory", test(e) {
  return e === o2;
}, parse: { sync() {
  return o2;
}, async async() {
  return await Promise.resolve(o2);
}, stream() {
  return o2;
} }, serialize() {
  return v2.toString();
}, deserialize() {
  return o2;
} });
var J2 = ai({ tag: "seroval-plugins/web/FormData", extends: [m2, G], test(e) {
  return typeof FormData == "undefined" ? false : e instanceof FormData;
}, parse: { sync(e, r) {
  return { factory: r.parse(o2), entries: r.parse(y2(e)) };
}, async async(e, r) {
  return { factory: await r.parse(o2), entries: await r.parse(y2(e)) };
}, stream(e, r) {
  return { factory: r.parse(o2), entries: r.parse(y2(e)) };
} }, serialize(e, r) {
  return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.entries) + ")";
}, deserialize(e, r) {
  return v2(r.deserialize(e.entries));
} });
function g(e) {
  let r = [];
  return e.forEach((a, t) => {
    r.push([t, a]);
  }), r;
}
var W2 = ai({ tag: "seroval-plugins/web/Headers", test(e) {
  return typeof Headers == "undefined" ? false : e instanceof Headers;
}, parse: { sync(e, r) {
  return { value: r.parse(g(e)) };
}, async async(e, r) {
  return { value: await r.parse(g(e)) };
}, stream(e, r) {
  return { value: r.parse(g(e)) };
} }, serialize(e, r) {
  return "new Headers(" + r.serialize(e.value) + ")";
}, deserialize(e, r) {
  return new Headers(r.deserialize(e.value));
} });
var l = W2;
var Z2 = ai({ tag: "seroval-plugins/web/ImageData", test(e) {
  return typeof ImageData == "undefined" ? false : e instanceof ImageData;
}, parse: { sync(e, r) {
  return { data: r.parse(e.data), width: r.parse(e.width), height: r.parse(e.height), options: r.parse({ colorSpace: e.colorSpace }) };
}, async async(e, r) {
  return { data: await r.parse(e.data), width: await r.parse(e.width), height: await r.parse(e.height), options: await r.parse({ colorSpace: e.colorSpace }) };
}, stream(e, r) {
  return { data: r.parse(e.data), width: r.parse(e.width), height: r.parse(e.height), options: r.parse({ colorSpace: e.colorSpace }) };
} }, serialize(e, r) {
  return "new ImageData(" + r.serialize(e.data) + "," + r.serialize(e.width) + "," + r.serialize(e.height) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new ImageData(r.deserialize(e.data), r.deserialize(e.width), r.deserialize(e.height), r.deserialize(e.options));
} });
var n = {};
var P2 = (e) => new ReadableStream({ start: (r) => {
  e.on({ next: (a) => {
    try {
      r.enqueue(a);
    } catch (t) {
    }
  }, throw: (a) => {
    r.error(a);
  }, return: () => {
    try {
      r.close();
    } catch (a) {
    }
  } });
} });
var x2 = ai({ tag: "seroval-plugins/web/ReadableStreamFactory", test(e) {
  return e === n;
}, parse: { sync() {
  return n;
}, async async() {
  return await Promise.resolve(n);
}, stream() {
  return n;
} }, serialize() {
  return P2.toString();
}, deserialize() {
  return n;
} });
function w2(e) {
  let r = re(), a = e.getReader();
  async function t() {
    try {
      let s = await a.read();
      s.done ? r.return(s.value) : (r.next(s.value), await t());
    } catch (s) {
      r.throw(s);
    }
  }
  return t().catch(() => {
  }), r;
}
var ee2 = ai({ tag: "seroval/plugins/web/ReadableStream", extends: [x2], test(e) {
  return typeof ReadableStream == "undefined" ? false : e instanceof ReadableStream;
}, parse: { sync(e, r) {
  return { factory: r.parse(n), stream: r.parse(re()) };
}, async async(e, r) {
  return { factory: await r.parse(n), stream: await r.parse(w2(e)) };
}, stream(e, r) {
  return { factory: r.parse(n), stream: r.parse(w2(e)) };
} }, serialize(e, r) {
  return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.stream) + ")";
}, deserialize(e, r) {
  let a = r.deserialize(e.stream);
  return P2(a);
} });
var p2 = ee2;
function N2(e, r) {
  return { body: r, cache: e.cache, credentials: e.credentials, headers: e.headers, integrity: e.integrity, keepalive: e.keepalive, method: e.method, mode: e.mode, redirect: e.redirect, referrer: e.referrer, referrerPolicy: e.referrerPolicy };
}
var ae2 = ai({ tag: "seroval-plugins/web/Request", extends: [p2, l], test(e) {
  return typeof Request == "undefined" ? false : e instanceof Request;
}, parse: { async async(e, r) {
  return { url: await r.parse(e.url), options: await r.parse(N2(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null)) };
}, stream(e, r) {
  return { url: r.parse(e.url), options: r.parse(N2(e, e.body && !e.bodyUsed ? e.clone().body : null)) };
} }, serialize(e, r) {
  return "new Request(" + r.serialize(e.url) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new Request(r.deserialize(e.url), r.deserialize(e.options));
} });
function h2(e) {
  return { headers: e.headers, status: e.status, statusText: e.statusText };
}
var oe2 = ai({ tag: "seroval-plugins/web/Response", extends: [p2, l], test(e) {
  return typeof Response == "undefined" ? false : e instanceof Response;
}, parse: { async async(e, r) {
  return { body: await r.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null), options: await r.parse(h2(e)) };
}, stream(e, r) {
  return { body: r.parse(e.body && !e.bodyUsed ? e.clone().body : null), options: r.parse(h2(e)) };
} }, serialize(e, r) {
  return "new Response(" + r.serialize(e.body) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new Response(r.deserialize(e.body), r.deserialize(e.options));
} });
var le2 = ai({ tag: "seroval-plugins/web/URL", test(e) {
  return typeof URL == "undefined" ? false : e instanceof URL;
}, parse: { sync(e, r) {
  return { value: r.parse(e.href) };
}, async async(e, r) {
  return { value: await r.parse(e.href) };
}, stream(e, r) {
  return { value: r.parse(e.href) };
} }, serialize(e, r) {
  return "new URL(" + r.serialize(e.value) + ")";
}, deserialize(e, r) {
  return new URL(r.deserialize(e.value));
} });
var de2 = ai({ tag: "seroval-plugins/web/URLSearchParams", test(e) {
  return typeof URLSearchParams == "undefined" ? false : e instanceof URLSearchParams;
}, parse: { sync(e, r) {
  return { value: r.parse(e.toString()) };
}, async async(e, r) {
  return { value: await r.parse(e.toString()) };
}, stream(e, r) {
  return { value: r.parse(e.toString()) };
} }, serialize(e, r) {
  return "new URLSearchParams(" + r.serialize(e.value) + ")";
}, deserialize(e, r) {
  return new URLSearchParams(r.deserialize(e.value));
} });

// node_modules/@tanstack/router-core/dist/esm/ssr/serializer/seroval-plugins.js
var defaultSerovalPlugins = [
  ShallowErrorPlugin,
  RawStreamSSRPlugin,
  p2
];

// node_modules/@tanstack/router-core/dist/esm/qss.js
function encode(obj, stringify = String) {
  const result = new URLSearchParams();
  for (const key in obj) {
    const val = obj[key];
    if (val !== void 0) result.set(key, stringify(val));
  }
  return result.toString();
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
  const searchParams = new URLSearchParams(str);
  const result = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of searchParams.entries()) {
    const previousValue = result[key];
    if (previousValue == null) result[key] = toValue(value);
    else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
    else result[key] = [previousValue, toValue(value)];
  }
  return result;
}

// node_modules/@tanstack/router-core/dist/esm/searchParams.js
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr[0] === "?") searchStr = searchStr.substring(1);
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") try {
        query[key] = parser(value);
      } catch (_err) {
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  const hasParser = typeof parser === "function";
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) try {
      return stringify(val);
    } catch (_err) {
    }
    else if (hasParser && typeof val === "string") try {
      parser(val);
      return stringify(val);
    } catch (_err) {
    }
    return val;
  }
  return (search) => {
    const searchStr = encode(search, stringifyValue);
    return searchStr ? `?${searchStr}` : "";
  };
}

// node_modules/@tanstack/router-core/dist/esm/load-matches.js
var triggerOnReady = (inner) => {
  if (!inner.rendered) {
    inner.rendered = true;
    return inner.onReady?.();
  }
};
var hasForcePendingActiveMatch = (router) => {
  return router.stores.matchesId.get().some((matchId) => {
    return router.stores.matchStores.get(matchId)?.get()._forcePending;
  });
};
var resolvePreload = (inner, matchId) => {
  return !!(inner.preload && !inner.router.stores.matchStores.has(matchId));
};
var buildMatchContext = (inner, index, includeCurrentMatch = true) => {
  const context = { ...inner.router.options.context ?? {} };
  const end = includeCurrentMatch ? index : index - 1;
  for (let i2 = 0; i2 <= end; i2++) {
    const innerMatch = inner.matches[i2];
    if (!innerMatch) continue;
    const m3 = inner.router.getMatch(innerMatch.id);
    if (!m3) continue;
    Object.assign(context, m3.__routeContext, m3.__beforeLoadContext);
  }
  return context;
};
var getNotFoundBoundaryIndex = (inner, err) => {
  if (!inner.matches.length) return;
  const requestedRouteId = err.routeId;
  const matchedRootIndex = inner.matches.findIndex((m3) => m3.routeId === inner.router.routeTree.id);
  const rootIndex = matchedRootIndex >= 0 ? matchedRootIndex : 0;
  let startIndex = requestedRouteId ? inner.matches.findIndex((match) => match.routeId === requestedRouteId) : inner.firstBadMatchIndex ?? inner.matches.length - 1;
  if (startIndex < 0) startIndex = rootIndex;
  for (let i2 = startIndex; i2 >= 0; i2--) {
    const match = inner.matches[i2];
    if (inner.router.looseRoutesById[match.routeId].options.notFoundComponent) return i2;
  }
  return requestedRouteId ? startIndex : rootIndex;
};
var handleRedirectAndNotFound = (inner, match, err) => {
  if (!isRedirect(err) && !isNotFound(err)) return;
  if (isRedirect(err) && err.redirectHandled && !err.options.reloadDocument) throw err;
  if (match) {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    match._nonReactive.loaderPromise = void 0;
    match._nonReactive.error = err;
    inner.updateMatch(match.id, (prev) => ({
      ...prev,
      status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : prev.status === "pending" ? "success" : prev.status,
      context: buildMatchContext(inner, match.index),
      isFetching: false,
      error: err
    }));
    if (isNotFound(err) && !err.routeId) err.routeId = match.routeId;
    match._nonReactive.loadPromise?.resolve();
  }
  if (isRedirect(err)) {
    inner.rendered = true;
    err.options._fromLocation = inner.location;
    err.redirectHandled = true;
    err = inner.router.resolveRedirect(err);
  }
  throw err;
};
var shouldSkipLoader = (inner, matchId) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return true;
  if (!(isServer ?? inner.router.isServer) && match._nonReactive.dehydrated) return true;
  if ((isServer ?? inner.router.isServer) && match.ssr === false) return true;
  return false;
};
var syncMatchContext = (inner, matchId, index) => {
  const nextContext = buildMatchContext(inner, index);
  inner.updateMatch(matchId, (prev) => {
    return {
      ...prev,
      context: nextContext
    };
  });
};
var handleSerialError = (inner, index, err) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  if (err instanceof Promise) throw err;
  inner.firstBadMatchIndex ??= index;
  handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  try {
    route.options.onError?.(err);
  } catch (errorHandlerErr) {
    err = errorHandlerErr;
    handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  }
  inner.updateMatch(matchId, (prev) => {
    prev._nonReactive.beforeLoadPromise?.resolve();
    prev._nonReactive.beforeLoadPromise = void 0;
    prev._nonReactive.loadPromise?.resolve();
    return {
      ...prev,
      error: err,
      status: "error",
      isFetching: false,
      updatedAt: Date.now(),
      abortController: new AbortController()
    };
  });
  if (!inner.preload && !isRedirect(err) && !isNotFound(err)) inner.serialError ??= err;
};
var isBeforeLoadSsr = (inner, matchId, index, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  const parentMatchId = inner.matches[index - 1]?.id;
  const parentMatch = parentMatchId ? inner.router.getMatch(parentMatchId) : void 0;
  if (inner.router.isShell()) {
    existingMatch.ssr = route.id === rootRouteId;
    return;
  }
  if (parentMatch?.ssr === false) {
    existingMatch.ssr = false;
    return;
  }
  const parentOverride = (tempSsr2) => {
    if (tempSsr2 === true && parentMatch?.ssr === "data-only") return "data-only";
    return tempSsr2;
  };
  const defaultSsr = inner.router.options.defaultSsr ?? true;
  if (route.options.ssr === void 0) {
    existingMatch.ssr = parentOverride(defaultSsr);
    return;
  }
  if (typeof route.options.ssr !== "function") {
    existingMatch.ssr = parentOverride(route.options.ssr);
    return;
  }
  const { search, params } = existingMatch;
  const ssrFnContext = {
    search: makeMaybe(search, existingMatch.searchError),
    params: makeMaybe(params, existingMatch.paramsError),
    location: inner.location,
    matches: inner.matches.map((match) => ({
      index: match.index,
      pathname: match.pathname,
      fullPath: match.fullPath,
      staticData: match.staticData,
      id: match.id,
      routeId: match.routeId,
      search: makeMaybe(match.search, match.searchError),
      params: makeMaybe(match.params, match.paramsError),
      ssr: match.ssr
    }))
  };
  const tempSsr = route.options.ssr(ssrFnContext);
  if (isPromise(tempSsr)) return tempSsr.then((ssr) => {
    existingMatch.ssr = parentOverride(ssr ?? defaultSsr);
  });
  existingMatch.ssr = parentOverride(tempSsr ?? defaultSsr);
};
var setupPendingTimeout = (inner, matchId, route, match) => {
  if (match._nonReactive.pendingTimeout !== void 0) return;
  const pendingMs = route.options.pendingMs ?? inner.router.options.defaultPendingMs;
  if (!!(inner.onReady && !(isServer ?? inner.router.isServer) && !resolvePreload(inner, matchId) && (route.options.loader || route.options.beforeLoad || routeNeedsPreload(route)) && typeof pendingMs === "number" && pendingMs !== Infinity && (route.options.pendingComponent ?? inner.router.options?.defaultPendingComponent))) {
    const pendingTimeout = setTimeout(() => {
      triggerOnReady(inner);
    }, pendingMs);
    match._nonReactive.pendingTimeout = pendingTimeout;
  }
};
var preBeforeLoadSetup = (inner, matchId, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  if (!existingMatch._nonReactive.beforeLoadPromise && !existingMatch._nonReactive.loaderPromise) return;
  setupPendingTimeout(inner, matchId, route, existingMatch);
  const then = () => {
    const match = inner.router.getMatch(matchId);
    if (match.preload && (match.status === "redirected" || match.status === "notFound")) handleRedirectAndNotFound(inner, match, match.error);
  };
  return existingMatch._nonReactive.beforeLoadPromise ? existingMatch._nonReactive.beforeLoadPromise.then(then) : then();
};
var executeBeforeLoad = (inner, matchId, index, route) => {
  const match = inner.router.getMatch(matchId);
  let prevLoadPromise = match._nonReactive.loadPromise;
  match._nonReactive.loadPromise = createControlledPromise(() => {
    prevLoadPromise?.resolve();
    prevLoadPromise = void 0;
  });
  const { paramsError, searchError } = match;
  if (paramsError) handleSerialError(inner, index, paramsError);
  if (searchError) handleSerialError(inner, index, searchError);
  setupPendingTimeout(inner, matchId, route, match);
  const abortController = new AbortController();
  let isPending = false;
  const pending = () => {
    if (isPending) return;
    isPending = true;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: "beforeLoad",
      fetchCount: prev.fetchCount + 1,
      abortController
    }));
  };
  const resolve = () => {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: false
    }));
  };
  if (!route.options.beforeLoad) {
    inner.router.batch(() => {
      pending();
      resolve();
    });
    return;
  }
  match._nonReactive.beforeLoadPromise = createControlledPromise();
  const context = {
    ...buildMatchContext(inner, index, false),
    ...match.__routeContext
  };
  const { search, params, cause } = match;
  const preload = resolvePreload(inner, matchId);
  const beforeLoadFnContext = {
    search,
    abortController,
    params,
    preload,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    buildLocation: inner.router.buildLocation,
    cause: preload ? "preload" : cause,
    matches: inner.matches,
    routeId: route.id,
    ...inner.router.options.additionalContext
  };
  const updateContext = (beforeLoadContext2) => {
    if (beforeLoadContext2 === void 0) {
      inner.router.batch(() => {
        pending();
        resolve();
      });
      return;
    }
    if (isRedirect(beforeLoadContext2) || isNotFound(beforeLoadContext2)) {
      pending();
      handleSerialError(inner, index, beforeLoadContext2);
    }
    inner.router.batch(() => {
      pending();
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        __beforeLoadContext: beforeLoadContext2
      }));
      resolve();
    });
  };
  let beforeLoadContext;
  try {
    beforeLoadContext = route.options.beforeLoad(beforeLoadFnContext);
    if (isPromise(beforeLoadContext)) {
      pending();
      return beforeLoadContext.catch((err) => {
        handleSerialError(inner, index, err);
      }).then(updateContext);
    }
  } catch (err) {
    pending();
    handleSerialError(inner, index, err);
  }
  updateContext(beforeLoadContext);
};
var handleBeforeLoad = (inner, index) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  const serverSsr = () => {
    if (isServer ?? inner.router.isServer) {
      const maybePromise = isBeforeLoadSsr(inner, matchId, index, route);
      if (isPromise(maybePromise)) return maybePromise.then(queueExecution);
    }
    return queueExecution();
  };
  const execute = () => executeBeforeLoad(inner, matchId, index, route);
  const queueExecution = () => {
    if (shouldSkipLoader(inner, matchId)) return;
    const result = preBeforeLoadSetup(inner, matchId, route);
    return isPromise(result) ? result.then(execute) : execute();
  };
  return serverSsr();
};
var executeHead = (inner, matchId, route) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return;
  if (!route.options.head && !route.options.scripts && !route.options.headers) return;
  const assetContext = {
    ssr: inner.router.options.ssr,
    matches: inner.matches,
    match,
    params: match.params,
    loaderData: match.loaderData
  };
  return Promise.all([
    route.options.head?.(assetContext),
    route.options.scripts?.(assetContext),
    route.options.headers?.(assetContext)
  ]).then(([headFnContent, scripts, headers]) => {
    return {
      meta: headFnContent?.meta,
      links: headFnContent?.links,
      headScripts: headFnContent?.scripts,
      headers,
      scripts,
      styles: headFnContent?.styles
    };
  });
};
var getLoaderContext = (inner, matchPromises, matchId, index, route) => {
  const parentMatchPromise = matchPromises[index - 1];
  const { params, loaderDeps, abortController, cause } = inner.router.getMatch(matchId);
  const context = buildMatchContext(inner, index);
  const preload = resolvePreload(inner, matchId);
  return {
    params,
    deps: loaderDeps,
    preload: !!preload,
    parentMatchPromise,
    abortController,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    cause: preload ? "preload" : cause,
    route,
    ...inner.router.options.additionalContext
  };
};
var runLoader = async (inner, matchPromises, matchId, index, route) => {
  try {
    const match = inner.router.getMatch(matchId);
    try {
      if (!(isServer ?? inner.router.isServer) || match.ssr === true) loadRouteChunk(route);
      const routeLoader = route.options.loader;
      const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
      const loaderResult = loader?.(getLoaderContext(inner, matchPromises, matchId, index, route));
      const loaderResultIsPromise = !!loader && isPromise(loaderResult);
      if (!!(loaderResultIsPromise || route._lazyPromise || route._componentsPromise || route.options.head || route.options.scripts || route.options.headers || match._nonReactive.minPendingPromise)) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        isFetching: "loader"
      }));
      if (loader) {
        const loaderData = loaderResultIsPromise ? await loaderResult : loaderResult;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), loaderData);
        if (loaderData !== void 0) inner.updateMatch(matchId, (prev) => ({
          ...prev,
          loaderData
        }));
      }
      if (route._lazyPromise) await route._lazyPromise;
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (route._componentsPromise) await route._componentsPromise;
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error: void 0,
        context: buildMatchContext(inner, index),
        status: "success",
        isFetching: false,
        updatedAt: Date.now()
      }));
    } catch (e) {
      let error = e;
      if (error?.name === "AbortError") {
        if (match.abortController.signal.aborted) {
          match._nonReactive.loaderPromise?.resolve();
          match._nonReactive.loaderPromise = void 0;
          return;
        }
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          status: prev.status === "pending" ? "success" : prev.status,
          isFetching: false,
          context: buildMatchContext(inner, index)
        }));
        return;
      }
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (isNotFound(e)) await route.options.notFoundComponent?.preload?.();
      handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), e);
      try {
        route.options.onError?.(e);
      } catch (onErrorError) {
        error = onErrorError;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), onErrorError);
      }
      if (!isRedirect(error) && !isNotFound(error)) await loadRouteChunk(route, ["errorComponent"]);
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error,
        context: buildMatchContext(inner, index),
        status: "error",
        isFetching: false
      }));
    }
  } catch (err) {
    const match = inner.router.getMatch(matchId);
    if (match) match._nonReactive.loaderPromise = void 0;
    handleRedirectAndNotFound(inner, match, err);
  }
};
var loadRouteMatch = async (inner, matchPromises, index) => {
  async function handleLoader(preload, prevMatch, previousRouteMatchId, match2, route2) {
    const age = Date.now() - prevMatch.updatedAt;
    const staleAge = preload ? route2.options.preloadStaleTime ?? inner.router.options.defaultPreloadStaleTime ?? 3e4 : route2.options.staleTime ?? inner.router.options.defaultStaleTime ?? 0;
    const shouldReloadOption = route2.options.shouldReload;
    const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext(inner, matchPromises, matchId, index, route2)) : shouldReloadOption;
    const { status, invalid } = match2;
    const staleMatchShouldReload = age >= staleAge && (!!inner.forceStaleReload || match2.cause === "enter" || previousRouteMatchId !== void 0 && previousRouteMatchId !== match2.id);
    loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? staleMatchShouldReload));
    if (preload && route2.options.preload === false) {
    } else if (loaderShouldRunAsync && !inner.sync && shouldReloadInBackground) {
      loaderIsRunningAsync = true;
      (async () => {
        try {
          await runLoader(inner, matchPromises, matchId, index, route2);
          const match3 = inner.router.getMatch(matchId);
          match3._nonReactive.loaderPromise?.resolve();
          match3._nonReactive.loadPromise?.resolve();
          match3._nonReactive.loaderPromise = void 0;
          match3._nonReactive.loadPromise = void 0;
        } catch (err) {
          if (isRedirect(err)) await inner.router.navigate(err.options);
        }
      })();
    } else if (status !== "success" || loaderShouldRunAsync) await runLoader(inner, matchPromises, matchId, index, route2);
    else syncMatchContext(inner, matchId, index);
  }
  const { id: matchId, routeId } = inner.matches[index];
  let loaderShouldRunAsync = false;
  let loaderIsRunningAsync = false;
  const route = inner.router.looseRoutesById[routeId];
  const routeLoader = route.options.loader;
  const shouldReloadInBackground = ((typeof routeLoader === "function" ? void 0 : routeLoader?.staleReloadMode) ?? inner.router.options.defaultStaleReloadMode) !== "blocking";
  if (shouldSkipLoader(inner, matchId)) {
    if (!inner.router.getMatch(matchId)) return inner.matches[index];
    syncMatchContext(inner, matchId, index);
    if (isServer ?? inner.router.isServer) return inner.router.getMatch(matchId);
  } else {
    const prevMatch = inner.router.getMatch(matchId);
    const activeIdAtIndex = inner.router.stores.matchesId.get()[index];
    const previousRouteMatchId = (activeIdAtIndex && inner.router.stores.matchStores.get(activeIdAtIndex) || null)?.routeId === routeId ? activeIdAtIndex : inner.router.stores.matches.get().find((d2) => d2.routeId === routeId)?.id;
    const preload = resolvePreload(inner, matchId);
    if (prevMatch._nonReactive.loaderPromise) {
      if (prevMatch.status === "success" && !inner.sync && !prevMatch.preload && shouldReloadInBackground) return prevMatch;
      await prevMatch._nonReactive.loaderPromise;
      const match2 = inner.router.getMatch(matchId);
      const error = match2._nonReactive.error || match2.error;
      if (error) handleRedirectAndNotFound(inner, match2, error);
      if (match2.status === "pending") await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    } else {
      const nextPreload = preload && !inner.router.stores.matchStores.has(matchId);
      const match2 = inner.router.getMatch(matchId);
      match2._nonReactive.loaderPromise = createControlledPromise();
      if (nextPreload !== match2.preload) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        preload: nextPreload
      }));
      await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    }
  }
  const match = inner.router.getMatch(matchId);
  if (!loaderIsRunningAsync) {
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.loadPromise?.resolve();
    match._nonReactive.loadPromise = void 0;
  }
  clearTimeout(match._nonReactive.pendingTimeout);
  match._nonReactive.pendingTimeout = void 0;
  if (!loaderIsRunningAsync) match._nonReactive.loaderPromise = void 0;
  match._nonReactive.dehydrated = void 0;
  const nextIsFetching = loaderIsRunningAsync ? match.isFetching : false;
  if (nextIsFetching !== match.isFetching || match.invalid !== false) {
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: nextIsFetching,
      invalid: false
    }));
    return inner.router.getMatch(matchId);
  } else return match;
};
async function loadMatches(arg) {
  const inner = arg;
  const matchPromises = [];
  if (!(isServer ?? inner.router.isServer) && hasForcePendingActiveMatch(inner.router)) triggerOnReady(inner);
  let beforeLoadNotFound;
  for (let i2 = 0; i2 < inner.matches.length; i2++) {
    try {
      const beforeLoad = handleBeforeLoad(inner, i2);
      if (isPromise(beforeLoad)) await beforeLoad;
    } catch (err) {
      if (isRedirect(err)) throw err;
      if (isNotFound(err)) beforeLoadNotFound = err;
      else if (!inner.preload) throw err;
      break;
    }
    if (inner.serialError || inner.firstBadMatchIndex != null) break;
  }
  const baseMaxIndexExclusive = inner.firstBadMatchIndex ?? inner.matches.length;
  const boundaryIndex = beforeLoadNotFound && !inner.preload ? getNotFoundBoundaryIndex(inner, beforeLoadNotFound) : void 0;
  const maxIndexExclusive = beforeLoadNotFound && inner.preload ? 0 : boundaryIndex !== void 0 ? Math.min(boundaryIndex + 1, baseMaxIndexExclusive) : baseMaxIndexExclusive;
  let firstNotFound;
  let firstUnhandledRejection;
  for (let i2 = 0; i2 < maxIndexExclusive; i2++) matchPromises.push(loadRouteMatch(inner, matchPromises, i2));
  try {
    await Promise.all(matchPromises);
  } catch {
    const settled = await Promise.allSettled(matchPromises);
    for (const result of settled) {
      if (result.status !== "rejected") continue;
      const reason = result.reason;
      if (isRedirect(reason)) throw reason;
      if (isNotFound(reason)) firstNotFound ??= reason;
      else firstUnhandledRejection ??= reason;
    }
    if (firstUnhandledRejection !== void 0) throw firstUnhandledRejection;
  }
  const notFoundToThrow = firstNotFound ?? (beforeLoadNotFound && !inner.preload ? beforeLoadNotFound : void 0);
  let headMaxIndex = inner.firstBadMatchIndex !== void 0 ? inner.firstBadMatchIndex : inner.matches.length - 1;
  if (!notFoundToThrow && beforeLoadNotFound && inner.preload) return inner.matches;
  if (notFoundToThrow) {
    const renderedBoundaryIndex = getNotFoundBoundaryIndex(inner, notFoundToThrow);
    if (renderedBoundaryIndex === void 0) {
      if (process.env.NODE_ENV !== "production") throw new Error("Invariant failed: Could not find match for notFound boundary");
      invariant();
    }
    const boundaryMatch = inner.matches[renderedBoundaryIndex];
    const boundaryRoute = inner.router.looseRoutesById[boundaryMatch.routeId];
    const defaultNotFoundComponent = inner.router.options?.defaultNotFoundComponent;
    if (!boundaryRoute.options.notFoundComponent && defaultNotFoundComponent) boundaryRoute.options.notFoundComponent = defaultNotFoundComponent;
    notFoundToThrow.routeId = boundaryMatch.routeId;
    const boundaryIsRoot = boundaryMatch.routeId === inner.router.routeTree.id;
    inner.updateMatch(boundaryMatch.id, (prev) => ({
      ...prev,
      ...boundaryIsRoot ? {
        status: "success",
        globalNotFound: true,
        error: void 0
      } : {
        status: "notFound",
        error: notFoundToThrow
      },
      isFetching: false
    }));
    headMaxIndex = renderedBoundaryIndex;
    await loadRouteChunk(boundaryRoute, ["notFoundComponent"]);
  } else if (!inner.preload) {
    const rootMatch = inner.matches[0];
    if (!rootMatch.globalNotFound) {
      if (inner.router.getMatch(rootMatch.id)?.globalNotFound) inner.updateMatch(rootMatch.id, (prev) => ({
        ...prev,
        globalNotFound: false,
        error: void 0
      }));
    }
  }
  if (inner.serialError && inner.firstBadMatchIndex !== void 0) {
    const errorRoute = inner.router.looseRoutesById[inner.matches[inner.firstBadMatchIndex].routeId];
    await loadRouteChunk(errorRoute, ["errorComponent"]);
  }
  for (let i2 = 0; i2 <= headMaxIndex; i2++) {
    const { id: matchId, routeId } = inner.matches[i2];
    const route = inner.router.looseRoutesById[routeId];
    try {
      const headResult = executeHead(inner, matchId, route);
      if (headResult) {
        const head = await headResult;
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          ...head
        }));
      }
    } catch (err) {
      console.error(`Error executing head for route ${routeId}:`, err);
    }
  }
  const readyPromise = triggerOnReady(inner);
  if (isPromise(readyPromise)) await readyPromise;
  if (notFoundToThrow) throw notFoundToThrow;
  if (inner.serialError && !inner.preload && !inner.onReady) throw inner.serialError;
  return inner.matches;
}
function preloadRouteComponents(route, componentTypesToLoad) {
  const preloads = componentTypesToLoad.map((type) => route.options[type]?.preload?.()).filter(Boolean);
  if (preloads.length === 0) return void 0;
  return Promise.all(preloads);
}
function loadRouteChunk(route, componentTypesToLoad = componentTypes) {
  if (!route._lazyLoaded && route._lazyPromise === void 0) if (route.lazyFn) route._lazyPromise = route.lazyFn().then((lazyRoute) => {
    const { id: _id, ...options } = lazyRoute.options;
    Object.assign(route.options, options);
    route._lazyLoaded = true;
    route._lazyPromise = void 0;
  });
  else route._lazyLoaded = true;
  const runAfterLazy = () => route._componentsLoaded ? void 0 : componentTypesToLoad === componentTypes ? (() => {
    if (route._componentsPromise === void 0) {
      const componentsPromise = preloadRouteComponents(route, componentTypes);
      if (componentsPromise) route._componentsPromise = componentsPromise.then(() => {
        route._componentsLoaded = true;
        route._componentsPromise = void 0;
      });
      else route._componentsLoaded = true;
    }
    return route._componentsPromise;
  })() : preloadRouteComponents(route, componentTypesToLoad);
  return route._lazyPromise ? route._lazyPromise.then(runAfterLazy) : runAfterLazy();
}
function makeMaybe(value, error) {
  if (error) return {
    status: "error",
    error
  };
  return {
    status: "success",
    value
  };
}
function routeNeedsPreload(route) {
  for (const componentType of componentTypes) if (route.options[componentType]?.preload) return true;
  return false;
}
var componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];

// node_modules/@tanstack/router-core/dist/esm/stores.js
function createNonReactiveMutableStore(initialValue) {
  let value = initialValue;
  return {
    get() {
      return value;
    },
    set(nextOrUpdater) {
      value = functionalUpdate(nextOrUpdater, value);
    }
  };
}
function createNonReactiveReadonlyStore(read) {
  return { get() {
    return read();
  } };
}
function createRouterStores(initialState, config) {
  const { createMutableStore, createReadonlyStore, batch: batch2, init } = config;
  const matchStores = /* @__PURE__ */ new Map();
  const pendingMatchStores = /* @__PURE__ */ new Map();
  const cachedMatchStores = /* @__PURE__ */ new Map();
  const status = createMutableStore(initialState.status);
  const loadedAt = createMutableStore(initialState.loadedAt);
  const isLoading = createMutableStore(initialState.isLoading);
  const isTransitioning = createMutableStore(initialState.isTransitioning);
  const location = createMutableStore(initialState.location);
  const resolvedLocation = createMutableStore(initialState.resolvedLocation);
  const statusCode = createMutableStore(initialState.statusCode);
  const redirect2 = createMutableStore(initialState.redirect);
  const matchesId = createMutableStore([]);
  const pendingIds = createMutableStore([]);
  const cachedIds = createMutableStore([]);
  const matches = createReadonlyStore(() => readPoolMatches(matchStores, matchesId.get()));
  const pendingMatches = createReadonlyStore(() => readPoolMatches(pendingMatchStores, pendingIds.get()));
  const cachedMatches = createReadonlyStore(() => readPoolMatches(cachedMatchStores, cachedIds.get()));
  const firstId = createReadonlyStore(() => matchesId.get()[0]);
  const hasPending = createReadonlyStore(() => matchesId.get().some((matchId) => {
    return matchStores.get(matchId)?.get().status === "pending";
  }));
  const matchRouteDeps = createReadonlyStore(() => ({
    locationHref: location.get().href,
    resolvedLocationHref: resolvedLocation.get()?.href,
    status: status.get()
  }));
  const __store = createReadonlyStore(() => ({
    status: status.get(),
    loadedAt: loadedAt.get(),
    isLoading: isLoading.get(),
    isTransitioning: isTransitioning.get(),
    matches: matches.get(),
    location: location.get(),
    resolvedLocation: resolvedLocation.get(),
    statusCode: statusCode.get(),
    redirect: redirect2.get()
  }));
  const matchStoreByRouteIdCache = createLRUCache(64);
  function getRouteMatchStore(routeId) {
    let cached = matchStoreByRouteIdCache.get(routeId);
    if (!cached) {
      cached = createReadonlyStore(() => {
        const ids = matchesId.get();
        for (const id of ids) {
          const matchStore = matchStores.get(id);
          if (matchStore && matchStore.routeId === routeId) return matchStore.get();
        }
      });
      matchStoreByRouteIdCache.set(routeId, cached);
    }
    return cached;
  }
  const store = {
    status,
    loadedAt,
    isLoading,
    isTransitioning,
    location,
    resolvedLocation,
    statusCode,
    redirect: redirect2,
    matchesId,
    pendingIds,
    cachedIds,
    matches,
    pendingMatches,
    cachedMatches,
    firstId,
    hasPending,
    matchRouteDeps,
    matchStores,
    pendingMatchStores,
    cachedMatchStores,
    __store,
    getRouteMatchStore,
    setMatches,
    setPending,
    setCached
  };
  setMatches(initialState.matches);
  init?.(store);
  function setMatches(nextMatches) {
    reconcileMatchPool(nextMatches, matchStores, matchesId, createMutableStore, batch2);
  }
  function setPending(nextMatches) {
    reconcileMatchPool(nextMatches, pendingMatchStores, pendingIds, createMutableStore, batch2);
  }
  function setCached(nextMatches) {
    reconcileMatchPool(nextMatches, cachedMatchStores, cachedIds, createMutableStore, batch2);
  }
  return store;
}
function readPoolMatches(pool, ids) {
  const matches = [];
  for (const id of ids) {
    const matchStore = pool.get(id);
    if (matchStore) matches.push(matchStore.get());
  }
  return matches;
}
function reconcileMatchPool(nextMatches, pool, idStore, createMutableStore, batch2) {
  const nextIds = nextMatches.map((d2) => d2.id);
  const nextIdSet = new Set(nextIds);
  batch2(() => {
    for (const id of pool.keys()) if (!nextIdSet.has(id)) pool.delete(id);
    for (const nextMatch of nextMatches) {
      const existing = pool.get(nextMatch.id);
      if (!existing) {
        const matchStore = createMutableStore(nextMatch);
        matchStore.routeId = nextMatch.routeId;
        pool.set(nextMatch.id, matchStore);
        continue;
      }
      existing.routeId = nextMatch.routeId;
      if (existing.get() !== nextMatch) existing.set(nextMatch);
    }
    if (!arraysEqual(idStore.get(), nextIds)) idStore.set(nextIds);
  });
}

// node_modules/@tanstack/router-core/dist/esm/router.js
function getLocationChangeInfo(location, resolvedLocation) {
  const fromLocation = resolvedLocation;
  const toLocation = location;
  return {
    fromLocation,
    toLocation,
    pathChanged: fromLocation?.pathname !== toLocation.pathname,
    hrefChanged: fromLocation?.href !== toLocation.href,
    hashChanged: fromLocation?.hash !== toLocation.hash
  };
}
var locationHistoryActions = /* @__PURE__ */ new WeakMap();
var RouterCore = class {
  /**
  * @deprecated Use the `createRouter` function instead
  */
  constructor(options, getStoreConfig) {
    this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
    this._scroll = { next: true };
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.routeBranchCache = /* @__PURE__ */ new WeakMap();
    this.startTransition = (fn2) => fn2();
    this.update = (newOptions) => {
      if (process.env.NODE_ENV !== "production") {
        if (newOptions.notFoundRoute) console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.");
      }
      const prevOptions = this.options;
      const prevBasepath = this.basepath ?? prevOptions?.basepath ?? "/";
      const basepathWasUnset = this.basepath === void 0;
      const prevRewriteOption = prevOptions?.rewrite;
      this.options = {
        ...prevOptions,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.protocolAllowlist = new Set(this.options.protocolAllowlist);
      if (this.options.pathParamsAllowedCharacters) this.pathParamsDecoder = compileDecodeCharMap(this.options.pathParamsAllowedCharacters);
      if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) {
        if (!(isServer ?? this.isServer)) this.history = createBrowserHistory();
      } else this.history = this.options.history;
      this.origin = this.options.origin;
      if (!this.origin) if (!(isServer ?? this.isServer) && window?.origin && window.origin !== "null") this.origin = window.origin;
      else this.origin = "http://localhost";
      if (this.history) this.updateLatestLocation();
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        let processRouteTreeResult;
        if ((isServer ?? this.isServer) && process.env.NODE_ENV !== "development" && globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree) {
          const cached = globalThis.__TSR_CACHE__;
          this.resolvePathCache = cached.resolvePathCache;
          processRouteTreeResult = cached.processRouteTreeResult;
        } else {
          this.resolvePathCache = createLRUCache(1e3);
          processRouteTreeResult = this.buildRouteTree();
          if ((isServer ?? this.isServer) && process.env.NODE_ENV !== "development" && globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
            routeTree: this.routeTree,
            processRouteTreeResult,
            resolvePathCache: this.resolvePathCache
          };
        }
        this.setRoutes(processRouteTreeResult);
      }
      if (!this.stores && this.latestLocation) {
        const config = this.getStoreConfig(this);
        this.batch = config.batch;
        this.stores = createRouterStores(getInitialRouterState(this.latestLocation), config);
        if (!(isServer ?? this.isServer)) setupScrollRestoration(this);
      }
      let needsLocationUpdate = false;
      const nextBasepath = this.options.basepath ?? "/";
      const nextRewriteOption = this.options.rewrite;
      if (basepathWasUnset || prevBasepath !== nextBasepath || prevRewriteOption !== nextRewriteOption) {
        this.basepath = nextBasepath;
        const rewrites = [];
        const trimmed = trimPath(nextBasepath);
        if (trimmed && trimmed !== "/") rewrites.push(rewriteBasepath({ basepath: nextBasepath }));
        if (nextRewriteOption) rewrites.push(nextRewriteOption);
        this.rewrite = rewrites.length === 0 ? void 0 : rewrites.length === 1 ? rewrites[0] : composeRewrites(rewrites);
        if (this.history) this.updateLatestLocation();
        needsLocationUpdate = true;
      }
      if (needsLocationUpdate && this.stores) this.stores.location.set(this.latestLocation);
      if (typeof window !== "undefined" && "CSS" in window && typeof window.CSS?.supports === "function") this.isViewTransitionTypesSupported = window.CSS.supports("selector(:active-view-transition-type(a))");
    };
    this.updateLatestLocation = () => {
      this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
    };
    this.buildRouteTree = () => {
      const result = processRouteTree(this.routeTree, this.options.caseSensitive, (route, i2) => {
        route.init({ originalIndex: i2 });
      });
      if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
      return result;
    };
    this.subscribe = (eventType, fn2) => {
      const listener = {
        eventType,
        fn: fn2
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) listener.fn(routerEvent);
      });
    };
    this.parseLocation = (locationToParse, previousLocation) => {
      const parse = ({ pathname, search, hash, href, state }) => {
        if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
          const parsedSearch2 = this.options.parseSearch(search);
          const searchStr2 = this.options.stringifySearch(parsedSearch2);
          return {
            href: pathname + searchStr2 + hash,
            publicHref: pathname + searchStr2 + hash,
            pathname: decodePath(pathname).path,
            external: false,
            searchStr: searchStr2,
            search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch2),
            hash: decodePath(hash.slice(1)).path,
            state: replaceEqualDeep(previousLocation?.state, state)
          };
        }
        const fullUrl = new URL(href, this.origin);
        const url = executeRewriteInput(this.rewrite, fullUrl);
        const parsedSearch = this.options.parseSearch(url.search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        url.search = searchStr;
        return {
          href: url.href.replace(url.origin, ""),
          publicHref: href,
          pathname: decodePath(url.pathname).path,
          external: !!this.rewrite && url.origin !== this.origin,
          searchStr,
          search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
          hash: decodePath(url.hash.slice(1)).path,
          state: replaceEqualDeep(previousLocation?.state, state)
        };
      };
      const location = parse(locationToParse);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      return resolvePath({
        base: from,
        to: path.includes("//") ? cleanPath(path) : path,
        trailingSlash: this.options.trailingSlash,
        cache: this.resolvePathCache
      });
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
        pathname: pathnameOrNext,
        search: locationSearchOrOpts
      }, opts);
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.getMatchedRoutes = (pathname) => {
      return getMatchedRoutes({
        pathname,
        routesById: this.routesById,
        processedTree: this.processedTree
      });
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match._nonReactive.pendingTimeout);
      match._nonReactive.pendingTimeout = void 0;
    };
    this.cancelMatches = () => {
      this.stores.pendingIds.get().forEach((matchId) => {
        this.cancelMatch(matchId);
      });
      this.stores.matchesId.get().forEach((matchId) => {
        if (this.stores.pendingMatchStores.has(matchId)) return;
        const match = this.stores.matchStores.get(matchId)?.get();
        if (!match) return;
        if (match.status === "pending" || match.isFetching === "loader") this.cancelMatch(matchId);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}) => {
        const currentLocation = dest._fromLocation || this.pendingBuiltLocation || this.latestLocation;
        const lightweightResult = this.matchRoutesLightweight(currentLocation);
        if (dest.from && process.env.NODE_ENV !== "production" && dest._isNavigate) {
          const allFromMatches = this.getMatchedRoutes(dest.from).matchedRoutes;
          const matchedFrom = findLast(lightweightResult.matchedRoutes, (d2) => {
            return comparePaths(d2.fullPath, dest.from);
          });
          const matchedCurrent = findLast(allFromMatches, (d2) => {
            return comparePaths(d2.fullPath, lightweightResult.fullPath);
          });
          if (!matchedFrom && !matchedCurrent) console.warn(`Could not find match for from: ${dest.from}`);
        }
        const defaultedFromPath = dest.unsafeRelative === "path" ? currentLocation.pathname : dest.from ?? lightweightResult.fullPath;
        const destTo = dest.to ? `${dest.to}` : void 0;
        const fromSearch = lightweightResult.search;
        const fromParams = Object.assign(/* @__PURE__ */ Object.create(null), lightweightResult.params);
        const sourcePath = destTo?.charCodeAt(0) === 47 ? "/" : this.resolvePathWithBase(defaultedFromPath, ".");
        const nextTo = destTo ? this.resolvePathWithBase(sourcePath, destTo) : sourcePath;
        const nextParams = dest.params === false || dest.params === null ? /* @__PURE__ */ Object.create(null) : (dest.params ?? true) === true ? fromParams : Object.assign(fromParams, functionalUpdate(dest.params, fromParams));
        const destRoute = this.routesByPath[trimPathRight2(nextTo)];
        let destRoutes;
        if (destRoute) destRoutes = this.getRouteBranch(destRoute);
        else if (nextTo.includes("$")) destRoutes = [];
        else {
          const destMatchResult = this.getMatchedRoutes(nextTo);
          destRoutes = destMatchResult.matchedRoutes;
          if (this.options.notFoundRoute && (!destMatchResult.foundRoute || destMatchResult.foundRoute.path !== "/" && destMatchResult.routeParams["**"])) destRoutes = [...destRoutes, this.options.notFoundRoute];
        }
        if (destRoutes.length && hasKeys(nextParams)) for (const route of destRoutes) {
          const fn2 = route.options.params?.stringify ?? route.options.stringifyParams;
          if (fn2) try {
            Object.assign(nextParams, fn2(nextParams));
          } catch {
          }
        }
        const nextPathname = opts.leaveParams ? nextTo : decodePath(interpolatePath({
          path: nextTo,
          params: nextParams,
          decoder: this.pathParamsDecoder,
          server: this.isServer
        }).interpolatedPath).path;
        if (process.env.NODE_ENV !== "production" && destRoute && !opts.leaveParams) try {
          const roundTrip = this.getMatchedRoutes(nextPathname);
          if (roundTrip.foundRoute?.id !== destRoute.id) console.warn(`Generated path "${nextPathname}" for route "${destRoute.id}" matched route "${roundTrip.foundRoute?.id}" instead. This can happen when multiple route templates resolve to the same URL. Use the route template that matches the intended route, or adjust params.stringify if it changed the target path.`);
        } catch {
        }
        let nextSearch = fromSearch;
        if (opts._includeValidateSearch && this.options.search?.strict) {
          const validatedSearch = {};
          destRoutes.forEach((route) => {
            if (route.options.validateSearch) try {
              Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
                ...validatedSearch,
                ...nextSearch
              }));
            } catch {
            }
          });
          nextSearch = validatedSearch;
        }
        nextSearch = applySearchMiddleware({
          search: nextSearch,
          dest,
          destRoutes,
          _includeValidateSearch: opts._includeValidateSearch
        });
        nextSearch = nullReplaceEqualDeep(fromSearch, nextSearch);
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? currentLocation.hash : dest.hash ? functionalUpdate(dest.hash, currentLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? currentLocation.state : dest.state ? functionalUpdate(dest.state, currentLocation.state) : {};
        nextState = replaceEqualDeep(currentLocation.state, nextState);
        const fullPath = `${nextPathname}${searchStr}${hashStr}`;
        let href;
        let publicHref;
        let external = false;
        if (this.rewrite) {
          const url = new URL(fullPath, this.origin);
          const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
          href = url.href.replace(url.origin, "");
          if (rewrittenUrl.origin !== this.origin) {
            publicHref = rewrittenUrl.href;
            external = true;
          } else publicHref = rewrittenUrl.pathname + rewrittenUrl.search + rewrittenUrl.hash;
        } else {
          href = encodePathLikeUrl(fullPath);
          publicHref = href;
        }
        return {
          publicHref,
          href,
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          external,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          const params = /* @__PURE__ */ Object.create(null);
          if (this.options.routeMasks) {
            const match = findFlatMatch(next.pathname, this.processedTree);
            if (match) {
              Object.assign(params, match.rawParams);
              const { from: _from, params: maskParams, ...maskProps } = match.route;
              const nextParams = maskParams === false || maskParams === null ? /* @__PURE__ */ Object.create(null) : (maskParams ?? true) === true ? params : Object.assign(params, functionalUpdate(maskParams, params));
              maskedDest = {
                from: opts.from,
                ...maskProps,
                params: nextParams
              };
              maskedNext = build(maskedDest);
            }
          }
        }
        if (maskedNext) next.maskedLocation = maskedNext;
        return next;
      };
      if (opts.mask) return buildWithMatches(opts, {
        from: opts.from,
        ...opts.mask
      });
      return buildWithMatches(opts);
    };
    this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
      let historyAction;
      const isSameState = () => {
        const ignoredProps = [
          "key",
          "__TSR_key",
          "__TSR_index",
          "__hashScrollIntoViewOptions"
        ];
        ignoredProps.forEach((prop) => {
          next.state[prop] = this.latestLocation.state[prop];
        });
        const isEqual = deepEqual(next.state, this.latestLocation.state);
        ignoredProps.forEach((prop) => {
          delete next.state[prop];
        });
        return isEqual;
      };
      const isSameUrl = trimPathRight2(this.latestLocation.href) === trimPathRight2(next.href);
      let previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = createControlledPromise(() => {
        previousCommitPromise?.resolve();
        previousCommitPromise = void 0;
      });
      if (isSameUrl && isSameState()) this.load();
      else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  __TSR_key: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        historyAction = next.replace ? "REPLACE" : "PUSH";
        this.history[historyAction === "REPLACE" ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
      }
      this._scroll.next = next.resetScroll ?? true;
      if (!this.history.subscribers.size) this.load(historyAction ? { action: { type: historyAction } } : void 0);
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, href, ...rest } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = parseHref(href, { __TSR_index: replace ? currentIndex : currentIndex + 1 });
        const hrefUrl = new URL(parsed.pathname, this.origin);
        rest.to = executeRewriteInput(this.rewrite, hrefUrl).pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      this.pendingBuiltLocation = location;
      const commitPromise = this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
      Promise.resolve().then(() => {
        if (this.pendingBuiltLocation === location) this.pendingBuiltLocation = void 0;
      });
      return commitPromise;
    };
    this.navigate = async ({ to: to2, reloadDocument, href, publicHref, ...rest }) => {
      let hrefIsUrl = false;
      if (href) try {
        new URL(`${href}`);
        hrefIsUrl = true;
      } catch {
      }
      if (hrefIsUrl && !reloadDocument) reloadDocument = true;
      if (reloadDocument) {
        if (to2 !== void 0 || !href) {
          const location = this.buildLocation({
            to: to2,
            ...rest
          });
          href = href ?? location.publicHref;
          publicHref = publicHref ?? location.publicHref;
        }
        const reloadHref = !hrefIsUrl && publicHref ? publicHref : href;
        if (isDangerousProtocol(reloadHref, this.protocolAllowlist)) {
          if (process.env.NODE_ENV !== "production") console.warn(`Blocked navigation to dangerous protocol: ${reloadHref}`);
          return Promise.resolve();
        }
        if (!rest.ignoreBlocker) {
          const blockers = this.history.getBlockers?.() ?? [];
          for (const blocker of blockers) if (blocker?.blockerFn) {
            if (await blocker.blockerFn({
              currentLocation: this.latestLocation,
              nextLocation: this.latestLocation,
              action: "PUSH"
            })) return Promise.resolve();
          }
        }
        if (rest.replace) window.location.replace(reloadHref);
        else window.location.href = reloadHref;
        return Promise.resolve();
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to: to2,
        _isNavigate: true
      });
    };
    this.beforeLoad = () => {
      this.cancelMatches();
      this.updateLatestLocation();
      if (isServer ?? this.isServer) {
        const nextLocation = this.buildLocation({
          to: this.latestLocation.pathname,
          search: true,
          params: true,
          hash: true,
          state: true,
          _includeValidateSearch: true
        });
        if (this.latestLocation.publicHref !== nextLocation.publicHref) {
          const href = this.getParsedLocationHref(nextLocation);
          if (nextLocation.external) throw redirect({ href });
          else throw redirect({
            href,
            _builtLocation: nextLocation
          });
        }
      }
      const pendingMatches = this.matchRoutes(this.latestLocation);
      const nextCachedMatches = this.stores.cachedMatches.get().filter((d2) => !pendingMatches.some((e) => e.id === d2.id));
      this.batch(() => {
        this.stores.status.set("pending");
        this.stores.statusCode.set(200);
        this.stores.isLoading.set(true);
        this.stores.location.set(this.latestLocation);
        this.stores.setPending(pendingMatches);
        this.stores.setCached(nextCachedMatches);
      });
    };
    this.load = async (opts) => {
      const historyAction = opts?.action?.type;
      let redirect2;
      let notFound2;
      let loadPromise;
      const previousLocation = this.stores.resolvedLocation.get() ?? this.stores.location.get();
      loadPromise = new Promise((resolve) => {
        this.startTransition(async () => {
          try {
            this.beforeLoad();
            if (historyAction) locationHistoryActions.set(this.latestLocation, historyAction);
            else locationHistoryActions.delete(this.latestLocation);
            const next = this.latestLocation;
            const locationChangeInfo = getLocationChangeInfo(next, this.stores.resolvedLocation.get());
            if (!this.stores.redirect.get()) this.emit({
              type: "onBeforeNavigate",
              ...locationChangeInfo
            });
            this.emit({
              type: "onBeforeLoad",
              ...locationChangeInfo
            });
            await loadMatches({
              router: this,
              sync: opts?.sync,
              forceStaleReload: previousLocation.href === next.href,
              matches: this.stores.pendingMatches.get(),
              location: next,
              updateMatch: this.updateMatch,
              onReady: async () => {
                this.startTransition(() => {
                  this.startViewTransition(async () => {
                    let exitingMatches = null;
                    let hookExitingMatches = null;
                    let hookEnteringMatches = null;
                    let hookStayingMatches = null;
                    this.batch(() => {
                      const pendingMatches = this.stores.pendingMatches.get();
                      const mountPending = pendingMatches.length;
                      const currentMatches = this.stores.matches.get();
                      exitingMatches = mountPending ? currentMatches.filter((match) => !this.stores.pendingMatchStores.has(match.id)) : null;
                      const pendingRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.pendingMatchStores.values()) if (s.routeId) pendingRouteIds.add(s.routeId);
                      const activeRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.matchStores.values()) if (s.routeId) activeRouteIds.add(s.routeId);
                      hookExitingMatches = mountPending ? currentMatches.filter((match) => !pendingRouteIds.has(match.routeId)) : null;
                      hookEnteringMatches = mountPending ? pendingMatches.filter((match) => !activeRouteIds.has(match.routeId)) : null;
                      hookStayingMatches = mountPending ? pendingMatches.filter((match) => activeRouteIds.has(match.routeId)) : currentMatches;
                      this.stores.isLoading.set(false);
                      this.stores.loadedAt.set(Date.now());
                      if (mountPending) {
                        this.stores.setMatches(pendingMatches);
                        this.stores.setPending([]);
                        this.stores.setCached([...this.stores.cachedMatches.get(), ...exitingMatches.filter((d2) => d2.status !== "error" && d2.status !== "notFound" && d2.status !== "redirected")]);
                        this.clearExpiredCache();
                      }
                    });
                    for (const [matches, hook] of [
                      [hookExitingMatches, "onLeave"],
                      [hookEnteringMatches, "onEnter"],
                      [hookStayingMatches, "onStay"]
                    ]) {
                      if (!matches) continue;
                      for (const match of matches) this.looseRoutesById[match.routeId].options[hook]?.(match);
                    }
                  });
                });
              }
            });
          } catch (err) {
            if (isRedirect(err)) {
              redirect2 = err;
              if (!(isServer ?? this.isServer)) this.navigate({
                ...redirect2.options,
                replace: true,
                ignoreBlocker: true
              });
            } else if (isNotFound(err)) notFound2 = err;
            const nextStatusCode = redirect2 ? redirect2.status : notFound2 ? 404 : this.stores.matches.get().some((d2) => d2.status === "error") ? 500 : 200;
            this.batch(() => {
              this.stores.statusCode.set(nextStatusCode);
              this.stores.redirect.set(redirect2);
            });
          }
          if (this.latestLoadPromise === loadPromise) {
            this.commitLocationPromise?.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) await this.latestLoadPromise;
      let newStatusCode = void 0;
      if (this.hasNotFoundMatch()) newStatusCode = 404;
      else if (this.stores.matches.get().some((d2) => d2.status === "error")) newStatusCode = 500;
      if (newStatusCode !== void 0) this.stores.statusCode.set(newStatusCode);
    };
    this.startViewTransition = (fn2) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      this.shouldViewTransition = void 0;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          const next = this.latestLocation;
          const prevLocation = this.stores.resolvedLocation.get();
          const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(getLocationChangeInfo(next, prevLocation)) : shouldViewTransition.types;
          if (resolvedViewTransitionTypes === false) {
            fn2();
            return;
          }
          startViewTransitionParams = {
            update: fn2,
            types: resolvedViewTransitionTypes
          };
        } else startViewTransitionParams = fn2;
        document.startViewTransition(startViewTransitionParams);
      } else fn2();
    };
    this.updateMatch = (id, updater) => {
      this.startTransition(() => {
        const pendingMatch = this.stores.pendingMatchStores.get(id);
        if (pendingMatch) {
          pendingMatch.set(updater);
          return;
        }
        const activeMatch = this.stores.matchStores.get(id);
        if (activeMatch) {
          activeMatch.set(updater);
          return;
        }
        const cachedMatch = this.stores.cachedMatchStores.get(id);
        if (cachedMatch) {
          const next = updater(cachedMatch.get());
          if (next.status === "redirected") {
            if (this.stores.cachedMatchStores.delete(id)) this.stores.cachedIds.set((prev) => prev.filter((matchId) => matchId !== id));
          } else cachedMatch.set(next);
        }
      });
    };
    this.getMatch = (matchId) => {
      return this.stores.cachedMatchStores.get(matchId)?.get() ?? this.stores.pendingMatchStores.get(matchId)?.get() ?? this.stores.matchStores.get(matchId)?.get();
    };
    this.invalidate = (opts) => {
      const invalidate = (d2) => {
        if (opts?.filter?.(d2) ?? true) return {
          ...d2,
          invalid: true,
          ...opts?.forcePending || d2.status === "error" || d2.status === "notFound" ? {
            status: "pending",
            error: void 0
          } : void 0
        };
        return d2;
      };
      this.batch(() => {
        this.stores.setMatches(this.stores.matches.get().map(invalidate));
        this.stores.setCached(this.stores.cachedMatches.get().map(invalidate));
        this.stores.setPending(this.stores.pendingMatches.get().map(invalidate));
      });
      this.shouldViewTransition = false;
      return this.load({ sync: opts?.sync });
    };
    this.getParsedLocationHref = (location) => {
      return location.publicHref || "/";
    };
    this.resolveRedirect = (redirect2) => {
      const locationHeader = redirect2.headers.get("Location");
      if (!redirect2.options.href || redirect2.options._builtLocation) {
        const location = redirect2.options._builtLocation ?? this.buildLocation(redirect2.options);
        const href = this.getParsedLocationHref(location);
        redirect2.options.href = href;
        redirect2.headers.set("Location", href);
      } else if (locationHeader) try {
        const url = new URL(locationHeader);
        if (this.origin && url.origin === this.origin) {
          const href = url.pathname + url.search + url.hash;
          redirect2.options.href = href;
          redirect2.headers.set("Location", href);
        }
      } catch {
      }
      if (redirect2.options.href && !redirect2.options._builtLocation && isDangerousProtocol(redirect2.options.href, this.protocolAllowlist)) throw new Error(process.env.NODE_ENV !== "production" ? `Redirect blocked: unsafe protocol in href "${redirect2.options.href}". Allowed protocols: ${Array.from(this.protocolAllowlist).join(", ")}.` : "Redirect blocked: unsafe protocol");
      if (!redirect2.headers.get("Location")) redirect2.headers.set("Location", redirect2.options.href);
      return redirect2;
    };
    this.clearCache = (opts) => {
      const filter = opts?.filter;
      if (filter !== void 0) this.stores.setCached(this.stores.cachedMatches.get().filter((m3) => !filter(m3)));
      else this.stores.setCached([]);
    };
    this.clearExpiredCache = () => {
      const now = Date.now();
      const filter = (d2) => {
        const route = this.looseRoutesById[d2.routeId];
        if (!route.options.loader) return true;
        const gcTime = (d2.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 300 * 1e3;
        if (d2.status === "error") return true;
        return now - d2.updatedAt >= gcTime;
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = loadRouteChunk;
    this.preloadRoute = async (opts) => {
      const next = opts._builtLocation ?? this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = /* @__PURE__ */ new Set([...this.stores.matchesId.get(), ...this.stores.pendingIds.get()]);
      const loadedMatchIds = /* @__PURE__ */ new Set([...activeMatchIds, ...this.stores.cachedIds.get()]);
      const matchesToCache = matches.filter((match) => !loadedMatchIds.has(match.id));
      if (matchesToCache.length) {
        const cachedMatches = this.stores.cachedMatches.get();
        this.stores.setCached([...cachedMatches, ...matchesToCache]);
      }
      try {
        matches = await loadMatches({
          router: this,
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) matches = matches.map((d2) => d2.id === id ? updater(d2) : d2);
            else this.updateMatch(id, updater);
          }
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          if (err.options.reloadDocument) return;
          return await this.preloadRoute({
            ...err.options,
            _fromLocation: next
          });
        }
        if (!isNotFound(err)) console.error(err);
        return;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if (opts?.pending && this.stores.status.get() !== "pending") return false;
      const baseLocation = (opts?.pending === void 0 ? !this.stores.isLoading.get() : opts.pending) ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
      const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
      if (!match) return false;
      if (location.params) {
        if (!deepEqual(match.rawParams, location.params, { partial: true })) return false;
      }
      if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, { partial: true }) ? match.rawParams : false;
      return match.rawParams;
    };
    this.hasNotFoundMatch = () => {
      return this.stores.matches.get().some((d2) => d2.status === "notFound" || d2.globalNotFound);
    };
    this.getStoreConfig = getStoreConfig;
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
    });
    if (typeof document !== "undefined") self.__TSR_ROUTER__ = this;
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.stores.__store.get();
  }
  setRoutes({ routesById, routesByPath, processedTree }) {
    this.routesById = routesById;
    this.routesByPath = routesByPath;
    this.processedTree = processedTree;
    const notFoundRoute = this.options.notFoundRoute;
    if (notFoundRoute) {
      notFoundRoute.init({ originalIndex: 99999999999 });
      this.routesById[notFoundRoute.id] = notFoundRoute;
    }
  }
  getRouteBranch(route) {
    let branch = this.routeBranchCache.get(route);
    if (!branch) {
      branch = buildRouteBranch(route);
      this.routeBranchCache.set(route, branch);
    }
    return branch;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  getParentContext(parentMatch) {
    return !parentMatch?.id ? this.options.context ?? void 0 : parentMatch.context ?? this.options.context ?? void 0;
  }
  matchRoutesInternal(next, opts) {
    const matchedRoutesResult = this.getMatchedRoutes(next.pathname);
    const { foundRoute, routeParams } = matchedRoutesResult;
    let { matchedRoutes } = matchedRoutesResult;
    let isGlobalNotFound = false;
    if (foundRoute ? foundRoute.path !== "/" && routeParams["**"] : trimPathRight2(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
    else isGlobalNotFound = true;
    const globalNotFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
    const matches = new Array(matchedRoutes.length);
    const previousActiveMatchesByRouteId = /* @__PURE__ */ new Map();
    for (const store of this.stores.matchStores.values()) if (store.routeId) previousActiveMatchesByRouteId.set(store.routeId, store.get());
    for (let index = 0; index < matchedRoutes.length; index++) {
      const route = matchedRoutes[index];
      const parentMatch = matches[index - 1];
      let preMatchSearch;
      let strictMatchSearch;
      let searchError;
      {
        const parentSearch = parentMatch?.search ?? next.search;
        const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
          preMatchSearch = {
            ...parentSearch,
            ...strictSearch
          };
          strictMatchSearch = {
            ...parentStrictSearch,
            ...strictSearch
          };
          searchError = void 0;
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
          if (opts?.throwOnError) throw searchParamError;
          preMatchSearch = parentSearch;
          strictMatchSearch = {};
          searchError = searchParamError;
        }
      }
      const loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { interpolatedPath, usedParams } = interpolatePath({
        path: route.fullPath,
        params: routeParams,
        decoder: this.pathParamsDecoder,
        server: this.isServer
      });
      const matchId = route.id + interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = previousActiveMatchesByRouteId.get(route.id);
      const strictParams = existingMatch?._strictParams ?? usedParams;
      let paramsError = void 0;
      if (!existingMatch) try {
        extractStrictParams(route, strictParams);
      } catch (err) {
        if (isNotFound(err) || isRedirect(err)) paramsError = err;
        else paramsError = new PathParamError(err.message, { cause: err });
        if (opts?.throwOnError) throw paramsError;
      }
      Object.assign(routeParams, strictParams);
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) match = {
        ...existingMatch,
        cause,
        params: previousMatch?.params ?? routeParams,
        _strictParams: strictParams,
        search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
        _strictSearch: strictMatchSearch
      };
      else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          ssr: isServer ?? this.isServer ? void 0 : route.options.ssr,
          index,
          routeId: route.id,
          params: previousMatch?.params ?? routeParams,
          _strictParams: strictParams,
          pathname: interpolatedPath,
          updatedAt: Date.now(),
          search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError,
          __routeContext: void 0,
          _nonReactive: { loadPromise: createControlledPromise() },
          __beforeLoadContext: void 0,
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          headScripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          fullPath: route.fullPath
        };
      }
      if (!opts?.preload) match.globalNotFound = globalNotFoundRouteId === route.id;
      match.searchError = searchError;
      const parentContext = this.getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches[index] = match;
    }
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      const previousMatch = previousActiveMatchesByRouteId.get(match.routeId);
      match.params = previousMatch ? nullReplaceEqualDeep(previousMatch.params, routeParams) : routeParams;
      if (!existingMatch) {
        const parentMatch = matches[index - 1];
        const parentContext = this.getParentContext(parentMatch);
        if (route.options.context) {
          const contextFnContext = {
            deps: match.loaderDeps,
            params: match.params,
            context: parentContext ?? {},
            location: next,
            navigate: (opts2) => this.navigate({
              ...opts2,
              _fromLocation: next
            }),
            buildLocation: this.buildLocation,
            cause: match.cause,
            abortController: match.abortController,
            preload: !!match.preload,
            matches,
            routeId: route.id
          };
          match.__routeContext = route.options.context(contextFnContext) ?? void 0;
        }
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
    }
    return matches;
  }
  /**
  * Lightweight route matching for buildLocation.
  * Only computes fullPath, accumulated search, and params - skipping expensive
  * operations like AbortController, ControlledPromise, loaderDeps, and full match objects.
  */
  matchRoutesLightweight(location) {
    const { matchedRoutes, routeParams } = this.getMatchedRoutes(location.pathname);
    const lastRoute = last(matchedRoutes);
    const accumulatedSearch = { ...location.search };
    for (const route of matchedRoutes) try {
      Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
    } catch {
    }
    const lastStateMatchId = last(this.stores.matchesId.get());
    const lastStateMatch = lastStateMatchId && this.stores.matchStores.get(lastStateMatchId)?.get();
    const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
    let params;
    if (canReuseParams) params = lastStateMatch.params;
    else {
      const strictParams = Object.assign(/* @__PURE__ */ Object.create(null), routeParams);
      for (const route of matchedRoutes) try {
        extractStrictParams(route, strictParams);
      } catch {
      }
      params = strictParams;
    }
    return {
      matchedRoutes,
      fullPath: lastRoute.fullPath,
      search: accumulatedSearch,
      params
    };
  }
};
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
var normalize = (str) => str.endsWith("/") && str.length > 1 ? str.slice(0, -1) : str;
function comparePaths(a, b2) {
  return normalize(a) === normalize(b2);
}
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    statusCode: 200
  };
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
    return result.value;
  }
  if ("parse" in validateSearch2) return validateSearch2.parse(input);
  if (typeof validateSearch2 === "function") return validateSearch2(input);
  return {};
}
function getMatchedRoutes({ pathname, routesById, processedTree }) {
  const routeParams = /* @__PURE__ */ Object.create(null);
  const trimmedPath = trimPathRight2(pathname);
  let foundRoute = void 0;
  const match = findRouteMatch(trimmedPath, processedTree, true);
  if (match) {
    foundRoute = match.route;
    Object.assign(routeParams, match.rawParams);
  }
  return {
    matchedRoutes: match?.branch || [routesById["__root__"]],
    routeParams,
    foundRoute
  };
}
function applySearchMiddleware({ search, dest, destRoutes, _includeValidateSearch }) {
  return buildMiddlewareChain(destRoutes)(search, dest, _includeValidateSearch ?? false);
}
function buildMiddlewareChain(destRoutes) {
  let dest;
  let includeValidateSearch;
  const middlewares = [];
  for (const route of destRoutes) {
    const routeOptions = route.options;
    if ("search" in routeOptions) {
      if (routeOptions.search?.middlewares) middlewares.push(...routeOptions.search.middlewares);
    } else if (routeOptions.preSearchFilters || routeOptions.postSearchFilters) {
      const legacyMiddleware = ({ search, next }) => {
        const result = next(routeOptions.preSearchFilters ? routeOptions.preSearchFilters.reduce((prev, next2) => next2(prev), search) : search);
        return routeOptions.postSearchFilters ? routeOptions.postSearchFilters.reduce((prev, next2) => next2(prev), result) : result;
      };
      middlewares.push(legacyMiddleware);
    }
    const routeValidateSearch = routeOptions.validateSearch;
    if (routeValidateSearch) {
      const validate = ({ search, next, meta }) => {
        const result = next(search);
        if (includeValidateSearch) try {
          const validated = validateSearch(routeValidateSearch, result);
          if (meta && validated) {
            for (const key in validated) if (!(key in result)) (meta.defaulted ||= /* @__PURE__ */ new Map()).set(key, validated[key]);
          }
          return {
            ...result,
            ...validated
          };
        } catch {
        }
        return result;
      };
      middlewares.push(validate);
    }
  }
  const applyNext = (index, currentSearch, meta) => {
    if (index >= middlewares.length) {
      if (!dest.search) return {};
      if (dest.search === true) return currentSearch;
      const result = functionalUpdate(dest.search, currentSearch);
      if (meta) meta.explicit = result;
      return result;
    }
    const next = (newSearch, collectMeta) => {
      if (collectMeta) {
        const nextMeta = meta || {};
        return {
          search: applyNext(index + 1, newSearch, nextMeta),
          meta: nextMeta
        };
      }
      return applyNext(index + 1, newSearch, meta);
    };
    return middlewares[index]({
      search: currentSearch,
      next,
      meta
    });
  };
  return function middleware(search, nextDest, _includeValidateSearch) {
    dest = nextDest;
    includeValidateSearch = _includeValidateSearch;
    return applyNext(0, search);
  };
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
  if (notFoundMode !== "root") for (let i2 = routes.length - 1; i2 >= 0; i2--) {
    const route = routes[i2];
    if (route.children) return route.id;
  }
  return rootRouteId;
}
function extractStrictParams(route, accumulatedParams) {
  const parseParams = route.options.params?.parse ?? route.options.parseParams;
  if (parseParams) {
    const result = parseParams(accumulatedParams);
    if (result === false) throw new Error("Route params.parse returned false for a matched route");
    Object.assign(accumulatedParams, result);
  }
}

// node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js
function getSafeSessionStorage() {
  try {
    return sessionStorage;
  } catch {
    return;
  }
}
var storageKey = "tsr-scroll-restoration-v1_3";
var safeSessionStorage = getSafeSessionStorage();
function createScrollRestorationCache() {
  try {
    return JSON.parse(safeSessionStorage?.getItem("tsr-scroll-restoration-v1_3") || "{}");
  } catch {
    return {};
  }
}
function persistScrollRestorationCache() {
  try {
    safeSessionStorage?.setItem(storageKey, JSON.stringify(scrollRestorationCache));
  } catch {
    if (process.env.NODE_ENV !== "production") console.warn("[ts-router] Could not persist scroll restoration state to sessionStorage.");
  }
}
var scrollRestorationCache = /* @__PURE__ */ createScrollRestorationCache();
var scrollRestorationIdAttribute = "data-scroll-restoration-id";
var defaultGetScrollRestorationKey = (location) => {
  return location.state.__TSR_key || location.href;
};
function getScrollRestorationSelector(element) {
  const attrId = element.getAttribute(scrollRestorationIdAttribute);
  if (attrId) return `[${scrollRestorationIdAttribute}="${attrId}"]`;
  let selector = "";
  let el = element;
  let parent;
  while (parent = el.parentNode) {
    let index = 1;
    let sibling = el;
    while (sibling = sibling.previousElementSibling) index++;
    const part = `${el.localName}:nth-child(${index})`;
    selector = selector ? `${part} > ${selector}` : part;
    el = parent;
  }
  return selector;
}
var ignoreScroll = false;
var windowScrollTarget = "window";
function getElement(selector) {
  try {
    return typeof selector === "function" ? selector() : document.querySelector(selector);
  } catch {
  }
}
function getScrollToTopElements(scrollToTopSelectors) {
  const elements = [];
  for (const selector of scrollToTopSelectors) {
    if (selector === windowScrollTarget) continue;
    const element = getElement(selector);
    if (element) elements.push(element);
  }
  return elements;
}
function setupScrollRestoration(router, force) {
  const shouldSetupScrollRestoration = force ?? router.options.scrollRestoration;
  const scroll = router._scroll;
  if (shouldSetupScrollRestoration) scroll.restoring = true;
  if (isServer ?? router.isServer) return;
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  const trackedScrollEntries = /* @__PURE__ */ new Map();
  const setTrackedScrollEntry = (target, scrollX2, scrollY2) => {
    const entry = trackedScrollEntries.get(target) || {};
    entry.scrollX = scrollX2;
    entry.scrollY = scrollY2;
    trackedScrollEntries.set(target, entry);
  };
  const onScroll = (event) => {
    if (ignoreScroll || !scroll.restoring) return;
    if (event.target === document) setTrackedScrollEntry(windowScrollTarget, scrollX, scrollY);
    else {
      const target = event.target;
      setTrackedScrollEntry(target, target.scrollLeft, target.scrollTop);
    }
  };
  const snapshotCurrentScrollTargets = (restoreKey) => {
    if (!scroll.restoring) return;
    const keyEntry = scrollRestorationCache[restoreKey] ||= {};
    for (const [target, position] of trackedScrollEntries) if (target === windowScrollTarget) keyEntry[windowScrollTarget] = position;
    else if (target.isConnected) keyEntry[getScrollRestorationSelector(target)] = position;
  };
  if (shouldSetupScrollRestoration && !scroll.restoration) {
    scroll.restoration = true;
    ignoreScroll = false;
    history.scrollRestoration = "manual";
    document.addEventListener("scroll", onScroll, true);
    router.subscribe("onBeforeLoad", (event) => {
      if (event.fromLocation) snapshotCurrentScrollTargets(getKey(event.fromLocation));
      trackedScrollEntries.clear();
    });
    addEventListener("pagehide", () => {
      snapshotCurrentScrollTargets(getKey(router.stores.resolvedLocation.get() ?? router.stores.location.get()));
      persistScrollRestorationCache();
    });
  }
  if (scroll.reset) return;
  scroll.reset = true;
  router.subscribe("onRendered", (event) => {
    const behavior = router.options.scrollRestorationBehavior;
    const scrollToTopSelectors = router.options.scrollToTopSelectors;
    const shouldResetScroll = scroll.next;
    let scrollToTopElements;
    trackedScrollEntries.clear();
    if (!shouldResetScroll) scroll.next = true;
    if (typeof router.options.scrollRestoration === "function" && !router.options.scrollRestoration({ location: router.latestLocation })) return;
    const cacheKey = getKey(event.toLocation);
    const fromCacheKey = event.fromLocation && getKey(event.fromLocation);
    if (scroll.restoring && fromCacheKey && fromCacheKey !== cacheKey) {
      const fromElementEntries = scrollRestorationCache[fromCacheKey];
      if (fromElementEntries) {
        let toElementEntries = scrollRestorationCache[cacheKey];
        for (const elementSelector in fromElementEntries) {
          if (elementSelector === windowScrollTarget) {
            if (shouldResetScroll) continue;
          } else {
            const element = getElement(elementSelector);
            if (!element) continue;
            if (shouldResetScroll && scrollToTopSelectors) {
              scrollToTopElements ??= getScrollToTopElements(scrollToTopSelectors);
              if (scrollToTopElements.includes(element)) continue;
            }
          }
          if (!toElementEntries) toElementEntries = scrollRestorationCache[cacheKey] = {};
          toElementEntries[elementSelector] ??= fromElementEntries[elementSelector];
        }
      }
    }
    ignoreScroll = true;
    try {
      const hash = event.toLocation.hash;
      const hashScrollIntoViewOptions = event.toLocation.state.__hashScrollIntoViewOptions ?? true;
      let windowRestored = false;
      if (shouldResetScroll) {
        const action = locationHistoryActions.get(event.toLocation);
        const skipWindowRestore = hash && hashScrollIntoViewOptions && (action === "PUSH" || action === "REPLACE");
        const elementEntries = scroll.restoring ? scrollRestorationCache[cacheKey] : void 0;
        if (elementEntries) for (const elementSelector in elementEntries) {
          const { scrollX: scrollX2, scrollY: scrollY2 } = elementEntries[elementSelector];
          if (elementSelector === windowScrollTarget) {
            if (skipWindowRestore) continue;
            scrollTo({
              top: scrollY2,
              left: scrollX2,
              behavior
            });
            windowRestored = true;
          } else {
            const element = getElement(elementSelector);
            if (element) {
              element.scrollLeft = scrollX2;
              element.scrollTop = scrollY2;
            }
          }
        }
        if (!windowRestored && !hash) {
          const scrollOptions = {
            top: 0,
            left: 0,
            behavior
          };
          scrollTo(scrollOptions);
          if (scrollToTopSelectors) {
            scrollToTopElements ??= getScrollToTopElements(scrollToTopSelectors);
            for (const element of scrollToTopElements) element.scrollTo(scrollOptions);
          }
        }
      }
      if (!windowRestored && hash && hashScrollIntoViewOptions) document.getElementById(hash)?.scrollIntoView(hashScrollIntoViewOptions);
    } finally {
      ignoreScroll = false;
    }
  });
}

// node_modules/@tanstack/router-core/dist/esm/link.js
var preloadWarning = "Error preloading route! \u261D\uFE0F";

// node_modules/@tanstack/router-core/dist/esm/route.js
var BaseRoute = class {
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) this._path = rootRouteId;
      else if (!this.parentRoute) {
        if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`);
        invariant();
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") path = trimPathLeft(path);
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
      if (path === "__root__") path = "/";
      if (id !== "__root__") id = joinPaths(["/", id]);
      const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight2(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children;
      if (typeof children === "object" && children !== null) this.children = Object.values(children);
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn2) => {
      this.lazyFn = lazyFn2;
      return this;
    };
    this.redirect = (opts) => redirect({
      from: this.fullPath,
      ...opts
    });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
  }
};
var BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options);
  }
};

// node_modules/@tanstack/react-router/dist/esm/routerContext.js
var React$1 = __toESM(require_react(), 1);
var routerContext = React$1.createContext(null);

// node_modules/@tanstack/react-router/dist/esm/useRouter.js
var React$12 = __toESM(require_react(), 1);
function useRouter(opts) {
  const value = React$12.useContext(routerContext);
  if (process.env.NODE_ENV !== "production") {
    if ((opts?.warn ?? true) && !value) console.warn("Warning: useRouter must be used inside a <RouterProvider> component!");
  }
  return value;
}

// node_modules/@tanstack/react-router/dist/esm/utils.js
var React$13 = __toESM(require_react(), 1);
var reactUse = React$13["use"];
var useLayoutEffect2 = typeof window !== "undefined" ? React$13.useLayoutEffect : React$13.useEffect;
function usePrevious(value) {
  const ref = React$13.useRef({
    value,
    prev: null
  });
  const current = ref.current.value;
  if (value !== current) ref.current = {
    value,
    prev: current
  };
  return ref.current.prev;
}
function useIntersectionObserver(ref, callback, intersectionObserverOptions2 = {}, options = {}) {
  React$13.useEffect(() => {
    if (!ref.current || options.disabled || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, intersectionObserverOptions2);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [
    callback,
    intersectionObserverOptions2,
    options.disabled,
    ref
  ]);
}
function useForwardedRef(ref) {
  const innerRef = React$13.useRef(null);
  React$13.useImperativeHandle(ref, () => innerRef.current, []);
  return innerRef;
}

// node_modules/@tanstack/react-router/dist/esm/useNavigate.js
var React$14 = __toESM(require_react(), 1);
function useNavigate(_defaultOpts) {
  const router = useRouter();
  return React$14.useCallback((options) => {
    return router.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  }, [_defaultOpts?.from, router]);
}

// node_modules/@tanstack/react-router/dist/esm/ClientOnly.js
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function ClientOnly({ children, fallback = null }) {
  return useHydrated() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.default.Fragment, { children }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.default.Fragment, { children: fallback });
}
function useHydrated() {
  return import_react.default.useSyncExternalStore(subscribe, () => true, () => false);
}
function subscribe() {
  return () => {
  };
}

// node_modules/@tanstack/react-router/dist/esm/link.js
var React$15 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

// node_modules/@tanstack/store/dist/esm/alien.js
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
  ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
  ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
  ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
  ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
  ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
  ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
  return ReactiveFlags2;
})(ReactiveFlags || {});
// @__NO_SIDE_EFFECTS__
function createReactiveSystem({
  update,
  notify,
  unwatched
}) {
  return {
    link: link2,
    unlink: unlink2,
    propagate: propagate2,
    checkDirty: checkDirty2,
    shallowPropagate: shallowPropagate2
  };
  function link2(dep, sub, version) {
    const prevDep = sub.depsTail;
    if (prevDep !== void 0 && prevDep.dep === dep) {
      return;
    }
    const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
    if (nextDep !== void 0 && nextDep.dep === dep) {
      nextDep.version = version;
      sub.depsTail = nextDep;
      return;
    }
    const prevSub = dep.subsTail;
    if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) {
      return;
    }
    const newLink = sub.depsTail = dep.subsTail = {
      version,
      dep,
      sub,
      prevDep,
      nextDep,
      prevSub,
      nextSub: void 0
    };
    if (nextDep !== void 0) {
      nextDep.prevDep = newLink;
    }
    if (prevDep !== void 0) {
      prevDep.nextDep = newLink;
    } else {
      sub.deps = newLink;
    }
    if (prevSub !== void 0) {
      prevSub.nextSub = newLink;
    } else {
      dep.subs = newLink;
    }
  }
  function unlink2(link22, sub = link22.sub) {
    const dep = link22.dep;
    const prevDep = link22.prevDep;
    const nextDep = link22.nextDep;
    const nextSub = link22.nextSub;
    const prevSub = link22.prevSub;
    if (nextDep !== void 0) {
      nextDep.prevDep = prevDep;
    } else {
      sub.depsTail = prevDep;
    }
    if (prevDep !== void 0) {
      prevDep.nextDep = nextDep;
    } else {
      sub.deps = nextDep;
    }
    if (nextSub !== void 0) {
      nextSub.prevSub = prevSub;
    } else {
      dep.subsTail = prevSub;
    }
    if (prevSub !== void 0) {
      prevSub.nextSub = nextSub;
    } else if ((dep.subs = nextSub) === void 0) {
      unwatched(dep);
    }
    return nextDep;
  }
  function propagate2(link22) {
    let next = link22.nextSub;
    let stack;
    top: do {
      const sub = link22.sub;
      let flags = sub.flags;
      if (!(flags & (4 | 8 | 16 | 32))) {
        sub.flags = flags | 32;
      } else if (!(flags & (4 | 8))) {
        flags = 0;
      } else if (!(flags & 4)) {
        sub.flags = flags & -9 | 32;
      } else if (!(flags & (16 | 32)) && isValidLink(link22, sub)) {
        sub.flags = flags | (8 | 32);
        flags &= 1;
      } else {
        flags = 0;
      }
      if (flags & 2) {
        notify(sub);
      }
      if (flags & 1) {
        const subSubs = sub.subs;
        if (subSubs !== void 0) {
          const nextSub = (link22 = subSubs).nextSub;
          if (nextSub !== void 0) {
            stack = { value: next, prev: stack };
            next = nextSub;
          }
          continue;
        }
      }
      if ((link22 = next) !== void 0) {
        next = link22.nextSub;
        continue;
      }
      while (stack !== void 0) {
        link22 = stack.value;
        stack = stack.prev;
        if (link22 !== void 0) {
          next = link22.nextSub;
          continue top;
        }
      }
      break;
    } while (true);
  }
  function checkDirty2(link22, sub) {
    let stack;
    let checkDepth = 0;
    let dirty = false;
    top: do {
      const dep = link22.dep;
      const flags = dep.flags;
      if (sub.flags & 16) {
        dirty = true;
      } else if ((flags & (1 | 16)) === (1 | 16)) {
        if (update(dep)) {
          const subs = dep.subs;
          if (subs.nextSub !== void 0) {
            shallowPropagate2(subs);
          }
          dirty = true;
        }
      } else if ((flags & (1 | 32)) === (1 | 32)) {
        if (link22.nextSub !== void 0 || link22.prevSub !== void 0) {
          stack = { value: link22, prev: stack };
        }
        link22 = dep.deps;
        sub = dep;
        ++checkDepth;
        continue;
      }
      if (!dirty) {
        const nextDep = link22.nextDep;
        if (nextDep !== void 0) {
          link22 = nextDep;
          continue;
        }
      }
      while (checkDepth--) {
        const firstSub = sub.subs;
        const hasMultipleSubs = firstSub.nextSub !== void 0;
        if (hasMultipleSubs) {
          link22 = stack.value;
          stack = stack.prev;
        } else {
          link22 = firstSub;
        }
        if (dirty) {
          if (update(sub)) {
            if (hasMultipleSubs) {
              shallowPropagate2(firstSub);
            }
            sub = link22.sub;
            continue;
          }
          dirty = false;
        } else {
          sub.flags &= -33;
        }
        sub = link22.sub;
        const nextDep = link22.nextDep;
        if (nextDep !== void 0) {
          link22 = nextDep;
          continue top;
        }
      }
      return dirty;
    } while (true);
  }
  function shallowPropagate2(link22) {
    do {
      const sub = link22.sub;
      const flags = sub.flags;
      if ((flags & (32 | 16)) === 32) {
        sub.flags = flags | 16;
        if ((flags & (2 | 4)) === 2) {
          notify(sub);
        }
      }
    } while ((link22 = link22.nextSub) !== void 0);
  }
  function isValidLink(checkLink, sub) {
    let link22 = sub.depsTail;
    while (link22 !== void 0) {
      if (link22 === checkLink) {
        return true;
      }
      link22 = link22.prevDep;
    }
    return false;
  }
}

// node_modules/@tanstack/store/dist/esm/atom.js
function toObserver(nextHandler, errorHandler, completionHandler) {
  const isObserver = typeof nextHandler === "object";
  const self2 = isObserver ? nextHandler : void 0;
  return {
    next: (isObserver ? nextHandler.next : nextHandler)?.bind(self2),
    error: (isObserver ? nextHandler.error : errorHandler)?.bind(self2),
    complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(
      self2
    )
  };
}
var queuedEffects = [];
var cycle = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = createReactiveSystem({
  update(atom) {
    return atom._update();
  },
  // eslint-disable-next-line no-shadow
  notify(effect2) {
    queuedEffects[queuedEffectsLength++] = effect2;
    effect2.flags &= ~ReactiveFlags.Watching;
  },
  unwatched(atom) {
    if (atom.depsTail !== void 0) {
      atom.depsTail = void 0;
      atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
      purgeDeps(atom);
    }
  }
});
var notifyIndex = 0;
var queuedEffectsLength = 0;
var activeSub;
var batchDepth = 0;
function batch(fn2) {
  try {
    ++batchDepth;
    fn2();
  } finally {
    if (!--batchDepth) {
      flush();
    }
  }
}
function purgeDeps(sub) {
  const depsTail = sub.depsTail;
  let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
  while (dep !== void 0) {
    dep = unlink(dep, sub);
  }
}
function flush() {
  if (batchDepth > 0) {
    return;
  }
  while (notifyIndex < queuedEffectsLength) {
    const effect2 = queuedEffects[notifyIndex];
    queuedEffects[notifyIndex++] = void 0;
    effect2.notify();
  }
  notifyIndex = 0;
  queuedEffectsLength = 0;
}
function createAtom(valueOrFn, options) {
  const isComputed = typeof valueOrFn === "function";
  const getter = valueOrFn;
  const atom = {
    _snapshot: isComputed ? void 0 : valueOrFn,
    subs: void 0,
    subsTail: void 0,
    deps: void 0,
    depsTail: void 0,
    flags: isComputed ? ReactiveFlags.None : ReactiveFlags.Mutable,
    get() {
      if (activeSub !== void 0) {
        link(atom, activeSub, cycle);
      }
      return atom._snapshot;
    },
    subscribe(observerOrFn) {
      const obs = toObserver(observerOrFn);
      const observed = { current: false };
      const e = effect(() => {
        atom.get();
        if (!observed.current) {
          observed.current = true;
        } else {
          obs.next?.(atom._snapshot);
        }
      });
      return {
        unsubscribe: () => {
          e.stop();
        }
      };
    },
    _update(getValue) {
      const prevSub = activeSub;
      const compare = options?.compare ?? Object.is;
      if (isComputed) {
        activeSub = atom;
        ++cycle;
        atom.depsTail = void 0;
      } else if (getValue === void 0) {
        return false;
      }
      if (isComputed) {
        atom.flags = ReactiveFlags.Mutable | ReactiveFlags.RecursedCheck;
      }
      try {
        const oldValue = atom._snapshot;
        const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
        if (oldValue === void 0 || !compare(oldValue, newValue)) {
          atom._snapshot = newValue;
          return true;
        }
        return false;
      } finally {
        activeSub = prevSub;
        if (isComputed) {
          atom.flags &= ~ReactiveFlags.RecursedCheck;
        }
        purgeDeps(atom);
      }
    }
  };
  if (isComputed) {
    atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
    atom.get = function() {
      const flags = atom.flags;
      if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(atom.deps, atom)) {
        if (atom._update()) {
          const subs = atom.subs;
          if (subs !== void 0) {
            shallowPropagate(subs);
          }
        }
      } else if (flags & ReactiveFlags.Pending) {
        atom.flags = flags & ~ReactiveFlags.Pending;
      }
      if (activeSub !== void 0) {
        link(atom, activeSub, cycle);
      }
      return atom._snapshot;
    };
  } else {
    atom.set = function(valueOrFn2) {
      if (atom._update(valueOrFn2)) {
        const subs = atom.subs;
        if (subs !== void 0) {
          propagate(subs);
          shallowPropagate(subs);
          flush();
        }
      }
    };
  }
  return atom;
}
function effect(fn2) {
  const run = () => {
    const prevSub = activeSub;
    activeSub = effectObj;
    ++cycle;
    effectObj.depsTail = void 0;
    effectObj.flags = ReactiveFlags.Watching | ReactiveFlags.RecursedCheck;
    try {
      return fn2();
    } finally {
      activeSub = prevSub;
      effectObj.flags &= ~ReactiveFlags.RecursedCheck;
      purgeDeps(effectObj);
    }
  };
  const effectObj = {
    deps: void 0,
    depsTail: void 0,
    subs: void 0,
    subsTail: void 0,
    flags: ReactiveFlags.Watching | ReactiveFlags.RecursedCheck,
    notify() {
      const flags = this.flags;
      if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(this.deps, this)) {
        run();
      } else {
        this.flags = ReactiveFlags.Watching;
      }
    },
    stop() {
      this.flags = ReactiveFlags.None;
      this.depsTail = void 0;
      purgeDeps(this);
    }
  };
  run();
  return effectObj;
}

// node_modules/@tanstack/react-store/dist/esm/useStore.js
var import_react2 = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
function defaultCompare(a, b2) {
  return a === b2;
}
function useStore(atom, selector, compare = defaultCompare) {
  const subscribe2 = (0, import_react2.useCallback)(
    (handleStoreChange) => {
      if (!atom) {
        return () => {
        };
      }
      const { unsubscribe } = atom.subscribe(handleStoreChange);
      return unsubscribe;
    },
    [atom]
  );
  const boundGetSnapshot = (0, import_react2.useCallback)(() => atom?.get(), [atom]);
  const selectedSnapshot = (0, import_with_selector.useSyncExternalStoreWithSelector)(
    subscribe2,
    boundGetSnapshot,
    boundGetSnapshot,
    selector,
    compare
  );
  return selectedSnapshot;
}

// node_modules/@tanstack/react-router/dist/esm/link.js
var import_react_dom = __toESM(require_react_dom(), 1);
function useLinkProps(options, forwardedRef) {
  const router = useRouter();
  const innerRef = useForwardedRef(forwardedRef);
  const _isServer = isServer ?? router.isServer;
  const { activeProps, inactiveProps, activeOptions, to: to2, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition: startTransition2, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
  if (_isServer) {
    const safeInternal = isSafeInternal(to2);
    if (typeof to2 === "string" && !safeInternal && to2.indexOf(":") > -1) try {
      new URL(to2);
      if (isDangerousProtocol(to2, router.protocolAllowlist)) {
        if (process.env.NODE_ENV !== "production") console.warn(`Blocked Link with dangerous protocol: ${to2}`);
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: void 0,
          ...children && { children },
          ...target && { target },
          ...disabled && { disabled },
          ...style && { style },
          ...className && { className }
        };
      }
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: to2,
        ...children && { children },
        ...target && { target },
        ...disabled && { disabled },
        ...style && { style },
        ...className && { className }
      };
    } catch {
    }
    const next2 = router.buildLocation({
      ...options,
      from: options.from
    });
    const hrefOption2 = getHrefOption(next2.maskedLocation ? next2.maskedLocation.publicHref : next2.publicHref, next2.maskedLocation ? next2.maskedLocation.external : next2.external, router.history, disabled);
    const externalLink2 = (() => {
      if (hrefOption2?.external) {
        if (isDangerousProtocol(hrefOption2.href, router.protocolAllowlist)) {
          if (process.env.NODE_ENV !== "production") console.warn(`Blocked Link with dangerous protocol: ${hrefOption2.href}`);
          return;
        }
        return hrefOption2.href;
      }
      if (safeInternal) return void 0;
      if (typeof to2 === "string" && to2.indexOf(":") > -1) try {
        new URL(to2);
        if (isDangerousProtocol(to2, router.protocolAllowlist)) {
          if (process.env.NODE_ENV !== "production") console.warn(`Blocked Link with dangerous protocol: ${to2}`);
          return;
        }
        return to2;
      } catch {
      }
    })();
    const isActive2 = (() => {
      if (externalLink2) return false;
      const currentLocation2 = router.stores.location.get();
      const exact = activeOptions?.exact ?? false;
      if (exact) {
        if (!exactPathTest(currentLocation2.pathname, next2.pathname, router.basepath)) return false;
      } else {
        const currentPathSplit = removeTrailingSlash(currentLocation2.pathname, router.basepath);
        const nextPathSplit = removeTrailingSlash(next2.pathname, router.basepath);
        if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
      }
      if (activeOptions?.includeSearch ?? true) {
        if (currentLocation2.search !== next2.search) {
          const currentSearchEmpty = !currentLocation2.search || typeof currentLocation2.search === "object" && !hasKeys(currentLocation2.search);
          const nextSearchEmpty = !next2.search || typeof next2.search === "object" && !hasKeys(next2.search);
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            if (!deepEqual(currentLocation2.search, next2.search, {
              partial: !exact,
              ignoreUndefined: !activeOptions?.explicitUndefined
            })) return false;
          }
        }
      }
      if (activeOptions?.includeHash) return false;
      return true;
    })();
    if (externalLink2) return {
      ...propsSafeToSpread,
      ref: innerRef,
      href: externalLink2,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className }
    };
    const resolvedActiveProps2 = isActive2 ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
    const resolvedInactiveProps2 = isActive2 ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
    const resolvedStyle2 = (() => {
      const baseStyle = style;
      const activeStyle = resolvedActiveProps2.style;
      const inactiveStyle = resolvedInactiveProps2.style;
      if (!baseStyle && !activeStyle && !inactiveStyle) return;
      if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
      if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
      if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle
      };
    })();
    const resolvedClassName2 = (() => {
      const baseClassName = className;
      const activeClassName = resolvedActiveProps2.className;
      const inactiveClassName = resolvedInactiveProps2.className;
      if (!baseClassName && !activeClassName && !inactiveClassName) return "";
      let out = "";
      if (baseClassName) out = baseClassName;
      if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
      if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
      return out;
    })();
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps2,
      ...resolvedInactiveProps2,
      href: hrefOption2?.href,
      ref: innerRef,
      disabled: !!disabled,
      target,
      ...resolvedStyle2 && { style: resolvedStyle2 },
      ...resolvedClassName2 && { className: resolvedClassName2 },
      ...disabled && STATIC_DISABLED_PROPS,
      ...isActive2 && STATIC_ACTIVE_PROPS
    };
  }
  const isHydrated = useHydrated();
  const _options = React$15.useMemo(() => options, [
    router,
    options.from,
    options._fromLocation,
    options.hash,
    options.to,
    options.search,
    options.params,
    options.state,
    options.mask,
    options.unsafeRelative
  ]);
  const currentLocation = useStore(router.stores.location, (l2) => l2, (prev, next2) => prev.href === next2.href);
  const next = React$15.useMemo(() => {
    const opts = {
      _fromLocation: currentLocation,
      ..._options
    };
    return router.buildLocation(opts);
  }, [
    router,
    currentLocation,
    _options
  ]);
  const hrefOptionPublicHref = next.maskedLocation ? next.maskedLocation.publicHref : next.publicHref;
  const hrefOptionExternal = next.maskedLocation ? next.maskedLocation.external : next.external;
  const hrefOption = React$15.useMemo(() => getHrefOption(hrefOptionPublicHref, hrefOptionExternal, router.history, disabled), [
    disabled,
    hrefOptionExternal,
    hrefOptionPublicHref,
    router.history
  ]);
  const externalLink = React$15.useMemo(() => {
    if (hrefOption?.external) {
      if (isDangerousProtocol(hrefOption.href, router.protocolAllowlist)) {
        if (process.env.NODE_ENV !== "production") console.warn(`Blocked Link with dangerous protocol: ${hrefOption.href}`);
        return;
      }
      return hrefOption.href;
    }
    if (isSafeInternal(to2)) return void 0;
    if (typeof to2 !== "string" || to2.indexOf(":") === -1) return void 0;
    try {
      new URL(to2);
      if (isDangerousProtocol(to2, router.protocolAllowlist)) {
        if (process.env.NODE_ENV !== "production") console.warn(`Blocked Link with dangerous protocol: ${to2}`);
        return;
      }
      return to2;
    } catch {
    }
  }, [
    to2,
    hrefOption,
    router.protocolAllowlist
  ]);
  const isActive = React$15.useMemo(() => {
    if (externalLink) return false;
    if (activeOptions?.exact) {
      if (!exactPathTest(currentLocation.pathname, next.pathname, router.basepath)) return false;
    } else {
      const currentPathSplit = removeTrailingSlash(currentLocation.pathname, router.basepath);
      const nextPathSplit = removeTrailingSlash(next.pathname, router.basepath);
      if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
    }
    if (activeOptions?.includeSearch ?? true) {
      if (!deepEqual(currentLocation.search, next.search, {
        partial: !activeOptions?.exact,
        ignoreUndefined: !activeOptions?.explicitUndefined
      })) return false;
    }
    if (activeOptions?.includeHash) return isHydrated && currentLocation.hash === next.hash;
    return true;
  }, [
    activeOptions?.exact,
    activeOptions?.explicitUndefined,
    activeOptions?.includeHash,
    activeOptions?.includeSearch,
    currentLocation,
    externalLink,
    isHydrated,
    next.hash,
    next.pathname,
    next.search,
    router.basepath
  ]);
  const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
  const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = (style || resolvedActiveProps.style || resolvedInactiveProps.style) && {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  const [isTransitioning, setIsTransitioning] = React$15.useState(false);
  const hasRenderFetched = React$15.useRef(false);
  const preload = options.reloadDocument || externalLink ? false : userPreload ?? router.options.defaultPreload;
  const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
  const doPreload = React$15.useCallback(() => {
    router.preloadRoute({
      ..._options,
      _builtLocation: next
    }).catch((err) => {
      console.warn(err);
      console.warn(preloadWarning);
    });
  }, [
    router,
    _options,
    next
  ]);
  useIntersectionObserver(innerRef, React$15.useCallback((entry) => {
    if (entry?.isIntersecting) doPreload();
  }, [doPreload]), intersectionObserverOptions, { disabled: !!disabled || !(preload === "viewport") });
  React$15.useEffect(() => {
    if (hasRenderFetched.current) return;
    if (!disabled && preload === "render") {
      doPreload();
      hasRenderFetched.current = true;
    }
  }, [
    disabled,
    doPreload,
    preload
  ]);
  const handleClick = (e) => {
    const elementTarget = e.currentTarget.getAttribute("target");
    const effectiveTarget = target !== void 0 ? target : elementTarget;
    if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
      e.preventDefault();
      (0, import_react_dom.flushSync)(() => {
        setIsTransitioning(true);
      });
      const unsub = router.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      router.navigate({
        ..._options,
        replace,
        resetScroll,
        hashScrollIntoView,
        startTransition: startTransition2,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  if (externalLink) return {
    ...propsSafeToSpread,
    ref: innerRef,
    href: externalLink,
    ...children && { children },
    ...target && { target },
    ...disabled && { disabled },
    ...style && { style },
    ...className && { className },
    ...onClick && { onClick },
    ...onBlur && { onBlur },
    ...onFocus && { onFocus },
    ...onMouseEnter && { onMouseEnter },
    ...onMouseLeave && { onMouseLeave },
    ...onTouchStart && { onTouchStart }
  };
  const enqueueIntentPreload = (e) => {
    if (disabled || preload !== "intent") return;
    if (!preloadDelay) {
      doPreload();
      return;
    }
    const eventTarget = e.currentTarget;
    if (timeoutMap.has(eventTarget)) return;
    const id = setTimeout(() => {
      timeoutMap.delete(eventTarget);
      doPreload();
    }, preloadDelay);
    timeoutMap.set(eventTarget, id);
  };
  const handleTouchStart = (_3) => {
    if (disabled || preload !== "intent") return;
    doPreload();
  };
  const handleLeave = (e) => {
    if (disabled || !preload || !preloadDelay) return;
    const eventTarget = e.currentTarget;
    const id = timeoutMap.get(eventTarget);
    if (id) {
      clearTimeout(id);
      timeoutMap.delete(eventTarget);
    }
  };
  return {
    ...propsSafeToSpread,
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    href: hrefOption?.href,
    ref: innerRef,
    onClick: composeHandlers([onClick, handleClick]),
    onBlur: composeHandlers([onBlur, handleLeave]),
    onFocus: composeHandlers([onFocus, enqueueIntentPreload]),
    onMouseEnter: composeHandlers([onMouseEnter, enqueueIntentPreload]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    disabled: !!disabled,
    target,
    ...resolvedStyle && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && STATIC_DISABLED_PROPS,
    ...isActive && STATIC_ACTIVE_PROPS,
    ...isHydrated && isTransitioning && STATIC_TRANSITIONING_PROPS
  };
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
  role: "link",
  "aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
  "data-status": "active",
  "aria-current": "page"
};
var STATIC_TRANSITIONING_PROPS = { "data-transitioning": "transitioning" };
var timeoutMap = /* @__PURE__ */ new WeakMap();
var intersectionObserverOptions = { rootMargin: "100px" };
var composeHandlers = (handlers) => (e) => {
  for (const handler of handlers) {
    if (!handler) continue;
    if (e.defaultPrevented) return;
    handler(e);
  }
};
function getHrefOption(publicHref, external, history2, disabled) {
  if (disabled) return void 0;
  if (external) return {
    href: publicHref,
    external: true
  };
  return {
    href: history2.createHref(publicHref) || "/",
    external: false
  };
}
function isSafeInternal(to2) {
  if (typeof to2 !== "string") return false;
  const zero = to2.charCodeAt(0);
  if (zero === 47) return to2.charCodeAt(1) !== 47;
  return zero === 46;
}
var Link = React$15.forwardRef((props, ref) => {
  const { _asChild, ...rest } = props;
  const { type: _type, ...linkProps } = useLinkProps(rest, ref);
  const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
  if (!_asChild) {
    const { disabled: _3, ...rest2 } = linkProps;
    return React$15.createElement("a", rest2, children);
  }
  return React$15.createElement(_asChild, linkProps, children);
});
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

// node_modules/@tanstack/react-router/dist/esm/matchContext.js
var React$16 = __toESM(require_react(), 1);
var matchContext = React$16.createContext(void 0);
var dummyMatchContext = React$16.createContext(void 0);

// node_modules/@tanstack/react-router/dist/esm/useMatch.js
var React$17 = __toESM(require_react(), 1);
var dummyStore = {
  get() {
  },
  subscribe() {
    return { unsubscribe() {
    } };
  }
};
function useStructuralSharing(opts, router) {
  const previousResult = React$17.useRef();
  return (slice) => {
    const selected = opts?.select ? opts.select(slice) : slice;
    if (opts?.structuralSharing ?? router.options.defaultStructuralSharing) return previousResult.current = replaceEqualDeep(previousResult.current, selected);
    return selected;
  };
}
function useMatch(opts) {
  const router = useRouter();
  const nearestMatchId = React$17.useContext(opts.from ? dummyMatchContext : matchContext);
  const matchStore = opts.from ? router.stores.getRouteMatchStore(opts.from) : router.stores.matchStores.get(nearestMatchId);
  if (isServer ?? router.isServer) {
    const match = matchStore?.get();
    if (!match) {
      if (opts.shouldThrow ?? true) {
        if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`);
        invariant();
      }
      return;
    }
    return opts.select ? opts.select(match) : match;
  }
  const selector = useStructuralSharing(opts, router);
  const matchSelection = useStore(matchStore ?? dummyStore, (match) => match ? selector(match) : dummyStore);
  if (matchSelection !== dummyStore) return matchSelection;
  if (opts.shouldThrow ?? true) {
    if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`);
    invariant();
  }
}

// node_modules/@tanstack/react-router/dist/esm/useLoaderData.js
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.loaderData) : match.loaderData;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (match) => {
      return select ? select(match.loaderDeps) : match.loaderDeps;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useParams.js
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useSearch.js
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}

// node_modules/@tanstack/react-router/dist/esm/route.js
var import_react3 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var Route = class extends BaseRoute {
  /**
  * @deprecated Use the `createRoute` function instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = import_react3.default.forwardRef((props, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
var RootRoute = class extends BaseRootRoute {
  /**
  * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = import_react3.default.forwardRef((props, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}

// node_modules/@tanstack/react-router/dist/esm/fileRoute.js
function createFileRoute(path) {
  return new FileRoute(path, { silent: true }).createRoute;
}
var FileRoute = class {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      if (process.env.NODE_ENV !== "production") {
        if (!this.silent) console.warn("Warning: FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead.");
      }
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
};

// node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
var React$18 = __toESM(require_react(), 1);
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) loadPromise = importer().then((res) => {
      loadPromise = void 0;
      comp = res[exportName ?? "default"];
    }).catch((err) => {
      error = err;
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey2 = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey2)) {
            sessionStorage.setItem(storageKey2, "1");
            reload = true;
          }
        }
      }
    });
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) throw error;
    if (!comp) if (reactUse) reactUse(load());
    else throw load();
    return React$18.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}

// node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js
var React$19 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function CatchBoundary(props) {
  const errorComponent = props.errorComponent ?? ErrorComponent;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CatchBoundaryImpl, {
    getResetKey: props.getResetKey,
    onCatch: props.onCatch,
    children: ({ error, reset }) => {
      if (error) return React$19.createElement(errorComponent, {
        error,
        reset
      });
      return props.children;
    }
  });
}
var CatchBoundaryImpl = class extends React$19.Component {
  constructor(..._args) {
    super(..._args);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props, state) {
    const resetKey = props.getResetKey();
    if (state.error && state.resetKey !== resetKey) return {
      resetKey,
      error: null
    };
    return { resetKey };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onCatch) this.props.onCatch(error, errorInfo);
  }
  render() {
    return this.props.children({
      error: this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
};
function ErrorComponent({ error }) {
  const [show, setShow] = React$19.useState(process.env.NODE_ENV !== "production");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
    style: {
      padding: ".5rem",
      maxWidth: "100%"
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: ".5rem"
        },
        children: [/* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", {
          style: { fontSize: "1rem" },
          children: "Something went wrong!"
        }), /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d2) => !d2),
          children: show ? "Hide Error" : "Show Error"
        })]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { height: ".25rem" } }),
      show ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { children: error.message }) : null
      }) }) : null
    ]
  });
}

// node_modules/@tanstack/react-router/dist/esm/not-found.js
var import_react4 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function CatchNotFound(props) {
  const router = useRouter();
  if (isServer ?? router.isServer) {
    const resetKey2 = `not-found-${router.stores.location.get().pathname}-${router.stores.status.get()}`;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CatchBoundary, {
      getResetKey: () => resetKey2,
      onCatch: (error, errorInfo) => {
        if (isNotFound(error)) props.onCatch?.(error, errorInfo);
        else throw error;
      },
      errorComponent: ({ error }) => {
        if (isNotFound(error)) return props.fallback?.(error);
        else throw error;
      },
      children: props.children
    });
  }
  const resetKey = `not-found-${useStore(router.stores.location, (location) => location.pathname)}-${useStore(router.stores.status, (status) => status)}`;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CatchBoundary, {
    getResetKey: () => resetKey,
    onCatch: (error, errorInfo) => {
      if (isNotFound(error)) props.onCatch?.(error, errorInfo);
      else throw error;
    },
    errorComponent: ({ error }) => {
      if (isNotFound(error)) return props.fallback?.(error);
      else throw error;
    },
    children: props.children
  });
}
function DefaultGlobalNotFound() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Not Found" });
}

// node_modules/@tanstack/react-router/dist/esm/SafeFragment.js
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function SafeFragment(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: props.children });
}

// node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js
var import_react6 = __toESM(require_react(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(router.options.defaultNotFoundComponent, { ...data });
    if (process.env.NODE_ENV !== "production") {
      if (!route.options.notFoundComponent) console.warn(`Warning: A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<p>Not Found</p>)`);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DefaultGlobalNotFound, {});
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(route.options.notFoundComponent, { ...data });
}

// node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
function ScriptOnce({ children }) {
  const router = useRouter();
  if (!(isServer ?? router.isServer)) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("script", {
    nonce: router.options.ssr?.nonce,
    dangerouslySetInnerHTML: { __html: children + ";document.currentScript.remove()" }
  });
}

// node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);

// node_modules/@tanstack/router-core/dist/esm/scroll-restoration-inline.js
var scroll_restoration_inline_default = 'function(a,f){let l;try{l=JSON.parse(sessionStorage.getItem(a)||"{}")}catch{return}const n=l?.[f||history.state?.__TSR_key];let c=!1;for(const t in n){const e=n[t],o=e?.scrollX,s=e?.scrollY;if(Number.isFinite(o)&&Number.isFinite(s)){if(t==="window")scrollTo(o,s),c=!0;else if(t)try{const r=document.querySelector(t);r&&(r.scrollLeft=o,r.scrollTop=s)}catch{}}}if(c)return;const i=location.hash.slice(1);if(i){const t=history.state?.__hashScrollIntoViewOptions??!0;if(t){const e=document.getElementById(i);e&&e.scrollIntoView(t)}return}scrollTo(0,0)}';

// node_modules/@tanstack/router-core/dist/esm/scroll-restoration-script/server.js
var defaultInlineScrollRestorationScript = `(${scroll_restoration_inline_default})(${escapeHtml(JSON.stringify(storageKey))})`;
function getScrollRestorationScript(key) {
  if (key === void 0) return defaultInlineScrollRestorationScript;
  return `(${scroll_restoration_inline_default})(${escapeHtml(JSON.stringify(storageKey))},${escapeHtml(JSON.stringify(key))})`;
}
function getScrollRestorationScriptForRouter(router) {
  if (typeof router.options.scrollRestoration === "function" && !router.options.scrollRestoration({ location: router.latestLocation })) return null;
  const getKey = router.options.getScrollRestorationKey;
  if (!getKey) return defaultInlineScrollRestorationScript;
  const location = router.latestLocation;
  const userKey = getKey(location);
  if (userKey === defaultGetScrollRestorationKey(location)) return defaultInlineScrollRestorationScript;
  return getScrollRestorationScript(userKey);
}

// node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
function ScrollRestoration() {
  const script = getScrollRestorationScriptForRouter(useRouter());
  if (!script) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ScriptOnce, { children: script });
}

// node_modules/@tanstack/react-router/dist/esm/Match.js
var React$110 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var matchViewFieldsEqual = (a, b2) => a.routeId === b2.routeId && a._displayPending === b2._displayPending;
var outletMatchSelectionEqual = (a, b2) => a[0] === b2[0] && a[1] === b2[1];
var Match = React$110.memo(function MatchImpl({ matchId }) {
  const router = useRouter();
  if (isServer ?? router.isServer) {
    const match2 = router.stores.matchStores.get(matchId)?.get();
    if (!match2) {
      if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Could not find match for matchId "${matchId}". Please file an issue!`);
      invariant();
    }
    const routeId = match2.routeId;
    const parentRouteId = router.routesById[routeId].parentRoute?.id;
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MatchView, {
      router,
      matchId,
      resetKey: router.stores.loadedAt.get(),
      matchState: {
        routeId,
        ssr: match2.ssr,
        _displayPending: match2._displayPending,
        parentRouteId
      }
    });
  }
  const matchStore = router.stores.matchStores.get(matchId);
  if (!matchStore) {
    if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Could not find match for matchId "${matchId}". Please file an issue!`);
    invariant();
  }
  const resetKey = useStore(router.stores.loadedAt, (loadedAt) => loadedAt);
  const match = useStore(matchStore, (value) => value, matchViewFieldsEqual);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MatchView, {
    router,
    matchId,
    resetKey,
    matchState: React$110.useMemo(() => {
      const routeId = match.routeId;
      const parentRouteId = router.routesById[routeId].parentRoute?.id;
      return {
        routeId,
        ssr: match.ssr,
        _displayPending: match._displayPending,
        parentRouteId
      };
    }, [
      match._displayPending,
      match.routeId,
      match.ssr,
      router.routesById
    ])
  });
});
function MatchView({ router, matchId, resetKey, matchState }) {
  const route = router.routesById[matchState.routeId];
  const PendingComponent = route.options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? route.options.notFoundComponent ?? router.options.notFoundRoute?.options.component : route.options.notFoundComponent;
  const resolvedNoSsr = matchState.ssr === false || matchState.ssr === "data-only";
  const ResolvedSuspenseBoundary = (!route.isRoot || route.options.wrapInSuspense || resolvedNoSsr) && (route.options.wrapInSuspense ?? PendingComponent ?? (route.options.errorComponent?.preload || resolvedNoSsr)) ? React$110.Suspense : SafeFragment;
  const ResolvedCatchBoundary = routeErrorComponent ? CatchBoundary : SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? CatchNotFound : SafeFragment;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(route.isRoot ? route.options.shellComponent ?? SafeFragment : SafeFragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime10.jsx)(matchContext.Provider, {
    value: matchId,
    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ResolvedSuspenseBoundary, {
      fallback: pendingElement,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ResolvedCatchBoundary, {
        getResetKey: () => resetKey,
        errorComponent: routeErrorComponent || ErrorComponent,
        onCatch: (error, errorInfo) => {
          if (isNotFound(error)) {
            error.routeId ??= matchState.routeId;
            throw error;
          }
          if (process.env.NODE_ENV !== "production") console.warn(`Warning: Error in route match: ${matchId}`);
          routeOnCatch?.(error, errorInfo);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ResolvedNotFoundBoundary, {
          fallback: (error) => {
            error.routeId ??= matchState.routeId;
            if (!routeNotFoundComponent || error.routeId && error.routeId !== matchState.routeId || !error.routeId && !route.isRoot) throw error;
            return React$110.createElement(routeNotFoundComponent, error);
          },
          children: resolvedNoSsr || matchState._displayPending ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ClientOnly, {
            fallback: pendingElement,
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MatchInner, { matchId })
          }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MatchInner, { matchId })
        })
      })
    })
  }), matchState.parentRouteId === rootRouteId ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime10.jsx)(OnRendered, {}), router.options.scrollRestoration && (isServer ?? router.isServer) ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ScrollRestoration, {}) : null] }) : null] });
}
function OnRendered() {
  const router = useRouter();
  if (isServer ?? router.isServer) return null;
  const prevResolvedLocationRef = React$110.useRef();
  useLayoutEffect2(() => {
    const currentResolvedLocation = router.stores.resolvedLocation.get();
    const previousResolvedLocation = prevResolvedLocationRef.current;
    if (currentResolvedLocation && (!previousResolvedLocation || previousResolvedLocation.href !== currentResolvedLocation.href)) router.emit({
      type: "onRendered",
      ...getLocationChangeInfo(router.stores.location.get(), previousResolvedLocation ?? currentResolvedLocation)
    });
    prevResolvedLocationRef.current = currentResolvedLocation;
  }, [useStore(router.stores.resolvedLocation, (resolvedLocation) => resolvedLocation?.state.__TSR_key), router]);
  return null;
}
var MatchInner = React$110.memo(function MatchInnerImpl({ matchId }) {
  const router = useRouter();
  const getMatchPromise = (match2, key2) => {
    return router.getMatch(match2.id)?._nonReactive[key2] ?? match2._nonReactive[key2];
  };
  if (isServer ?? router.isServer) {
    const match2 = router.stores.matchStores.get(matchId)?.get();
    if (!match2) {
      if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Could not find match for matchId "${matchId}". Please file an issue!`);
      invariant();
    }
    const routeId2 = match2.routeId;
    const route2 = router.routesById[routeId2];
    const remountDeps = (router.routesById[routeId2].options.remountDeps ?? router.options.defaultRemountDeps)?.({
      routeId: routeId2,
      loaderDeps: match2.loaderDeps,
      params: match2._strictParams,
      search: match2._strictSearch
    });
    const key2 = remountDeps ? JSON.stringify(remountDeps) : void 0;
    const Comp = route2.options.component ?? router.options.defaultComponent;
    const out2 = Comp ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Comp, {}, key2) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Outlet, {});
    if (match2._displayPending) throw getMatchPromise(match2, "displayPendingPromise");
    if (match2._forcePending) throw getMatchPromise(match2, "minPendingPromise");
    if (match2.status === "pending") throw getMatchPromise(match2, "loadPromise");
    if (match2.status === "notFound") {
      if (!isNotFound(match2.error)) {
        if (process.env.NODE_ENV !== "production") throw new Error("Invariant failed: Expected a notFound error");
        invariant();
      }
      return renderRouteNotFound(router, route2, match2.error);
    }
    if (match2.status === "redirected") {
      if (!isRedirect(match2.error)) {
        if (process.env.NODE_ENV !== "production") throw new Error("Invariant failed: Expected a redirect error");
        invariant();
      }
      throw getMatchPromise(match2, "loadPromise");
    }
    if (match2.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)((route2.options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent, {
      error: match2.error,
      reset: void 0,
      info: { componentStack: "" }
    });
    return out2;
  }
  const matchStore = router.stores.matchStores.get(matchId);
  if (!matchStore) {
    if (process.env.NODE_ENV !== "production") throw new Error(`Invariant failed: Could not find match for matchId "${matchId}". Please file an issue!`);
    invariant();
  }
  const match = useStore(matchStore, (value) => value);
  const routeId = match.routeId;
  const route = router.routesById[routeId];
  const key = React$110.useMemo(() => {
    const remountDeps = (router.routesById[routeId].options.remountDeps ?? router.options.defaultRemountDeps)?.({
      routeId,
      loaderDeps: match.loaderDeps,
      params: match._strictParams,
      search: match._strictSearch
    });
    return remountDeps ? JSON.stringify(remountDeps) : void 0;
  }, [
    routeId,
    match.loaderDeps,
    match._strictParams,
    match._strictSearch,
    router.options.defaultRemountDeps,
    router.routesById
  ]);
  const out = React$110.useMemo(() => {
    const Comp = route.options.component ?? router.options.defaultComponent;
    if (Comp) return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Comp, {}, key);
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Outlet, {});
  }, [
    key,
    route.options.component,
    router.options.defaultComponent
  ]);
  if (match._displayPending) throw getMatchPromise(match, "displayPendingPromise");
  if (match._forcePending) throw getMatchPromise(match, "minPendingPromise");
  if (match.status === "pending") {
    const pendingMinMs = route.options.pendingMinMs ?? router.options.defaultPendingMinMs;
    if (pendingMinMs) {
      const routerMatch = router.getMatch(match.id);
      if (routerMatch && !routerMatch._nonReactive.minPendingPromise) {
        if (!(isServer ?? router.isServer)) {
          const minPendingPromise = createControlledPromise();
          routerMatch._nonReactive.minPendingPromise = minPendingPromise;
          setTimeout(() => {
            minPendingPromise.resolve();
            routerMatch._nonReactive.minPendingPromise = void 0;
          }, pendingMinMs);
        }
      }
    }
    throw getMatchPromise(match, "loadPromise");
  }
  if (match.status === "notFound") {
    if (!isNotFound(match.error)) {
      if (process.env.NODE_ENV !== "production") throw new Error("Invariant failed: Expected a notFound error");
      invariant();
    }
    return renderRouteNotFound(router, route, match.error);
  }
  if (match.status === "redirected") {
    if (!isRedirect(match.error)) {
      if (process.env.NODE_ENV !== "production") throw new Error("Invariant failed: Expected a redirect error");
      invariant();
    }
    throw getMatchPromise(match, "loadPromise");
  }
  if (match.status === "error") {
    if (isServer ?? router.isServer) return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)((route.options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent, {
      error: match.error,
      reset: void 0,
      info: { componentStack: "" }
    });
    throw match.error;
  }
  return out;
});
var Outlet = React$110.memo(function OutletImpl() {
  const router = useRouter();
  const matchId = React$110.useContext(matchContext);
  let routeId;
  let parentGlobalNotFound = false;
  let childMatchId;
  if (isServer ?? router.isServer) {
    const matches = router.stores.matches.get();
    const parentIndex = matchId ? matches.findIndex((match) => match.id === matchId) : -1;
    const parentMatch = parentIndex >= 0 ? matches[parentIndex] : void 0;
    routeId = parentMatch?.routeId;
    parentGlobalNotFound = parentMatch?.globalNotFound ?? false;
    childMatchId = parentIndex >= 0 ? matches[parentIndex + 1]?.id : void 0;
  } else {
    const parentMatchStore = matchId ? router.stores.matchStores.get(matchId) : void 0;
    [routeId, parentGlobalNotFound] = useStore(parentMatchStore, (match) => [match?.routeId, match?.globalNotFound ?? false], outletMatchSelectionEqual);
    childMatchId = useStore(router.stores.matchesId, (ids) => {
      return ids[ids.findIndex((id) => id === matchId) + 1];
    });
  }
  const route = routeId ? router.routesById[routeId] : void 0;
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(router.options.defaultPendingComponent, {}) : null;
  if (parentGlobalNotFound) {
    if (!route) {
      if (process.env.NODE_ENV !== "production") throw new Error("Invariant failed: Could not resolve route for Outlet render");
      invariant();
    }
    return renderRouteNotFound(router, route, void 0);
  }
  if (!childMatchId) return null;
  const nextMatch = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Match, { matchId: childMatchId });
  if (routeId === rootRouteId) return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(React$110.Suspense, {
    fallback: pendingElement,
    children: nextMatch
  });
  return nextMatch;
});

// node_modules/@tanstack/react-router/dist/esm/routerStores.js
var getStoreFactory = (opts) => {
  if (isServer ?? opts.isServer) return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn2) => fn2()
  };
  return {
    createMutableStore: createAtom,
    createReadonlyStore: createAtom,
    batch
  };
};

// node_modules/@tanstack/react-router/dist/esm/router.js
var createRouter = (options) => {
  return new Router(options);
};
var Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};

// node_modules/@tanstack/react-router/dist/esm/Transitioner.js
var React$111 = __toESM(require_react(), 1);
function Transitioner() {
  const router = useRouter();
  const mountLoadForRouter = React$111.useRef({
    router,
    mounted: false
  });
  const [isTransitioning, setIsTransitioning] = React$111.useState(false);
  const isLoading = useStore(router.stores.isLoading, (value) => value);
  const hasPending = useStore(router.stores.hasPending, (value) => value);
  const previousIsLoading = usePrevious(isLoading);
  const isAnyPending = isLoading || isTransitioning || hasPending;
  const previousIsAnyPending = usePrevious(isAnyPending);
  const isPagePending = isLoading || hasPending;
  const previousIsPagePending = usePrevious(isPagePending);
  router.startTransition = (fn2) => {
    setIsTransitioning(true);
    React$111.startTransition(() => {
      fn2();
      setIsTransitioning(false);
    });
  };
  React$111.useEffect(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if (trimPathRight2(router.latestLocation.publicHref) !== trimPathRight2(nextLocation.publicHref)) router.commitLocation({
      ...nextLocation,
      replace: true
    });
    return () => {
      unsub();
    };
  }, [router, router.history]);
  useLayoutEffect2(() => {
    if (typeof window !== "undefined" && router.ssr || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) return;
    mountLoadForRouter.current = {
      router,
      mounted: true
    };
    const tryLoad = async () => {
      try {
        await router.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router]);
  useLayoutEffect2(() => {
    if (previousIsLoading && !isLoading) router.emit({
      type: "onLoad",
      ...getLocationChangeInfo(router.stores.location.get(), router.stores.resolvedLocation.get())
    });
  }, [
    previousIsLoading,
    router,
    isLoading
  ]);
  useLayoutEffect2(() => {
    if (previousIsPagePending && !isPagePending) router.emit({
      type: "onBeforeRouteMount",
      ...getLocationChangeInfo(router.stores.location.get(), router.stores.resolvedLocation.get())
    });
  }, [
    isPagePending,
    previousIsPagePending,
    router
  ]);
  useLayoutEffect2(() => {
    if (previousIsAnyPending && !isAnyPending) {
      const changeInfo = getLocationChangeInfo(router.stores.location.get(), router.stores.resolvedLocation.get());
      router.emit({
        type: "onResolved",
        ...changeInfo
      });
      batch(() => {
        router.stores.status.set("idle");
        router.stores.resolvedLocation.set(router.stores.location.get());
      });
    }
  }, [
    isAnyPending,
    previousIsAnyPending,
    router
  ]);
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/Matches.js
var React$112 = __toESM(require_react(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
function Matches() {
  const router = useRouter();
  const PendingComponent = router.routesById[rootRouteId].options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(PendingComponent, {}) : null;
  const inner = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)((isServer ?? router.isServer) || typeof document !== "undefined" && router.ssr ? SafeFragment : React$112.Suspense, {
    fallback: pendingElement,
    children: [!(isServer ?? router.isServer) && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Transitioner, {}), /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(MatchesInner, {})]
  });
  return router.options.InnerWrap ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const router = useRouter();
  const _isServer = isServer ?? router.isServer;
  const matchId = _isServer ? router.stores.firstId.get() : useStore(router.stores.firstId, (id) => id);
  const resetKey = _isServer ? router.stores.loadedAt.get() : useStore(router.stores.loadedAt, (loadedAt) => loadedAt);
  const matchComponent = matchId ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Match, { matchId }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(matchContext.Provider, {
    value: matchId,
    children: router.options.disableGlobalCatchBoundary ? matchComponent : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CatchBoundary, {
      getResetKey: () => resetKey,
      errorComponent: ErrorComponent,
      onCatch: process.env.NODE_ENV !== "production" ? (error) => {
        console.warn(`Warning: The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!`);
        console.warn(`Warning: ${error.message || error.toString()}`);
      } : void 0,
      children: matchComponent
    })
  });
}

// node_modules/@tanstack/react-router/dist/esm/RouterProvider.js
var import_react7 = __toESM(require_react(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
function RouterContextProvider({ router, children, ...rest }) {
  if (hasKeys(rest)) router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const provider = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(routerContext.Provider, {
    value: router,
    children
  });
  if (router.options.Wrap) return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(router.options.Wrap, { children: provider });
  return provider;
}
function RouterProvider({ router, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RouterContextProvider, {
    router,
    ...rest,
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Matches, {})
  });
}

// node_modules/@tanstack/react-router/dist/esm/useRouterState.js
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  if (isServer ?? router.isServer) {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
  return useStore(router.stores.__store, useStructuralSharing(opts, router));
}

// node_modules/@tanstack/react-router/dist/esm/Asset.js
var React$113 = __toESM(require_react(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var INLINE_CSS_HYDRATION_ATTR = "data-tsr-inline-css";
var noopScriptHandler = () => {
};
function setScriptAttrs(script, attrs) {
  if (!attrs) return;
  for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
  const { attrs, children, nonce, preventScriptHoist } = asset;
  switch (asset.tag) {
    case "title":
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("title", {
        ...attrs,
        suppressHydrationWarning: true,
        children
      });
    case "meta":
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("meta", {
        ...attrs,
        suppressHydrationWarning: true
      });
    case "link":
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("link", {
        ...attrs,
        precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
        nonce,
        suppressHydrationWarning: true
      });
    case "style":
      if (asset.inlineCss && (process.env.TSS_INLINE_CSS_ENABLED === "true" || process.env.TSS_INLINE_CSS_ENABLED === void 0 && isServer)) return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(InlineCssStyle, {
        attrs,
        nonce,
        children
      });
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("style", {
        ...attrs,
        dangerouslySetInnerHTML: { __html: children },
        nonce
      });
    case "script":
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Script, {
        attrs,
        preventScriptHoist,
        children
      });
    default:
      return null;
  }
}
function InlineCssStyle({ attrs, children, nonce }) {
  const isInlineCssPlaceholder = children === void 0;
  const [hydratedInlineCss] = React$113.useState(() => {
    if (!isInlineCssPlaceholder || typeof document === "undefined") return;
    return document.querySelector(`style[${INLINE_CSS_HYDRATION_ATTR}]`)?.textContent ?? void 0;
  });
  const html = isInlineCssPlaceholder ? hydratedInlineCss ?? "" : children ?? "";
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("style", {
    ...attrs,
    [INLINE_CSS_HYDRATION_ATTR]: "",
    dangerouslySetInnerHTML: { __html: html },
    nonce,
    suppressHydrationWarning: true
  });
}
function Script({ attrs, children, preventScriptHoist }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  if (process.env.NODE_ENV !== "production" && attrs?.src && typeof children === "string" && children.trim().length) console.warn("[TanStack Router] <Script> received both `src` and `children`. The `children` content will be ignored. Remove `children` or remove `src`.");
  React$113.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      for (const el of document.querySelectorAll("script[src]")) if (el.src === normSrc) return;
      const script = document.createElement("script");
      setScriptAttrs(script, attrs);
      document.head.appendChild(script);
      return () => script.remove();
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      for (const el of document.querySelectorAll("script:not([src])")) {
        if (!(el instanceof HTMLScriptElement)) continue;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
      }
      const script = document.createElement("script");
      script.textContent = children;
      setScriptAttrs(script, attrs);
      document.head.appendChild(script);
      return () => script.remove();
    }
  }, [
    attrs,
    children,
    dataScript
  ]);
  if (isServer ?? router.isServer) {
    if (attrs?.src) {
      if (!preventScriptHoist) return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("script", {
        ...attrs,
        suppressHydrationWarning: true
      });
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("script", {
        ...attrs,
        onLoad: noopScriptHandler,
        suppressHydrationWarning: true
      });
    }
    if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("script", {
      ...attrs,
      dangerouslySetInnerHTML: { __html: children },
      suppressHydrationWarning: true
    });
    return null;
  }
  if (dataScript && typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("script", {
    ...attrs,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: children }
  });
  if (!hydrated) {
    if (attrs?.src) return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("script", {
      ...attrs,
      suppressHydrationWarning: true
    });
    if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("script", {
      ...attrs,
      dangerouslySetInnerHTML: { __html: children },
      suppressHydrationWarning: true
    });
  }
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/headContentUtils.js
var React$114 = __toESM(require_react(), 1);
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
  const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
  const resultMeta = [];
  const metaByAttribute = {};
  let title;
  for (let i2 = routeMeta.length - 1; i2 >= 0; i2--) {
    const metas = routeMeta[i2];
    for (let j2 = metas.length - 1; j2 >= 0; j2--) {
      const m3 = metas[j2];
      if (!m3) continue;
      if (m3.title) {
        if (!title) title = {
          tag: "title",
          children: m3.title
        };
      } else if ("script:ld+json" in m3) try {
        const json = JSON.stringify(m3["script:ld+json"]);
        resultMeta.push({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: escapeHtml(json)
        });
      } catch {
      }
      else {
        const attribute = m3.name ?? m3.property;
        if (attribute) if (metaByAttribute[attribute]) continue;
        else metaByAttribute[attribute] = true;
        resultMeta.push({
          tag: "meta",
          attrs: {
            ...m3,
            nonce
          }
        });
      }
    }
  }
  if (title) resultMeta.push(title);
  if (nonce) resultMeta.push({
    tag: "meta",
    attrs: {
      property: "csp-nonce",
      content: nonce
    }
  });
  resultMeta.reverse();
  const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link2) => link2 !== void 0).map((link2) => ({
    tag: "link",
    attrs: {
      ...link2,
      nonce
    }
  }));
  const manifest = router.ssr?.manifest;
  const manifestCssTags = [];
  if (manifest) {
    matches.forEach((match) => {
      manifest.routes[match.routeId]?.css?.forEach((link2) => {
        const resolvedLink = resolveManifestCssLink(link2);
        manifestCssTags.push({
          tag: "link",
          attrs: {
            rel: "stylesheet",
            ...resolvedLink,
            crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
            suppressHydrationWarning: true,
            nonce
          }
        });
      });
    });
    if (manifest.inlineStyle) manifestCssTags.push({
      tag: "style",
      attrs: {
        ...manifest.inlineStyle.attrs,
        nonce
      },
      children: manifest.inlineStyle.children,
      inlineCss: true
    });
  }
  const preloadLinks = [];
  if (manifest) matches.forEach((match) => {
    manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
      preloadLinks.push({
        tag: "link",
        attrs: {
          ...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
          nonce
        }
      });
    });
  });
  const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
    tag: "style",
    attrs: {
      ...attrs,
      nonce
    },
    children
  }));
  const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      nonce
    },
    children
  }));
  const tags = [];
  appendUniqueUserTags(tags, resultMeta);
  tags.push(...preloadLinks);
  appendUniqueUserTags(tags, constructedLinks);
  tags.push(...manifestCssTags);
  appendUniqueUserTags(tags, styles);
  appendUniqueUserTags(tags, headScripts);
  return tags;
}
var useTags = (assetCrossOrigin) => {
  const router = useRouter();
  const nonce = router.options.ssr?.nonce;
  if (isServer ?? router.isServer) return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin);
  const routeMeta = useStore(router.stores.matches, (matches) => {
    return matches.map((match) => match.meta).filter((meta2) => meta2 !== void 0);
  }, deepEqual);
  const meta = React$114.useMemo(() => {
    const resultMeta = [];
    const metaByAttribute = {};
    let title;
    for (let i2 = routeMeta.length - 1; i2 >= 0; i2--) {
      const metas = routeMeta[i2];
      for (let j2 = metas.length - 1; j2 >= 0; j2--) {
        const m3 = metas[j2];
        if (!m3) continue;
        if (m3.title) {
          if (!title) title = {
            tag: "title",
            children: m3.title
          };
        } else if ("script:ld+json" in m3) try {
          const json = JSON.stringify(m3["script:ld+json"]);
          resultMeta.push({
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: escapeHtml(json)
          });
        } catch {
        }
        else {
          const attribute = m3.name ?? m3.property;
          if (attribute) if (metaByAttribute[attribute]) continue;
          else metaByAttribute[attribute] = true;
          resultMeta.push({
            tag: "meta",
            attrs: {
              ...m3,
              nonce
            }
          });
        }
      }
    }
    if (title) resultMeta.push(title);
    if (nonce) resultMeta.push({
      tag: "meta",
      attrs: {
        property: "csp-nonce",
        content: nonce
      }
    });
    resultMeta.reverse();
    return resultMeta;
  }, [routeMeta, nonce]);
  const links = useStore(router.stores.matches, (matches) => {
    return matches.flatMap((match) => match.links ?? []).filter((link2) => link2 !== void 0).map((link2) => ({
      tag: "link",
      attrs: {
        ...link2,
        nonce
      }
    }));
  }, deepEqual);
  const manifestCssTags = useStore(router.stores.matches, (matches) => {
    const manifest = router.ssr?.manifest;
    const tags2 = [];
    if (!manifest) return tags2;
    matches.forEach((match) => {
      manifest.routes[match.routeId]?.css?.forEach((link2) => {
        const resolvedLink = resolveManifestCssLink(link2);
        tags2.push({
          tag: "link",
          attrs: {
            rel: "stylesheet",
            ...resolvedLink,
            crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
            suppressHydrationWarning: true,
            nonce
          }
        });
      });
    });
    if (manifest.inlineStyle) tags2.push({
      tag: "style",
      attrs: {
        ...manifest.inlineStyle.attrs,
        nonce
      },
      children: manifest.inlineStyle.children,
      inlineCss: true
    });
    return tags2;
  }, deepEqual);
  const preloadLinks = useStore(router.stores.matches, (matches) => {
    const preloadLinks2 = [];
    const manifest = router.ssr?.manifest;
    if (!manifest) return preloadLinks2;
    matches.forEach((match) => {
      manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
        preloadLinks2.push({
          tag: "link",
          attrs: {
            ...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
            nonce
          }
        });
      });
    });
    return preloadLinks2;
  }, deepEqual);
  const styles = useStore(router.stores.matches, (matches) => {
    return matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
      tag: "style",
      attrs: {
        ...attrs,
        nonce
      },
      children
    }));
  }, deepEqual);
  const headScripts = useStore(router.stores.matches, (matches) => {
    return matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
      tag: "script",
      attrs: {
        ...script,
        nonce
      },
      children
    }));
  }, deepEqual);
  const tags = [];
  appendUniqueUserTags(tags, meta);
  tags.push(...preloadLinks);
  appendUniqueUserTags(tags, links);
  tags.push(...manifestCssTags);
  appendUniqueUserTags(tags, styles);
  appendUniqueUserTags(tags, headScripts);
  return tags;
};

// node_modules/@tanstack/react-router/dist/esm/HeadContent.js
var import_react8 = __toESM(require_react(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
function HeadContent(props) {
  const tags = useTags(props.assetCrossOrigin);
  const nonce = useRouter().options.ssr?.nonce;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: tags.map((tag) => /* @__PURE__ */ (0, import_react8.createElement)(Asset, {
    ...tag,
    key: `tsr-meta-${JSON.stringify(tag)}`,
    nonce
  })) });
}

// node_modules/@tanstack/react-router/dist/esm/Scripts.js
var import_react9 = __toESM(require_react(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var Scripts = () => {
  const router = useRouter();
  const nonce = router.options.ssr?.nonce;
  const getAssetScripts = (matches) => {
    const assetScripts2 = [];
    const manifest = router.ssr?.manifest;
    if (!manifest) return [];
    for (const match of matches) {
      const scripts = manifest.routes[match.routeId]?.scripts;
      if (!scripts) continue;
      for (const asset of scripts) assetScripts2.push({
        tag: "script",
        attrs: {
          ...asset.attrs,
          nonce
        },
        children: asset.children,
        ...typeof asset.attrs?.src === "string" ? { preventScriptHoist: true } : {}
      });
    }
    return assetScripts2;
  };
  const getScripts = (matches) => matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      suppressHydrationWarning: true,
      nonce
    },
    children
  }));
  if (isServer ?? router.isServer) {
    const activeMatches = router.stores.matches.get();
    const assetScripts2 = getAssetScripts(activeMatches);
    return renderScripts(router, getScripts(activeMatches), assetScripts2);
  }
  const assetScripts = useStore(router.stores.matches, getAssetScripts, deepEqual);
  return renderScripts(router, useStore(router.stores.matches, getScripts, deepEqual), assetScripts);
};
function renderScripts(router, scripts, assetScripts) {
  const allScripts = [...scripts, ...assetScripts];
  if ((isServer ?? router.isServer) && router.serverSsr) {
    const serverBufferedScript = router.serverSsr.takeBufferedScripts();
    if (serverBufferedScript) allScripts.unshift(serverBufferedScript);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_jsx_runtime15.Fragment, { children: allScripts.map((asset, i2) => /* @__PURE__ */ (0, import_react9.createElement)(Asset, {
    ...asset,
    key: `tsr-scripts-${asset.tag}-${i2}`
  })) });
}

export {
  decodePath,
  invariant,
  createLRUCache,
  isNotFound,
  rootRouteId,
  redirect,
  isRedirect,
  isResolvedRedirect,
  executeRewriteInput,
  createMemoryHistory,
  getScriptPreloadAttrs,
  resolveManifestAssetLink,
  getStylesheetHref,
  resolveManifestCssLink,
  createInlineCssStyleAsset,
  createInlineCssPlaceholderAsset,
  GLOBAL_TSR,
  TSR_SCRIPT_BARRIER_ID,
  dn,
  su,
  Sn,
  iu,
  Pu,
  createSerializationAdapter,
  makeSsrSerovalPlugin,
  makeSerovalPlugin,
  createRawStreamRPCPlugin,
  defaultSerovalPlugins,
  useRouter,
  useNavigate,
  Link,
  createRootRouteWithContext,
  createFileRoute,
  lazyRouteComponent,
  Outlet,
  createRouter,
  RouterProvider,
  useRouterState,
  HeadContent,
  Scripts
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
