import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";  // Assuming FontAwesome is correctly imported from @expo/vector-icons
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";

export { ErrorBoundary } from "expo-router";


export const unstable_settings = {
    initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();


function RootLayoutNav() {
    const router = useRouter();

    const [fontsLoaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (error) {
        console.error("Error loading fonts", error);
        return null;
    }

    if (!fontsLoaded) {
        return null;
    }



    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="(modals)/booking"
                options={{
                    presentation: "transparentModal",
                    animation: 'fade',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome name="close" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />


        </Stack>
    );
}

export default RootLayoutNav
