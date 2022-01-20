import React from 'react';

import { Platform } from 'react-native';

export default function DateTimeContainer(props) {
    return (
        <>
            {Platform.OS === 'web' && props.theme.dark && (
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
