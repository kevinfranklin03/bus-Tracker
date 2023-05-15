import { StyleSheet } from "react-native";
import { yellow } from "../src/constants";

const homeStyle = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 0,
        alignItems: "center",

    },
    text: {
        fontWeight: "bold",
        color: '#F6F8E2',
        fontSize: 60,
        marginTop: '10%',
        marginBottom: '10%'
    },
    tradeMark: {
        color: "white",
    },
    formBg : {
        backgroundColor: "rgba(255,255,255,0.5)",
        height: '35%',
        width: '100%',
        paddingTop: 30,
        alignItems: "center",
        borderRadius: 50,
        marginTop: '40%',
        marginBottom: '30%'
    },
    buttonText: {
        paddingTop: 40,
        fontSize: 25,
        color: yellow,
        alignSelf: "center",
    },
    passwordText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: "center",
        paddingTop: 10
    },
    password: {
        borderRadius: 100,
        color: "black", 
        paddingHorizontal: 10,
        width: "90%", 
        height: 50, 
        backgroundColor: "white",
        fontSize: 19,
        marginVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    passwordInput: {
        borderRadius: 100,
        color: "black", 
        width: "90%", 
        height: 50, 
        fontSize: 19,
    },
    wrapperIcon: {
        height: 25,
        width: 25,
    },

})

export default homeStyle;