import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Lesson, getLevelLabel } from "@/data/lessons";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  onPress: () => void;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function LessonCard({ lesson, index, onPress }: LessonCardProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const getLevelColor = () => {
    switch (lesson.level) {
      case "beginner":
        return theme.primary;
      case "intermediate":
        return theme.accent;
      case "advanced":
        return theme.error;
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
        animatedStyle,
      ]}
      testID={`lesson-card-${lesson.id}`}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.lessonNumber,
            { backgroundColor: theme.primary + "20" },
          ]}
        >
          <ThemedText
            style={[styles.lessonNumberText, { color: theme.primary }]}
          >
            {index + 1}
          </ThemedText>
        </View>
        {lesson.completed ? (
          <View
            style={[styles.completedBadge, { backgroundColor: theme.success }]}
          >
            <Feather name="check" size={14} color="#fff" />
          </View>
        ) : null}
      </View>

      <ThemedText style={styles.title}>{lesson.title}</ThemedText>
      <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
        {lesson.description}
      </ThemedText>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Feather name="clock" size={14} color={theme.textSecondary} />
          <ThemedText style={[styles.footerText, { color: theme.textSecondary }]}>
            {lesson.duration}
          </ThemedText>
        </View>
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: getLevelColor() + "20" },
          ]}
        >
          <ThemedText
            style={[styles.levelText, { color: getLevelColor() }]}
          >
            {getLevelLabel(lesson.level)}
          </ThemedText>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontSize: 16,
    fontFamily: "Tajawal_700Bold",
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Tajawal_700Bold",
    marginBottom: Spacing.xs,
    textAlign: "right",
  },
  description: {
    fontSize: 14,
    fontFamily: "Tajawal_400Regular",
    marginBottom: Spacing.md,
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  footerText: {
    fontSize: 13,
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
});
