import React, { useState } from "react";
import { ScrollView, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";

import { CodeBlock } from "@/components/CodeBlock";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Fonts } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { getDifficultyLabel, getDifficultyColor } from "@/data/lessons";

type RouteProps = RouteProp<RootStackParamList, "Exercise">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COMPLETED_EXERCISES_KEY = "@baython_completed_exercises";

export default function ExerciseScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { exercise } = route.params;

  const [code, setCode] = useState(exercise.code);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(exercise.completed);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: exercise.title,
    });
  }, [navigation, exercise.title]);

  const handleShowSolution = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowSolution(!showSolution);
  };

  const handleComplete = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsCompleted(true);
    setShowSuccess(true);

    try {
      const completed = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
      const completedIds = completed ? JSON.parse(completed) : [];
      if (!completedIds.includes(exercise.id)) {
        completedIds.push(exercise.id);
        await AsyncStorage.setItem(
          COMPLETED_EXERCISES_KEY,
          JSON.stringify(completedIds)
        );
      }
    } catch (error) {
      console.error("Error saving completed exercise:", error);
    }

    setTimeout(() => {
      setShowSuccess(false);
      navigation.goBack();
    }, 2000);
  };

  const difficultyColor = getDifficultyColor(exercise.difficulty);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: Spacing["4xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {showSuccess ? (
          <View style={styles.successOverlay}>
            <Image
              source={require("../../assets/images/success-celebration.png")}
              style={styles.successImage}
              contentFit="contain"
            />
            <ThemedText style={styles.successText}>ممتاز!</ThemedText>
            <ThemedText style={[styles.successSubtext, { color: theme.textSecondary }]}>
              أكملت التمرين بنجاح
            </ThemedText>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: difficultyColor + "20" },
                ]}
              >
                <ThemedText style={[styles.difficultyText, { color: difficultyColor }]}>
                  {getDifficultyLabel(exercise.difficulty)}
                </ThemedText>
              </View>
              <View style={styles.topicBadge}>
                <ThemedText style={[styles.topicText, { color: theme.textSecondary }]}>
                  {exercise.topic}
                </ThemedText>
                <Feather name="tag" size={14} color={theme.textSecondary} />
              </View>
            </View>

            <ThemedText style={styles.description}>{exercise.description}</ThemedText>

            <View style={styles.editorSection}>
              <ThemedText style={styles.sectionTitle}>الكود الخاص بك</ThemedText>
              <TextInput
                style={[
                  styles.codeEditor,
                  {
                    backgroundColor: theme.codeBackground,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                value={code}
                onChangeText={setCode}
                multiline
                textAlignVertical="top"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="اكتب الكود هنا..."
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.actionsRow}>
              <Pressable
                style={[
                  styles.solutionButton,
                  { borderColor: theme.border },
                ]}
                onPress={handleShowSolution}
              >
                <ThemedText style={[styles.solutionButtonText, { color: theme.primary }]}>
                  {showSolution ? "إخفاء الحل" : "عرض الحل"}
                </ThemedText>
                <Feather
                  name={showSolution ? "eye-off" : "eye"}
                  size={18}
                  color={theme.primary}
                />
              </Pressable>
            </View>

            {showSolution ? (
              <View style={styles.solutionSection}>
                <ThemedText style={styles.sectionTitle}>الحل</ThemedText>
                <CodeBlock code={exercise.solution} />
              </View>
            ) : null}

            {!isCompleted ? (
              <Button onPress={handleComplete} style={styles.completeButton}>
                تم حل التمرين
              </Button>
            ) : (
              <View
                style={[
                  styles.completedBadge,
                  { backgroundColor: theme.success + "20" },
                ]}
              >
                <Feather name="check-circle" size={20} color={theme.success} />
                <ThemedText style={[styles.completedText, { color: theme.success }]}>
                  تم حل التمرين
                </ThemedText>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  successOverlay: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
  },
  successImage: {
    width: 150,
    height: 150,
  },
  successText: {
    fontSize: 28,
    fontFamily: "Tajawal_700Bold",
    marginTop: Spacing.lg,
  },
  successSubtext: {
    fontSize: 16,
    fontFamily: "Tajawal_400Regular",
    marginTop: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: "Tajawal_500Medium",
  },
  topicBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  topicText: {
    fontSize: 13,
    fontFamily: "Tajawal_400Regular",
  },
  description: {
    fontSize: 18,
    fontFamily: "Tajawal_500Medium",
    textAlign: "right",
    marginBottom: Spacing.xl,
    lineHeight: 28,
  },
  editorSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Tajawal_700Bold",
    marginBottom: Spacing.md,
    textAlign: "right",
  },
  codeEditor: {
    minHeight: 150,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    fontFamily: Fonts.mono,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "left",
    writingDirection: "ltr",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: Spacing.xl,
  },
  solutionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  solutionButtonText: {
    fontSize: 14,
    fontFamily: "Tajawal_500Medium",
  },
  solutionSection: {
    marginBottom: Spacing.xl,
  },
  completeButton: {
    marginTop: Spacing.lg,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.lg,
  },
  completedText: {
    fontSize: 16,
    fontFamily: "Tajawal_500Medium",
  },
});
