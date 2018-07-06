import React from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarMain from './CalendarMain'
import { Icon } from 'antd';
import  '../../../dist/Calendar.css';
import $ from "jquery"
// import CalendarFooter from './CalendarFooter'

const displayDaysPerMonth = (year)=> {
    //定义每个月的天数，如果是闰年第二月改为29天
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29
    }

    //以下为了获取一年中每一个月在日历选择器上显示的数据，
    //从上个月开始，接着是当月，最后是下个月开头的几天

    //定义一个数组，保存上一个月的天数
    let daysInPreviousMonth = [].concat(daysInMonth);
    daysInPreviousMonth.unshift(daysInPreviousMonth.pop());

    //获取每一个月显示数据中需要补足上个月的天数
    // let addDaysFromPreMonth = new Array(null,null,null,null,null,null,null,null,null,null,null,null);
    let addDaysFromPreMonth = []; //12个月
    for(let i=0;i<12;i++){
        let day = new Date(year, i, 1).getDay();//表示星期几
        if (day === 0) {
            addDaysFromPreMonth.push(6)
        } else {
            addDaysFromPreMonth.push(day - 1)
        }
    }
    //已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
    let returnData=[];
    for(let monthIndex=0;monthIndex<12;monthIndex++){
        let addDays = addDaysFromPreMonth[monthIndex],
            daysCount = daysInMonth[monthIndex],
            daysCountPrevious = daysInPreviousMonth[monthIndex],
            monthData = [];
        //补足上一个月
        for (; addDays > 0; addDays--) {
            monthData.unshift(daysCountPrevious--)
        }
        //添入当前月
        for (let i = 0; i < daysCount;) {
            monthData.push(++i)
        }
        //补足下一个月
        for (let i = 42 - monthData.length, j = 0; j < i;) {
            monthData.push(++j)
        }
        returnData.push(monthData)
    }
    return returnData
};
let _isShowPan=false;
let _iconState = true;
export default class Calendar extends React.Component {
    constructor(props) {
        //继承React.Component
        super(props);
        let selectedDay,copySelectedDay,year,month,day;
        if(this.props.value){
            let value=this.props.value.replace(/[^\d]/g,'');
            year=parseInt(value.substring(0, 4));
            month=parseInt(value.substring(4, 6))-1;
            day=parseInt(value.substring(6, 8));
            selectedDay = `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
            copySelectedDay=selectedDay;
        }else{
            let now = new Date();
            let newMonth=(now.getMonth() + 1)<10?"0"+(now.getMonth() + 1):(now.getMonth() + 1);
            let newDay=now.getDate()<10?"0"+now.getDate():now.getDate();
            year=now.getFullYear();
            month=now.getMonth();
            day=now.getDate();
            selectedDay = `${now.getFullYear()}-${newMonth}-${newDay}`;
            copySelectedDay='';
        }
        this.state = {
            year: year,
            month: month,
            day: day,
            picked: false,
            isShowPan:false,
            showMonthList:false, //月份列表
            showYearList:false, //年份列表
            showMoreYearList:false, //百年年份列表
            selectedDay:selectedDay,
            copySelectedDay:copySelectedDay
        }
    }
    //定义每个月的天数
    dayInMonth(newYear){
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((newYear % 4 === 0 && newYear % 100 !== 0) || newYear % 400 === 0) {
            daysInMonth[1] = 29
        }
        return daysInMonth;
    }
    //切换到上一年
    nextYear(){
        let year=this.state.year;
        let newYear=++year;
        if(this.state.month===1){
            let currentMonthDay=this.dayInMonth(newYear)[1];
            let newDay=this.state.day>currentMonthDay?currentMonthDay:this.state.day;
            let selectedDay = this.formatDay(newDay,this.state.month,newYear);
            this.setState({year: newYear,day:newDay,selectedDay:selectedDay})
        }else{
            let selectedDay = this.formatDay(this.state.day,this.state.month,newYear);
            this.setState({year: newYear,selectedDay:selectedDay})
        }

    }
    //切换到下一个月
    nextMonth(day) {
        if(typeof day === "number"){
            if (this.state.month === 11) {
                let year=this.state.year;
                let newYear=++year;
                let selectedDay = this.formatDay(day,0,newYear);
                this.setState({
                    year: newYear,
                    month: 0,
                    day:day,
                    selectedDay:selectedDay,
                    isShowPan:false,
                })
            } else {
                let month=this.state.month;
                let newMonth=++month;
                let selectedDay = this.formatDay(day,newMonth,this.state.year);
                this.setState({
                    month: newMonth,
                    day:day,
                    selectedDay:selectedDay,
                    isShowPan:false,
                })
            }
            _isShowPan=false;
        }else{
            if (this.state.month === 11) {
                let year=this.state.year;
                let newYear=++year;
                let newDay=this.state.day>this.dayInMonth(newYear)[0]?this.dayInMonth(newYear)[0]:this.state.day;
                let selectedDay = this.formatDay(newDay,0,newYear);
                this.setState({
                    year: newYear,
                    month: 0,
                    day:newDay,
                    selectedDay:selectedDay
                })
            } else {
                let month=this.state.month;
                let newMonth=++month;
                let currentMonthDay=this.dayInMonth(this.state.year)[newMonth];
                let newDay=this.state.day>currentMonthDay?currentMonthDay:this.state.day;
                let selectedDay = this.formatDay(newDay,newMonth,this.state.year);
                this.setState({
                    month: newMonth,
                    day:newDay,
                    selectedDay:selectedDay
                })
            }
        }

    }
    //切换到上一年
    prevYear(){
        let year=this.state.year;
        let newYear=--year;
        if(this.state.month===1){
            let currentMonthDay=this.dayInMonth(newYear)[1];
            let newDay=this.state.day>currentMonthDay?currentMonthDay:this.state.day;
            let selectedDay = this.formatDay(newDay,this.state.month,newYear);
            this.setState({year: newYear,day:newDay,selectedDay:selectedDay})
        }else{
            let selectedDay = this.formatDay(this.state.day,this.state.month,newYear);
            this.setState({year: newYear,selectedDay:selectedDay})
        }
    }
    //切换到上一个月
    prevMonth(day) {
        if(typeof day === "number"){
            if (this.state.month === 0) {
                let year=this.state.year;
                let newYear=--year;
                let selectedDay = this.formatDay(day,11,newYear);
                this.setState({
                    year: newYear,
                    month: 11,
                    day:day,
                    selectedDay:selectedDay,
                    isShowPan:false,
                })
            } else {
                let month=this.state.month;
                let newMonth=--month;
                let selectedDay = this.formatDay(day,newMonth,this.state.year);
                this.setState({
                    month: newMonth,
                    day:day,
                    selectedDay:selectedDay,
                    isShowPan:false,
                })
            }
            _isShowPan=false;
        } else {
            if (this.state.month === 0) {
                let year=this.state.year;
                let newYear=--year;
                let newDay=this.state.day>this.dayInMonth(newYear)[11]?this.dayInMonth(newYear)[11]:this.state.day;
                let selectedDay = this.formatDay(newDay,11,newYear);
                this.setState({
                    year: newYear,
                    month: 11,
                    day:newDay,
                    selectedDay:selectedDay
                })
            } else {
                let month=this.state.month;
                let newMonth=--month;
                let currentMonthDay=this.dayInMonth(this.state.year)[newMonth];
                let newDay=this.state.day>currentMonthDay?currentMonthDay:this.state.day;
                let selectedDay = this.formatDay(newDay,newMonth,this.state.year);
                this.setState({
                    month: newMonth,
                    day:newDay,
                    selectedDay:selectedDay
                })
            }
        }
    }
    //选择日期
    datePick(day) {
        let selectedDay = this.formatDay(day,this.state.month,this.state.year);
        this.setState({day:day,isShowPan:false,selectedDay:selectedDay});
        _isShowPan=false;
    }
    //选择月份
    monthPick(month){
        let selectedDay = this.formatDay(this.state.day,month-1,this.state.year);
        this.setState({month:month-1,selectedDay:selectedDay,showMonthList:false})
    }
    //选择年份
    yearPick(year){
        let selectedDay = this.formatDay(this.state.day,this.state.month,year);
        this.setState({year:year,selectedDay:selectedDay,showYearList:false})
    }
    //年份列表
    yearListPick(year){
        this.setState({year:year,showMoreYearList:false,showYearList:true})
    }
    //切换日期选择器是否显示
    datePickerToggle() {
        let copySelectedDay=this.state.copySelectedDay;
        if(this.state.copySelectedDay==""){
            if(this.state.selectedDay!=""){
                _iconState = false;
            }else {
                _iconState = true;
            }
            this.setState({copySelectedDay:this.state.selectedDay})
        }
        if(!this.state.selectedDay){
            this.setState({selectedDay:copySelectedDay})
        }
        let isShowPan=this.state.isShowPan;
        this.setState({isShowPan:!isShowPan});
        _isShowPan=!_isShowPan;
        if(_isShowPan){
            copySelectedDay=copySelectedDay?copySelectedDay:this.state.selectedDay;
            this.setState({
                showMonthList:false,
                showYearList:false,
                showMoreYearList:false,
                year:parseInt(copySelectedDay.substring(0, 4))
            });
        }
    }
    clearValue(){
        if(!_iconState){
            _iconState = true;
            this.setState({copySelectedDay:""});
            this.props.onChange?this.props.onChange(""):null
        }
    }
    //标记日期已经选择
    // picked() {
    //     this.setState({picked:true})
    // }
    inputChangeValue(e){
        let value=e.target.value.replace(/[^\d]/g,'') ;
        let newValue=value.substring(0, 8);
        if(value.length===5){
            newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,5)
        }
        if(value.length===6){
            if(newValue.substring(4,5) === "0" && newValue.substring(5,6) === "0"){
                newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,5)
            }else{
                if(newValue.substring(4,6)>12){
                    console.log("大于",newValue.substring(4,6));
                    newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,5)
                }else{
                    newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,6)
                }
            }
        }
        if(value.length===7){
            newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,6)+ "-"+newValue.substring(6,7)
        }
        if(value.length===8){
            if(newValue.substring(6,7) ==="0" && newValue.substring(7,8) ==="0"){
                newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,6)+ "-"+newValue.substring(6,7)
            }else{
                newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,6)+ "-"+newValue.substring(6,8)
            }

        }
        if(value.length===9){
            newValue=newValue.substring(0, 4) + "-" +newValue.substring(4,6)+ "-"+newValue.substring(6,8)
        }
        if(newValue.replace(/[^\d]/g,'').length===8){
            let newYear=parseInt(newValue.replace(/[^\d]/g,'').substring(0, 4));
            let newMonth=parseInt(newValue.replace(/[^\d]/g,'').substring(4, 6));
            let newDay=parseInt(newValue.replace(/[^\d]/g,'').substring(6, 8));
            let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((newYear % 4 === 0 && newYear % 100 !== 0) || newYear % 400 === 0) {
                daysInMonth[1] = 29
            }
            if(newMonth<13){
                if(newDay>daysInMonth[newMonth-1]){

                }else{
                    this.setState({
                        year: newYear,
                        month: newMonth-1,
                        day:newDay,
                        selectedDay:newValue,
                        copySelectedDay:newValue
                    });
                    if(newValue!=""){
                        _iconState = false;
                    }else {
                        _iconState = true;
                    }
                    this.props.onChange?this.props.onChange(newValue):null
                }
            }
        }else{
            this.setState({selectedDay:newValue})
        }
    }
    changeShowPan(){
        let that=this;
        return function (e) {
            if(_isShowPan){
                let classnames=e.toElement?e.toElement.getAttribute("class"):(e.srcElement?e.srcElement.className:e.target.className);
                let targetNode=e.target?(e.target.tagName?e.target.tagName:e.target.nodeName):e.srcElement.nodeName;
                if(classnames && classnames.indexOf("canClicked")>-1){
                    return false
                }else if(targetNode==="TD" || targetNode === "TR"){
                    return false
                }else{
                    that.setState({isShowPan:false});
                    _isShowPan=false;
                    let newValue=that.state.selectedDay;
                    if(newValue.replace(/[^\d]/g,'').length===8){
                        let newYear=parseInt(newValue.replace(/[^\d]/g,'').substring(0, 4));
                        let newMonth=parseInt(newValue.replace(/[^\d]/g,'').substring(4, 6));
                        let newDay=parseInt(newValue.replace(/[^\d]/g,'').substring(6, 8));
                        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                        if ((newYear % 4 === 0 && newYear % 100 !== 0) || newYear % 400 === 0) {
                            daysInMonth[1] = 29
                        }
                        if(newMonth<13){
                            if(newDay>daysInMonth[newMonth-1]){

                            }else{
                                that.setState({
                                    year: newYear,
                                    month: newMonth-1,
                                    day:newDay,
                                    selectedDay:newValue,
                                    copySelectedDay:newValue
                                });
                                if(newValue!=""){
                                    _iconState = false;
                                }else {
                                    _iconState = true;
                                }
                                that.props.onChange?that.props.onChange(newValue):null
                            }
                        }
                    }
                }
            }
        }
    }
    componentDidMount() {
        let changeShowPan=this.changeShowPan();
        document.getElementsByTagName('body')[0].addEventListener('click',changeShowPan, false);
        $(".calendarBoxWrapper").hover(function (event) {
            if(!_iconState){
                $(".calendarIcon").removeClass("anticon-calendar").addClass("anticon-cross-circle");
                $(".calendarIcon").css("cursor","pointer");
            }
        },function (event) {
            $(".calendarIcon").addClass("anticon-calendar").removeClass("anticon-cross-circle");
            $(".calendarIcon").css("cursor","initial");
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value==""){
            this.setState({copySelectedDay:nextProps.value});
            if(nextProps.value!=""){
                _iconState = false;
            }else {
                _iconState = true;
            }
        }
    }
    formatDay(day,month,year){
        let newMonth=(month + 1)<10?"0"+(month + 1):(month + 1);
        let newDay=day<10?"0"+day:day;
        let selectedDay = `${year}-${newMonth}-${newDay}`;
        this.setState({copySelectedDay:selectedDay});
        if(selectedDay!=""){
            _iconState = false;
        }else {
            _iconState = true;
        }
        this.props.onChange?this.props.onChange(selectedDay):null;
        return selectedDay
    }
    selectedMonth(){
        this.setState({showMonthList:true})
    }
    selectedYear(){
        this.setState({showYearList:true})
    }
    selectedMoreYear(){
        this.setState({showMoreYearList:true})
    }
    getPrevYearList(){
        let year=this.state.year;
        this.setState({year:year-10})
    }
    getMorePrevYearList(){
        let year=this.state.year;
        this.setState({year:year-100})
    }
    getNextYearList(){
        let year=this.state.year;
        this.setState({year:year+10})
    }
    getMoreNextYearList(){
        let year=this.state.year;
        this.setState({year:year+100})
    }
    //设置光标的位置
    set_text_value_position(obj, spos){
        let tobj = obj;
        if(spos<0)
            spos = tobj.value.length;
        if(tobj.setSelectionRange){ //兼容火狐,谷歌
            setTimeout(function(){
                    tobj.setSelectionRange(spos, spos);
                    tobj.focus();}
                ,0);
        }else if(tobj.createTextRange){ //兼容IE
            let rng = tobj.createTextRange();
            rng.move('character', spos);
            rng.select();
        }
    }
    componentDidUpdate(){
        if(this.refs.cInput){
            let inputEl=this.refs.cInput;
            this.set_text_value_position(inputEl, -1)
        }

    }
    render() {
        let props = {
            viewData: displayDaysPerMonth(this.state.year),
            datePicked: this.state.selectedDay
        };
        let html;
        if(this.state.isShowPan){
            html= (
                <div className="main canClicked" style={{height:"330px"}}>
                    <input ref="cInput" className="calendarInput canClicked" placeholder={this.state.placeholder} value={this.state.selectedDay} onChange={(e)=>this.inputChangeValue(e)}/>
                    <CalendarHeader
                        prevMonth={this.prevMonth.bind(this)}
                        prevYear={this.prevYear.bind(this)}
                        nextMonth={this.nextMonth.bind(this)}
                        nextYear={this.nextYear.bind(this)}
                        selectedMonth={this.selectedMonth.bind(this)}
                        selectedYear={this.selectedYear.bind(this)}
                        selectedMoreYear={this.selectedMoreYear.bind(this)}
                        getPrevYearList={this.getPrevYearList.bind(this)}
                        getMorePrevYearList={this.getMorePrevYearList.bind(this)}
                        getNextYearList={this.getNextYearList.bind(this)}
                        getMoreNextYearList={this.getMoreNextYearList.bind(this)}
                        year={this.state.year}
                        month={this.state.month}
                        day={this.state.day}
                        showMonthList={this.state.showMonthList}
                        showYearList={this.state.showYearList}
                        showMoreYearList={this.state.showMoreYearList}
                    />
                    <CalendarMain {...props}
                                  prevMonth={this.prevMonth.bind(this)}
                                  nextMonth={this.nextMonth.bind(this)}
                                  datePick={this.datePick.bind(this)}
                                  monthPick={this.monthPick.bind(this)}
                                  yearPick={this.yearPick.bind(this)}
                                  year={this.state.year}
                                  month={this.state.month}
                                  day={this.state.day}
                                  showMonthList={this.state.showMonthList}
                                  showYearList={this.state.showYearList}
                                  showMoreYearList={this.state.showMoreYearList}
                                  getPrevYearList={this.getPrevYearList.bind(this)}
                                  getMorePrevYearList={this.getMorePrevYearList.bind(this)}
                                  getNextYearList={this.getNextYearList.bind(this)}
                                  getMoreNextYearList={this.getMoreNextYearList.bind(this)}
                                  yearListPick={this.yearListPick.bind(this)}/>
                </div>
            );

        }else{
            html=<div></div>
        }
        return (
            <div className="calendarBox">
                <p className="calendarBoxWrapper" style={this.props.style}>
                    <input ref='dCa' className="datePicked canClicked" placeholder={this.props.placeholder?this.props.placeholder:''} onClick={this.datePickerToggle.bind(this)} value={this.state.copySelectedDay} />
                    <span onClick={this.clearValue.bind(this)}>
                        <Icon type="calendar" className="calendarIcon"/>
                    </span>
                </p>
                {html}
            </div>
        );
    }
}
// module.exports = Calendar;