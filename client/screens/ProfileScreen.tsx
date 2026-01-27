import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Switch, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

const PROFILE_NAME_KEY = "@baython_profile_name";
const DARK_MODE_KEY = "@baython_dark_mode";

const avatars = [
  require("../../assets/images/icon.png"),
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, isDark } = useTheme();

  const [name, setName] = useState("متعلم بايثون");
  const [darkMode, setDarkMode] = useState(isDark);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem(PROFILE_NAME_KEY);
      if (savedName) {
        setName(savedName);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleNameChange = async (newName: string) => {
    setName(newName);
    try {
      await AsyncStorage.setItem(PROFILE_NAME_KEY, newName);
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  const handleDarkModeToggle = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newValue = !darkMode;
    setDarkMode(newValue);
    try {
      await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error saving dark mode:", error);
    }
  };

  const menuItems = [
    { icon: "info" as const, title: "عن التطبيق" },
    { icon: "help-circle" as const, title: "المساعدة" },
    { icon: "star" as const, title: "قيم التطبيق" },
    { icon: "share-2" as const, title: "شارك التطبيق" },
  ];

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
    >
      <View style={styles.avatarSection}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.primary + "20" },
          ]}
        >
          <Image
            source={avatars[0]}
            style={styles.avatar}
            contentFit="contain"
          />
        </View>
        <TextInput
          style={[
            styles.nameInput,
            {
              color: theme.text,
              borderColor: theme.border,
              backgroundColor: theme.backgroundDefault,
            },
          ]}
          value={name}
          onChangeText={handleNameChange}
          placeholder="اسمك"
          placeholderTextColor={theme.textSecondary}
          textAlign="right"
        />
      </View>

      <View
        style={[
          styles.settingsCard,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
          },
        ]}
      >
        <ThemedText style={styles.settingsTitle}>الإعدادات</ThemedText>

        <View style={styles.settingRow}>
          <Switch
            value={darkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor="#fff"
          />
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>الوضع الداكن</ThemedText>
            <Feather name="moon" size={20} color={theme.textSecondary} />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.menuCard,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
          },
        ]}
      >
        {menuItems.map((item, index) => (
          <Pressable
            key={item.title}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              },
            ]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Feather name="chevron-left" size={20} color={theme.textSecondary} />
            <View style={styles.menuItemContent}>
              <ThemedText style={styles.menuItemTitle}>{item.title}</ThemedText>
              <Feather name={item.icon} size={20} color={theme.textSecondary} />
            </View>
          </Pressable>
        ))}
      </View>

      <ThemedText style={[styles.version, { color: theme.textSecondary }]}>
        الإصدار 1.0.0
      </ThemedText>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    overflow: "hidden",
  },
  avatar: {
    width: 80,
    height: 80,
  },
  nameInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
    fontFamily: "Tajawal_500Medium",
  },
  settingsCard: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  settingsTitle: {
    fontSize: 16,
    fontFamily: "Tajawal_700Bold",
    marginBottom: Spacing.lg,
    textAlign: "right",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  settingLabel: {
    fontSize: 14,
    fontFamily: "Tajawal_500Medium",
  },
  menuCard: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  menuItemTitle: {
    fontSize: 14,
    fontFamily: "Tajawal_500Medium",
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Tajawal_400Regular",
    marginTop: Spacing["2xl"],
  },
});
