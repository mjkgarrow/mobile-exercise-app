import { Text, View, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import FixedTouchableHighlight from './FixedTouchableHighlight';
import { useAppContext } from '../context/AppContext';
import { useRef } from 'react';


export default function ProgramCard({ program }) {
    const { deleteWorkoutProgram } = useAppContext()
    const navigation = useNavigation();
    const swipeableRef = useRef(null);

    const handleClick = (program) => {
        navigation.navigate('conductWorkout', { program });
    };

    const handleEdit = () => {
        swipeableRef.current.close();
        navigation.navigate('edit', { program, edit: true });
    }

    const handleDelete = () => {
        deleteWorkoutProgram(program.id)
        swipeableRef.current.close();
    }


    const renderRightActions = () => {
        return (
            <View className="flex justify-center w-24">
                <Button color="#dc2626" onPress={handleDelete} title="DELETE"></Button>
            </View>
        );
    };

    const renderLeftActions = () => {
        return (
            <View className="flex justify-center w-24">
                <Button color="#3b82f6" onPress={handleEdit} title="EDIT"></Button>
            </View>
        );
    };

    return (
        <Swipeable
            ref={swipeableRef}
            overshootLeft={false}
            overshootRight={false}
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
        >

            <FixedTouchableHighlight
                onPress={() => handleClick(program)}
                className="rounded-lg"
            >
                <View className="w-80 font-bold">
                    <View className="flex justify-center bg-gray-800 p-3 text-center text-lg rounded-t-lg transition-all duration-200 ease-in-out">
                        <Text className="flex-grow text-left text-white">{program.name}</Text>
                    </View>
                    <View className="bg-gray-700 rounded-none flex flex-col divide-y divide-gray-800 ">
                        {program.exercises.map((exercise) => (
                            <View key={exercise.id}>
                                <View className="p-4 flex flex-row gap-2 justify-between items-center">
                                    <Text className="text-white flex-grow text-left">{exercise.exerciseName}</Text>
                                    <Text className="text-right font-bold text-orange-400">{exercise.exerciseSets}x{exercise.exerciseReps}</Text>
                                    <Text className="text-right font-bold text-orange-400">{exercise.exerciseWeight}kg{exercise.exerciseWeight > 1 ? "s" : ""}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </FixedTouchableHighlight>
        </Swipeable>


    )
}

