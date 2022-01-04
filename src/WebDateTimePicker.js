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
                const fontSize = style.fontSize && 16;
                const renderStyle = {
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L416
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L453
                    flexGrow: 1,
                    margin: 0,
                    borderWidth: 0,
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L342
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L375
                    fontSize: fontSize,
                    fontFamily: theme.fonts.regular.fontFamily,
                    fontWeight: style.fontWeight && theme.fonts.regular.fontWeight,
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
                    textAlign: style.textAlign && (I18nManager.isRTL ? 'right' : 'left'),
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L353
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L386
                    outline: 'none',
                };
                if (props.mode === 'outlined') {
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L416
                    renderStyle.zIndex = 1;
                    let padding;
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L43
                    if (style.height) {
                        renderStyle.height = style.height;
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L115
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L111
                        padding = Math.max(0, (style.height - (style.lineHeight && fontSize)) / 2);
                    } else {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L147
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L42
                        renderStyle.height = (props.dense ? 48 : 64) - 8;
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L141
                        padding = 0;
                    }
                    renderStyle.paddingTop = padding;
                    renderStyle.paddingBottom = padding;
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputOutlined.tsx#L45
                    renderStyle.paddingLeft = 14;
                    renderStyle.paddingRight = 14;
                } else {
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L43
                    if (style.height) {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L244
                        renderStyle.height = style.height + 0;
                    } else {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L186
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L244
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L44
                        renderStyle.height = (props.dense ? (props.label ? 52 : 40) - 24 : 64 - 30) + (props.dense ? 24 : 30);
                    }
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L164
                    if (props.label) {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/TextInputFlat.tsx#L457
                        renderStyle.paddingTop = props.dense ? 22 : 24;
                        renderStyle.paddingBottom = props.dense ? 2 : 4;
                    } else {
                        // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/helpers.tsx#L169
                        renderStyle.paddingTop = 0;
                        renderStyle.paddingBottom = 0;
                    }
                    // https://github.com/callstack/react-native-paper/blob/main/src/components/TextInput/constants.tsx#L4
                    renderStyle.paddingLeft = 12;
                    renderStyle.paddingRight = 12;
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
                        style={renderStyle}
                        readOnly={props.editable === false}
                    />
                );
            }}
            style={style}
            theme={props.theme}
            editable={props.editable}
        />
    );
}
