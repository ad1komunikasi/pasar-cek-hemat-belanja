import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  Presence,
  composeEventHandlers,
  createCollection,
  createContextScope,
  useCallbackRef,
  useControllableState,
  useDirection,
  useId,
  useLayoutEffect2
} from "./chunk-3WLNBR7O.mjs";
import {
  Primitive,
  dispatchDiscreteCustomEvent
} from "./chunk-SJQOHQ2J.mjs";
import {
  createSlot,
  useComposedRefs
} from "./chunk-IHLGWONG.mjs";
import {
  init_tslib_es6,
  tslib_es6_exports
} from "./chunk-PQEYI6K5.mjs";
import {
  cn
} from "./chunk-Y5N26HX3.mjs";
import {
  require_react_dom
} from "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __commonJS,
  __toCommonJS,
  __toESM
} from "./chunk-G2MDZA75.mjs";

// node_modules/aria-hidden/dist/es5/index.js
var require_es5 = __commonJS({
  "node_modules/aria-hidden/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.suppressOthers = exports.supportsInert = exports.inertOthers = exports.hideOthers = void 0;
    var getDefaultParent = function(originalTarget) {
      if (typeof document === "undefined") {
        return null;
      }
      var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
      return sampleTarget.ownerDocument.body;
    };
    var counterMap = /* @__PURE__ */ new WeakMap();
    var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
    var markerMap = {};
    var lockCount = 0;
    var unwrapHost = function(node) {
      return node && (node.host || unwrapHost(node.parentNode));
    };
    var correctTargets = function(parent, targets) {
      return targets.map(function(target) {
        if (parent.contains(target)) {
          return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
          return correctedTarget;
        }
        console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
        return null;
      }).filter(function(x) {
        return Boolean(x);
      });
    };
    var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
      var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
      if (!markerMap[markerName]) {
        markerMap[markerName] = /* @__PURE__ */ new WeakMap();
      }
      var markerCounter = markerMap[markerName];
      var hiddenNodes = [];
      var elementsToKeep = /* @__PURE__ */ new Set();
      var elementsToStop = new Set(targets);
      var keep = function(el) {
        if (!el || elementsToKeep.has(el)) {
          return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
      };
      targets.forEach(keep);
      var deep = function(parent) {
        if (!parent || elementsToStop.has(parent)) {
          return;
        }
        Array.prototype.forEach.call(parent.children, function(node) {
          if (elementsToKeep.has(node)) {
            deep(node);
          } else {
            try {
              var attr = node.getAttribute(controlAttribute);
              var alreadyHidden = attr !== null && attr !== "false";
              var counterValue = (counterMap.get(node) || 0) + 1;
              var markerValue = (markerCounter.get(node) || 0) + 1;
              counterMap.set(node, counterValue);
              markerCounter.set(node, markerValue);
              hiddenNodes.push(node);
              if (counterValue === 1 && alreadyHidden) {
                uncontrolledNodes.set(node, true);
              }
              if (markerValue === 1) {
                node.setAttribute(markerName, "true");
              }
              if (!alreadyHidden) {
                node.setAttribute(controlAttribute, "true");
              }
            } catch (e) {
              console.error("aria-hidden: cannot operate on ", node, e);
            }
          }
        });
      };
      deep(parentNode);
      elementsToKeep.clear();
      lockCount++;
      return function() {
        hiddenNodes.forEach(function(node) {
          var counterValue = counterMap.get(node) - 1;
          var markerValue = markerCounter.get(node) - 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          if (!counterValue) {
            if (!uncontrolledNodes.has(node)) {
              node.removeAttribute(controlAttribute);
            }
            uncontrolledNodes.delete(node);
          }
          if (!markerValue) {
            node.removeAttribute(markerName);
          }
        });
        lockCount--;
        if (!lockCount) {
          counterMap = /* @__PURE__ */ new WeakMap();
          counterMap = /* @__PURE__ */ new WeakMap();
          uncontrolledNodes = /* @__PURE__ */ new WeakMap();
          markerMap = {};
        }
      };
    };
    var hideOthers2 = function(originalTarget, parentNode, markerName) {
      if (markerName === void 0) {
        markerName = "data-aria-hidden";
      }
      var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
      var activeParentNode = parentNode || getDefaultParent(originalTarget);
      if (!activeParentNode) {
        return function() {
          return null;
        };
      }
      targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
      return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
    };
    exports.hideOthers = hideOthers2;
    var inertOthers = function(originalTarget, parentNode, markerName) {
      if (markerName === void 0) {
        markerName = "data-inert-ed";
      }
      var activeParentNode = parentNode || getDefaultParent(originalTarget);
      if (!activeParentNode) {
        return function() {
          return null;
        };
      }
      return applyAttributeToOthers(originalTarget, activeParentNode, markerName, "inert");
    };
    exports.inertOthers = inertOthers;
    var supportsInert = function() {
      return typeof HTMLElement !== "undefined" && HTMLElement.prototype.hasOwnProperty("inert");
    };
    exports.supportsInert = supportsInert;
    var suppressOthers = function(originalTarget, parentNode, markerName) {
      if (markerName === void 0) {
        markerName = "data-suppressed";
      }
      return ((0, exports.supportsInert)() ? exports.inertOthers : exports.hideOthers)(originalTarget, parentNode, markerName);
    };
    exports.suppressOthers = suppressOthers;
  }
});

// node_modules/react-remove-scroll-bar/dist/es5/constants.js
var require_constants = __commonJS({
  "node_modules/react-remove-scroll-bar/dist/es5/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removedBarSizeVariable = exports.noScrollbarsClassName = exports.fullWidthClassName = exports.zeroRightClassName = void 0;
    exports.zeroRightClassName = "right-scroll-bar-position";
    exports.fullWidthClassName = "width-before-scroll-bar";
    exports.noScrollbarsClassName = "with-scroll-bars-hidden";
    exports.removedBarSizeVariable = "--removed-body-scroll-bar-size";
  }
});

// node_modules/use-callback-ref/dist/es5/assignRef.js
var require_assignRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/assignRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignRef = void 0;
    function assignRef(ref, value) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
      return ref;
    }
    exports.assignRef = assignRef;
  }
});

// node_modules/use-callback-ref/dist/es5/useRef.js
var require_useRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/useRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCallbackRef = void 0;
    var react_1 = require_react();
    function useCallbackRef2(initialValue, callback) {
      var ref = (0, react_1.useState)(function() {
        return {
          // value
          value: initialValue,
          // last callback
          callback,
          // "memoized" public interface
          facade: {
            get current() {
              return ref.value;
            },
            set current(value) {
              var last = ref.value;
              if (last !== value) {
                ref.value = value;
                ref.callback(value, last);
              }
            }
          }
        };
      })[0];
      ref.callback = callback;
      return ref.facade;
    }
    exports.useCallbackRef = useCallbackRef2;
  }
});

// node_modules/use-callback-ref/dist/es5/createRef.js
var require_createRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/createRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCallbackRef = void 0;
    function createCallbackRef(callback) {
      var current = null;
      return {
        get current() {
          return current;
        },
        set current(value) {
          var last = current;
          if (last !== value) {
            current = value;
            callback(value, last);
          }
        }
      };
    }
    exports.createCallbackRef = createCallbackRef;
  }
});

// node_modules/use-callback-ref/dist/es5/mergeRef.js
var require_mergeRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/mergeRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergeRefs = void 0;
    var assignRef_1 = require_assignRef();
    var createRef_1 = require_createRef();
    function mergeRefs(refs) {
      return (0, createRef_1.createCallbackRef)(function(newValue) {
        return refs.forEach(function(ref) {
          return (0, assignRef_1.assignRef)(ref, newValue);
        });
      });
    }
    exports.mergeRefs = mergeRefs;
  }
});

// node_modules/use-callback-ref/dist/es5/useMergeRef.js
var require_useMergeRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/useMergeRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useMergeRefs = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var assignRef_1 = require_assignRef();
    var useRef_1 = require_useRef();
    var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React14.useLayoutEffect : React14.useEffect;
    var currentValues = /* @__PURE__ */ new WeakMap();
    function useMergeRefs(refs, defaultValue) {
      var callbackRef = (0, useRef_1.useCallbackRef)(defaultValue || null, function(newValue) {
        return refs.forEach(function(ref) {
          return (0, assignRef_1.assignRef)(ref, newValue);
        });
      });
      useIsomorphicLayoutEffect(function() {
        var oldValue = currentValues.get(callbackRef);
        if (oldValue) {
          var prevRefs_1 = new Set(oldValue);
          var nextRefs_1 = new Set(refs);
          var current_1 = callbackRef.current;
          prevRefs_1.forEach(function(ref) {
            if (!nextRefs_1.has(ref)) {
              (0, assignRef_1.assignRef)(ref, null);
            }
          });
          nextRefs_1.forEach(function(ref) {
            if (!prevRefs_1.has(ref)) {
              (0, assignRef_1.assignRef)(ref, current_1);
            }
          });
        }
        currentValues.set(callbackRef, refs);
      }, [refs]);
      return callbackRef;
    }
    exports.useMergeRefs = useMergeRefs;
  }
});

