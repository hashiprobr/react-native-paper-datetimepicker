import React, { useState } from 'react';

import { View } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TouchableRipple, TextInput } from 'react-native-paper';

export default function MobileDateTimePicker(props) {
    const [visible, setVisible] = useState(false);

    function toString(date) {
        if (props.type === 'time') {
            return date.toLocaleTimeString().slice(0, -3);
        } else {
            return date.toLocaleDateString();
        }
    }

    function onPress() {
        if (props.editable !== false) {
            setVisible(true);
        }
    }

    function onCancel() {
        setVisible(false);
    }

    function onConfirm(date) {
        onCancel();
        if (date.getFullYear() > 999) {
            props.onChangeDate(date);
        }
    }

    const style = { ...props.style };
    const touchableStyle = { ...props.touchableStyle };

    return (
        <>
            <TouchableRipple
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                borderless={props.borderless}
                background={props.background}
                centered={props.centered}
                disabled={props.disabled}
                onPress={onPress}
                rippleColor={props.rippleColor}
                underlayColor={props.underlayColor}
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
                theme={props.theme}
            >
                <View
                    pointerEvents="none"
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
                >
                    <TextInput
                        mode={props.mode}
                        right={(
                            <TextInput.Icon
                                disabled={props.disabled}
                                name={props.type === 'time' ? 'clock-outline' : 'calendar'}
                                forceTextInputFocus={false}
                                color={props.iconColor}
                                style={props.iconStyle}
                                theme={props.theme}
                            />
                        )}
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
                        value={toString(props.value)}
                        style={{
                            ...style,
                            margin: 0,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginLeft: 0,
                        }}
                        theme={props.theme}
                        editable={false}
                    />
                </View>
            </TouchableRipple>
            <DateTimePickerModal
                date={props.value}
                isVisible={visible}
                mode={props.type === 'time' ? 'time' : 'date'}
                onCancel={onCancel}
                onChange={() => { }}
                onConfirm={onConfirm}
                onHide={() => { }}
            />
        </>
    );
}
