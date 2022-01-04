import React, { useState } from 'react';

import { View } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TouchableRipple, TextInput } from 'react-native-paper';

export default function MobileDateTimePicker(props) {
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