// node_modules/use-callback-ref/dist/es5/useTransformRef.js
var require_useTransformRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/useTransformRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useTransformRef = void 0;
    var assignRef_1 = require_assignRef();
    var useRef_1 = require_useRef();
    function useTransformRef(ref, transformer) {
      return (0, useRef_1.useCallbackRef)(null, function(value) {
        return (0, assignRef_1.assignRef)(ref, transformer(value));
      });
    }
    exports.useTransformRef = useTransformRef;
  }
});

// node_modules/use-callback-ref/dist/es5/transformRef.js
var require_transformRef = __commonJS({
  "node_modules/use-callback-ref/dist/es5/transformRef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformRef = void 0;
    var assignRef_1 = require_assignRef();
    var createRef_1 = require_createRef();
    function transformRef(ref, transformer) {
      return (0, createRef_1.createCallbackRef)(function(value) {
        return (0, assignRef_1.assignRef)(ref, transformer(value));
      });
    }
    exports.transformRef = transformRef;
  }
});

// node_modules/use-callback-ref/dist/es5/refToCallback.js
var require_refToCallback = __commonJS({
  "node_modules/use-callback-ref/dist/es5/refToCallback.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRefToCallback = exports.refToCallback = void 0;
    function refToCallback(ref) {
      return function(newValue) {
        if (typeof ref === "function") {
          ref(newValue);
        } else if (ref) {
          ref.current = newValue;
        }
      };
    }
    exports.refToCallback = refToCallback;
    var nullCallback = function() {
      return null;
    };
    var weakMem = /* @__PURE__ */ new WeakMap();
    var weakMemoize = function(ref) {
      var usedRef = ref || nullCallback;
      var storedRef = weakMem.get(usedRef);
      if (storedRef) {
        return storedRef;
      }
      var cb = refToCallback(usedRef);
      weakMem.set(usedRef, cb);
      return cb;
    };
    function useRefToCallback(ref) {
      return weakMemoize(ref);
    }
    exports.useRefToCallback = useRefToCallback;
  }
});

// node_modules/use-callback-ref/dist/es5/index.js
var require_es52 = __commonJS({
  "node_modules/use-callback-ref/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRefToCallback = exports.refToCallback = exports.transformRef = exports.useTransformRef = exports.useMergeRefs = exports.mergeRefs = exports.createCallbackRef = exports.useCallbackRef = exports.assignRef = void 0;
    var assignRef_1 = require_assignRef();
    Object.defineProperty(exports, "assignRef", { enumerable: true, get: function() {
      return assignRef_1.assignRef;
    } });
    var useRef_1 = require_useRef();
    Object.defineProperty(exports, "useCallbackRef", { enumerable: true, get: function() {
      return useRef_1.useCallbackRef;
    } });
    var createRef_1 = require_createRef();
    Object.defineProperty(exports, "createCallbackRef", { enumerable: true, get: function() {
      return createRef_1.createCallbackRef;
    } });
    var mergeRef_1 = require_mergeRef();
    Object.defineProperty(exports, "mergeRefs", { enumerable: true, get: function() {
      return mergeRef_1.mergeRefs;
    } });
    var useMergeRef_1 = require_useMergeRef();
    Object.defineProperty(exports, "useMergeRefs", { enumerable: true, get: function() {
      return useMergeRef_1.useMergeRefs;
    } });
    var useTransformRef_1 = require_useTransformRef();
    Object.defineProperty(exports, "useTransformRef", { enumerable: true, get: function() {
      return useTransformRef_1.useTransformRef;
    } });
    var transformRef_1 = require_transformRef();
    Object.defineProperty(exports, "transformRef", { enumerable: true, get: function() {
      return transformRef_1.transformRef;
    } });
    var refToCallback_1 = require_refToCallback();
    Object.defineProperty(exports, "refToCallback", { enumerable: true, get: function() {
      return refToCallback_1.refToCallback;
    } });
    Object.defineProperty(exports, "useRefToCallback", { enumerable: true, get: function() {
      return refToCallback_1.useRefToCallback;
    } });
  }
});

// node_modules/detect-node-es/es5/node.js
var require_node = __commonJS({
  "node_modules/detect-node-es/es5/node.js"(exports, module) {
    module.exports.isNode = Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
  }
});

// node_modules/use-sidecar/dist/es5/env.js
var require_env = __commonJS({
  "node_modules/use-sidecar/dist/es5/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.env = void 0;
    var detect_node_es_1 = require_node();
    exports.env = {
      isNode: detect_node_es_1.isNode,
      forceCache: false
    };
  }
});

// node_modules/use-sidecar/dist/es5/hook.js
var require_hook = __commonJS({
  "node_modules/use-sidecar/dist/es5/hook.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSidecar = void 0;
    var react_1 = require_react();
    var env_1 = require_env();
    var cache = /* @__PURE__ */ new WeakMap();
    var NO_OPTIONS = {};
    function useSidecar(importer, effect) {
      var options = effect && effect.options || NO_OPTIONS;
      if (env_1.env.isNode && !options.ssr) {
        return [null, null];
      }
      return useRealSidecar(importer, effect);
    }
    exports.useSidecar = useSidecar;
    function useRealSidecar(importer, effect) {
      var options = effect && effect.options || NO_OPTIONS;
      var couldUseCache = env_1.env.forceCache || env_1.env.isNode && !!options.ssr || !options.async;
      var _a = (0, react_1.useState)(couldUseCache ? function() {
        return cache.get(importer);
      } : void 0), Car = _a[0], setCar = _a[1];
      var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
      (0, react_1.useEffect)(function() {
        if (!Car) {
          importer().then(function(car) {
            var resolved = effect ? effect.read() : car.default || car;
            if (!resolved) {
              console.error("Sidecar error: with importer", importer);
              var error_1;
              if (effect) {
                console.error("Sidecar error: with medium", effect);
                error_1 = new Error("Sidecar medium was not found");
              } else {
                error_1 = new Error("Sidecar was not found in exports");
              }
              setError(function() {
                return error_1;
              });
              throw error_1;
            }
            cache.set(importer, resolved);
            setCar(function() {
              return resolved;
            });
          }, function(e) {
            return setError(function() {
              return e;
            });
          });
        }
      }, []);
      return [Car, error];
    }
  }
});

// node_modules/use-sidecar/dist/es5/hoc.js
var require_hoc = __commonJS({
  "node_modules/use-sidecar/dist/es5/hoc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sidecar = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var hook_1 = require_hook();
    function sidecar(importer, errorComponent) {
      var ErrorCase = function() {
        return errorComponent;
      };
      return function Sidecar(props) {
        var _a = (0, hook_1.useSidecar)(importer, props.sideCar), Car = _a[0], error = _a[1];
        if (error && errorComponent) {
          return ErrorCase;
        }
        return Car ? React14.createElement(Car, tslib_1.__assign({}, props)) : null;
      };
    }
    exports.sidecar = sidecar;
  }
});

// node_modules/use-sidecar/dist/es5/config.js
var require_config = __commonJS({
  "node_modules/use-sidecar/dist/es5/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setConfig = exports.config = void 0;
    exports.config = {
      onError: function(e) {
        return console.error(e);
      }
    };
    var setConfig = function(conf) {
      Object.assign(exports.config, conf);
    };
    exports.setConfig = setConfig;
  }
});

