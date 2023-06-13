import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import ProgramCard from '../components/ProgramCard';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function HomePage() {
    const { workoutPrograms } = useAppContext()
    const navigation = useNavigation();

    const renderProgramRow = ({ item }) => {
        return (
            <ProgramCard program={item} />
        );
    };

    useEffect(() => {
        console.log(workoutPrograms)
    }, [workoutPrograms])

    const handleCreateLink = () => {
        navigation.navigate("Create Workout")
    }

    return (
        <View className='bg-zinc-700 items-center flex-grow flex justify-center'>

            {workoutPrograms.length > 0 ?
                (
                    <FlatList
                        data={workoutPrograms}
                        keyExtractor={(program) => program.id}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        contentContainerStyle={{
                            paddingTop: 20,
                            paddingBottom: 20,
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderProgramRow} />

                )
                :
                (
                    <TouchableOpacity
                        className="bg-green-500 w-[150] rounded-full p-2 flex items-center justify-center"
                        onPress={handleCreateLink}>
                        <Text className="text-white text-lg">Create Workout</Text>
                    </TouchableOpacity>
                )}
        </View>
    );

};