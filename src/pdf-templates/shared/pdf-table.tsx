/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf-styles";

// Types for the table data
export type PDFTableColumn = {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
};

export type PDFTableRow = {
  [key: string]: any;
};

type PDFTableProps = {
  columns: PDFTableColumn[];
  data: PDFTableRow[];
  headerStyle?: string;
  rowStyle?: string;
  cellStyle?: string;
};

const PDFTable: React.FC<PDFTableProps> = ({
  columns,
  data,
  headerStyle = "",
  rowStyle = "",
  cellStyle = "",
}) => {
  return (
    <View style={tw("w-full mb-4 overflow-hidden")}>
      <View
        style={tw(
          `flex flex-row bg-accent gap-4 text-white rounded-[6px] overflow-hidden font-medium py-2 px-3 ${headerStyle}`
        )}
      >
        {columns.map((column, index) => (
          <Text
            key={`header-${index}`}
            style={tw(
              `text-sm ${
                index !== columns.length - 1
                  ? "border-r border-white"
                  : "border-none"
              }
              ${column.width || "flex-1"} text-left
            `
            )}
          >
            {column.header}
          </Text>
        ))}
      </View>

      <View
        style={tw(
          "mt-1 p-2 bg-background px-6 rounded-md text-sm text-grayscale-body"
        )}
      >
        {data.map((row, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            style={tw(`py-3 flex gap-4 flex-row ${rowStyle}`)}
          >
            {columns.map((column, colIndex) => {
              const cellContent = row[column.key];

              return (
                <Text
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={tw(
                    `${
                      cellContent && colIndex !== columns.length - 1
                        ? "border-r border-grayscale-300"
                        : "border-none"
                    } ${column.width || "flex-1"} text-left ${cellStyle}`
                  )}
                >
                  {cellContent}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PDFTable;
