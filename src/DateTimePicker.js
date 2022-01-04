import React from 'react';

import { Platform } from 'react-native';

import WebDateTimePicker from './WebDateTimePicker';
import MobileDateTimePicker from './MobileDateTimePicker';

export default function DateTimePicker(props) {
    return Platform.OS === 'web' ? (
        <WebDateTimePicker
            {...props}
        />
    ) : (
        <MobileDateTimePicker
            {...props}
        />
    );
}
