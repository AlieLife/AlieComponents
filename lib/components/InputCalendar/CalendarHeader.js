'use strict';

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/icon/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarHeader = function (_React$Component) {
    _inherits(CalendarHeader, _React$Component);

    function CalendarHeader() {
        _classCallCheck(this, CalendarHeader);

        return _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).apply(this, arguments));
    }

    _createClass(CalendarHeader, [{
        key: 'render',
        value: function render() {
            var html = void 0;
            if (!this.props.showMonthList && !this.props.showYearList && !this.props.showMoreYearList) {
                html = _react2.default.createElement(
                    'p',
                    { className: 'calendarWrapper canClicked' },
                    _react2.default.createElement(
                        'a',
                        { className: 'prev canClicked', onClick: this.props.prevYear },
                        _react2.default.createElement(_icon2.default, { type: 'double-left canClicked' })
                    ),
                    ' ',
                    _react2.default.createElement(
                        'a',
                        { className: 'prev canClicked', onClick: this.props.prevMonth },
                        _react2.default.createElement(_icon2.default, { type: 'left canClicked' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'dateInfo canClicked', onClick: this.props.selectedMonth },
                        this.props.month + 1,
                        '\u6708'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'dateInfo canClicked', onClick: this.props.selectedYear },
                        this.props.year
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'next canClicked', onClick: this.props.nextYear },
                        _react2.default.createElement(_icon2.default, { type: 'double-right canClicked' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'next canClicked', onClick: this.props.nextMonth },
                        _react2.default.createElement(_icon2.default, { type: 'right canClicked' })
                    )
                );
            }
            if (this.props.showMonthList) {
                html = _react2.default.createElement(
                    'p',
                    { className: 'calendarWrapper canClicked' },
                    _react2.default.createElement(
                        'a',
                        { className: 'prev canClicked', onClick: this.props.prevYear },
                        _react2.default.createElement(_icon2.default, { type: 'double-left canClicked' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'dateInfo canClicked', onClick: this.props.selectedYear },
                        this.props.year
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'next canClicked', onClick: this.props.nextYear },
                        _react2.default.createElement(_icon2.default, { type: 'double-right canClicked' })
                    )
                );
            }
            if (this.props.showYearList) {
                var currentYear = this.props.year;
                var startYear = parseInt(currentYear / 10, 10) * 10;
                var endYear = startYear + 9;
                html = _react2.default.createElement(
                    'p',
                    { className: 'calendarWrapper canClicked' },
                    _react2.default.createElement(
                        'a',
                        { className: 'prev canClicked', onClick: this.props.getPrevYearList },
                        _react2.default.createElement(_icon2.default, { type: 'double-left canClicked' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'dateInfo canClicked', onClick: this.props.selectedMoreYear },
                        startYear + "-" + endYear
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'next canClicked', onClick: this.props.getNextYearList },
                        _react2.default.createElement(_icon2.default, { type: 'double-right canClicked' })
                    )
                );
            }
            if (this.props.showMoreYearList) {
                var _currentYear = this.props.year;
                var _startYear = parseInt(_currentYear / 100, 10) * 100;
                var _endYear = _startYear + 99;
                html = _react2.default.createElement(
                    'p',
                    { className: 'calendarWrapper canClicked' },
                    _react2.default.createElement(
                        'a',
                        { className: 'prev canClicked', onClick: this.props.getMorePrevYearList },
                        _react2.default.createElement(_icon2.default, { type: 'double-left canClicked' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'allYearInfo canClicked', onClick: null },
                        _startYear + "-" + _endYear
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'next canClicked', onClick: this.props.getMoreNextYearList },
                        _react2.default.createElement(_icon2.default, { type: 'double-right canClicked' })
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'calendarHeader canClicked' },
                html
            );
        }
    }]);

    return CalendarHeader;
}(_react2.default.Component);

module.exports = CalendarHeader;