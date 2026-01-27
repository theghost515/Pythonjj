import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import LessonDetailScreen from "@/screens/LessonDetailScreen";
import ExerciseScreen from "@/screens/ExerciseScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { Lesson, Exercise } from "@/data/lessons";

export type RootStackParamList = {
  Main: undefined;
  LessonDetail: { lesson: Lesson };
  Exercise: { exercise: Exercise };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "Tajawal_700Bold",
          },
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "Tajawal_700Bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
