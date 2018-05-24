import React from 'react'
let now = new Date();
let isTodayYear=now.getFullYear();
let isTodayMonth=now.getMonth();
let isTodayDay= now.getDate();
let allMonth=[["一月","二月","三月"],["四月","五月","六月"],["七月","八月","九月"],["十月","十一月","十二月"]];
class CalendarMain extends React.Component {
    //处理日期选择事件，如果是当月，触发日期选择；如果不是当月，切换月份
    handleDatePick(index, styleName) {
        let month = this.props.viewData[this.props.month];
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
    componentDidMount() {

    }
    rewriteClassName(classname,day){
        if(classname==="thisMonth"){
            if(this.props.month===isTodayMonth && day===isTodayDay && day === this.props.day){
                return 'selectedDay today '+classname
            }else if(this.props.year===isTodayYear && this.props.month===isTodayMonth && day===isTodayDay && day != this.props.day){
                return 'today '+classname
            }else if(day === this.props.day){
                return 'selectedDay '+classname
            }else{
                return classname
            }
        }else{
            return classname
        }
    }
    getYearList(thisYear){
        let ROW = 4;
        let COL = 3;
        let currentYear = thisYear;
        let startYear = parseInt(currentYear / 10, 10) * 10;
        let endYear=startYear+9;
        let previousYear = startYear - 1;
        let years = [];
        let index = 0;
        for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
            years[rowIndex] = [];
            for (let colIndex = 0; colIndex < COL; colIndex++) {
                let year = previousYear + index;
                let content = String(year);
                years[rowIndex][colIndex] = {
                    content: content,
                    year: year,
                    className: 'thisYearList'
                };
                index++;
            }
        }
        years[0][0].className="previousYearList";
        years[ROW-1][COL-1].className="nextYearList";
        return years;
    }
    getMoreYearList(thisYear){
        let ROW = 4;
        let COL = 3;
        let currentYear = thisYear;
        let startYear = parseInt(currentYear / 100, 10) * 100-10;
        let years = [];
        let index = 0;
        for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
            years[rowIndex] = [];
            for (let colIndex = 0; colIndex < COL; colIndex++) {
                let start=startYear + index;
                let end=startYear + index+9;
                if((thisYear>start || thisYear===start) && (thisYear<end || thisYear===end)){
                    years[rowIndex][colIndex] = {
                        start: start,
                        end: end,
                        className: 'thisYearList selectedTodayYear'
                    };
                }else{
                    years[rowIndex][colIndex] = {
                        start: start,
                        end: end,
                        className: 'thisYearList'
                    };
                }
                index+=10;
            }
        }
        years[0][0].className="previousYearList";
        years[ROW-1][COL-1].className="nextYearList";
        return years;
    }
    render() {
        //确定当前月数据中每一天所属的月份，以此赋予不同className
        let month = this.props.viewData[this.props.month],
            rowsInMonth = [],
            i = 0,
            styleOfDays = (()=> {
                let i = month.indexOf(1),
                    j = month.indexOf(1, i + 1),
                    arr = [];
                for(let k=0;k<42;k++){
                    if(k<i){
                        arr.push("prevMonth")
                    }
                    if(k>(i-1) && k<j){
                        arr.push("thisMonth")
                    }
                    if(k>(j-1) && k<42){
                        arr.push("nextMonth")
                    }
                }
                return arr
            })();
        for(let index=0;index<month.length;index++){
            if (index % 7 === 0) {
                rowsInMonth.push(month.slice(index, index + 7))
            }
        }
        let HTML;
        if(!this.props.showMonthList && !this.props.showYearList && !this.props.showMoreYearList){
            HTML=(
                <table className="allDayWrapper">
                    <thead className="canClicked">
                    <tr>
                        <td>一</td>
                        <td>二</td>
                        <td>三</td>
                        <td>四</td>
                        <td>五</td>
                        <td>六</td>
                        <td>日</td>
                    </tr>
                    </thead>
                    <tbody className="canClicked">
                    {
                        rowsInMonth.map((row, rowIndex)=> {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        row.map((day)=> {
                                            let newClassName=this.rewriteClassName(styleOfDays[i],day);
                                            return (
                                                <td style={{padding:"5px"}} className={newClassName}
                                                    onClick={this.handleDatePick.bind(this, i, styleOfDays[i])}
                                                    key={i++}>
                                                    {day}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            )
        }
        if(this.props.showMonthList){
            HTML=(
                <table className="allMonthWrapper">
                    <tbody className="canClicked">
                    {
                        allMonth.map((row, rowIndex)=> {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        row.map((month)=> {
                                            let selectedTodayMonth=i===this.props.month?"selectedTodayMonth canClicked":"canClicked";
                                            return (
                                                <td key={i++} className="canClicked">
                                                    <a className={selectedTodayMonth} onClick={this.props.monthPick.bind(this,i)}>{month}</a>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            )
        }
        if(this.props.showYearList){
            let yearList=this.getYearList(this.props.year);
            HTML=(
                <table className="allYearWrapper">
                    <tbody className="canClicked">
                    {
                        yearList.map((row, rowIndex)=> {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        row.map((year)=> {
                                            let selectedTodayYear=year.year===this.props.year?"selectedTodayYear canClicked "+year.className:"canClicked "+year.className;
                                            if(year.className==="previousYearList"){
                                                return (
                                                    <td key={i++} className="canClicked">
                                                        <a className={selectedTodayYear} onClick={this.props.getPrevYearList}>{year.year}</a>
                                                    </td>
                                                )
                                            }
                                            if(year.className==="thisYearList"){
                                                return (
                                                    <td key={i++} className="canClicked">
                                                        <a className={selectedTodayYear} onClick={this.props.yearPick.bind(this,year.year)}>{year.year}</a>
                                                    </td>
                                                )
                                            }
                                            if(year.className==="nextYearList"){
                                                return (
                                                    <td key={i++} className="canClicked">
                                                        <a className={selectedTodayYear} onClick={this.props.getNextYearList}>{year.year}</a>
                                                    </td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            )
        }
        if(this.props.showMoreYearList){
            let yearList=this.getMoreYearList(this.props.year);
            HTML=(
                <table className="allMoreYearWrapper">
                    <tbody className="canClicked">
                    {
                        yearList.map((row, rowIndex)=> {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        row.map((year)=> {
                                            let selectedTodayYear="canClicked "+year.className;
                                            if(year.className==="previousYearList"){
                                                return (
                                                    <td key={i++} className="canClicked">
                                                        <a className={selectedTodayYear} onClick={this.props.getMorePrevYearList}>{year.start+"-"+year.end}</a>
                                                    </td>
                                                )
                                            }else if(year.className==="nextYearList"){
                                                return (
                                                    <td key={i++} className="canClicked">
                                                        <a className={selectedTodayYear} onClick={this.props.getMoreNextYearList}>{year.start+"-"+year.end}</a>
                                                    </td>
                                                )
                                            }else{
                                                return (
                                                    <td key={i++} className="canClicked">
                                                        <a className={selectedTodayYear} onClick={this.props.yearListPick.bind(this,year.start)}>{year.start+"-"+year.end}</a>
                                                    </td>
                                                )
                                            }

                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            )
        }
        return (
            <div className="calendarMain canClicked">
                {HTML}
            </div>
        )
    }
}
module.exports = CalendarMain;