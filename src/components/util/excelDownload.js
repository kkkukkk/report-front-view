import * as Excel from "exceljs/dist/exceljs.min"
import {saveAs} from "file-saver";
import moment from "moment";

const excelUtil = {
    excelDownload : async (param) => {
        try {
            const wb = new Excel.Workbook();
            const headers = ["회사","구분","업무분류","담당자","시작","종료", "업무명","요구사항","업무내용"];
            let reportSheet, reportSheetHeaderRow, planSheet, planSheetHeaderRow;

            if (param.reportData) setSheets(wb, reportSheet, reportSheetHeaderRow, "업무실적", headers, param.reportData);
            if (param.planData) setSheets(wb, planSheet, planSheetHeaderRow, "업무계획", headers, param.planData);

            const fileData = await wb.xlsx.writeBuffer();
            const blob = new Blob([fileData], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            saveAs(blob, moment().format("YYYY년 MM월") + " 업무보고.xlsx");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const headerWidths = [18, 10, 10, 10, 10, 10, 50, 75, 75];

const styleHeaderCell = (cell) => {
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffebebeb" },
    };
    cell.border = {
        bottom: { style: "thin", color: { argb: "-100000f" } },
        left: {style: "thin", color: {argb: "-100000f"}},
        right: { style: "thin", color: { argb: "-100000f" } },
    };
    cell.font = {
        name: "Arial",
        size: 12,
        bold: true,
        color: { argb: "ff252525" },
    };
    cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
    };
};
const styleDataCell = (cell) => {
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffffffff" },
    };
    cell.border = {
        bottom: { style: "thin", color: { argb: "-100000f" } },
        left: {style: "thin", color: {argb: "-100000f"}},
        right: { style: "thin", color: { argb: "-100000f" } },
    };
    cell.font = {
        name: "Arial",
        size: 10,
        color: { argb: "ff252525" },
    };
    cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
    };
};

const styleFirstCell = (cell) => {
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb: "ffebebeb"},
    };
    cell.border = {
        bottom: { style: "thin", color: { argb: "-100000f" } },
        left: {style: "thin", color: {argb: "-100000f"}},
        right: {style: "thin", color: {argb: "-100000f"}},
    };
    cell.font = {
        name: "Arial",
        size: 14,
        bold: true,
        color: {argb: "ff252525"},
    };
    cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
    };
}

const styleSheet = (sheet) => {
    sheet.views = [{
        state: 'frozen',
        XSplit: 1,
        ySplit: 1,
        zoomScale: 80,
        zoomScaleNormal: 80,
    }];
    sheet.pageSetup = {
        orientation: "landscape",
        paperSize: 9,
        fitToPage: true,
        fitToHeight:5,
        fitToWidth: 7,
        margins: {
            left: 0.7,
            right: 0.7,
            top: 0.75,
            bottom: 0.75,
            header: 0.3,
            footer: 0.3
        }
    }
}

function setSheets(wb, sheet, sheetHeaderRow, sheetName, headers, data) {
    sheet = wb.addWorksheet(sheetName);
    styleSheet(sheet);
    sheet.mergeCells("A1:I1");
    sheet.getCell('A1').value = moment().format("YYYY년 MM월") + " - " + sheetName;
    styleFirstCell(sheet.getCell('A1'));
    sheetHeaderRow = sheet.addRow(headers);
    sheet.getRow(1).height = 50;
    sheet.getRow(2).height = 30;
    sheetHeaderRow.eachCell((cell, colNum) =>{
        styleHeaderCell(cell);
        sheet.getColumn(colNum).width = headerWidths[colNum - 1];
    });
    data.forEach(({upmu_name1, upmu_name2, upmu_name3, charge_man, str_date, end_date, work_title, work_req_desc, work_result}) => {
        const rowDatas =  [upmu_name1, upmu_name2, upmu_name3, charge_man, str_date, end_date, work_title, work_req_desc, work_result];
        const appendRow = sheet.addRow(rowDatas);
        appendRow.eachCell((cell, colNum) => {
            styleDataCell(cell, colNum);
            if (colNum === 1) {
                cell.font = {
                    color: { argb: "ff1890ff" }
                };
            }
            if (colNum === 7 || colNum === 8 || colNum === 9) {
                cell.alignment = {
                    vertical: "middle",
                    horizontal: "left",
                    wrapText: true,
                }
            }
        })
    })
}

export default excelUtil;

