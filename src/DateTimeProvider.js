import React from 'react';

import { Platform } from 'react-native';

import { useTheme } from 'react-native-paper';

export default function DateTimeProvider(props) {
    const theme = useTheme();

    return (
        <>
            {Platform.OS === 'web' && theme.dark && (
                <style>
                    {`
                        ::-webkit-calendar-picker-indicator,
                        ::-webkit-time-picker-indicator {
                            filter: invert(1);
                        }
                    `}
                </style>
            )}
            {props.children}
        </>
    );
}
