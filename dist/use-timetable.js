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
// src/use-timetable.tsx
var use_timetable_exports = {};
__export(use_timetable_exports, {
    useTimetable: function() {
        return useTimetable;
    }
});
module.exports = __toCommonJS(use_timetable_exports);
var import_react = require("react");
function useTimetable(start, end, items) {
    var dates = (0, import_react.useMemo)(function() {
        var days = end.diff(start, "days").days;
        return Array.from({
            length: Math.ceil(days) + 1
        }, function(_, i) {
            return start.plus({
                days: i
            });
        });
    }, [
        start,
        end
    ]);
    var timeSlots = (0, import_react.useMemo)(function() {
        return Array.from({
            length: 24
        }, function(_, i) {
            return i;
        });
    }, []);
    var itemsByDate = (0, import_react.useMemo)(function() {
        return dates.map(function(date) {
            return {
                date: date,
                items: items.filter(function(item) {
                    return item.start.hasSame(date, "day") || item.end.hasSame(date, "day") || item.start < date && item.end > date;
                })
            };
        });
    }, [
        dates,
        items
    ]);
    return {
        dates: dates,
        timeSlots: timeSlots,
        itemsByDate: itemsByDate
    };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    useTimetable: useTimetable
});
