import React from 'react';
import { SafeAreaView } from 'react-native';
import ProgramForm from '../components/ProgramForm';
import { useAppContext } from '../context/AppContext';

export default function CreatePage() {

    const { workoutPrograms } = useAppContext()
    const emptyProgram = {
        id: workoutPrograms.length + 1,
        name: `Workout ${workoutPrograms.length + 1}`,
        exercises: [
            {
                id: 1,
                exerciseName: "",
                exerciseProgression: "",
                exerciseWeight: "",
                exerciseReps: "",
                exerciseSets: ""
            }
        ]
    }

    return (
        <SafeAreaView className='h-screen bg-zinc-700'>
            <ProgramForm program={emptyProgram} />
        </SafeAreaView>
    );
};