import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StatCard } from "@/components/StatCard";
import { ProgressCircle } from "@/components/ProgressCircle";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { lessons, exercises } from "@/data/lessons";

const COMPLETED_LESSONS_KEY = "@baython_completed_lessons";
const COMPLETED_EXERCISES_KEY = "@baython_completed_exercises";
const STREAK_KEY = "@baython_streak";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const [lessonsData, exercisesData, streakData] = await Promise.all([
        AsyncStorage.getItem(COMPLETED_LESSONS_KEY),
        AsyncStorage.getItem(COMPLETED_EXERCISES_KEY),
        AsyncStorage.getItem(STREAK_KEY),
      ]);

      if (lessonsData) {
        setCompletedLessons(JSON.parse(lessonsData));
      }
      if (exercisesData) {
        setCompletedExercises(JSON.parse(exercisesData));
      }
      if (streakData) {
        setStreak(JSON.parse(streakData));
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const lessonsProgress = (completedLessons.length / lessons.length) * 100;
  const exercisesProgress = (completedExercises.length / exercises.length) * 100;
  const totalProgress = ((lessonsProgress + exercisesProgress) / 2);

  const achievements = [
    {
      id: "1",
      title: "البداية",
      description: "أكمل أول درس",
      unlocked: completedLessons.length >= 1,
    },
    {
      id: "2",
      title: "المثابر",
      description: "أكمل 5 دروس",
      unlocked: completedLessons.length >= 5,
    },
    {
      id: "3",
      title: "المبرمج",
      description: "أكمل 3 تمارين",
      unlocked: completedExercises.length >= 3,
    },
    {
      id: "4",
      title: "المتفوق",
      description: "أكمل جميع الدروس",
      unlocked: completedLessons.length === lessons.length,
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.progressSection}>
        <ProgressCircle progress={totalProgress} size={140} strokeWidth={12} />
        <ThemedText style={styles.progressTitle}>التقدم الكلي</ThemedText>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          icon="book-open"
          value={completedLessons.length}
          label="دروس مكتملة"
          color={theme.primary}
        />
        <View style={{ width: Spacing.md }} />
        <StatCard
          icon="code"
          value={completedExercises.length}
          label="تمارين محلولة"
          color={theme.accent}
        />
      </View>

      <View style={[styles.statsRow, { marginTop: Spacing.md }]}>
        <StatCard
          icon="zap"
          value={streak}
          label="أيام متتالية"
          color="#FF5722"
        />
        <View style={{ width: Spacing.md }} />
        <StatCard
          icon="clock"
          value={Math.round((completedLessons.length * 15 + completedExercises.length * 10) / 60)}
          label="ساعات تعلم"
          color="#9C27B0"
        />
      </View>

      <View style={styles.achievementsSection}>
        <ThemedText style={styles.sectionTitle}>الإنجازات</ThemedText>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderColor: theme.border,
                  opacity: achievement.unlocked ? 1 : 0.5,
                },
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  {
                    backgroundColor: achievement.unlocked
                      ? theme.accent + "30"
                      : theme.border,
                  },
                ]}
              >
                <Image
                  source={require("../../assets/images/success-celebration.png")}
                  style={styles.achievementImage}
                  resizeMode="contain"
                />
              </View>
              <ThemedText style={styles.achievementTitle}>
                {achievement.title}
              </ThemedText>
              <ThemedText
                style={[
                  styles.achievementDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {achievement.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressSection: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: "Tajawal_500Medium",
    marginTop: Spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
  },
  achievementsSection: {
    marginTop: Spacing["2xl"],
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Tajawal_700Bold",
    marginBottom: Spacing.lg,
    textAlign: "right",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  achievementCard: {
    width: "47%",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: "center",
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
    overflow: "hidden",
  },
  achievementImage: {
    width: 40,
    height: 40,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: "Tajawal_700Bold",
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: "Tajawal_400Regular",
    textAlign: "center",
  },
});
