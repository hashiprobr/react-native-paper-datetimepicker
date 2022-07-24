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
            ref.current.focus();
        }
    }

    function onBlur() {
        if (ref.current) {
            ref.current.blur();
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
            props.onChangeDate(date);
        }
    }

    const style = { ...props.style };

    return (
        <TextInput
            ref={ref}
            mode={props.mode}
            disabled={props.disabled}
            label={props.label}
            error={props.error}
            selectionColor={props.selectionColor}
            underlineColor={props.underlineColor}
            activeUnderlineColor={props.activeUnderlineColor}
            outlineColor={props.outlineColor}
            activeOutlineColor={props.activeOutlineColor}
            dense={props.dense}
            multiline={false}
            numberOfLines={1}
            render={() => {
                // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L102
                // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L102
                // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/constants.tsx#L1
                const fontSize = style.fontSize || 16;
                const inputStyle = {
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L416
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L453
                    flexGrow: 1,
                    margin: 0,
                    borderWidth: 0,
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L342
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L375
                    fontSize: fontSize,
                    fontFamily: theme.fonts.regular.fontFamily,
                    fontWeight: style.fontWeight || theme.fonts.regular.fontWeight,
                    backgroundColor: 'transparent',
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L106
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L148
                    // https://github.com/callstack/react-native-paper/blob/main/src/styles/DefaultTheme.tsx#L18
                    // https://github.com/callstack/react-native-paper/blob/main/src/styles/DarkTheme.tsx#L20
                    color: props.disabled ? theme.colors.placeholder : theme.colors.text,
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L346
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L379
                    textAlignVertical: 'center',
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L347
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L380
                    textAlign: style.textAlign || (I18nManager.isRTL ? 'right' : 'left'),
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L353
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L386
                    outline: 'none',
                };
                if (props.mode === 'outlined') {
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L420
                    inputStyle.zIndex = 1;
                    let padding;
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L43
                    if (style.height) {
                        inputStyle.height = style.height;
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L115
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L111
                        padding = Math.max(0, (style.height - (style.lineHeight || fontSize)) / 2);
                    } else {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L147
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L42
                        inputStyle.height = (props.dense ? 48 : 64) - 8;
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L141
                        padding = 0;
                    }
                    inputStyle.paddingTop = padding;
                    inputStyle.paddingBottom = padding;
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L418
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L45
                    inputStyle.paddingLeft = 14;
                    inputStyle.paddingRight = 14;
                } else {
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L43
                    if (style.height) {
                        inputStyle.height = style.height;
                    } else {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L186
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L44
                        inputStyle.height = (props.dense ? (props.label ? 52 : 40) - 24 : 64 - 30);
                    }
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L164
                    if (props.label) {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L457
                        inputStyle.paddingTop = props.dense ? 22 : 24;
                        inputStyle.paddingBottom = props.dense ? 2 : 4;
                    } else {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L169
                        inputStyle.paddingTop = 0;
                        inputStyle.paddingBottom = 0;
                    }
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L268
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/constants.tsx#L4
                    inputStyle.paddingLeft = 12;
                    inputStyle.paddingRight = 12;
                }
                return (
                    <input
                        type={props.type === 'time' ? 'time' : 'date'}
                        disabled={props.disabled}
                        onChange={onChange}
                        selectioncolor={props.selectionColor}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        defaultValue={toString(props.value)}
                        style={inputStyle}
                        readOnly={props.editable === false}
                    />
                );
            }}
            value=" "
            style={style}
            theme={props.theme}
            editable={props.editable !== false}
        />
    );
}
