"use strict";
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/timetable-context.tsx
var timetable_context_exports = {};
__export(timetable_context_exports, {
    TimetableProvider: function() {
        return TimetableProvider;
    },
    useTimetableContext: function() {
        return useTimetableContext;
    },
    useTimetableDates: function() {
        return useTimetableDates;
    }
});
module.exports = __toCommonJS(timetable_context_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var TimetableContext = (0, import_react.createContext)(null);
function TimetableProvider(param) {
    var children = param.children, items = param.items, dates = param.dates, start = param.start, end = param.end;
    var value = {
        items: items,
        dates: dates,
        start: start,
        end: end
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimetableContext.Provider, {
        value: value,
        children: children
    });
}
function useTimetableContext() {
    var context = (0, import_react.useContext)(TimetableContext);
    if (!context) {
        throw new Error("useTimetableContext must be used within a TimetableProvider");
    }
    return context;
}
function useTimetableDates() {
    var _useTimetableContext = useTimetableContext(), dates = _useTimetableContext.dates, start = _useTimetableContext.start, end = _useTimetableContext.end;
    return {
        dates: dates,
        start: start,
        end: end
    };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    TimetableProvider: TimetableProvider,
    useTimetableContext: useTimetableContext,
    useTimetableDates: useTimetableDates
});