// node_modules/use-sidecar/dist/es5/medium.js
var require_medium = __commonJS({
  "node_modules/use-sidecar/dist/es5/medium.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createSidecarMedium = exports.createMedium = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    function ItoI(a) {
      return a;
    }
    function innerCreateMedium(defaults, middleware) {
      if (middleware === void 0) {
        middleware = ItoI;
      }
      var buffer = [];
      var assigned = false;
      var medium = {
        read: function() {
          if (assigned) {
            throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
          }
          if (buffer.length) {
            return buffer[buffer.length - 1];
          }
          return defaults;
        },
        useMedium: function(data) {
          var item = middleware(data, assigned);
          buffer.push(item);
          return function() {
            buffer = buffer.filter(function(x) {
              return x !== item;
            });
          };
        },
        assignSyncMedium: function(cb) {
          assigned = true;
          while (buffer.length) {
            var cbs = buffer;
            buffer = [];
            cbs.forEach(cb);
          }
          buffer = {
            push: function(x) {
              return cb(x);
            },
            filter: function() {
              return buffer;
            }
          };
        },
        assignMedium: function(cb) {
          assigned = true;
          var pendingQueue = [];
          if (buffer.length) {
            var cbs = buffer;
            buffer = [];
            cbs.forEach(cb);
            pendingQueue = buffer;
          }
          var executeQueue = function() {
            var cbs2 = pendingQueue;
            pendingQueue = [];
            cbs2.forEach(cb);
          };
          var cycle = function() {
            return Promise.resolve().then(executeQueue);
          };
          cycle();
          buffer = {
            push: function(x) {
              pendingQueue.push(x);
              cycle();
            },
            filter: function(filter) {
              pendingQueue = pendingQueue.filter(filter);
              return buffer;
            }
          };
        }
      };
      return medium;
    }
    function createMedium(defaults, middleware) {
      if (middleware === void 0) {
        middleware = ItoI;
      }
      return innerCreateMedium(defaults, middleware);
    }
    exports.createMedium = createMedium;
    function createSidecarMedium(options) {
      if (options === void 0) {
        options = {};
      }
      var medium = innerCreateMedium(null);
      medium.options = tslib_1.__assign({ async: true, ssr: false }, options);
      return medium;
    }
    exports.createSidecarMedium = createSidecarMedium;
  }
});

// node_modules/use-sidecar/dist/es5/renderProp.js
var require_renderProp = __commonJS({
  "node_modules/use-sidecar/dist/es5/renderProp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderCar = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var react_1 = require_react();
    function renderCar(WrappedComponent, defaults) {
      function State(_a) {
        var stateRef = _a.stateRef, props = _a.props;
        var renderTarget = (0, react_1.useCallback)(function SideTarget() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          (0, react_1.useLayoutEffect)(function() {
            stateRef.current(args);
          });
          return null;
        }, []);
        return React14.createElement(WrappedComponent, tslib_1.__assign({}, props, { children: renderTarget }));
      }
      var Children = React14.memo(function(_a) {
        var stateRef = _a.stateRef, defaultState = _a.defaultState, children = _a.children;
        var _b = (0, react_1.useState)(defaultState.current), state = _b[0], setState = _b[1];
        (0, react_1.useEffect)(function() {
          stateRef.current = setState;
        }, []);
        return children.apply(void 0, state);
      }, function() {
        return true;
      });
      return function Combiner(props) {
        var defaultState = React14.useRef(defaults(props));
        var ref = React14.useRef(function(state) {
          return defaultState.current = state;
        });
        return React14.createElement(
          React14.Fragment,
          null,
          React14.createElement(State, { stateRef: ref, props }),
          React14.createElement(Children, { stateRef: ref, defaultState, children: props.children })
        );
      };
    }
    exports.renderCar = renderCar;
  }
});

// node_modules/use-sidecar/dist/es5/exports.js
var require_exports = __commonJS({
  "node_modules/use-sidecar/dist/es5/exports.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.exportSidecar = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var SideCar = function(_a) {
      var sideCar = _a.sideCar, rest = tslib_1.__rest(_a, ["sideCar"]);
      if (!sideCar) {
        throw new Error("Sidecar: please provide `sideCar` property to import the right car");
      }
      var Target = sideCar.read();
      if (!Target) {
        throw new Error("Sidecar medium not found");
      }
      return React14.createElement(Target, tslib_1.__assign({}, rest));
    };
    SideCar.isSideCarExport = true;
    function exportSidecar(medium, exported) {
      medium.useMedium(exported);
      return SideCar;
    }
    exports.exportSidecar = exportSidecar;
  }
});

// node_modules/use-sidecar/dist/es5/index.js
var require_es53 = __commonJS({
  "node_modules/use-sidecar/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.exportSidecar = exports.renderCar = exports.createSidecarMedium = exports.createMedium = exports.setConfig = exports.useSidecar = exports.sidecar = void 0;
    var hoc_1 = require_hoc();
    Object.defineProperty(exports, "sidecar", { enumerable: true, get: function() {
      return hoc_1.sidecar;
    } });
    var hook_1 = require_hook();
    Object.defineProperty(exports, "useSidecar", { enumerable: true, get: function() {
      return hook_1.useSidecar;
    } });
    var config_1 = require_config();
    Object.defineProperty(exports, "setConfig", { enumerable: true, get: function() {
      return config_1.setConfig;
    } });
    var medium_1 = require_medium();
    Object.defineProperty(exports, "createMedium", { enumerable: true, get: function() {
      return medium_1.createMedium;
    } });
    Object.defineProperty(exports, "createSidecarMedium", { enumerable: true, get: function() {
      return medium_1.createSidecarMedium;
    } });
    var renderProp_1 = require_renderProp();
    Object.defineProperty(exports, "renderCar", { enumerable: true, get: function() {
      return renderProp_1.renderCar;
    } });
    var exports_1 = require_exports();
    Object.defineProperty(exports, "exportSidecar", { enumerable: true, get: function() {
      return exports_1.exportSidecar;
    } });
  }
});

// node_modules/react-remove-scroll/dist/es5/medium.js
var require_medium2 = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/medium.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.effectCar = void 0;
    var use_sidecar_1 = require_es53();
    exports.effectCar = (0, use_sidecar_1.createSidecarMedium)();
  }
});

// node_modules/react-remove-scroll/dist/es5/UI.js
var require_UI = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/UI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RemoveScroll = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var constants_1 = require_constants();
    var use_callback_ref_1 = require_es52();
    var medium_1 = require_medium2();
    var nothing = function() {
      return;
    };
    var RemoveScroll2 = React14.forwardRef(function(props, parentRef) {
      var ref = React14.useRef(null);
      var _a = React14.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing
      }), callbacks = _a[0], setCallbacks = _a[1];
      var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = tslib_1.__rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
      var SideCar = sideCar;
      var containerRef = (0, use_callback_ref_1.useMergeRefs)([ref, parentRef]);
      var containerProps = tslib_1.__assign(tslib_1.__assign({}, rest), callbacks);
      return React14.createElement(
        React14.Fragment,
        null,
        enabled && React14.createElement(SideCar, { sideCar: medium_1.effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
        forwardProps ? React14.cloneElement(React14.Children.only(children), tslib_1.__assign(tslib_1.__assign({}, containerProps), { ref: containerRef })) : React14.createElement(Container, tslib_1.__assign({}, containerProps, { className, ref: containerRef }), children)
      );
    });
    exports.RemoveScroll = RemoveScroll2;
    RemoveScroll2.defaultProps = {
      enabled: true,
      removeScrollBar: true,
      inert: false
    };
    RemoveScroll2.classNames = {
      fullWidth: constants_1.fullWidthClassName,
      zeroRight: constants_1.zeroRightClassName
    };
  }
});

// node_modules/get-nonce/dist/es5/index.js
var require_es54 = __commonJS({
  "node_modules/get-nonce/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var currentNonce;
    exports.setNonce = function(nonce) {
      currentNonce = nonce;
    };
    exports.getNonce = function() {
      if (currentNonce) {
        return currentNonce;
      }
      if (typeof __webpack_nonce__ !== "undefined") {
        return __webpack_nonce__;
      }
      return void 0;
    };
  }
});

// node_modules/react-style-singleton/dist/es5/singleton.js
var require_singleton = __commonJS({
  "node_modules/react-style-singleton/dist/es5/singleton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stylesheetSingleton = void 0;
    var get_nonce_1 = require_es54();
    function makeStyleTag() {
      if (!document)
        return null;
      var tag = document.createElement("style");
      tag.type = "text/css";
      var nonce = (0, get_nonce_1.getNonce)();
      if (nonce) {
        tag.setAttribute("nonce", nonce);
      }
      return tag;
    }
    function injectStyles(tag, css) {
      if (tag.styleSheet) {
        tag.styleSheet.cssText = css;
      } else {
        tag.appendChild(document.createTextNode(css));
      }
    }
    function insertStyleTag(tag) {
      var head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(tag);
    }
    var stylesheetSingleton = function() {
      var counter = 0;
      var stylesheet = null;
      return {
        add: function(style) {
          if (counter == 0) {
            if (stylesheet = makeStyleTag()) {
              injectStyles(stylesheet, style);
              insertStyleTag(stylesheet);
            }
          }
          counter++;
        },
        remove: function() {
          counter--;
          if (!counter && stylesheet) {
            stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
            stylesheet = null;
          }
        }
      };
    };
    exports.stylesheetSingleton = stylesheetSingleton;
  }
});

