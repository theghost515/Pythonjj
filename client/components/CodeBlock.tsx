import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Fonts } from "@/constants/theme";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.codeBackground }]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ThemedText style={[styles.code, { color: theme.text }]}>
          {code}
        </ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginVertical: Spacing.sm,
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "left",
    writingDirection: "ltr",
  },
});
