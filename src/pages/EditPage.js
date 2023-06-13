import React from 'react';
import { SafeAreaView } from 'react-native';
import ProgramForm from '../components/ProgramForm';

export default function EditPage({ route }) {

    return (
        <SafeAreaView className='h-screen bg-zinc-700'>
            <ProgramForm program={route.params.program} />
        </SafeAreaView>
    );
};