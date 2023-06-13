import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Animated, PanResponder } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function ProgramForm(props) {
    const program = props.program
    const navigation = useNavigation();
    const { updateWorkoutProgram, addWorkoutProgram } = useAppContext()
    const slideUpAnim = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0)
    const [name, setName] = useState(program.name);
    const [exercises, setExercises] = useState(program.exercises);

    const emptyExerciseRow = { id: exercises.length + 1, exerciseName: "", exerciseProgression: "", exerciseReps: "", exerciseSets: "", exerciseWeight: "" }
    const [currentExercise, setCurrentExercise] = useState(emptyExerciseRow)

    const handleNameChange = (text) => {
        setName(text);
    };

    const handleAddExercise = () => {
        setExercises([...exercises, currentExercise])
    }

    const handleUpdateExercise = () => {
        const updatedExercises = [...exercises];
        updatedExercises[currentIndex] = currentExercise
        setExercises(updatedExercises)

    }

    const handleRemoveExercise = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises.splice(index, 1);
        setExercises(updatedExercises);
    };

    const handleExerciseChange = (key, value) => {
        setCurrentExercise({ ...currentExercise, [key]: value })
    };

    const handleSubmit = () => {
        if (props.edit) {
            updateWorkoutProgram({ id: program.id, name, exercises })
        } else {
            addWorkoutProgram({ id: program.id, name, exercises })
        }
        navigation.navigate('homePage');
    };



    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                slideUpAnim.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy < -150) {
                    Animated.timing(slideUpAnim, {
                        toValue: -300,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                } else {
                    Animated.timing(slideUpAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <SafeAreaView className="flex-1 items-center">
            <TextInput className="text-white w-fit bg-gray-800 font-bold h-10 px-5 m-5 rounded-lg"
                placeholder="Name"
                placeholderTextColor="gray"
                value={name}
                onChangeText={handleNameChange} />

            {exercises.map((exercise, index) => (
                <View key={index}
                    className="flex flex-row mb-3 px-4 ">
                    <TouchableOpacity
                        className="flex-1 h-10 items-center justify-center bg-gray-800 rounded-lg px-4"
                        onPress={() => {
                            setCurrentExercise(exercise)
                            setCurrentIndex(index)
                            Animated.timing(slideUpAnim, {
                                toValue: -500,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                        }}>
                        <View className="flex gap-4 flex-row justify-between items-center">
                            <Text className="text-white flex-grow">{exercise.exerciseName || "Exercise"}</Text>
                            <Text className="text-right font-bold text-orange-400">{exercise.exerciseSets || "Sets "}x{exercise.exerciseReps || " Reps"}</Text>
                            <Text className="text-right font-bold text-orange-400">{exercise.exerciseWeight || "0"}kg{exercise.exerciseWeight > 1 ? "s" : ""}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="ml-2 bg-red-500 rounded-full h-10 w-10 flex justify-center items-center"
                        onPress={() => handleRemoveExercise(index)}>
                        <Text className="text-white text-3xl">-</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity
                className="bg-green-500 w-[150] rounded-full p-2 my-4 flex items-center justify-center"
                onPress={() => {
                    setCurrentExercise(emptyExerciseRow)
                    setCurrentIndex(exercises.length + 1)
                    Animated.timing(slideUpAnim, {
                        toValue: -500,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }}>
                <Text className="text-white text-lg">Create Exercise</Text>
            </TouchableOpacity>


            <TouchableOpacity
                className="bg-green-500 w-[150] rounded-full p-2 flex items-center justify-center"
                onPress={handleSubmit}>
                <Text className="text-white text-lg">Submit</Text>
            </TouchableOpacity>

            <Animated.View
                {...panResponder.panHandlers}
                className="absolute bottom-[-450px] left-0 right-0 h-[600px] bg-slate-600 rounded-t-3xl"
                style={{ transform: [{ translateY: slideUpAnim }] }}>

                {/* Content of the slide-up panel */}
                <View
                    className="pt-10 gap-4 justify-center items-start rounded-t-lg">
                    <TextInput
                        className="text-white h-10 bg-slate-700 border rounded-lg px-2 w-1/2"
                        placeholderTextColor="gray"
                        placeholder="Exercise"
                        value={currentExercise?.exerciseName}
                        onChangeText={(value) => handleExerciseChange("exerciseName", value)}
                    />
                    <TextInput
                        className="text-white h-10 bg-slate-700 border rounded-lg px-2 w-1/2"
                        placeholder="Weight"
                        placeholderTextColor="gray"
                        value={currentExercise?.exerciseWeight.toString()}
                        onChangeText={(value) => handleExerciseChange("exerciseWeight", value)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        className="text-white h-10 bg-slate-700 border rounded-lg px-2 w-1/2"
                        placeholderTextColor="gray"
                        placeholder="Reps"
                        value={currentExercise?.exerciseReps.toString()}
                        onChangeText={(value) => handleExerciseChange("exerciseReps", value)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        className="text-white h-10 bg-slate-700 border rounded-lg px-2 w-1/2"
                        placeholderTextColor="gray"
                        placeholder="Sets"
                        value={currentExercise?.exerciseSets.toString()}
                        onChangeText={(value) => handleExerciseChange("exerciseSets", value)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        className="text-white h-10 bg-slate-700 border rounded-lg px-2 w-1/2"
                        placeholderTextColor="gray"
                        placeholder="Gain"
                        value={currentExercise?.exerciseProgression.toString()}
                        onChangeText={(value) => handleExerciseChange("exerciseProgression", value)}
                        keyboardType="numeric"
                    />

                    {currentIndex <= exercises.length ?
                        (<TouchableOpacity onPress={() => {
                            handleUpdateExercise()
                            Animated.timing(slideUpAnim, {
                                toValue: 0,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                        }}>
                            <Text>Update exercise</Text>
                        </TouchableOpacity>)
                        :
                        (<TouchableOpacity onPress={() => {
                            handleAddExercise()
                            Animated.timing(slideUpAnim, {
                                toValue: 0,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                        }}>
                            <Text>Add exercise</Text>
                        </TouchableOpacity>)
                    }

                    <TouchableOpacity onPress={() => {
                        Animated.timing(slideUpAnim, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        }).start();
                    }}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};
