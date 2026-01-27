import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "@/screens/LessonsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type LessonsStackParamList = {
  Lessons: undefined;
};

const Stack = createNativeStackNavigator<LessonsStackParamList>();

export default function LessonsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="بايتون" />,
        }}
      />
    </Stack.Navigator>
  );
}
