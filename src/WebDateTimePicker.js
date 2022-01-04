import merge from 'deepmerge';

import React, { useRef } from 'react';

import { I18nManager } from 'react-native';

import { TextInput, useTheme } from 'react-native-paper';

export default function WebDateTimePicker(props) {
    const ref = useRef();

    let theme = useTheme();
    if (props.theme) {
        theme = merge(theme, props.theme);
    }

    function padded(number) {
        if (number > 9) {
            return `${number}`;
        } else {
            return `0${number}`;
        }
    }

    function toString(date) {
        if (props.type === 'time') {
            const hours = padded(date.getHours());
            const minutes = padded(date.getMinutes());
            return `${hours}:${minutes}`;
        } else {
            const year = date.getFullYear();
            const month = padded(date.getMonth() + 1);
            const day = padded(date.getDate());
            return `${year}-${month}-${day}`;
        }
    }

    function onFocus() {
        if (ref.current) {
            ref.current.handleFocus();
        }
    }

    function onBlur() {
        if (ref.current) {
            ref.current.handleBlur();
        }
    }

    function onChange(event) {
        let dateString;
        if (props.type === 'time') {
            dateString = `1070-01-01T${event.target.value}:00`;
        } else {
            dateString = `${event.target.value}T00:00:00`;
        }
        const date = new Date(dateString);
        if (date.getFullYear() > 999) {
            props.setValue(date);
        }
    }

    const inputStyle = { ...props.style };

    return (
        <TextInput
            {...props}
            ref={ref}
            left={null}
            right={null}
            multiline={false}
            numberOfLines={1}
            render={() => {
                const fontSize = inputStyle.fontSize && 16;
                const style = {
                    flexGrow: 1,
                    margin: 0,
                    borderWidth: 0,
                    fontSize: fontSize,
                    fontFamily: theme.fonts.regular.fontFamily,
                    fontWeight: inputStyle.fontWeight && theme.fonts.regular.fontWeight,
                    backgroundColor: 'transparent',
                    color: props.disabled ? theme.colors.placeholder : theme.colors.text,
                    textAlignVertical: 'center',
                    textAlign: inputStyle.textAlign && (I18nManager.isRTL ? 'right' : 'left'),
                    outline: 'none',
                };
                if (props.mode === 'outlined') {
                    style.zIndex = 1;
                    let padding;
                    if (inputStyle.height) {
                        style.height = inputStyle.height;
                        padding = Math.max(0, (inputStyle.height - (inputStyle.lineHeight && fontSize)) / 2);
                    } else {
                        style.height = (props.dense ? 48 : 64) - 8;
                        padding = 0;
                    }
                    style.paddingTop = padding;
                    style.paddingBottom = padding;
                    style.paddingLeft = 14;
                    style.paddingRight = 14;
                } else {
                    if (inputStyle.height) {
                        style.height = inputStyle.height;
                    } else {
                        style.height = (props.dense ? (props.label ? 52 : 40) - 24 : 64 - 30);
                    }
                    if (props.label) {
                        style.paddingTop = props.dense ? 22 : 24;
                        style.paddingBottom = props.dense ? 2 : 4;
                    } else {
                        style.paddingTop = 0;
                        style.paddingBottom = 0;
                    }
                    style.paddingLeft = 12;
                    style.paddingRight = 12;
                }
                return (
                    <input
                        style={style}
                        disabled={props.editable === false}
                        selectioncolor={props.selectionColor}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        type={props.type === 'time' ? 'time' : 'date'}
                        defaultValue={toString(props.value)}
                        onChange={onChange}
                    />
                );
            }}
        />
    );
}
