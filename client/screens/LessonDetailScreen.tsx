import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
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
import { Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { lessons } from "@/data/lessons";

type RouteProps = RouteProp<RootStackParamList, "LessonDetail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COMPLETED_LESSONS_KEY = "@baython_completed_lessons";

export default function LessonDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { lesson } = route.params;

  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: lesson.title,
    });
  }, [navigation, lesson.title]);

  const handleComplete = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsCompleted(true);
    setShowSuccess(true);

    try {
      const completed = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);
      const completedIds = completed ? JSON.parse(completed) : [];
      if (!completedIds.includes(lesson.id)) {
        completedIds.push(lesson.id);
        await AsyncStorage.setItem(
          COMPLETED_LESSONS_KEY,
          JSON.stringify(completedIds)
        );
      }
    } catch (error) {
      console.error("Error saving completed lesson:", error);
    }

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const navigateToLesson = (targetLesson: typeof lesson) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.replace("LessonDetail", { lesson: targetLesson });
  };

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
            <ThemedText style={styles.successText}>أحسنت!</ThemedText>
          </View>
        ) : null}

        <View style={styles.lessonInfo}>
          <View style={styles.lessonMeta}>
            <View style={styles.metaItem}>
              <Feather name="clock" size={16} color={theme.textSecondary} />
              <ThemedText
                style={[styles.metaText, { color: theme.textSecondary }]}
              >
                {lesson.duration}
              </ThemedText>
            </View>
            <View
              style={[
                styles.levelBadge,
                {
                  backgroundColor:
                    lesson.level === "beginner"
                      ? theme.primary + "20"
                      : lesson.level === "intermediate"
                      ? theme.accent + "20"
                      : theme.error + "20",
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.levelText,
                  {
                    color:
                      lesson.level === "beginner"
                        ? theme.primary
                        : lesson.level === "intermediate"
                        ? theme.accent
                        : theme.error,
                  },
                ]}
              >
                {lesson.level === "beginner"
                  ? "للمبتدئين"
                  : lesson.level === "intermediate"
                  ? "متوسط"
                  : "متقدم"}
              </ThemedText>
            </View>
          </View>
        </View>

        {lesson.content.map((item, index) => (
          <View key={index} style={styles.contentItem}>
            {item.type === "text" ? (
              <ThemedText style={styles.textContent}>{item.content}</ThemedText>
            ) : item.type === "code" ? (
              <CodeBlock code={item.content} />
            ) : item.type === "tip" ? (
              <View
                style={[
                  styles.tipContainer,
                  { backgroundColor: theme.accent + "15" },
                ]}
              >
                <View style={styles.tipHeader}>
                  <ThemedText style={[styles.tipTitle, { color: theme.accent }]}>
                    نصيحة
                  </ThemedText>
                  <Feather name="info" size={18} color={theme.accent} />
                </View>
                <ThemedText style={styles.tipContent}>{item.content}</ThemedText>
              </View>
            ) : null}
          </View>
        ))}

        {!isCompleted ? (
          <Button onPress={handleComplete} style={styles.completeButton}>
            إكمال الدرس
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
              تم إكمال الدرس
            </ThemedText>
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.navigationBar,
          {
            backgroundColor: theme.backgroundDefault,
            borderTopColor: theme.border,
            paddingBottom: insets.bottom + Spacing.md,
          },
        ]}
      >
        <Pressable
          style={[
            styles.navButton,
            !nextLesson && styles.navButtonDisabled,
          ]}
          onPress={() => nextLesson && navigateToLesson(nextLesson)}
          disabled={!nextLesson}
        >
          <Feather
            name="chevron-right"
            size={24}
            color={nextLesson ? theme.primary : theme.border}
          />
          <ThemedText
            style={[
              styles.navButtonText,
              { color: nextLesson ? theme.primary : theme.border },
            ]}
          >
            التالي
          </ThemedText>
        </Pressable>

        <ThemedText style={[styles.pageIndicator, { color: theme.textSecondary }]}>
          {currentIndex + 1} / {lessons.length}
        </ThemedText>

        <Pressable
          style={[
            styles.navButton,
            !prevLesson && styles.navButtonDisabled,
          ]}
          onPress={() => prevLesson && navigateToLesson(prevLesson)}
          disabled={!prevLesson}
        >
          <ThemedText
            style={[
              styles.navButtonText,
              { color: prevLesson ? theme.primary : theme.border },
            ]}
          >
            السابق
          </ThemedText>
          <Feather
            name="chevron-left"
            size={24}
            color={prevLesson ? theme.primary : theme.border}
          />
        </Pressable>
      </View>
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
    marginBottom: Spacing.xl,
  },
  successImage: {
    width: 120,
    height: 120,
  },
  successText: {
    fontSize: 24,
    fontFamily: "Tajawal_700Bold",
    marginTop: Spacing.md,
  },
  lessonInfo: {
    marginBottom: Spacing.xl,
  },
  lessonMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: 14,
    fontFamily: "Tajawal_400Regular",
  },
  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  levelText: {
    fontSize: 12,
    fontFamily: "Tajawal_500Medium",
  },
  contentItem: {
    marginBottom: Spacing.lg,
  },
  textContent: {
    fontSize: 16,
    fontFamily: "Tajawal_400Regular",
    lineHeight: 28,
    textAlign: "right",
  },
  tipContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: "Tajawal_700Bold",
  },
  tipContent: {
    fontSize: 14,
    fontFamily: "Tajawal_400Regular",
    lineHeight: 24,
    textAlign: "right",
  },
  completeButton: {
    marginTop: Spacing.xl,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xl,
  },
  completedText: {
    fontSize: 16,
    fontFamily: "Tajawal_500Medium",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: "Tajawal_500Medium",
  },
  pageIndicator: {
    fontSize: 14,
    fontFamily: "Tajawal_400Regular",
  },
});
