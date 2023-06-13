import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddButton(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={props.type === '+' ? styles.addButton : styles.removeButton}
        >
            <Text style={styles.addIcon}>{props.type}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#47ff9d',
        borderRadius: 100,
        color: '#111',
        cursor: 'pointer',
        height: 40,
        width: 40,
        justifyContent: 'center',
        padding: 0,
        position: 'relative',
    },
    removeButton: {
        backgroundColor: 'rgb(231, 68, 68)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#47ff9d',
        borderRadius: 100,
        color: '#111',
        cursor: 'pointer',
        height: 40,
        width: 40,
        justifyContent: 'center',
        padding: 0,
        position: 'relative'
    },
    addIcon: {
        position: 'relative',
        bottom: 3,
        left: 1,
        fontSize: 40,
        transitionProperty: 'transform',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
        transformOrigin: '12px 27px',
    },
});