// node_modules/react-style-singleton/dist/es5/hook.js
var require_hook2 = __commonJS({
  "node_modules/react-style-singleton/dist/es5/hook.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.styleHookSingleton = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var singleton_1 = require_singleton();
    var styleHookSingleton = function() {
      var sheet = (0, singleton_1.stylesheetSingleton)();
      return function(styles, isDynamic) {
        React14.useEffect(function() {
          sheet.add(styles);
          return function() {
            sheet.remove();
          };
        }, [styles && isDynamic]);
      };
    };
    exports.styleHookSingleton = styleHookSingleton;
  }
});

// node_modules/react-style-singleton/dist/es5/component.js
var require_component = __commonJS({
  "node_modules/react-style-singleton/dist/es5/component.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.styleSingleton = void 0;
    var hook_1 = require_hook2();
    var styleSingleton = function() {
      var useStyle = (0, hook_1.styleHookSingleton)();
      var Sheet = function(_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
      };
      return Sheet;
    };
    exports.styleSingleton = styleSingleton;
  }
});

// node_modules/react-style-singleton/dist/es5/index.js
var require_es55 = __commonJS({
  "node_modules/react-style-singleton/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.styleHookSingleton = exports.stylesheetSingleton = exports.styleSingleton = void 0;
    var component_1 = require_component();
    Object.defineProperty(exports, "styleSingleton", { enumerable: true, get: function() {
      return component_1.styleSingleton;
    } });
    var singleton_1 = require_singleton();
    Object.defineProperty(exports, "stylesheetSingleton", { enumerable: true, get: function() {
      return singleton_1.stylesheetSingleton;
    } });
    var hook_1 = require_hook2();
    Object.defineProperty(exports, "styleHookSingleton", { enumerable: true, get: function() {
      return hook_1.styleHookSingleton;
    } });
  }
});

// node_modules/react-remove-scroll-bar/dist/es5/utils.js
var require_utils = __commonJS({
  "node_modules/react-remove-scroll-bar/dist/es5/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGapWidth = exports.zeroGap = void 0;
    exports.zeroGap = {
      left: 0,
      top: 0,
      right: 0,
      gap: 0
    };
    var parse = function(x) {
      return parseInt(x || "", 10) || 0;
    };
    var getOffset = function(gapMode) {
      var cs = window.getComputedStyle(document.body);
      var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
      var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
      var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
      return [parse(left), parse(top), parse(right)];
    };
    var getGapWidth = function(gapMode) {
      if (gapMode === void 0) {
        gapMode = "margin";
      }
      if (typeof window === "undefined") {
        return exports.zeroGap;
      }
      var offsets = getOffset(gapMode);
      var documentWidth = document.documentElement.clientWidth;
      var windowWidth = window.innerWidth;
      return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
      };
    };
    exports.getGapWidth = getGapWidth;
  }
});

// node_modules/react-remove-scroll-bar/dist/es5/component.js
var require_component2 = __commonJS({
  "node_modules/react-remove-scroll-bar/dist/es5/component.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RemoveScrollBar = exports.useLockAttribute = exports.lockAttribute = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var react_style_singleton_1 = require_es55();
    var constants_1 = require_constants();
    var utils_1 = require_utils();
    var Style = (0, react_style_singleton_1.styleSingleton)();
    exports.lockAttribute = "data-scroll-locked";
    var getStyles = function(_a, allowRelative, gapMode, important) {
      var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
      if (gapMode === void 0) {
        gapMode = "margin";
      }
      return "\n  .".concat(constants_1.noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(exports.lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
      ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(constants_1.zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(constants_1.fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(constants_1.zeroRightClassName, " .").concat(constants_1.zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(constants_1.fullWidthClassName, " .").concat(constants_1.fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(exports.lockAttribute, "] {\n    ").concat(constants_1.removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
    };
    var getCurrentUseCounter = function() {
      var counter = parseInt(document.body.getAttribute(exports.lockAttribute) || "0", 10);
      return isFinite(counter) ? counter : 0;
    };
    var useLockAttribute = function() {
      React14.useEffect(function() {
        document.body.setAttribute(exports.lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function() {
          var newCounter = getCurrentUseCounter() - 1;
          if (newCounter <= 0) {
            document.body.removeAttribute(exports.lockAttribute);
          } else {
            document.body.setAttribute(exports.lockAttribute, newCounter.toString());
          }
        };
      }, []);
    };
    exports.useLockAttribute = useLockAttribute;
    var RemoveScrollBar = function(_a) {
      var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
      (0, exports.useLockAttribute)();
      var gap = React14.useMemo(function() {
        return (0, utils_1.getGapWidth)(gapMode);
      }, [gapMode]);
      return React14.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
    };
    exports.RemoveScrollBar = RemoveScrollBar;
  }
});

// node_modules/react-remove-scroll-bar/dist/es5/index.js
var require_es56 = __commonJS({
  "node_modules/react-remove-scroll-bar/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGapWidth = exports.removedBarSizeVariable = exports.noScrollbarsClassName = exports.fullWidthClassName = exports.zeroRightClassName = exports.RemoveScrollBar = void 0;
    var component_1 = require_component2();
    Object.defineProperty(exports, "RemoveScrollBar", { enumerable: true, get: function() {
      return component_1.RemoveScrollBar;
    } });
    var constants_1 = require_constants();
    Object.defineProperty(exports, "zeroRightClassName", { enumerable: true, get: function() {
      return constants_1.zeroRightClassName;
    } });
    Object.defineProperty(exports, "fullWidthClassName", { enumerable: true, get: function() {
      return constants_1.fullWidthClassName;
    } });
    Object.defineProperty(exports, "noScrollbarsClassName", { enumerable: true, get: function() {
      return constants_1.noScrollbarsClassName;
    } });
    Object.defineProperty(exports, "removedBarSizeVariable", { enumerable: true, get: function() {
      return constants_1.removedBarSizeVariable;
    } });
    var utils_1 = require_utils();
    Object.defineProperty(exports, "getGapWidth", { enumerable: true, get: function() {
      return utils_1.getGapWidth;
    } });
  }
});

// node_modules/react-remove-scroll/dist/es5/aggresiveCapture.js
var require_aggresiveCapture = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/aggresiveCapture.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nonPassive = void 0;
    var passiveSupported = false;
    if (typeof window !== "undefined") {
      try {
        options = Object.defineProperty({}, "passive", {
          get: function() {
            passiveSupported = true;
            return true;
          }
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
      } catch (err) {
        passiveSupported = false;
      }
    }
    var options;
    exports.nonPassive = passiveSupported ? { passive: false } : false;
  }
});

// node_modules/react-remove-scroll/dist/es5/handleScroll.js
var require_handleScroll = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/handleScroll.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleScroll = exports.locationCouldBeScrolled = void 0;
    var alwaysContainsScroll = function(node) {
      return node.tagName === "TEXTAREA";
    };
    var elementCanBeScrolled = function(node, overflow) {
      if (!(node instanceof Element)) {
        return false;
      }
      var styles = window.getComputedStyle(node);
      return (
        // not-not-scrollable
        styles[overflow] !== "hidden" && // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
      );
    };
    var elementCouldBeVScrolled = function(node) {
      return elementCanBeScrolled(node, "overflowY");
    };
    var elementCouldBeHScrolled = function(node) {
      return elementCanBeScrolled(node, "overflowX");
    };
    var locationCouldBeScrolled = function(axis, node) {
      var ownerDocument = node.ownerDocument;
      var current = node;
      do {
        if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
          current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
          var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
          if (scrollHeight > clientHeight) {
            return true;
          }
        }
        current = current.parentNode;
      } while (current && current !== ownerDocument.body);
      return false;
    };
    exports.locationCouldBeScrolled = locationCouldBeScrolled;
    var getVScrollVariables = function(_a) {
      var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
      return [
        scrollTop,
        scrollHeight,
        clientHeight
      ];
    };
    var getHScrollVariables = function(_a) {
      var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
      return [
        scrollLeft,
        scrollWidth,
        clientWidth
      ];
    };
    var elementCouldBeScrolled = function(axis, node) {
      return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
    };
    var getScrollVariables = function(axis, node) {
      return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
    };
    var getDirectionFactor = function(axis, direction) {
      return axis === "h" && direction === "rtl" ? -1 : 1;
    };
    var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
      var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
      var delta = directionFactor * sourceDelta;
      var target = event.target;
      var targetInLock = endTarget.contains(target);
      var shouldCancelScroll = false;
      var isDeltaPositive = delta > 0;
      var availableScroll = 0;
      var availableScrollTop = 0;
      do {
        if (!target) {
          break;
        }
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
          if (elementCouldBeScrolled(axis, target)) {
            availableScroll += elementScroll;
            availableScrollTop += position;
          }
        }
        var parent_1 = target.parentNode;
        target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
      } while (
        // portaled content
        !targetInLock && target !== document.body || // self content
        targetInLock && (endTarget.contains(target) || endTarget === target)
      );
      if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
        shouldCancelScroll = true;
      } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
        shouldCancelScroll = true;
      }
      return shouldCancelScroll;
    };
    exports.handleScroll = handleScroll;
  }
});

