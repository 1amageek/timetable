"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
// src/timeline.tsx
var timeline_exports = {};
__export(timeline_exports, {
    Timeline: function() {
        return Timeline;
    },
    calculateTimeInDay: function() {
        return calculateTimeInDay;
    }
});
module.exports = __toCommonJS(timeline_exports);
var import_luxon = require("luxon");
var import_react = require("react");
// src/timetable-types.tsx
var MINUTES_PER_DAY = 24 * 60;
// src/timeline.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function calculateTimeInDay(dateTime, targetDate) {
    var itemStartOfDay = dateTime.startOf("day");
    var targetStartOfDay = targetDate.startOf("day");
    var daysDiff = itemStartOfDay.diff(targetStartOfDay, "days").days;
    var minutesInDay = dateTime.hour * 60 + dateTime.minute + daysDiff * MINUTES_PER_DAY;
    if (minutesInDay < 0) {
        return 0;
    } else if (daysDiff > 0) {
        return MINUTES_PER_DAY;
    }
    return Math.max(0, Math.min(minutesInDay, MINUTES_PER_DAY));
}
function useTimelineStyles(date, items, cellHeight) {
    return (0, import_react.useMemo)(function() {
        var styles = /* @__PURE__ */ new Map();
        if (items.length === 0) return styles;
        var sortedItems = _to_consumable_array(items).sort(function(a, b) {
            var aStart = calculateTimeInDay(a.start, date);
            var bStart = calculateTimeInDay(b.start, date);
            if (aStart !== bStart) return aStart - bStart;
            var aEnd = calculateTimeInDay(a.end, date);
            var bEnd = calculateTimeInDay(b.end, date);
            return bEnd - aEnd;
        });
        var overlappingGroups = sortedItems.reduce(function(groups, item) {
            var lastGroup = groups[groups.length - 1];
            if (!lastGroup) {
                return [
                    [
                        item
                    ]
                ];
            }
            var overlapsWithLastGroup = lastGroup.some(function(groupItem) {
                var itemInterval = import_luxon.Interval.fromDateTimes(item.start, item.end);
                var groupItemInterval = import_luxon.Interval.fromDateTimes(groupItem.start, groupItem.end);
                return itemInterval.overlaps(groupItemInterval);
            });
            if (overlapsWithLastGroup) {
                lastGroup.push(item);
            } else {
                groups.push([
                    item
                ]);
            }
            return groups;
        }, []);
        overlappingGroups.forEach(function(group) {
            group.forEach(function(item, index) {
                var startMinutes = calculateTimeInDay(item.start, date);
                var endMinutes = calculateTimeInDay(item.end, date);
                var duration = Math.max(0, endMinutes - startMinutes);
                var top = startMinutes * cellHeight / 60;
                var height = duration * cellHeight / 60;
                styles.set(item, {
                    left: "".concat(index * 100 / group.length, "%"),
                    width: "".concat(100 / group.length, "%"),
                    top: "".concat(top, "px"),
                    height: "".concat(height, "px")
                });
            });
        });
        return styles;
    }, [
        date,
        items,
        cellHeight
    ]);
}
function Timeline(param) {
    var date = param.date, items = param.items, children = param.children, cellHeight = param.cellHeight;
    var styles = useTimelineStyles(date, items, cellHeight);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "relative border-r w-full h-full border-default-200",
        children: items.map(function(item) {
            var style = styles.get(item);
            if (!style) return null;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                style: style,
                className: "absolute py-0.5",
                children: children(item)
            }, item.id);
        })
    });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Timeline: Timeline,
    calculateTimeInDay: calculateTimeInDay
});
