import React, { createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    workoutPrograms: [
        {
            id: 1,
            name: "Workout A",
            exercises: [
                {
                    id: 1,
                    exerciseName: "Pullups",
                    exerciseProgression: 2.5,
                    exerciseWeight: 10,
                    exerciseReps: 5,
                    exerciseSets: 5
                },
                {
                    id: 2,
                    exerciseName: "Bench Press",
                    exerciseProgression: 2.5,
                    exerciseWeight: 50,
                    exerciseReps: 5,
                    exerciseSets: 5
                }
            ]
        },
        {
            id: 2,
            name: "Workout B",
            exercises: [
                {
                    id: 1,
                    exerciseName: "Deadlifts",
                    exerciseProgression: 2.5,
                    exerciseWeight: 10,
                    exerciseReps: 5,
                    exerciseSets: 5
                },
                {
                    id: 2,
                    exerciseName: "Barbell row",
                    exerciseProgression: 2.5,
                    exerciseWeight: 50,
                    exerciseReps: 5,
                    exerciseSets: 5
                }
            ]
        },
        {
            id: 3,
            name: "Workout C",
            exercises: [
                {
                    id: 1,
                    exerciseName: "Deadlifts",
                    exerciseProgression: 2.5,
                    exerciseWeight: 10,
                    exerciseReps: 5,
                    exerciseSets: 5
                },
                {
                    id: 2,
                    exerciseName: "Barbell row",
                    exerciseProgression: 2.5,
                    exerciseWeight: 50,
                    exerciseReps: 5,
                    exerciseSets: 5
                }
            ]
        },
        {
            id: 4,
            name: "Workout D",
            exercises: [
                {
                    id: 1,
                    exerciseName: "Deadlifts",
                    exerciseProgression: 2.5,
                    exerciseWeight: 10,
                    exerciseReps: 5,
                    exerciseSets: 5
                },
                {
                    id: 2,
                    exerciseName: "Barbell row",
                    exerciseProgression: 2.5,
                    exerciseWeight: 50,
                    exerciseReps: 5,
                    exerciseSets: 5
                }
            ]
        }
    ],
    workoutHistory: [],

};


const AppContext = createContext(initialState);

// Reducer function to modify state
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT_PROGRAM':
            return {
                ...state,
                workoutPrograms: [...state.workoutPrograms, action.payload],
            };
        case 'UPDATE_WORKOUT_PROGRAM':
            const updatedWorkoutPrograms = [...state.workoutPrograms].map((program) => {
                if (program.id === action.payload.id) {
                    return action.payload
                }
                return program;
            });

            return {
                ...state,
                workoutPrograms: updatedWorkoutPrograms
            };

            return {
                ...state,
                workoutPrograms: state.workoutPrograms.filter(item => item.id !== action.payload),
            };
        case 'DELETE_WORKOUT_PROGRAM':
            return {
                ...state,
                workoutPrograms: state.workoutPrograms.filter(item => item.id !== action.payload),
            };
        case 'ADD_WORKOUT_HISTORY':
            return {
                ...state,
                workoutHistory: [...state.workoutHistory, action.payload],
            };
        case 'DELETE_WORKOUT_HISTORY':
            return {
                ...state,
                workoutHistory: state.workoutHistory.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

// Store data in localstorage
const storeData = async (key, value) => {
    try {
        const oldData = await retrieveData(key)
        await AsyncStorage.setItem(key, JSON.stringify([...oldData, value]));
        console.log('Value stored successfully.');
    } catch (error) {
        console.log('Error storing value:', error);
    }
};

// Remove data in localstorage
const removeData = async (key, value) => {
    try {
        const oldData = await retrieveData(key)
        await AsyncStorage.setItem(key, JSON.stringify([...oldData, value]));
        console.log('Value stored successfully.');
    } catch (error) {
        console.log('Error storing value:', error);
    }
};

// Retrieve data from localstorage
const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('Retrieved value:', value);
            return JSON.parse(value);
        } else {
            console.log('Value does not exist.');
            return null;
        }
    } catch (error) {
        console.log('Error retrieving value:', error);
        return null;
    }
};

const retrieveAllData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);

        // Process the retrieved data
        const parsedData = data.reduce((result, [key, value]) => {
            result[key] = JSON.parse(value);
            return result;
        }, {});

        return parsedData;
    } catch (error) {
        console.log('Error retrieving data:', error);
        return null;
    }
};



// Context provider to allow app to use reducer
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addWorkoutProgram = (program) => {
        dispatch({ type: 'ADD_WORKOUT_PROGRAM', payload: program });
        // storeData('workoutPrograms', program);
    };

    const updateWorkoutProgram = (program) => {
        dispatch({ type: 'UPDATE_WORKOUT_PROGRAM', payload: program });
        // storeData('workoutPrograms', program);
    };

    const deleteWorkoutProgram = (id) => {
        dispatch({ type: 'DELETE_WORKOUT_PROGRAM', payload: id });
        // removeData('workoutPrograms', program);
    };

    const addWorkoutHistory = (workout) => {
        dispatch({ type: 'ADD_WORKOUT_HISTORY', payload: workout });
        // storeData('workoutHistory', workout);
    };

    const deleteWorkoutHistory = (id) => {
        dispatch({ type: 'DELETE_WORKOUT_HISTORY', payload: id });
        // removeData('workoutHistory', program);
    };

    const retrieveState = () => {
        dispatch({ type: 'retrieve', payload: retrieveAllData() });
    };

    return (
        <AppContext.Provider
            value={{
                workoutPrograms: state.workoutPrograms,
                workoutHistory: state.workoutHistory,
                addWorkoutProgram,
                deleteWorkoutProgram,
                updateWorkoutProgram,
                addWorkoutHistory,
                deleteWorkoutHistory,
                retrieveState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


// Hook to allow components to access the context
// usage: const {workoutPrograms, workoutHistory, addWorkoutProgram, updateWorkoutProgram, deleteWorkoutProgram, addWorkoutHistory, deleteWorkoutHistory} = useAppContext()
function useAppContext() {
    const appContext = useContext(AppContext)

    if (!appContext) {
        return new Error("Program context not defined")
    }

    return appContext
}

export { AppContext, AppProvider, useAppContext };