// node_modules/react-remove-scroll/dist/es5/SideEffect.js
var require_SideEffect = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/SideEffect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RemoveScrollSideCar = exports.getDeltaXY = exports.getTouchXY = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var react_remove_scroll_bar_1 = require_es56();
    var react_style_singleton_1 = require_es55();
    var aggresiveCapture_1 = require_aggresiveCapture();
    var handleScroll_1 = require_handleScroll();
    var getTouchXY = function(event) {
      return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
    };
    exports.getTouchXY = getTouchXY;
    var getDeltaXY = function(event) {
      return [event.deltaX, event.deltaY];
    };
    exports.getDeltaXY = getDeltaXY;
    var extractRef = function(ref) {
      return ref && "current" in ref ? ref.current : ref;
    };
    var deltaCompare = function(x, y) {
      return x[0] === y[0] && x[1] === y[1];
    };
    var generateStyle = function(id) {
      return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
    };
    var idCounter = 0;
    var lockStack = [];
    function RemoveScrollSideCar(props) {
      var shouldPreventQueue = React14.useRef([]);
      var touchStartRef = React14.useRef([0, 0]);
      var activeAxis = React14.useRef();
      var id = React14.useState(idCounter++)[0];
      var Style = React14.useState(react_style_singleton_1.styleSingleton)[0];
      var lastProps = React14.useRef(props);
      React14.useEffect(function() {
        lastProps.current = props;
      }, [props]);
      React14.useEffect(function() {
        if (props.inert) {
          document.body.classList.add("block-interactivity-".concat(id));
          var allow_1 = tslib_1.__spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
          allow_1.forEach(function(el) {
            return el.classList.add("allow-interactivity-".concat(id));
          });
          return function() {
            document.body.classList.remove("block-interactivity-".concat(id));
            allow_1.forEach(function(el) {
              return el.classList.remove("allow-interactivity-".concat(id));
            });
          };
        }
        return;
      }, [props.inert, props.lockRef.current, props.shards]);
      var shouldCancelEvent = React14.useCallback(function(event, parent) {
        if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
          return !lastProps.current.allowPinchZoom;
        }
        var touch = (0, exports.getTouchXY)(event);
        var touchStart = touchStartRef.current;
        var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
        if ("touches" in event && moveDirection === "h" && target.type === "range") {
          return false;
        }
        var selection = window.getSelection();
        var anchorNode = selection && selection.anchorNode;
        var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
        if (isTouchingSelection) {
          return false;
        }
        var canBeScrolledInMainDirection = (0, handleScroll_1.locationCouldBeScrolled)(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
          return true;
        }
        if (canBeScrolledInMainDirection) {
          currentAxis = moveDirection;
        } else {
          currentAxis = moveDirection === "v" ? "h" : "v";
          canBeScrolledInMainDirection = (0, handleScroll_1.locationCouldBeScrolled)(moveDirection, target);
        }
        if (!canBeScrolledInMainDirection) {
          return false;
        }
        if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
          activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
          return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return (0, handleScroll_1.handleScroll)(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
      }, []);
      var shouldPrevent = React14.useCallback(function(_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
          return;
        }
        var delta = "deltaY" in event ? (0, exports.getDeltaXY)(event) : (0, exports.getTouchXY)(event);
        var sourceEvent = shouldPreventQueue.current.filter(function(e) {
          return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
        })[0];
        if (sourceEvent && sourceEvent.should) {
          if (event.cancelable) {
            event.preventDefault();
          }
          return;
        }
        if (!sourceEvent) {
          var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
            return node.contains(event.target);
          });
          var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
          if (shouldStop) {
            if (event.cancelable) {
              event.preventDefault();
            }
          }
        }
      }, []);
      var shouldCancel = React14.useCallback(function(name, delta, target, should) {
        var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
        shouldPreventQueue.current.push(event);
        setTimeout(function() {
          shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
            return e !== event;
          });
        }, 1);
      }, []);
      var scrollTouchStart = React14.useCallback(function(event) {
        touchStartRef.current = (0, exports.getTouchXY)(event);
        activeAxis.current = void 0;
      }, []);
      var scrollWheel = React14.useCallback(function(event) {
        shouldCancel(event.type, (0, exports.getDeltaXY)(event), event.target, shouldCancelEvent(event, props.lockRef.current));
      }, []);
      var scrollTouchMove = React14.useCallback(function(event) {
        shouldCancel(event.type, (0, exports.getTouchXY)(event), event.target, shouldCancelEvent(event, props.lockRef.current));
      }, []);
      React14.useEffect(function() {
        lockStack.push(Style);
        props.setCallbacks({
          onScrollCapture: scrollWheel,
          onWheelCapture: scrollWheel,
          onTouchMoveCapture: scrollTouchMove
        });
        document.addEventListener("wheel", shouldPrevent, aggresiveCapture_1.nonPassive);
        document.addEventListener("touchmove", shouldPrevent, aggresiveCapture_1.nonPassive);
        document.addEventListener("touchstart", scrollTouchStart, aggresiveCapture_1.nonPassive);
        return function() {
          lockStack = lockStack.filter(function(inst) {
            return inst !== Style;
          });
          document.removeEventListener("wheel", shouldPrevent, aggresiveCapture_1.nonPassive);
          document.removeEventListener("touchmove", shouldPrevent, aggresiveCapture_1.nonPassive);
          document.removeEventListener("touchstart", scrollTouchStart, aggresiveCapture_1.nonPassive);
        };
      }, []);
      var removeScrollBar = props.removeScrollBar, inert = props.inert;
      return React14.createElement(
        React14.Fragment,
        null,
        inert ? React14.createElement(Style, { styles: generateStyle(id) }) : null,
        removeScrollBar ? React14.createElement(react_remove_scroll_bar_1.RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
      );
    }
    exports.RemoveScrollSideCar = RemoveScrollSideCar;
    function getOutermostShadowParent(node) {
      var shadowParent = null;
      while (node !== null) {
        if (node instanceof ShadowRoot) {
          shadowParent = node.host;
          node = node.host;
        }
        node = node.parentNode;
      }
      return shadowParent;
    }
  }
});

// node_modules/react-remove-scroll/dist/es5/sidecar.js
var require_sidecar = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/sidecar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var use_sidecar_1 = require_es53();
    var SideEffect_1 = require_SideEffect();
    var medium_1 = require_medium2();
    exports.default = (0, use_sidecar_1.exportSidecar)(medium_1.effectCar, SideEffect_1.RemoveScrollSideCar);
  }
});

// node_modules/react-remove-scroll/dist/es5/Combination.js
var require_Combination = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/Combination.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var React14 = tslib_1.__importStar(require_react());
    var UI_1 = require_UI();
    var sidecar_1 = tslib_1.__importDefault(require_sidecar());
    var ReactRemoveScroll = React14.forwardRef(function(props, ref) {
      return React14.createElement(UI_1.RemoveScroll, tslib_1.__assign({}, props, { ref, sideCar: sidecar_1.default }));
    });
    ReactRemoveScroll.classNames = UI_1.RemoveScroll.classNames;
    exports.default = ReactRemoveScroll;
  }
});

// node_modules/react-remove-scroll/dist/es5/index.js
var require_es57 = __commonJS({
  "node_modules/react-remove-scroll/dist/es5/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RemoveScroll = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var Combination_1 = tslib_1.__importDefault(require_Combination());
    exports.RemoveScroll = Combination_1.default;
  }
});

// node_modules/@radix-ui/react-select/dist/index.mjs
var React12 = __toESM(require_react(), 1);
var ReactDOM3 = __toESM(require_react_dom(), 1);

