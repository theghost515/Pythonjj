import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LessonCard } from "@/components/LessonCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { lessons as initialLessons, Lesson, getLevelLabel } from "@/data/lessons";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COMPLETED_LESSONS_KEY = "@baython_completed_lessons";

export default function LessonsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  useEffect(() => {
    loadCompletedLessons();
  }, []);

  const loadCompletedLessons = async () => {
    try {
      const completed = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);
      if (completed) {
        const completedIds = JSON.parse(completed) as string[];
        setLessons((prev) =>
          prev.map((lesson) => ({
            ...lesson,
            completed: completedIds.includes(lesson.id),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading completed lessons:", error);
    }
  };

  const handleLessonPress = (lesson: Lesson) => {
    navigation.navigate("LessonDetail", { lesson });
  };

  const beginnerLessons = lessons.filter((l) => l.level === "beginner");
  const intermediateLessons = lessons.filter((l) => l.level === "intermediate");
  const advancedLessons = lessons.filter((l) => l.level === "advanced");

  const sections = [
    { title: getLevelLabel("beginner"), data: beginnerLessons },
    { title: getLevelLabel("intermediate"), data: intermediateLessons },
    { title: getLevelLabel("advanced"), data: advancedLessons },
  ].filter((s) => s.data.length > 0);

  const renderSection = ({
    item,
    index,
  }: {
    item: { title: string; data: Lesson[] };
    index: number;
  }) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{item.title}</ThemedText>
      {item.data.map((lesson, lessonIndex) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          index={lessons.findIndex((l) => l.id === lesson.id)}
          onPress={() => handleLessonPress(lesson)}
        />
      ))}
    </View>
  );

  return (
    <FlatList
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Tajawal_700Bold",
    marginBottom: Spacing.md,
    textAlign: "right",
  },
});
