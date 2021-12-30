import merge from 'deepmerge';

import React, { useRef, useState } from 'react';

import { Platform, I18nManager, View } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TextInput, TouchableRipple, useTheme } from 'react-native-paper';

function WebDateTimePicker(props) {
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

function MobileDateTimePicker(props) {
    const [open, setOpen] = useState(false);

    function toString(date) {
        if (props.type === 'time') {
            return date.toLocaleTimeString().slice(0, -3);
        } else {
            return date.toLocaleDateString();
        }
    }

    function onPress() {
        if (props.editable !== false) {
            setOpen(true);
        }
    }

    function onCancel() {
        setOpen(false);
    }

    function onConfirm(date) {
        onCancel();
        if (date.getFullYear() > 999) {
            props.setValue(date);
        }
    }

    const touchableStyle = { ...props.touchableStyle };
    const style = { ...props.style };

    return (
        <>
            <TouchableRipple
                style={{
                    ...touchableStyle,
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    margin: style.margin,
                    marginTop: style.marginTop,
                    marginRight: style.marginRight,
                    marginBottom: style.marginBottom,
                    marginLeft: style.marginLeft,
                    padding: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    overflow: 'visible',
                }}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                borderless={props.borderless}
                background={props.background}
                centered={props.centered}
                disabled={props.disabled}
                onPress={onPress}
                rippleColor={props.rippleColor}
                underlayColor={props.underlayColor}
                theme={props.theme}
            >
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: touchableStyle.flexDirection,
                        flexWrap: touchableStyle.flexWrap,
                        justifyContent: touchableStyle.justifyContent,
                        alignItems: touchableStyle.alignItems,
                        padding: touchableStyle.padding,
                        paddingTop: touchableStyle.paddingTop,
                        paddingRight: touchableStyle.paddingRight,
                        paddingBottom: touchableStyle.paddingBottom,
                        paddingLeft: touchableStyle.paddingLeft,
                        overflow: touchableStyle.overflow,
                    }}
                    pointerEvents="none"
                >
                    <TextInput
                        {...props}
                        style={{
                            ...props.style,
                            margin: 0,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginLeft: 0,
                        }}
                        left={null}
                        right={(
                            <TextInput.Icon
                                disabled={props.disabled}
                                name={props.type === 'time' ? 'clock-outline' : 'calendar'}
                                theme={props.theme}
                            />
                        )}
                        onChangeText={null}
                        multiline={false}
                        numberOfLines={1}
                        onFocus={null}
                        onBlur={null}
                        value={toString(props.value)}
                        theme={props.theme}
                        editable={false}
                    />
                </View>
            </TouchableRipple>
            <DateTimePickerModal
                date={props.value}
                isVisible={open}
                mode={props.type === 'time' ? 'time' : 'date'}
                onCancel={onCancel}
                onChange={props.onChange}
                onConfirm={onConfirm}
                onHide={props.onHide}
            />
        </>
    );
}

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
