import React from 'react';
import { View, Text } from 'react-native';

export default function WorkoutPage({ route }) {
    const { program } = route.params

    return (
        <View className='h-screen bg-zinc-700'>
            <Text>Workout Page for {program.name}</Text>
        </View>
    );
};
