import React from 'react'
import { Icon } from 'antd';
class CalendarHeader extends React.Component {
    render() {
        let html;
        if(!this.props.showMonthList && !this.props.showYearList && !this.props.showMoreYearList){
            html=(<p className="calendarWrapper canClicked"><a className="prev canClicked" onClick={this.props.prevYear}><Icon type="double-left canClicked" /></a> <a className="prev canClicked" onClick={this.props.prevMonth}><Icon type="left canClicked" /></a><a className="dateInfo canClicked" onClick={this.props.selectedMonth}>{this.props.month + 1}月</a><a className="dateInfo canClicked" onClick={this.props.selectedYear}>{this.props.year}</a><a className="next canClicked" onClick={this.props.nextYear}><Icon type="double-right canClicked" /></a><a className="next canClicked" onClick={this.props.nextMonth}><Icon type="right canClicked" /></a></p>)
        }
        if(this.props.showMonthList){
            html=(<p className="calendarWrapper canClicked"><a className="prev canClicked" onClick={this.props.prevYear}><Icon type="double-left canClicked" /></a><a className="dateInfo canClicked" onClick={this.props.selectedYear}>{this.props.year}</a><a className="next canClicked" onClick={this.props.nextYear}><Icon type="double-right canClicked" /></a></p>)
        }
        if(this.props.showYearList){
            let currentYear=this.props.year;
            let startYear = parseInt(currentYear / 10, 10) * 10;
            let endYear=startYear+9;
            html=(<p className="calendarWrapper canClicked"><a className="prev canClicked" onClick={this.props.getPrevYearList}><Icon type="double-left canClicked" /></a><a className="dateInfo canClicked" onClick={this.props.selectedMoreYear}>{startYear+"-"+endYear}</a><a className="next canClicked" onClick={this.props.getNextYearList}><Icon type="double-right canClicked" /></a></p>)
        }
        if(this.props.showMoreYearList){
            let currentYear=this.props.year;
            let startYear = parseInt(currentYear / 100, 10) * 100;
            let endYear=startYear+99;
            html=(<p className="calendarWrapper canClicked"><a className="prev canClicked" onClick={this.props.getMorePrevYearList}><Icon type="double-left canClicked" /></a><a className="allYearInfo canClicked" onClick={null}>{startYear+"-"+endYear}</a><a className="next canClicked" onClick={this.props.getMoreNextYearList}><Icon type="double-right canClicked" /></a></p>)
        }
        return (
            <div className="calendarHeader canClicked">
                {html}
            </div>
        )
    }
}
module.exports = CalendarHeader;