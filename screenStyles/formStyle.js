import { StyleSheet } from "react-native";
import { schoolBusYellow } from "../src/constants";

const FormStyle = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        color: '#F6F8E2',
        fontSize: 30,
        marginVertical: '10%'
    },
    formBgStudent : {
        backgroundColor: "rgba(255,255,255,0.5)",
        height: "75%",
        width: 380,
        alignItems: "center",
        borderRadius: 50,
    },
    formBgDriver : {
        backgroundColor: "rgba(255,255,255,0.5)",
        height: "80%",
        width: 380,
        alignItems: "center",
        borderRadius: 50,
    },
    formTitle: {
        marginTop: '5%',
        fontSize: 25,
        color: schoolBusYellow,
        fontWeight: "bold"
    },
    invalid: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        left: '25%',
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
    age: {
        borderRadius: 100,
        color: "black", 
        paddingHorizontal: 10,
        width: "40%", 
        height: 50, 
        backgroundColor: "white",
        fontSize: 19,
        margin: 15
    },
    smallContainer:{
        width: '90%',
        display: 'flex',
        flexDirection: 'row'
    }
})

export default FormStyle;