import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import HistoryPage from '../pages/HistoryPage';
import WorkoutPage from '../pages/WorkoutPage';
import EditPage from '../pages/EditPage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const homeTab = "Workout"
const homePage = 'homePage'
const createPage = "Create Workout"
const historyPage = "History"
const workoutPage = "conductWorkout"
const editPage = 'edit'



function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={homePage} component={HomePage} />
            <Stack.Screen name={workoutPage} component={WorkoutPage} />
            <Stack.Screen name={editPage} component={EditPage} />
        </Stack.Navigator>
    );
}

export default function Navigation() {


    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeTab}
                screenOptions={({ route }) => ({
                    tabBarStyle: { height: 100, backgroundColor: "#333", borderTopWidth: 0 },
                    headerStyle: { backgroundColor: '#333' },
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                    tabBarActiveTintColor: "#FF3D00",
                    tabBarInactiveTintColor: "white",
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                        fontSize: 12,
                        fontWeight: 800
                    },

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (route.name === homeTab) {
                            iconName = focused ? 'barbell' : 'barbell-outline'
                        } else if (route.name === createPage) {
                            iconName = focused ? 'hammer' : 'hammer-outline'
                        } else if (route.name === historyPage) {
                            iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                })}
            >
                <Tab.Screen name={homeTab} component={HomeStack} />
                <Tab.Screen name={createPage} component={CreatePage} />
                <Tab.Screen name={historyPage} component={HistoryPage} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}