// node_modules/@radix-ui/number/dist/index.mjs
function clamp(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var React2 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
var React = __toESM(require_react(), 1);
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React2.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
});
var DismissableLayer = React2.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      deferPointerDownOutside = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = React2.useContext(DismissableLayerContext);
    const [node, setNode] = React2.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = React2.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index2 = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const isDeferredPointerDownOutsideRef = React2.useRef(false);
    const pointerDownOutside = usePointerDownOutside(
      (event) => {
        const target = event.target;
        if (!(target instanceof Node)) {
          return;
        }
        const isPointerDownOnBranch = [...context.branches].some(
          (branch) => branch.contains(target)
        );
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
      },
      {
        ownerDocument,
        deferPointerDownOutside,
        isDeferredPointerDownOutsideRef,
        dismissableSurfaces: context.dismissableSurfaces
      }
    );
    const focusOutside = useFocusOutside((event) => {
      if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) {
        return;
      }
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index2 === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    React2.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents) {
          context.layersWithOutsidePointerEventsDisabled.delete(node);
          if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
            ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
          }
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    React2.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    React2.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = React2.forwardRef((props, forwardedRef) => {
  const context = React2.useContext(DismissableLayerContext);
  const ref = React2.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  React2.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, args) {
  const {
    ownerDocument = globalThis?.document,
    deferPointerDownOutside = false,
    isDeferredPointerDownOutsideRef,
    dismissableSurfaces
  } = args;
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React2.useRef(false);
  const isPointerDownOutsideRef = React2.useRef(false);
  const interceptedOutsideInteractionEventsRef = React2.useRef(/* @__PURE__ */ new Map());
  const handleClickRef = React2.useRef(() => {
  });
  React2.useEffect(() => {
    function resetOutsideInteraction() {
      isPointerDownOutsideRef.current = false;
      isDeferredPointerDownOutsideRef.current = false;
      interceptedOutsideInteractionEventsRef.current.clear();
    }
    function isOutsideInteractionIntercepted() {
      return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
    }
    function handleInteractionCapture(event) {
      if (!isPointerDownOutsideRef.current) {
        return;
      }
      const target = event.target;
      const isDismissableSurface = target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target));
      if (!isDismissableSurface) {
        interceptedOutsideInteractionEventsRef.current.set(event.type, true);
      }
      if (event.type === "click") {
        window.setTimeout(() => {
          if (isPointerDownOutsideRef.current) {
            handleClickRef.current();
          }
        }, 0);
      }
    }
    function handleInteractionBubble(event) {
      if (isPointerDownOutsideRef.current) {
        interceptedOutsideInteractionEventsRef.current.set(event.type, false);
      }
    }
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
          resetOutsideInteraction();
          if (!wasOutsideInteractionIntercepted) {
            handleAndDispatchCustomEvent(
              POINTER_DOWN_OUTSIDE,
              handlePointerDownOutside,
              eventDetail,
              { discrete: true }
            );
          }
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        const eventDetail = { originalEvent: event };
        isPointerDownOutsideRef.current = true;
        isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
        interceptedOutsideInteractionEventsRef.current.clear();
        if (!deferPointerDownOutside || event.button !== 0) {
          handleAndDispatchPointerDownOutsideEvent2();
        } else {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
        resetOutsideInteraction();
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const outsideInteractionEvents = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const eventName of outsideInteractionEvents) {
      ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
      ownerDocument.addEventListener(eventName, handleInteractionBubble);
    }
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
      for (const eventName of outsideInteractionEvents) {
        ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
        ownerDocument.removeEventListener(eventName, handleInteractionBubble);
      }
    };
  }, [
    ownerDocument,
    handlePointerDownOutside,
    deferPointerDownOutside,
    isDeferredPointerDownOutsideRef,
    dismissableSurfaces
  ]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React2.useRef(false);
  React2.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}

