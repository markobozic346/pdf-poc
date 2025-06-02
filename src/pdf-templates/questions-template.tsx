import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf-styles";
import PDFHeader from "./shared/pdf-header";
import PDFPageTitle from "./shared/pdf-page-title";
import QuestionCard from "@/external-components/question-card";
import questionsData from "@/data/questions.json";

const adaptQuestionData = (question: any) => {
  return {
    id: question.id,
    text: question.text,
    type: question.type,
    value: question.value,
    schema: {
      type: question.schema.type || "string",
      title: question.schema.title || question.text,
      format: question.schema.format || undefined,
      max_date:
        typeof question.schema.max_date === "string"
          ? question.schema.max_date
          : undefined,
      min_date:
        typeof question.schema.min_date === "string"
          ? question.schema.min_date
          : undefined,
      enum: Array.isArray(question.schema.items?.enum)
        ? question.schema.items?.enum
        : Array.isArray(question.schema.enum)
        ? question.schema.enum
        : undefined,
      formattedEnum: Array.isArray(question.schema.formattedEnum)
        ? question.schema.formattedEnum
        : undefined,
      maximum:
        typeof question.schema.maximum === "number"
          ? question.schema.maximum
          : undefined,
      minimum:
        typeof question.schema.minimum === "number"
          ? question.schema.minimum
          : undefined,
    },
    source: question.source,
    section: question.section,
    children: question.children || [],
    required: question.required || false,
    inputType: question.inputType,
    isAnswered: question.isAnswered || false,
    orderingId: question.orderingId || "",
    requiredFor: question.requiredFor || [],
    formFacingId: question.formFacingId,
    multiInstance: question.multiInstance || false,
    canAddInstance: question.canAddInstance || false,
    includeInCount: question.includeInCount || false,
    externalSection: question.externalSection || "",
    isChildRiskValue: question.isChildRiskValue || false,
    affectsConditions: question.affectsConditions || false,
    canDeleteInstance: question.canDeleteInstance || false,
    isChildCoverageValue: question.isChildCoverageValue || false,
    relevantExternalProductIds: question.relevantExternalProductIds || [],
  };
};

interface QuestionsTemplateProps {
  title?: string;
  paginationTitle?: string;
  paginationNumber?: string;
  logo?: string;
  tw?: any;
}

const QuestionsTemplate = ({
  title = " ",
  paginationTitle = "Questions",
  paginationNumber = "01",
  logo = "http://localhost:3000/image.png",
  tw: customTw,
}: QuestionsTemplateProps = {}) => {
  const styles = customTw || tw;

  return (
    <Document>
      <Page size="A4" style={styles("flex bg-white flex-col p-8")}>
        <PDFHeader
          logo={logo}
          withPagination={true}
          paginationTitle={paginationTitle}
          paginationNumber={paginationNumber}
        />
        <View style={styles("px-4")}>
          <PDFPageTitle title={title} />

          <View style={styles("mt-10 flex flex-col gap-10")}>
            {questionsData.sections.map((section) => (
              <View key={section.id} style={styles("flex flex-col gap-6")}>
                <View style={styles("bg-primary py-1 px-4 rounded")}>
                  <Text
                    style={styles("text-white font-bold font-spectral text-lg")}
                  >
                    {section.title}
                  </Text>
                </View>

                <View style={styles("flex flex-col gap-[10px] pl-2")}>
                  {section.questions.map((question) => (
                    <View
                      key={question.id}
                      style={styles("flex flex-col gap-3")}
                    >
                      <QuestionCard
                        key={question.id}
                        question={adaptQuestionData(question)}
                        styles={styles}
                      />

                      {question.children && question.children.length > 0 && (
                        <View
                          style={styles("ml-6 pl-4 border-l-2 border-gray-300")}
                        >
                          <View
                            style={styles("flex flex-row items-center mb-2")}
                          >
                            <View
                              style={styles(
                                "w-2 h-2 rounded-full bg-gray-400 mr-1"
                              )}
                            />
                            <Text style={styles("text-xs text-gray-500")}>
                              Related questions:
                            </Text>
                          </View>
                          <View style={styles("flex flex-col gap-2")}>
                            {question.children.map((childQuestion) => (
                              <QuestionCard
                                key={childQuestion.id}
                                question={adaptQuestionData(childQuestion)}
                                styles={styles}
                              />
                            ))}
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default QuestionsTemplate;
