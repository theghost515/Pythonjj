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
import { Exercise, getDifficultyLabel, getDifficultyColor } from "@/data/lessons";

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ExerciseCard({ exercise, onPress }: ExerciseCardProps) {
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

  const difficultyColor = getDifficultyColor(exercise.difficulty);

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
      testID={`exercise-card-${exercise.id}`}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColor + "20" },
          ]}
        >
          <ThemedText
            style={[styles.difficultyText, { color: difficultyColor }]}
          >
            {getDifficultyLabel(exercise.difficulty)}
          </ThemedText>
        </View>
        {exercise.completed ? (
          <View
            style={[styles.completedBadge, { backgroundColor: theme.success }]}
          >
            <Feather name="check" size={14} color="#fff" />
          </View>
        ) : null}
      </View>

      <ThemedText style={styles.title}>{exercise.title}</ThemedText>
      <ThemedText style={[styles.description, { color: theme.textSecondary }]}>
        {exercise.description}
      </ThemedText>

      <View style={styles.footer}>
        <View style={styles.topicBadge}>
          <Feather name="tag" size={12} color={theme.textSecondary} />
          <ThemedText style={[styles.topicText, { color: theme.textSecondary }]}>
            {exercise.topic}
          </ThemedText>
        </View>
        <Feather name="chevron-left" size={20} color={theme.textSecondary} />
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
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: "Tajawal_500Medium",
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
  topicBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  topicText: {
    fontSize: 13,
    fontFamily: "Tajawal_400Regular",
  },
});
