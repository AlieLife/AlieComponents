## AlieComponents
    基于react的前端框架，参考 antd

## install:
    npm install aliecomponents

## 版本:
    aliecomponents@1.0.10 

## components
    PC端组件：
        1、InputCalendar：带有输入框的日期选择组件
            * value：日期值 YYYY-MM-DD
            * style：样式
            * placeholder：提示
            * onChange：方法
    移动端组件：
        1、
    工具类 ToolCalss :
        1、lanPath: fetch分装 接口调用封装 参数：地址 接口路径 GET/POST请求方式 redux请求 redux接收 数据处理函数 POST请求类型 POST请求初始数据
        2、paramType：get接口数据处理方法，参数：data
        3、formData：post接口formdata格式数据处理方法，参数：data
        4、listSelectKey：获取list中key值，参数：list,name
        5、GetQueryString：截取url中参数值，参数：name
        6、changeAsterisk：手机机号 身份证加密，参数：str,beforeIndex,nextIndex
        7、judgeCharLen：断字符长度，参数：str
        8、getYesterdayDate：获取前一天日期 yyyy-MM-dd
        9、changeMoneyFormat：金额格式转换 100,000.00，参数：money
        10、showToday：获取当前日期 yyyy 年 MM 月 dd 日
        11、getNowFormatDate：获取当前日期 yyyy-MM-dd
        12、formatDate：日期格式化 yyyy-MM-dd，参数：date
        13、matchInput：输入框格式处理 type 1：正整数 2：2位小数 3：中文 数字 字母 #  4：中文 数字 字母  5：字母 6：中文 7：字母 数字 8：中文 字母
                       9：中文 数字，参数：str,type