import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ExerciseCard } from "@/components/ExerciseCard";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { exercises as initialExercises, Exercise } from "@/data/lessons";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COMPLETED_EXERCISES_KEY = "@baython_completed_exercises";

export default function PracticeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    loadCompletedExercises();
  }, []);

  const loadCompletedExercises = async () => {
    try {
      const completed = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
      if (completed) {
        const completedIds = JSON.parse(completed) as string[];
        setExercises((prev) =>
          prev.map((exercise) => ({
            ...exercise,
            completed: completedIds.includes(exercise.id),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading completed exercises:", error);
    }
  };

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate("Exercise", { exercise });
  };

  const completedExercises = exercises.filter((e) => e.completed);
  const pendingExercises = exercises.filter((e) => !e.completed);

  const renderExercise = ({ item }: { item: Exercise }) => (
    <ExerciseCard exercise={item} onPress={() => handleExercisePress(item)} />
  );

  const renderEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-practice.png")}
      title="لم تكمل أي تمارين بعد"
      description="ابدأ بحل التمارين لتحسين مهاراتك في البرمجة"
    />
  );

  return (
    <FlatList
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={[
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: tabBarHeight + Spacing.xl,
          paddingHorizontal: Spacing.lg,
        },
        pendingExercises.length === 0 && styles.emptyContainer,
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      data={pendingExercises}
      renderItem={renderExercise}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
});