// node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var React3 = __toESM(require_react(), 1);
var count = 0;
var guards = null;
function useFocusGuards() {
  React3.useEffect(() => {
    if (!guards) {
      guards = { start: createFocusGuard(), end: createFocusGuard() };
    }
    const { start, end } = guards;
    if (document.body.firstElementChild !== start) {
      document.body.insertAdjacentElement("afterbegin", start);
    }
    if (document.body.lastElementChild !== end) {
      document.body.insertAdjacentElement("beforeend", end);
    }
    count++;
    return () => {
      if (count === 1) {
        guards?.start.remove();
        guards?.end.remove();
        guards = null;
      }
      count = Math.max(0, count - 1);
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}

// node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var React4 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = React4.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = React4.useState(null);
  const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
  const lastFocusedElementRef = React4.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
  const focusScope = React4.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  React4.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container) return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container) return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null) return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) focus(container);
        }
      };
      var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container) mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  React4.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = React4.useCallback(
    (event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      }
    },
    [loop, trapped, focusScope.paused]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index2 = updatedArray.indexOf(item);
  if (index2 !== -1) {
    updatedArray.splice(index2, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}

// node_modules/@radix-ui/react-popper/dist/index.mjs
var React8 = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp2(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset4 = clamp2(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset4,
        centerOffset: center - offset4 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp2(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp2(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset4 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset4, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React5 = __toESM(require_react(), 1);
var import_react = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var isClient = typeof document !== "undefined";
var noop = function noop2() {
};
var index = isClient ? import_react.useLayoutEffect : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React5.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React5.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React5.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React5.useState(null);
  const [_floating, _setFloating] = React5.useState(null);
  const setReference = React5.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React5.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React5.useRef(null);
  const floatingRef = React5.useRef(null);
  const dataRef = React5.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React5.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React5.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React5.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React5.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React5.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React5.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
var offset3 = (options, deps) => {
  const result = offset2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var shift3 = (options, deps) => {
  const result = shift2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var limitShift3 = (options, deps) => {
  const result = limitShift2(options);
  return {
    fn: result.fn,
    options: [options, deps]
  };
};
var flip3 = (options, deps) => {
  const result = flip2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var size3 = (options, deps) => {
  const result = size2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var hide3 = (options, deps) => {
  const result = hide2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var arrow3 = (options, deps) => {
  const result = arrow$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

// node_modules/@radix-ui/react-arrow/dist/index.mjs
var React6 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var NAME = "Arrow";
var Arrow = React6.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow.displayName = NAME;
var Root = Arrow;

// node_modules/@radix-ui/react-use-size/dist/index.mjs
var React7 = __toESM(require_react(), 1);
function useSize(element) {
  const [size4, setSize] = React7.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size4;
}

// node_modules/@radix-ui/react-popper/dist/index.mjs
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = React8.useState(null);
  const [placementState, setPlacementState] = React8.useState(void 0);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    PopperProvider,
    {
      scope: __scopePopper,
      anchor,
      onAnchorChange: setAnchor,
      placementState,
      setPlacementState,
      children
    }
  );
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = React8.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME, __scopePopper);
    const ref = React8.useRef(null);
    const onAnchorChange = context.onAnchorChange;
    const callbackRef = React8.useCallback(
      (node) => {
        ref.current = node;
        if (node) {
          onAnchorChange(node);
        }
      },
      [onAnchorChange]
    );
    const composedRefs = useComposedRefs(forwardedRef, callbackRef);
    const anchorRef = React8.useRef(null);
    React8.useEffect(() => {
      if (!virtualRef) {
        return;
      }
      const previousAnchor = anchorRef.current;
      anchorRef.current = virtualRef.current;
      if (previousAnchor !== anchorRef.current) {
        onAnchorChange(anchorRef.current);
      }
    });
    const sideAndAlign = context.placementState && getSideAndAlignFromPlacement(context.placementState);
    const placedSide = sideAndAlign?.[0];
    const placedAlign = sideAndAlign?.[1];
    return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Primitive.div,
      {
        "data-radix-popper-side": placedSide,
        "data-radix-popper-align": placedAlign,
        ...anchorProps,
        ref: composedRefs
      }
    );
  }
);
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME);
var PopperContent = React8.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME, __scopePopper);
    const [content, setContent] = React8.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow4, setArrow] = React8.useState(null);
    const arrowSize = useSize(arrow4);
    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift3({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift3() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip3({ ...detectOverflowOptions }),
        size3({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow4 && arrow3({ element: arrow4, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide3({
          strategy: "referenceHidden",
          ...detectOverflowOptions,
          // `hide` detects whether the anchor (reference) is clipped, so when
          // no explicit `collisionBoundary` is set we fall back to Floating
          // UI's default clipping ancestors (e.g. a scrollable menu). This
          // lets an occluded submenu hide once its anchor scrolls out of view
          // (#3237). The collision/size middlewares deliberately keep the
          // viewport-based default to avoid clamping content rendered inside
          // transformed or overflow-clipping portal containers.
          boundary: hasExplicitBoundaries ? detectOverflowOptions.boundary : void 0
        })
      ]
    });
    const setPlacementState = context.setPlacementState;
    useLayoutEffect2(() => {
      setPlacementState(placement);
      return () => {
        setPlacementState(void 0);
      };
    }, [placement, setPlacementState]);
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced?.();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const [contentZIndex, setContentZIndex] = React8.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          "--radix-popper-transform-origin": [
            middlewareData.transformOrigin?.x,
            middlewareData.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...middlewareData.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            placedAlign,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent.displayName = CONTENT_NAME;
var ARROW_NAME = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = React8.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          Root,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow.displayName = ARROW_NAME;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root2 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow2 = PopperArrow;

// node_modules/@radix-ui/react-portal/dist/index.mjs
var React9 = __toESM(require_react(), 1);
var ReactDOM2 = __toESM(require_react_dom(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var PORTAL_NAME = "Portal";
var Portal = React9.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React9.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM2.createPortal(/* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;

// node_modules/@radix-ui/react-use-previous/dist/index.mjs
var React10 = __toESM(require_react(), 1);
function usePrevious(value) {
  const ref = React10.useRef({ value, previous: value });
  return React10.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

// node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var React11 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME2 = "VisuallyHidden";
var VisuallyHidden = React11.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME2;

// node_modules/@radix-ui/react-select/dist/index.mjs
var import_aria_hidden = __toESM(require_es5(), 1);
var import_react_remove_scroll = __toESM(require_es57(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME);
var [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [
  createCollectionScope,
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [SelectProviderImpl, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var PROVIDER_NAME = "SelectProvider";
function SelectProvider(props) {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form,
    // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  const [trigger, setTrigger] = React12.useState(null);
  const [valueNode, setValueNode] = React12.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = React12.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = React12.useRef(null);
  const isFormControl = trigger ? !!form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = React12.useState(/* @__PURE__ */ new Set());
  const contentId = useId();
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  const handleNativeOptionAdd = React12.useCallback((option) => {
    setNativeOptionsSet((prev) => new Set(prev).add(option));
  }, []);
  const handleNativeOptionRemove = React12.useCallback((option) => {
    setNativeOptionsSet((prev) => {
      const optionsSet = new Set(prev);
      optionsSet.delete(option);
      return optionsSet;
    });
  }, []);
  const context = {
    required,
    trigger,
    onTriggerChange: setTrigger,
    valueNode,
    onValueNodeChange: setValueNode,
    valueNodeHasChildren,
    onValueNodeHasChildrenChange: setValueNodeHasChildren,
    contentId,
    value,
    onValueChange: setValue,
    open,
    onOpenChange: setOpen,
    dir: direction,
    triggerPointerDownPosRef,
    disabled,
    name,
    autoComplete,
    form,
    nativeOptions: nativeOptionsSet,
    nativeSelectKey,
    isFormControl
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Root2, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectProviderImpl, { scope: __scopeSelect, ...context, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Collection.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectNativeOptionsProvider,
    {
      scope: __scopeSelect,
      onNativeOptionAdd: handleNativeOptionAdd,
      onNativeOptionRemove: handleNativeOptionRemove,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  ) }) }) });
}
SelectProvider.displayName = PROVIDER_NAME;
var Select = (props) => {
  const { __scopeSelect, children, ...providerProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectProvider,
    {
      __scopeSelect,
      ...providerProps,
      internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
        children,
        isFormControl ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          SelectBubbleInput,
          {
            __scopeSelect
          }
        ) : null
      ] })
    }
  );
};
Select.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
    const getItems = useCollection(__scopeSelect);
    const pointerTypeRef = React12.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.value === context.value);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem !== void 0) {
        context.onValueChange(nextItem.value);
      }
    });
    const handleOpen = (pointerEvent) => {
      if (!isDisabled) {
        context.onOpenChange(true);
        resetTypeahead();
      }
      if (pointerEvent) {
        context.triggerPointerDownPosRef.current = {
          x: Math.round(pointerEvent.pageX),
          y: Math.round(pointerEvent.pageY)
        };
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Primitive.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": context.open ? context.contentId : void 0,
        "aria-expanded": context.open,
        "aria-required": context.required,
        "aria-autocomplete": "none",
        dir: context.dir,
        "data-state": context.open ? "open" : "closed",
        disabled: isDisabled,
        "data-disabled": isDisabled ? "" : void 0,
        "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        onClick: composeEventHandlers(triggerProps.onClick, (event) => {
          event.currentTarget.focus();
          if (pointerTypeRef.current !== "mouse") {
            handleOpen(event);
          }
        }),
        onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }
          if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
            handleOpen(event);
            event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
          const isTypingAhead = searchRef.current !== "";
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
          if (isTypingAhead && event.key === " ") return;
          if (OPEN_KEYS.includes(event.key)) {
            handleOpen();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
SelectTrigger.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
    useLayoutEffect2(() => {
      onValueNodeHasChildrenChange(hasChildren);
    }, [onValueNodeHasChildrenChange, hasChildren]);
    const showPlaceholder = shouldShowPlaceholder(context.value);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Primitive.span,
      {
        ...valueProps,
        asChild: showPlaceholder ? false : valueProps.asChild,
        ref: composedRefs,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(React12.Fragment, { children: showPlaceholder ? placeholder : children }, showPlaceholder ? "placeholder" : "value")
      }
    );
  }
);
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "\u25BC" });
  }
);
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME2 = "SelectPortal";
var [PortalProvider, usePortalContext] = createSelectContext(PORTAL_NAME2, {
  forceMount: void 0
});
var SelectPortal = (props) => {
  const { __scopeSelect, forceMount, ...portalProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PortalProvider, { scope: props.__scopeSelect, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Portal, { asChild: true, ...portalProps }) });
};
SelectPortal.displayName = PORTAL_NAME2;
var CONTENT_NAME2 = "SelectContent";
var SelectContent = React12.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeSelect);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useSelectContext(CONTENT_NAME2, props.__scopeSelect);
    const [fragment, setFragment] = React12.useState();
    useLayoutEffect2(() => {
      setFragment(new DocumentFragment());
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || context.open, children: ({ present }) => present ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectContentImpl, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectContentFragment, { ...contentProps, fragment }) });
  }
);
SelectContent.displayName = CONTENT_NAME2;
var SelectContentFragment = React12.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, children, fragment } = props;
  if (!fragment) return null;
  return ReactDOM3.createPortal(
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectContentProvider, { scope: __scopeSelect, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Collection.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { ref: forwardedRef, children }) }) }),
    fragment
  );
});
SelectContentFragment.displayName = "SelectContentFragment";
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME2);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect } = props;
    const {
      position = "item-aligned",
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      //
      // PopperContent props
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      //
      ...contentProps
    } = props;
    const context = useSelectContext(CONTENT_NAME2, __scopeSelect);
    const [content, setContent] = React12.useState(null);
    const [viewport, setViewport] = React12.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [selectedItem, setSelectedItem] = React12.useState(null);
    const [selectedItemText, setSelectedItemText] = React12.useState(
      null
    );
    const getItems = useCollection(__scopeSelect);
    const [isPositioned, setIsPositioned] = React12.useState(false);
    const firstValidItemFoundRef = React12.useRef(false);
    React12.useEffect(() => {
      if (content) return (0, import_aria_hidden.hideOthers)(content);
    }, [content]);
    useFocusGuards();
    const focusFirst2 = React12.useCallback(
      (candidates) => {
        const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
          if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
          candidate?.scrollIntoView({ block: "nearest" });
          if (candidate === firstItem && viewport) viewport.scrollTop = 0;
          if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
          candidate?.focus();
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
      },
      [getItems, viewport]
    );
    const focusSelectedItem = React12.useCallback(
      () => focusFirst2([selectedItem, content]),
      [focusFirst2, selectedItem, content]
    );
    React12.useEffect(() => {
      if (isPositioned) {
        focusSelectedItem();
      }
    }, [isPositioned, focusSelectedItem]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    React12.useEffect(() => {
      if (content) {
        let pointerMoveDelta = { x: 0, y: 0 };
        const handlePointerMove = (event) => {
          pointerMoveDelta = {
            x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
            y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0))
          };
        };
        const handlePointerUp = (event) => {
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault();
          } else {
            if (!event.composedPath().includes(content)) {
              onOpenChange(false);
            }
          }
          document.removeEventListener("pointermove", handlePointerMove);
          triggerPointerDownPosRef.current = null;
        };
        if (triggerPointerDownPosRef.current !== null) {
          document.addEventListener("pointermove", handlePointerMove);
          document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
        }
        return () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp, { capture: true });
        };
      }
    }, [content, onOpenChange, triggerPointerDownPosRef]);
    React12.useEffect(() => {
      const close = () => onOpenChange(false);
      window.addEventListener("blur", close);
      window.addEventListener("resize", close);
      return () => {
        window.removeEventListener("blur", close);
        window.removeEventListener("resize", close);
      };
    }, [onOpenChange]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem) {
        setTimeout(() => nextItem.ref.current?.focus());
      }
    });
    const itemRefCallback = React12.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItem(node);
          if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
      },
      [context.value]
    );
    const handleItemLeave = React12.useCallback(() => content?.focus(), [content]);
    const itemTextRefCallback = React12.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItemText(node);
        }
      },
      [context.value]
    );
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions
    } : {};
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      SelectContentProvider,
      {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_remove_scroll.RemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          FocusScope,
          {
            asChild: true,
            trapped: context.open,
            onMountAutoFocus: (event) => {
              event.preventDefault();
            },
            onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
              context.trigger?.focus({ preventScroll: true });
              event.preventDefault();
            }),
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside: (event) => event.preventDefault(),
                onDismiss: () => context.onOpenChange(false),
                children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  SelectPosition,
                  {
                    role: "listbox",
                    id: context.contentId,
                    "data-state": context.open ? "open" : "closed",
                    dir: context.dir,
                    onContextMenu: (event) => event.preventDefault(),
                    ...contentProps,
                    ...popperContentProps,
                    onPlaced: () => setIsPositioned(true),
                    ref: composedRefs,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...contentProps.style
                    },
                    onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      if (event.key === "Tab") event.preventDefault();
                      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                        const items = getItems().filter((item) => !item.disabled);
                        let candidateNodes = items.map((item) => item.ref.current);
                        if (["ArrowUp", "End"].includes(event.key)) {
                          candidateNodes = candidateNodes.slice().reverse();
                        }
                        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                          const currentElement = event.target;
                          const currentIndex = candidateNodes.indexOf(currentElement);
                          candidateNodes = candidateNodes.slice(currentIndex + 1);
                        }
                        setTimeout(() => focusFirst2(candidateNodes));
                        event.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = React12.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME2, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME2, __scopeSelect);
  const [contentWrapper, setContentWrapper] = React12.useState(null);
  const [content, setContent] = React12.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection(__scopeSelect);
  const shouldExpandOnScrollRef = React12.useRef(false);
  const shouldRepositionRef = React12.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = React12.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp(left, [
          CONTENT_MARGIN,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(
          triggerMiddleToBottomEdge,
          selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
        );
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(
          topEdgeToTriggerMiddle,
          contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
        );
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced?.();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = React12.useState();
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = React12.useCallback(
    (node) => {
      if (node && shouldRepositionRef.current === true) {
        position();
        focusSelectedItem?.();
        shouldRepositionRef.current = false;
      }
    },
    [position, focusSelectedItem]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectViewportProvider,
    {
      scope: __scopeSelect,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "div",
        {
          ref: setContentWrapper,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: contentZIndex
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            Primitive.div,
            {
              ...popperProps,
              ref: composedRefs,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...popperProps.style
              }
            }
          )
        }
      )
    }
  );
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = React12.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Content,
    {
      ...popperScope,
      ...popperProps,
      ref: forwardedRef,
      align,
      collisionPadding,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...popperProps.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-select-content-available-width": "var(--radix-popper-available-width)",
          "--radix-select-content-available-height": "var(--radix-popper-available-height)",
          "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME2, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = React12.useRef(0);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Collection.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Primitive.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...viewportProps,
          ref: composedRefs,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...viewportProps.style
          },
          onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if (shouldExpandOnScrollRef?.current && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);
                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;
                  contentWrapper.style.height = clampedNextHeight + "px";
                  if (contentWrapper.style.bottom === "0px") {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    contentWrapper.style.justifyContent = "flex-end";
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;
          })
        }
      ) })
    ] });
  }
);
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
  }
);
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
  }
);
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem = React12.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      value,
      disabled = false,
      textValue: textValueProp,
      ...itemProps
    } = props;
    const context = useSelectContext(ITEM_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = React12.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = React12.useState(false);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => contentContext.itemRefCallback?.(node, value, disabled)
    );
    const textId = useId();
    const pointerTypeRef = React12.useRef("touch");
    const handleSelect = () => {
      if (!disabled) {
        context.onValueChange(value);
        context.onOpenChange(false);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      SelectItemContextProvider,
      {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: React12.useCallback((node) => {
          setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          Collection.ItemSlot,
          {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              Primitive.div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
                onClick: composeEventHandlers(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    contentContext.onItemLeave?.();
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                }),
                onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
                  if (event.currentTarget === document.activeElement) {
                    contentContext.onItemLeave?.();
                  }
                }),
                onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
                  const isTypingAhead = contentContext.searchRef?.current !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                })
              }
            )
          }
        )
      }
    );
  }
);
SelectItem.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = React12.useState(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => setItemTextNode(node),
      itemContext.onItemTextChange,
      (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled)
    );
    const textContent = itemTextNode?.textContent;
    const nativeOption = React12.useMemo(
      () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value),
      [itemContext.disabled, itemContext.value, textContent]
    );
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    useLayoutEffect2(() => {
      onNativeOptionAdd(nativeOption);
      return () => onNativeOptionRemove(nativeOption);
    }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
      itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren && !shouldShowPlaceholder(context.value) ? ReactDOM3.createPortal(itemTextProps.children, context.valueNode) : null
    ] });
  }
);
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
);
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton = React12.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = React12.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      var handleScroll = handleScroll2;
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton = React12.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = React12.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      var handleScroll = handleScroll2;
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = React12.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = React12.useRef(null);
  const getItems = useCollection(__scopeSelect);
  const clearAutoScrollTimer = React12.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  React12.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    activeItem?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Primitive.div,
    {
      "aria-hidden": true,
      ...scrollIndicatorProps,
      ref: forwardedRef,
      style: { flexShrink: 0, ...scrollIndicatorProps.style },
      onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
        contentContext.onItemLeave?.();
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
        clearAutoScrollTimer();
      })
    }
  );
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
  }
);
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME2 = "SelectArrow";
var SelectArrow = React12.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME2, __scopeSelect);
    return contentContext.position === "popper" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
  }
);
SelectArrow.displayName = ARROW_NAME2;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = React12.forwardRef(
  ({ __scopeSelect, ...props }, forwardedRef) => {
    const context = useSelectContext(BUBBLE_INPUT_NAME, __scopeSelect);
    const { value, onValueChange, required, disabled, name, autoComplete, form } = context;
    const { nativeOptions, nativeSelectKey } = context;
    const ref = React12.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const selectValue = value ?? "";
    const prevValue = usePrevious(selectValue);
    const hasEmptyValueOption = Array.from(nativeOptions).some(
      (option) => (option.props.value ?? "") === ""
    );
    React12.useEffect(() => {
      const select = ref.current;
      if (!select) return;
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (prevValue !== selectValue && setValue) {
        const event = new Event("change", { bubbles: true });
        setValue.call(select, selectValue);
        select.dispatchEvent(event);
      }
    }, [prevValue, selectValue]);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      Primitive.select,
      {
        "aria-hidden": true,
        required,
        tabIndex: -1,
        name,
        autoComplete,
        disabled,
        form,
        onChange: (event) => onValueChange(event.target.value),
        ...props,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
        ref: composedRefs,
        defaultValue: selectValue,
        children: [
          shouldShowPlaceholder(value) && !hasEmptyValueOption ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "" }) : null,
          Array.from(nativeOptions)
        ]
      },
      nativeSelectKey
    );
  }
);
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef(onSearchChange);
  const searchRef = React12.useRef("");
  const timerRef = React12.useRef(0);
  const handleTypeaheadSearch = React12.useCallback(
    (key) => {
      const search = searchRef.current + key;
      handleSearchChange(search);
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
    },
    [handleSearchChange]
  );
  const resetTypeahead = React12.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  React12.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}

// dist/server/assets/select-CZRUt5a6.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var React13 = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var Select2 = Select;
var SelectValue2 = SelectValue;
var SelectTrigger2 = React13.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
  SelectTrigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectIcon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger2.displayName = SelectTrigger.displayName;
var SelectScrollUpButton2 = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  SelectScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton2.displayName = SelectScrollUpButton.displayName;
var SelectScrollDownButton2 = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  SelectScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton2.displayName = SelectScrollDownButton.displayName;
var SelectContent2 = React13.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
  SelectContent,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectScrollUpButton2, {}),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectScrollDownButton2, {})
    ]
  }
) }));
SelectContent2.displayName = SelectContent.displayName;
var SelectLabel2 = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  SelectLabel,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel2.displayName = SelectLabel.displayName;
var SelectItem2 = React13.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
  SelectItem,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectItemText, { children })
    ]
  }
));
SelectItem2.displayName = SelectItem.displayName;
var SelectSeparator2 = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  SelectSeparator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator2.displayName = SelectSeparator.displayName;

export {
  Select2 as Select,
  SelectValue2 as SelectValue,
  SelectTrigger2 as SelectTrigger,
  SelectContent2 as SelectContent,
  SelectItem2 as SelectItem
};
