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
// src/timetable.tsx
var timetable_exports = {};
__export(timetable_exports, {
    Timetable: function() {
        return Timetable;
    }
});
module.exports = __toCommonJS(timetable_exports);
// src/timeline.tsx
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
// src/timetable-context.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var TimetableContext = (0, import_react2.createContext)(null);
function TimetableProvider(param) {
    var children = param.children, items = param.items, dates = param.dates, start = param.start, end = param.end;
    var value = {
        items: items,
        dates: dates,
        start: start,
        end: end
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TimetableContext.Provider, {
        value: value,
        children: children
    });
}
function useTimetableContext() {
    var context = (0, import_react2.useContext)(TimetableContext);
    if (!context) {
        throw new Error("useTimetableContext must be used within a TimetableProvider");
    }
    return context;
}
// src/timetable-header.tsx
var import_luxon2 = require("luxon");
var import_jsx_runtime3 = require("react/jsx-runtime");
function TimetableHeader(param) {
    var options = param.options;
    var dates = useTimetableContext().dates;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
        className: "sticky top-0 flex text-center justify-center items-center border-b-2 border-default-300 bg-default z-20",
        style: {
            paddingLeft: "".concat(options.paddingInsets.left, "px"),
            height: "".concat(options.headerHeight, "px")
        },
        children: dates.map(function(date, index) {
            var isToday = date.hasSame(import_luxon2.DateTime.local(), "day");
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
                className: "flex w-full gap-1 items-center justify-center\n              ".concat(isToday ? "relative" : ""),
                children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
                        className: "text-sm",
                        children: date.toFormat("ccc")
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
                        className: "\n              w-6 h-6 flex items-center justify-center rounded-full text-sm\n              ".concat(isToday ? "bg-red-500 text-white" : "", "\n            "),
                        children: date.toFormat("d")
                    })
                ]
            }, index);
        })
    });
}
// src/use-timetable.tsx
var import_react3 = require("react");
function useTimetable(start, end, items) {
    var dates = (0, import_react3.useMemo)(function() {
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
    var timeSlots = (0, import_react3.useMemo)(function() {
        return Array.from({
            length: 24
        }, function(_, i) {
            return i;
        });
    }, []);
    var itemsByDate = (0, import_react3.useMemo)(function() {
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
// src/timetable.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var defaultOptions = {
    cellHeight: 40,
    headerHeight: 32,
    paddingInsets: {
        top: 12,
        left: 48,
        right: 0,
        bottom: 24
    }
};
function Timetable(param) {
    var start = param.start, end = param.end, items = param.items, _param_options = param.options, options = _param_options === void 0 ? defaultOptions : _param_options, children = param.children;
    var _useTimetable = useTimetable(start, end, items), dates = _useTimetable.dates, timeSlots = _useTimetable.timeSlots, itemsByDate = _useTimetable.itemsByDate;
    var height = options.paddingInsets.top + options.cellHeight * timeSlots.length + options.paddingInsets.bottom;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TimetableProvider, {
        items: items,
        start: start,
        end: end,
        dates: dates,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
            className: "relative flex flex-col w-full h-full overflow-y-auto",
            children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TimetableHeader, {
                    options: options
                }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
                    className: "flex w-full h-full",
                    style: {
                        height: "".concat(height, "px")
                    },
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
                            className: "flex shrink-0 flex-col w-full h-full select-none",
                            style: {
                                paddingTop: "".concat(options.paddingInsets.top, "px"),
                                paddingLeft: "".concat(options.paddingInsets.left, "px"),
                                paddingBottom: "".concat(options.paddingInsets.bottom, "px")
                            },
                            children: timeSlots.map(function(hour) {
                                return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
                                    className: "relative shrink-0 border-t border-default-300 w-full",
                                    style: {
                                        height: "".concat(options.cellHeight, "px")
                                    },
                                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
                                        className: "absolute w-9 text-right -top-2 -left-10 text-xs text-default-600",
                                        children: "".concat(hour.toString().padStart(2, "0"), ":00")
                                    })
                                }, hour);
                            })
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
                            className: "absolute z-0 flex w-full h-full",
                            style: {
                                height: "".concat(height, "px"),
                                paddingLeft: "".concat(options.paddingInsets.left, "px"),
                                paddingBottom: "".concat(options.paddingInsets.bottom, "px")
                            },
                            children: itemsByDate.map(function(param, dateIndex) {
                                var date = param.date, items2 = param.items;
                                return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
                                    className: "relative w-full h-full",
                                    style: {
                                        top: "".concat(options.paddingInsets.top, "px"),
                                        bottom: "".concat(options.paddingInsets.bottom, "px")
                                    },
                                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Timeline, {
                                        date: date,
                                        items: items2,
                                        children: children,
                                        cellHeight: options.cellHeight
                                    })
                                }, dateIndex);
                            })
                        })
                    ]
                })
            ]
        })
    });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Timetable: Timetable
});
