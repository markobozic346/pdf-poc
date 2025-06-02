/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, Image } from "@react-pdf/renderer";

interface QuestionSchema {
  type: string;
  title: string;
  format?: string;
  max_date?: string;
  min_date?: string;
  enum?: (string | number)[];
  formattedEnum?: { label: string; value: string | number }[];
  maximum?: number;
  minimum?: number;
  items?: {
    enum?: (string | number)[];
    type?: string;
    title?: string;
  };
}

interface Question {
  id: string;
  text: string;
  type: string;
  value: string | number | null;
  schema: QuestionSchema;
  source: string;
  section: string;
  children: any[];
  required: boolean;
  inputType: string;
  isAnswered: boolean;
  orderingId: string;
  requiredFor: string[];
  formFacingId: string;
  multiInstance: boolean;
  canAddInstance: boolean;
  includeInCount: boolean;
  externalSection: string;
  isChildRiskValue: boolean;
  affectsConditions: boolean;
  canDeleteInstance: boolean;
  isChildCoverageValue: boolean;
  relevantExternalProductIds: string[];
}

interface QuestionCardProps {
  question: DomainQuestion;
  styles?: any;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, styles }) => {
  const renderQuestionInput = () => {
    switch (question.inputType) {
      case "date":
        return (
          <View style={styles("mt-1")}>
            <Text style={styles("text-xs text-gray-400 mb-1")}>Date</Text>
            {question.value ? (
              <View
                style={styles(
                  "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                )}
              >
                <Text style={styles("text-gray-700 text-[13px] font-medium")}>
                  {String(question.value)}
                </Text>
              </View>
            ) : (
              <View
                style={styles(
                  "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                )}
              ></View>
            )}
          </View>
        );

      case "select_one":
        return (
          <View style={styles("mt-1")}>
            {question.schema.formattedEnum ? (
              <View style={styles("p-2 rounded max-w-lg")}>
                <View style={styles("flex flex-row flex-wrap gap-4")}>
                  {question.schema.formattedEnum.map((option, index) => (
                    <View
                      key={index}
                      style={styles("flex flex-row items-center gap-2 w-1/3")}
                    >
                      <View
                        style={styles(
                          "w-4 h-4 rounded-full border flex items-center justify-center border-gray-400"
                        )}
                      >
                        {question.value === option.value && (
                          <View
                            style={styles("w-2 h-2 rounded-full bg-primary")}
                          />
                        )}
                      </View>
                      <Text style={styles("text-sm")}>{option.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : question.schema.enum ? (
              <View style={styles("p-2 rounded max-w-lg")}>
                <View style={styles("flex flex-row flex-wrap gap-4")}>
                  {question.schema.enum.map((option, index) => (
                    <View
                      key={index}
                      style={styles("flex flex-row items-center gap-2 w-1/3")}
                    >
                      <View
                        style={styles(
                          "w-4 h-4 rounded-full border flex items-center justify-center border-gray-400"
                        )}
                      >
                        {question.value === option && (
                          <View
                            style={styles("w-2 h-2 rounded-full bg-primary")}
                          />
                        )}
                      </View>
                      <Text style={styles("text-sm")}>{String(option)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View
                style={styles(
                  "p-2 border border-gray-300 rounded h-8 max-w-lg"
                )}
              >
                <Text style={styles("text-gray-600")}></Text>
              </View>
            )}
          </View>
        );

      case "select_many":
        const selectManyOptions =
          question.schema?.enum ||
          (question.schema?.items && question.schema.items.enum) ||
          [];

        return (
          <View style={styles("mt-1")}>
            <View style={styles("flex flex-col gap-2")}>
              {selectManyOptions.map((option, index) => {
                const isSelected =
                  Array.isArray(question.value) &&
                  question.value.some((val) => String(val) === String(option));

                return (
                  <View
                    key={index}
                    style={styles("flex flex-row gap-3 items-center")}
                  >
                    <View
                      style={styles(
                        "w-4 h-4 border flex items-center justify-center border-gray-400"
                      )}
                    >
                      {isSelected && (
                        <View style={styles("w-2 h-2 bg-primary")} />
                      )}
                    </View>
                    <Text
                      style={styles("text-sm", isSelected ? "font-medium" : "")}
                    >
                      {String(option)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        );

      case "short_text":
      case "email":
      case "phone":
      case "domain":
        return (
          <View style={styles("mt-1")}>
            {(question.inputType === "email" ||
              question.inputType === "phone" ||
              question.inputType === "domain") && (
              <Text style={styles("text-xs text-gray-400 mb-1")}>
                {question.inputType === "email"
                  ? "Email"
                  : question.inputType === "phone"
                  ? "Phone"
                  : "Domain"}
              </Text>
            )}
            {question.value ? (
              <View
                style={styles(
                  "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                )}
              >
                <Text style={styles("font-medium text-[13px]")}>
                  {String(question.value)}
                </Text>
              </View>
            ) : (
              <View
                style={styles(
                  "p-2 border border-gray-300 rounded h-8 max-w-lg"
                )}
              ></View>
            )}
          </View>
        );

      case "currency":
      case "integer":
        return (
          <View style={styles("mt-1")}>
            <Text style={styles("text-xs text-gray-400 mb-1")}>
              {question.inputType === "currency" ? "Amount" : "Number"}
            </Text>
            {question.value ? (
              <View
                style={styles(
                  "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg "
                )}
              >
                <Text style={styles("text-gray-700 text-[13px] font-medium")}>
                  {question.inputType === "currency"
                    ? `$${Number(question.value).toLocaleString()}`
                    : question.value}
                </Text>
              </View>
            ) : (
              <View
                style={styles(
                  "p-2 border border-gray-300 rounded h-8 max-w-lg"
                )}
              >
                <Text style={styles("text-gray-400")}>
                  {question.inputType === "currency"
                    ? "No amount provided"
                    : "No number provided"}
                </Text>
              </View>
            )}
          </View>
        );

      case "address":
        interface AddressValue {
          street?: string;
          city?: string;
          state?: string;
          postal_code?: string;
          line1: string;
        }

        const addressValue =
          question.value && typeof question.value === "object"
            ? (question.value as AddressValue)
            : null;

        return (
          <View style={styles("mt-1 flex flex-col gap-2")}>
            <View>
              <Text style={styles("text-xs text-gray-400 mb-1")}>
                Street Address
              </Text>
              <View
                style={styles(
                  "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                )}
              >
                <Text style={styles("text-gray-700 text-[13px] font-medium")}>
                  {addressValue?.line1}
                </Text>
              </View>
            </View>

            <View style={styles("flex flex-row gap-2 max-w-lg")}>
              <View style={styles("flex-1")}>
                <Text style={styles("text-xs text-gray-400 mb-1")}>City</Text>
                <View
                  style={styles(
                    "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                  )}
                >
                  <Text style={styles("text-gray-700 text-[13px]")}>
                    {addressValue?.city || ""}
                  </Text>
                </View>
              </View>

              <View style={styles("w-1/4")}>
                <Text style={styles("text-xs text-gray-400 mb-1")}>State</Text>
                <View
                  style={styles(
                    "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                  )}
                >
                  <Text style={styles("text-gray-700 text-[13px]")}>
                    {addressValue?.state || ""}
                  </Text>
                </View>
              </View>

              <View style={styles("w-1/4")}>
                <Text style={styles("text-xs text-gray-400 mb-1")}>ZIP</Text>
                <View
                  style={styles(
                    "px-2 flex justify-center border border-gray-300 rounded h-8 max-w-lg"
                  )}
                >
                  <Text style={styles("text-gray-700 text-[13px]")}>
                    {addressValue?.postal_code || ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return (
          <View style={styles("mt-1")}>
            <View
              style={styles("p-2 border border-gray-300 rounded h-8 max-w-lg")}
            >
              <Text style={styles("text-gray-600")}></Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View wrap={false} style={{ marginBottom: 24 }}>
      <View style={styles("flex flex-col items-start gap-2")}>
        <View
          style={styles(
            "flex flex-row items-center gap-2 border-t border-[#C2C7D1] bg-[#F6F7F8] min-h-8 w-full py-2 px-4"
          )}
        >
          <Text style={styles("text-primary font-medium text-sm")}>
            {question.orderingId}
          </Text>

          <Image
            source={{
              uri: "http://localhost:3000/arrow.png",
              headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
              method: "GET",
              body: undefined,
            }}
            style={styles("w-4 h-4 text-primary stroke-primary")}
          />

          <Text style={styles("text-primary font-medium text-sm max-w-lg")}>
            {question.text}.
            {question.required && <Text style={styles("text-accent")}> *</Text>}
          </Text>
        </View>

        <View style={styles("ml-10 w-full")}>{renderQuestionInput()}</View>
      </View>
    </View>
  );
};

export default QuestionCard;
