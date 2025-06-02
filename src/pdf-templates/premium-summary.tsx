import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf-styles";
import PDFHeader from "./shared/pdf-header";
import PDFPageTitle from "./shared/pdf-page-title";
import PDFTable, { PDFTableColumn, PDFTableRow } from "./shared/pdf-table";

const firstTableData: PDFTableRow[] = [
  {
    coverageType: "Cyber",
    carrier: "Coalition",
    premium: "$2,317.00",
  },
  {
    coverageType: "",
    carrier: "Surplus Lines Tax (3%)",
    premium: "$69.51",
  },
  {
    coverageType: "",
    carrier: "Stamping Fee (0.18%)",
    premium: "$4.17",
  },
  {
    coverageType: "",
    carrier: "Technology Fee",
    premium: "$50.00",
  },
  {
    coverageType: "",
    carrier: "Envoy Insurance Fee",
    premium: "$250.00",
  },
  {
    coverageType: "",
    carrier: "Grand Total",
    premium: "$2,690.68",
  },
];

const firstTableColumns: PDFTableColumn[] = [
  {
    key: "coverageType",
    header: "Coverage Type",
    width: "flex-1",
  },
  {
    key: "carrier",
    header: "Carrier name",
    width: "flex-1",
  },
  {
    key: "premium",
    header: "Premium",
    width: "w-1/4",
  },
];

const secondTableData: PDFTableRow[] = [
  {
    paymentOptions: "Agency Bill",
  },
];

const secondTableColumns: PDFTableColumn[] = [
  {
    key: "paymentOptions",
    header: "Payment Options",
  },
];

const thirdTableData: PDFTableRow[] = [
  {
    quoteConditions:
      "A written/emailed bind order request or signed copy of attached Authorization to Bind Coverage form is required to bind coverage as well as a signed application and any required compliance documents. Please submit any changes to exposures or coverages and an updated proposal will be released to you for bind authorization.",
  },
];

const thirdTableColumns: PDFTableColumn[] = [
  {
    key: "quoteConditions",
    header: "Quote Conditions",
  },
];

const fourthTableData: PDFTableRow[] = [
  {
    warranties: "Pulled from Carrier Quote",
  },
];

const fourthTableColumns: PDFTableColumn[] = [
  {
    key: "warranties",
    header: "Warranties - Subjectivities",
  },
];

interface PremiumSummaryTemplateProps {
  title?: string;
  paginationTitle?: string;
  paginationNumber?: string;
  logo?: string;
  premiumData?: PDFTableRow[];
  paymentOptions?: PDFTableRow[];
  quoteConditions?: PDFTableRow[];
  warranties?: PDFTableRow[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tw?: any; // Custom tailwind instance
}

const PremiumSummaryTemplate = ({
  title = "Premium Summary",
  paginationTitle = "Introduction",
  paginationNumber = "03",
  logo = "http://localhost:3000/image.png",
  premiumData = firstTableData,
  paymentOptions = secondTableData,
  quoteConditions = thirdTableData,
  warranties = fourthTableData,
  tw: customTw,
}: PremiumSummaryTemplateProps = {}) => {
  // Use the custom tailwind instance if provided, otherwise use the default
  const styles = customTw || tw;

  return (
    <Document>
      <Page size="A4" style={styles("flex bg-grayscale-100 flex-col p-8")}>
        <PDFHeader
          logo={logo}
          withPagination={true}
          paginationTitle={paginationTitle}
          paginationNumber={paginationNumber}
        />
        <View style={styles("px-4")}>
          <PDFPageTitle title={title} />

          <View style={styles("mt-10 flex flex-col gap-4")}>
            <Text style={styles("text-accent font-semibold font-spectral")}>
              Premium Analysis
            </Text>
            <PDFTable columns={firstTableColumns} data={premiumData} />
            <PDFTable columns={secondTableColumns} data={paymentOptions} />
            <PDFTable columns={thirdTableColumns} data={quoteConditions} />
            <PDFTable columns={fourthTableColumns} data={warranties} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PremiumSummaryTemplate;
