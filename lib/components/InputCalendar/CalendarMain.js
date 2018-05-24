"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var now = new Date();
var isTodayYear = now.getFullYear();
var isTodayMonth = now.getMonth();
var isTodayDay = now.getDate();
var allMonth = [["一月", "二月", "三月"], ["四月", "五月", "六月"], ["七月", "八月", "九月"], ["十月", "十一月", "十二月"]];

var CalendarMain = function (_React$Component) {
    _inherits(CalendarMain, _React$Component);

    function CalendarMain() {
        _classCallCheck(this, CalendarMain);

        return _possibleConstructorReturn(this, (CalendarMain.__proto__ || Object.getPrototypeOf(CalendarMain)).apply(this, arguments));
    }

    _createClass(CalendarMain, [{
        key: "handleDatePick",

        //处理日期选择事件，如果是当月，触发日期选择；如果不是当月，切换月份
        value: function handleDatePick(index, styleName) {
            var month = this.props.viewData[this.props.month];
            switch (styleName) {
                case 'thisMonth':
                    this.props.datePick(month[index]);
                    break;
                case 'prevMonth':
                    this.props.prevMonth(month[index]);
                    break;
                case 'nextMonth':
                    this.props.nextMonth(month[index]);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "rewriteClassName",
        value: function rewriteClassName(classname, day) {
            if (classname === "thisMonth") {
                if (this.props.month === isTodayMonth && day === isTodayDay && day === this.props.day) {
                    return 'selectedDay today ' + classname;
                } else if (this.props.year === isTodayYear && this.props.month === isTodayMonth && day === isTodayDay && day != this.props.day) {
                    return 'today ' + classname;
                } else if (day === this.props.day) {
                    return 'selectedDay ' + classname;
                } else {
                    return classname;
                }
            } else {
                return classname;
            }
        }
    }, {
        key: "getYearList",
        value: function getYearList(thisYear) {
            var ROW = 4;
            var COL = 3;
            var currentYear = thisYear;
            var startYear = parseInt(currentYear / 10, 10) * 10;
            var endYear = startYear + 9;
            var previousYear = startYear - 1;
            var years = [];
            var index = 0;
            for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
                years[rowIndex] = [];
                for (var colIndex = 0; colIndex < COL; colIndex++) {
                    var year = previousYear + index;
                    var content = String(year);
                    years[rowIndex][colIndex] = {
                        content: content,
                        year: year,
                        className: 'thisYearList'
                    };
                    index++;
                }
            }
            years[0][0].className = "previousYearList";
            years[ROW - 1][COL - 1].className = "nextYearList";
            return years;
        }
    }, {
        key: "getMoreYearList",
        value: function getMoreYearList(thisYear) {
            var ROW = 4;
            var COL = 3;
            var currentYear = thisYear;
            var startYear = parseInt(currentYear / 100, 10) * 100 - 10;
            var years = [];
            var index = 0;
            for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
                years[rowIndex] = [];
                for (var colIndex = 0; colIndex < COL; colIndex++) {
                    var start = startYear + index;
                    var end = startYear + index + 9;
                    if ((thisYear > start || thisYear === start) && (thisYear < end || thisYear === end)) {
                        years[rowIndex][colIndex] = {
                            start: start,
                            end: end,
                            className: 'thisYearList selectedTodayYear'
                        };
                    } else {
                        years[rowIndex][colIndex] = {
                            start: start,
                            end: end,
                            className: 'thisYearList'
                        };
                    }
                    index += 10;
                }
            }
            years[0][0].className = "previousYearList";
            years[ROW - 1][COL - 1].className = "nextYearList";
            return years;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            //确定当前月数据中每一天所属的月份，以此赋予不同className
            var month = this.props.viewData[this.props.month],
                rowsInMonth = [],
                i = 0,
                styleOfDays = function () {
                var i = month.indexOf(1),
                    j = month.indexOf(1, i + 1),
                    arr = [];
                for (var k = 0; k < 42; k++) {
                    if (k < i) {
                        arr.push("prevMonth");
                    }
                    if (k > i - 1 && k < j) {
                        arr.push("thisMonth");
                    }
                    if (k > j - 1 && k < 42) {
                        arr.push("nextMonth");
                    }
                }
                return arr;
            }();
            for (var index = 0; index < month.length; index++) {
                if (index % 7 === 0) {
                    rowsInMonth.push(month.slice(index, index + 7));
                }
            }
            var HTML = void 0;
            if (!this.props.showMonthList && !this.props.showYearList && !this.props.showMoreYearList) {
                HTML = _react2.default.createElement(
                    "table",
                    { className: "allDayWrapper" },
                    _react2.default.createElement(
                        "thead",
                        { className: "canClicked" },
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u4E00"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u4E8C"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u4E09"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u56DB"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u4E94"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u516D"
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                "\u65E5"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tbody",
                        { className: "canClicked" },
                        rowsInMonth.map(function (row, rowIndex) {
                            return _react2.default.createElement(
                                "tr",
                                { key: rowIndex },
                                row.map(function (day) {
                                    var newClassName = _this2.rewriteClassName(styleOfDays[i], day);
                                    return _react2.default.createElement(
                                        "td",
                                        { style: { padding: "5px" }, className: newClassName,
                                            onClick: _this2.handleDatePick.bind(_this2, i, styleOfDays[i]),
                                            key: i++ },
                                        day
                                    );
                                })
                            );
                        })
                    )
                );
            }
            if (this.props.showMonthList) {
                HTML = _react2.default.createElement(
                    "table",
                    { className: "allMonthWrapper" },
                    _react2.default.createElement(
                        "tbody",
                        { className: "canClicked" },
                        allMonth.map(function (row, rowIndex) {
                            return _react2.default.createElement(
                                "tr",
                                { key: rowIndex },
                                row.map(function (month) {
                                    var selectedTodayMonth = i === _this2.props.month ? "selectedTodayMonth canClicked" : "canClicked";
                                    return _react2.default.createElement(
                                        "td",
                                        { key: i++, className: "canClicked" },
                                        _react2.default.createElement(
                                            "a",
                                            { className: selectedTodayMonth, onClick: _this2.props.monthPick.bind(_this2, i) },
                                            month
                                        )
                                    );
                                })
                            );
                        })
                    )
                );
            }
            if (this.props.showYearList) {
                var yearList = this.getYearList(this.props.year);
                HTML = _react2.default.createElement(
                    "table",
                    { className: "allYearWrapper" },
                    _react2.default.createElement(
                        "tbody",
                        { className: "canClicked" },
                        yearList.map(function (row, rowIndex) {
                            return _react2.default.createElement(
                                "tr",
                                { key: rowIndex },
                                row.map(function (year) {
                                    var selectedTodayYear = year.year === _this2.props.year ? "selectedTodayYear canClicked " + year.className : "canClicked " + year.className;
                                    if (year.className === "previousYearList") {
                                        return _react2.default.createElement(
                                            "td",
                                            { key: i++, className: "canClicked" },
                                            _react2.default.createElement(
                                                "a",
                                                { className: selectedTodayYear, onClick: _this2.props.getPrevYearList },
                                                year.year
                                            )
                                        );
                                    }
                                    if (year.className === "thisYearList") {
                                        return _react2.default.createElement(
                                            "td",
                                            { key: i++, className: "canClicked" },
                                            _react2.default.createElement(
                                                "a",
                                                { className: selectedTodayYear, onClick: _this2.props.yearPick.bind(_this2, year.year) },
                                                year.year
                                            )
                                        );
                                    }
                                    if (year.className === "nextYearList") {
                                        return _react2.default.createElement(
                                            "td",
                                            { key: i++, className: "canClicked" },
                                            _react2.default.createElement(
                                                "a",
                                                { className: selectedTodayYear, onClick: _this2.props.getNextYearList },
                                                year.year
                                            )
                                        );
                                    }
                                })
                            );
                        })
                    )
                );
            }
            if (this.props.showMoreYearList) {
                var _yearList = this.getMoreYearList(this.props.year);
                HTML = _react2.default.createElement(
                    "table",
                    { className: "allMoreYearWrapper" },
                    _react2.default.createElement(
                        "tbody",
                        { className: "canClicked" },
                        _yearList.map(function (row, rowIndex) {
                            return _react2.default.createElement(
                                "tr",
                                { key: rowIndex },
                                row.map(function (year) {
                                    var selectedTodayYear = "canClicked " + year.className;
                                    if (year.className === "previousYearList") {
                                        return _react2.default.createElement(
                                            "td",
                                            { key: i++, className: "canClicked" },
                                            _react2.default.createElement(
                                                "a",
                                                { className: selectedTodayYear, onClick: _this2.props.getMorePrevYearList },
                                                year.start + "-" + year.end
                                            )
                                        );
                                    } else if (year.className === "nextYearList") {
                                        return _react2.default.createElement(
                                            "td",
                                            { key: i++, className: "canClicked" },
                                            _react2.default.createElement(
                                                "a",
                                                { className: selectedTodayYear, onClick: _this2.props.getMoreNextYearList },
                                                year.start + "-" + year.end
                                            )
                                        );
                                    } else {
                                        return _react2.default.createElement(
                                            "td",
                                            { key: i++, className: "canClicked" },
                                            _react2.default.createElement(
                                                "a",
                                                { className: selectedTodayYear, onClick: _this2.props.yearListPick.bind(_this2, year.start) },
                                                year.start + "-" + year.end
                                            )
                                        );
                                    }
                                })
                            );
                        })
                    )
                );
            }
            return _react2.default.createElement(
                "div",
                { className: "calendarMain canClicked" },
                HTML
            );
        }
    }]);

    return CalendarMain;
}(_react2.default.Component);

module.exports = CalendarMain;