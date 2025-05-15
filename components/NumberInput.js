import { StyleSheet, View, Text, TextInput } from "react-native";
import { useState } from "react";

export default function NumberInput({ label, initialValue, changeFunction, ...inputProps }) {

    const validateInput = (input) => {

        if (input == null || input == undefined || input == '') {
            changeFunction('0,00');
            return;
        }

        if (!/^[0-9,.]*$/.test(input) || !/[,]/.test(input)) {
            changeFunction(initialValue);
            return;
        }

        let chars = Array.from(input);
        var decimalDigits = (chars.length - 1) - chars.findIndex(x => x == ",");

        // moves the comma right
        if (decimalDigits == 3) {
            var commaIndex = chars.findIndex(x => x == ",");
            var temp = chars[commaIndex];
            chars[commaIndex] = chars[commaIndex + 1];
            chars[commaIndex + 1] = temp;
        }

        // moves the comma left
        if (decimalDigits == 1) {
            var commaIndex = chars.findIndex(x => x == ",");
            var temp = chars[commaIndex];
            chars[commaIndex] = chars[commaIndex - 1];
            chars[commaIndex - 1] = temp;
        }

        input = chars.join('');
        const sanitizedInput = parseFloat(input.replaceAll('.','').replaceAll(',', '.'));

        if (sanitizedInput >= 0) {
            changeFunction(sanitizedInput.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
        } else {
            changeFunction(initialValue);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                {...inputProps}
                value={initialValue}
                onChangeText={validateInput}
                keyboardType="numeric"
            ></TextInput>
            {(initialValue == null || initialValue == undefined || initialValue == '' || initialValue == '0,00') && <Text style={styles.validation}>Campo obrigatório!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontWeight: '500',
        marginBottom: 6,
    },
    input: {
        height: 40,
        marginBottom: 6,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    validation: {
        color: 'red',
    }
});