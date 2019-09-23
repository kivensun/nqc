import fs from 'file-saver';
import XLSX from 'xlsx';

/**
 * import xlsx from '@/utils/xlsx';

 * cols:["船公司", "中文船名", "英文船名", "航次", "泊位号", "计划靠泊时间",
  "计划离泊时间", "实际靠泊时间", "实际离泊时间", "进箱时间", "截箱时间", "发布时间"]

 * fields:[{
  “中文船名“: "湘潭"
  ”发布时间“: "2019-09-04"
  “实际离泊时间": "2019-09-04 09:15:00"
  ”实际靠泊时间": "2019-09-04 04:00:00"
  “截箱时间": "2019-09-02 18:00:00"
  ”泊位号": "1"
  “航次": "1908N/1912S"
  ”船公司": "SWI"
  “英文船名": "SIANGTAN"
  ”计划离泊时间": "2019-09-04 09:15:00"
  “计划靠泊时间": "2019-09-04 03:15:00"
  ”进箱时间": "2019-08-30 10:00:00"
  }]

 * filename: 文件名

 * merges: 合并项，'LAST'指将最后一行合并。 

 * exmaple: 
  const header = this.columns.map(item => {
        let tmp = "";
        tmp = item.title;
        return tmp;
      });
      console.log(header);

      const exportData = this.tableData.map(item => {
        delete item.key;
        let tmpStr = JSON.stringify(item);
        this.columns.forEach(item => {
          tmpStr = tmpStr.replace(item.dataIndex, item.title);
        })
        return JSON.parse(tmpStr);
      });
      console.log(exportData);
      xlsx(header, exportData, this.title);

*/

export default (cols, fields, filename = '测试数据',merges) => {
  let sheetName = filename; //excel的文件名称
  let wb = XLSX.utils.book_new(); //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  let ws = XLSX.utils.json_to_sheet(fields, { header: Object.values(cols) }); //将JS对象数组转换为工作表。
  wb.SheetNames.push(sheetName);
  if (merges == 'LAST'){
    let lines = fields.length;
    let cols = Object.keys(fields[1]).length;
    ws["!merges"] = [{//合并第一行数据[B1,C1,D1,E1]
      s: {//s为开始
        c: 0,//开始列
        r: lines//开始取值范围
      },
      e: {//e结束
        c: cols+1,//结束列
        r: lines//结束范围
      }
    }];
  }
  wb.Sheets[sheetName] = ws;
  const defaultCellStyle = {
    font: { name: 'Verdana', sz: 13, color: 'FF00FF88' },
    fill: { fgColor: { rgb: 'FFFFAA00' } }
  }; //设置表格的样式
  let wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
    cellStyles: true,
    defaultCellStyle: defaultCellStyle,
    showGridLines: false
  }; //写入的样式
  let wbout = XLSX.write(wb, wopts);
  let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  fs.saveAs(blob, filename + '.xlsx');
};

const s2ab = s => {
  if (typeof ArrayBuffer !== 'undefined') {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    var buf2 = new Array(s.length);
    for (var j = 0; j != s.length; ++j) buf2[j] = s.charCodeAt(j) & 0xff;
    return buf2;
  }
};
