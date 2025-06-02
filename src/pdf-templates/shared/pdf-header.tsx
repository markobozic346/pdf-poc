import React from "react";
import { View, Text, Image } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf-styles";

type SimpleLogoProps = {
  logo: string;
  withPagination: false;
};

type HeaderWithPaginationProps = {
  logo: string;
  withPagination: true;
  paginationTitle: string;
  paginationNumber: string;
};

type Props = SimpleLogoProps | HeaderWithPaginationProps;

const PDFHeader: React.FC<Props> = (props) => {
  const styles = tw;

  if (props.withPagination) {
    return (
      <View style={styles("flex flex-row justify-between items-center mb-6")}>
        <Image
          source={{
            uri: props.logo,
            headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
            method: "GET",
            body: undefined,
          }}
          style={styles("w-[144px] h-auto")}
        />
        <View style={styles("flex flex-row gap-2")}>
          <View style={styles("flex flex-col items-end")}>
            <Text style={styles("text-base font-medium text-accent")}>
              {props.paginationNumber}
            </Text>
            <Text style={styles("text-[12px] text-accent")}>
              {props.paginationTitle}
            </Text>
          </View>
          <View style={styles("h-10 w-[0.5px] bg-accent")}></View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles("flex flex-row justify-between items-center mb-6")}>
      <Image
        source={{
          uri: props.logo,
          headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
          method: "GET",
          body: undefined,
        }}
        style={styles("w-[144px] h-auto")}
      />
    </View>
  );
};

export default PDFHeader;
