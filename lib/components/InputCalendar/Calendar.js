'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/icon/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarHeader = require('./CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _CalendarMain = require('./CalendarMain');

var _CalendarMain2 = _interopRequireDefault(_CalendarMain);

require('../../../dist/Calendar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import CalendarFooter from './CalendarFooter'

var displayDaysPerMonth = function displayDaysPerMonth(year) {
    //定义每个月的天数，如果是闰年第二月改为29天
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        daysInMonth[1] = 29;
    }

    //以下为了获取一年中每一个月在日历选择器上显示的数据，
    //从上个月开始，接着是当月，最后是下个月开头的几天

    //定义一个数组，保存上一个月的天数
    var daysInPreviousMonth = [].concat(daysInMonth);
    daysInPreviousMonth.unshift(daysInPreviousMonth.pop());

    //获取每一个月显示数据中需要补足上个月的天数
    // let addDaysFromPreMonth = new Array(null,null,null,null,null,null,null,null,null,null,null,null);
    var addDaysFromPreMonth = []; //12个月
    for (var i = 0; i < 12; i++) {
        var day = new Date(year, i, 1).getDay(); //表示星期几
        if (day === 0) {
            addDaysFromPreMonth.push(6);
        } else {
            addDaysFromPreMonth.push(day - 1);
        }
    }
    //已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
    var returnData = [];
    for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
        var addDays = addDaysFromPreMonth[monthIndex],
            daysCount = daysInMonth[monthIndex],
            daysCountPrevious = daysInPreviousMonth[monthIndex],
            monthData = [];
        //补足上一个月
        for (; addDays > 0; addDays--) {
            monthData.unshift(daysCountPrevious--);
        }
        //添入当前月
        for (var _i = 0; _i < daysCount;) {
            monthData.push(++_i);
        }
        //补足下一个月
        for (var _i2 = 42 - monthData.length, j = 0; j < _i2;) {
            monthData.push(++j);
        }
        returnData.push(monthData);
    }
    return returnData;
};
var _isShowPan = false;
//value,placeholder,style,onChange

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));
        //继承React.Component


        var selectedDay = void 0,
            copySelectedDay = void 0,
            year = void 0,
            month = void 0,
            day = void 0;
        if (_this.props.value) {
            var value = _this.props.value.replace(/[^\d]/g, '');
            year = parseInt(value.substring(0, 4));
            month = parseInt(value.substring(4, 6)) - 1;
            day = parseInt(value.substring(6, 8));
            selectedDay = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
            copySelectedDay = selectedDay;
        } else {
            var now = new Date();
            var newMonth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
            var newDay = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            year = now.getFullYear();
            month = now.getMonth();
            day = now.getDate();
            selectedDay = now.getFullYear() + '-' + newMonth + '-' + newDay;
            copySelectedDay = '';
        }
        _this.state = {
            year: year,
            month: month,
            day: day,
            picked: false,
            isShowPan: false,
            showMonthList: false, //月份列表
            showYearList: false, //年份列表
            showMoreYearList: false, //百年年份列表
            selectedDay: selectedDay,
            copySelectedDay: copySelectedDay
        };
        return _this;
    }
    //定义每个月的天数


    _createClass(Calendar, [{
        key: 'dayInMonth',
        value: function dayInMonth(newYear) {
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (newYear % 4 === 0 && newYear % 100 !== 0 || newYear % 400 === 0) {
                daysInMonth[1] = 29;
            }
            return daysInMonth;
        }
        //切换到上一年

    }, {
        key: 'nextYear',
        value: function nextYear() {
            var year = this.state.year;
            var newYear = ++year;
            if (this.state.month === 1) {
                var currentMonthDay = this.dayInMonth(newYear)[1];
                var newDay = this.state.day > currentMonthDay ? currentMonthDay : this.state.day;
                var selectedDay = this.formatDay(newDay, this.state.month, newYear);
                this.setState({ year: newYear, day: newDay, selectedDay: selectedDay });
            } else {
                var _selectedDay = this.formatDay(this.state.day, this.state.month, newYear);
                this.setState({ year: newYear, selectedDay: _selectedDay });
            }
        }
        //切换到下一个月

    }, {
        key: 'nextMonth',
        value: function nextMonth(day) {
            if (typeof day === "number") {
                if (this.state.month === 11) {
                    var year = this.state.year;
                    var newYear = ++year;
                    var selectedDay = this.formatDay(day, 0, newYear);
                    this.setState({
                        year: newYear,
                        month: 0,
                        day: day,
                        selectedDay: selectedDay,
                        isShowPan: false
                    });
                } else {
                    var month = this.state.month;
                    var newMonth = ++month;
                    var _selectedDay2 = this.formatDay(day, newMonth, this.state.year);
                    this.setState({
                        month: newMonth,
                        day: day,
                        selectedDay: _selectedDay2,
                        isShowPan: false
                    });
                }
                _isShowPan = false;
            } else {
                if (this.state.month === 11) {
                    var _year = this.state.year;
                    var _newYear = ++_year;
                    var newDay = this.state.day > this.dayInMonth(_newYear)[0] ? this.dayInMonth(_newYear)[0] : this.state.day;
                    var _selectedDay3 = this.formatDay(newDay, 0, _newYear);
                    this.setState({
                        year: _newYear,
                        month: 0,
                        day: newDay,
                        selectedDay: _selectedDay3
                    });
                } else {
                    var _month = this.state.month;
                    var _newMonth = ++_month;
                    var currentMonthDay = this.dayInMonth(this.state.year)[_newMonth];
                    var _newDay = this.state.day > currentMonthDay ? currentMonthDay : this.state.day;
                    var _selectedDay4 = this.formatDay(_newDay, _newMonth, this.state.year);
                    this.setState({
                        month: _newMonth,
                        day: _newDay,
                        selectedDay: _selectedDay4
                    });
                }
            }
        }
        //切换到上一年

    }, {
        key: 'prevYear',
        value: function prevYear() {
            var year = this.state.year;
            var newYear = --year;
            if (this.state.month === 1) {
                var currentMonthDay = this.dayInMonth(newYear)[1];
                var newDay = this.state.day > currentMonthDay ? currentMonthDay : this.state.day;
                var selectedDay = this.formatDay(newDay, this.state.month, newYear);
                this.setState({ year: newYear, day: newDay, selectedDay: selectedDay });
            } else {
                var _selectedDay5 = this.formatDay(this.state.day, this.state.month, newYear);
                this.setState({ year: newYear, selectedDay: _selectedDay5 });
            }
        }
        //切换到上一个月

    }, {
        key: 'prevMonth',
        value: function prevMonth(day) {
            if (typeof day === "number") {
                if (this.state.month === 0) {
                    var year = this.state.year;
                    var newYear = --year;
                    var selectedDay = this.formatDay(day, 11, newYear);
                    this.setState({
                        year: newYear,
                        month: 11,
                        day: day,
                        selectedDay: selectedDay,
                        isShowPan: false
                    });
                } else {
                    var month = this.state.month;
                    var newMonth = --month;
                    var _selectedDay6 = this.formatDay(day, newMonth, this.state.year);
                    this.setState({
                        month: newMonth,
                        day: day,
                        selectedDay: _selectedDay6,
                        isShowPan: false
                    });
                }
                _isShowPan = false;
            } else {
                if (this.state.month === 0) {
                    var _year2 = this.state.year;
                    var _newYear2 = --_year2;
                    var newDay = this.state.day > this.dayInMonth(_newYear2)[11] ? this.dayInMonth(_newYear2)[11] : this.state.day;
                    var _selectedDay7 = this.formatDay(newDay, 11, _newYear2);
                    this.setState({
                        year: _newYear2,
                        month: 11,
                        day: newDay,
                        selectedDay: _selectedDay7
                    });
                } else {
                    var _month2 = this.state.month;
                    var _newMonth2 = --_month2;
                    var currentMonthDay = this.dayInMonth(this.state.year)[_newMonth2];
                    var _newDay2 = this.state.day > currentMonthDay ? currentMonthDay : this.state.day;
                    var _selectedDay8 = this.formatDay(_newDay2, _newMonth2, this.state.year);
                    this.setState({
                        month: _newMonth2,
                        day: _newDay2,
                        selectedDay: _selectedDay8
                    });
                }
            }
        }
        //选择日期

    }, {
        key: 'datePick',
        value: function datePick(day) {
            var selectedDay = this.formatDay(day, this.state.month, this.state.year);
            this.setState({ day: day, isShowPan: false, selectedDay: selectedDay });
            _isShowPan = false;
        }
        //选择月份

    }, {
        key: 'monthPick',
        value: function monthPick(month) {
            var selectedDay = this.formatDay(this.state.day, month - 1, this.state.year);
            this.setState({ month: month - 1, selectedDay: selectedDay, showMonthList: false });
        }
        //选择年份

    }, {
        key: 'yearPick',
        value: function yearPick(year) {
            var selectedDay = this.formatDay(this.state.day, this.state.month, year);
            this.setState({ year: year, selectedDay: selectedDay, showYearList: false });
        }
        //年份列表

    }, {
        key: 'yearListPick',
        value: function yearListPick(year) {
            this.setState({ year: year, showMoreYearList: false, showYearList: true });
        }
        //切换日期选择器是否显示

    }, {
        key: 'datePickerToggle',
        value: function datePickerToggle() {
            var copySelectedDay = this.state.copySelectedDay;
            if (!this.state.selectedDay) {
                this.setState({ selectedDay: copySelectedDay });
            }
            var isShowPan = this.state.isShowPan;
            this.setState({ isShowPan: !isShowPan });
            _isShowPan = !_isShowPan;
            if (_isShowPan) {
                copySelectedDay = copySelectedDay ? copySelectedDay : this.state.selectedDay;
                this.setState({
                    showMonthList: false,
                    showYearList: false,
                    showMoreYearList: false,
                    year: parseInt(copySelectedDay.substring(0, 4))
                });
            }
        }
        //标记日期已经选择

    }, {
        key: 'picked',
        value: function picked() {
            this.setState({ picked: true });
        }
    }, {
        key: 'inputChangeValue',
        value: function inputChangeValue(e) {
            var value = e.target.value.replace(/[^\d]/g, '');
            var newValue = value.substring(0, 9);
            if (value.length === 5) {
                if (newValue.substring(4, 5) != 0) {
                    newValue = newValue.substring(0, 4) + "-0" + newValue.substring(4, 5);
                } else {
                    newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 5);
                }
            }
            if (value.length === 6) {
                newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6);
            }
            if (value.length === 7) {
                if (newValue.substring(4, 5) === "0") {
                    var numberValue = parseInt(newValue.substring(5, 7));
                    if (numberValue < 13 && numberValue > 9) {
                        newValue = newValue.substring(0, 4) + "-" + newValue.substring(5, 7);
                    } else if (newValue.substring(6, 7) === "0") {
                        newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6);
                    } else {
                        newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6) + "-0" + newValue.substring(6, 7);
                    }
                } else {
                    if (newValue.substring(6, 7) === "0") {
                        newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6);
                    } else {
                        newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6) + "-0" + newValue.substring(6, 7);
                    }
                }
            }
            if (value.length === 8) {
                newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6) + "-" + newValue.substring(6, 8);
            }
            if (value.length === 9) {
                newValue = newValue.substring(0, 4) + "-" + newValue.substring(4, 6) + "-" + newValue.substring(7, 9);
            }
            if (newValue.replace(/[^\d]/g, '').length === 8) {
                var newYear = parseInt(newValue.replace(/[^\d]/g, '').substring(0, 4));
                var newMonth = parseInt(newValue.replace(/[^\d]/g, '').substring(4, 6));
                var newDay = parseInt(newValue.replace(/[^\d]/g, '').substring(6, 8));
                var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (newYear % 4 === 0 && newYear % 100 !== 0 || newYear % 400 === 0) {
                    daysInMonth[1] = 29;
                }
                if (newMonth < 13) {
                    if (newDay > daysInMonth[newMonth - 1]) {} else {
                        this.setState({
                            year: newYear,
                            month: newMonth - 1,
                            day: newDay,
                            selectedDay: newValue,
                            copySelectedDay: newValue
                        });
                        this.props.onChange ? this.props.onChange(newValue) : null;
                    }
                }
            } else {
                this.setState({ selectedDay: newValue });
            }
        }
    }, {
        key: 'changeShowPan',
        value: function changeShowPan() {
            var that = this;
            return function (e) {
                if (_isShowPan) {
                    var classnames = e.toElement ? e.toElement.getAttribute("class") : e.srcElement ? e.srcElement.className : e.target.className;
                    var targetNode = e.target ? e.target.tagName ? e.target.tagName : e.target.nodeName : e.srcElement.nodeName;
                    console.log(targetNode);
                    if (classnames && classnames.indexOf("canClicked") > -1) {
                        return false;
                    } else if (targetNode === "TD" || targetNode === "TR") {
                        return false;
                    } else {
                        that.setState({ isShowPan: false });
                        _isShowPan = false;
                    }
                }
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var changeShowPan = this.changeShowPan();
            document.getElementsByTagName('body')[0].addEventListener('click', changeShowPan, false);
        }
    }, {
        key: 'formatDay',
        value: function formatDay(day, month, year) {
            var newMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1;
            var newDay = day < 10 ? "0" + day : day;
            var selectedDay = year + '-' + newMonth + '-' + newDay;
            this.setState({ copySelectedDay: selectedDay });
            this.props.onChange ? this.props.onChange(selectedDay) : null;
            return selectedDay;
        }
    }, {
        key: 'selectedMonth',
        value: function selectedMonth() {
            this.setState({ showMonthList: true });
        }
    }, {
        key: 'selectedYear',
        value: function selectedYear() {
            this.setState({ showYearList: true });
        }
    }, {
        key: 'selectedMoreYear',
        value: function selectedMoreYear() {
            this.setState({ showMoreYearList: true });
        }
    }, {
        key: 'getPrevYearList',
        value: function getPrevYearList() {
            var year = this.state.year;
            this.setState({ year: year - 10 });
        }
    }, {
        key: 'getMorePrevYearList',
        value: function getMorePrevYearList() {
            var year = this.state.year;
            this.setState({ year: year - 100 });
        }
    }, {
        key: 'getNextYearList',
        value: function getNextYearList() {
            var year = this.state.year;
            this.setState({ year: year + 10 });
        }
    }, {
        key: 'getMoreNextYearList',
        value: function getMoreNextYearList() {
            var year = this.state.year;
            this.setState({ year: year + 100 });
        }
        //设置光标的位置

    }, {
        key: 'set_text_value_position',
        value: function set_text_value_position(obj, spos) {
            var tobj = obj;
            if (spos < 0) spos = tobj.value.length;
            if (tobj.setSelectionRange) {
                //兼容火狐,谷歌
                setTimeout(function () {
                    tobj.setSelectionRange(spos, spos);
                    tobj.focus();
                }, 0);
            } else if (tobj.createTextRange) {
                //兼容IE
                var rng = tobj.createTextRange();
                rng.move('character', spos);
                rng.select();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.refs.cInput) {
                var inputEl = this.refs.cInput;
                this.set_text_value_position(inputEl, -1);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = {
                viewData: displayDaysPerMonth(this.state.year),
                datePicked: this.state.selectedDay
            };
            var html = void 0;
            if (this.state.isShowPan) {
                html = _react2.default.createElement(
                    'div',
                    { className: 'main canClicked', style: { height: "330px" } },
                    _react2.default.createElement('input', { ref: 'cInput', className: 'calendarInput canClicked', placeholder: this.state.copySelectedDay, value: this.state.selectedDay, onChange: function onChange(e) {
                            return _this2.inputChangeValue(e);
                        } }),
                    _react2.default.createElement(_CalendarHeader2.default, {
                        prevMonth: this.prevMonth.bind(this),
                        prevYear: this.prevYear.bind(this),
                        nextMonth: this.nextMonth.bind(this),
                        nextYear: this.nextYear.bind(this),
                        selectedMonth: this.selectedMonth.bind(this),
                        selectedYear: this.selectedYear.bind(this),
                        selectedMoreYear: this.selectedMoreYear.bind(this),
                        getPrevYearList: this.getPrevYearList.bind(this),
                        getMorePrevYearList: this.getMorePrevYearList.bind(this),
                        getNextYearList: this.getNextYearList.bind(this),
                        getMoreNextYearList: this.getMoreNextYearList.bind(this),
                        year: this.state.year,
                        month: this.state.month,
                        day: this.state.day,
                        showMonthList: this.state.showMonthList,
                        showYearList: this.state.showYearList,
                        showMoreYearList: this.state.showMoreYearList
                    }),
                    _react2.default.createElement(_CalendarMain2.default, _extends({}, props, {
                        prevMonth: this.prevMonth.bind(this),
                        nextMonth: this.nextMonth.bind(this),
                        datePick: this.datePick.bind(this),
                        monthPick: this.monthPick.bind(this),
                        yearPick: this.yearPick.bind(this),
                        year: this.state.year,
                        month: this.state.month,
                        day: this.state.day,
                        showMonthList: this.state.showMonthList,
                        showYearList: this.state.showYearList,
                        showMoreYearList: this.state.showMoreYearList,
                        getPrevYearList: this.getPrevYearList.bind(this),
                        getMorePrevYearList: this.getMorePrevYearList.bind(this),
                        getNextYearList: this.getNextYearList.bind(this),
                        getMoreNextYearList: this.getMoreNextYearList.bind(this),
                        yearListPick: this.yearListPick.bind(this) }))
                );
            } else {
                html = _react2.default.createElement('div', null);
            }
            return _react2.default.createElement(
                'div',
                { className: 'calendarBox' },
                _react2.default.createElement(
                    'p',
                    { className: 'calendarBoxWrapper', style: this.props.style },
                    _react2.default.createElement('input', { ref: 'dCa', className: 'datePicked canClicked', placeholder: this.props.placeholder ? this.props.placeholder : '', onClick: this.datePickerToggle.bind(this), value: this.state.copySelectedDay }),
                    _react2.default.createElement(_icon2.default, { type: 'calendar', className: 'calendarIcon' })
                ),
                html
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);
// module.exports = Calendar;


exports.default = Calendar;