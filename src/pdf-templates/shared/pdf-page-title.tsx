import { tw } from "@/utils/pdf-styles";
import { View, Text } from "@react-pdf/renderer";
import React from "react";

type Props = {
  title: string;
};

const PDFPageTitle = ({ title }: Props) => {
  return (
    <View style={tw("mt-16")}>
      <Text style={tw("text-[28px] font-semibold font-spectral")}>{title}</Text>
    </View>
  );
};

export default PDFPageTitle;
