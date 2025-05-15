import { View, Text, StyleSheet } from "react-native";

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.header__title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0118D8',
        padding: 10,
    },
    header__title: {
        color: 'white',
        fontSize: 18,
    }
});