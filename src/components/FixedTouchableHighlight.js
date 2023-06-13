import React, { useRef } from 'react';
import { TouchableHighlight } from 'react-native';

export default function FixedTouchableHighlight({
    onPress,
    onPressIn,
    ...props
}) {
    const _touchActivatePositionRef = useRef(null);

    function _onPressIn(e) {
        const { pageX, pageY } = e.nativeEvent;

        _touchActivatePositionRef.current = {
            pageX,
            pageY,
        };

        onPressIn?.(e);
    }

    function _onPress(e) {
        const { pageX, pageY } = e.nativeEvent;

        const absX = Math.abs(_touchActivatePositionRef.current.pageX - pageX);
        const absY = Math.abs(_touchActivatePositionRef.current.pageY - pageY);

        const dragged = absX > 2 || absY > 2;
        if (!dragged) {
            onPress?.(e);
        }
    }

    return (
        <TouchableHighlight onPressIn={_onPressIn} onPress={_onPress} {...props}>
            {props.children}
        </TouchableHighlight>
    );
}