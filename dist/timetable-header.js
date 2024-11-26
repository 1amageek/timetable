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
// src/timetable-header.tsx
var timetable_header_exports = {};
__export(timetable_header_exports, {
    TimetableHeader: function() {
        return TimetableHeader;
    }
});
module.exports = __toCommonJS(timetable_header_exports);
// src/timetable-context.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var TimetableContext = (0, import_react.createContext)(null);
function useTimetableContext() {
    var context = (0, import_react.useContext)(TimetableContext);
    if (!context) {
        throw new Error("useTimetableContext must be used within a TimetableProvider");
    }
    return context;
}
// src/timetable-header.tsx
var import_luxon = require("luxon");
var import_jsx_runtime2 = require("react/jsx-runtime");
function TimetableHeader(param) {
    var options = param.options;
    var dates = useTimetableContext().dates;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
        className: "sticky top-0 flex text-center justify-center items-center border-b-2 border-default-300 bg-default z-20",
        style: {
            paddingLeft: "".concat(options.paddingInsets.left, "px"),
            height: "".concat(options.headerHeight, "px")
        },
        children: dates.map(function(date, index) {
            var isToday = date.hasSame(import_luxon.DateTime.local(), "day");
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
                className: "flex w-full gap-1 items-center justify-center\n              ".concat(isToday ? "relative" : ""),
                children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                        className: "text-sm",
                        children: date.toFormat("ccc")
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                        className: "\n              w-6 h-6 flex items-center justify-center rounded-full text-sm\n              ".concat(isToday ? "bg-red-500 text-white" : "", "\n            "),
                        children: date.toFormat("d")
                    })
                ]
            }, index);
        })
    });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    TimetableHeader: TimetableHeader
});
