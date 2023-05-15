import { StyleSheet } from "react-native";

const userHomeStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: "center",
        backgroundColor: '#E0DDCA'
    },
    bodyTitle: {
        fontSize: 20,
        color: 'black',

    },  
    headerTitle: {
        fontSize:22,
        fontWeight: 'bold',
        paddingTop: 15,
        marginLeft: 15,
        color: 'white'

    },
    header: {
        marginTop: 50,
        borderRadius: 20,
        width: 380,
        height: 220,
        backgroundColor: '#FCBC58',
        marginBottom:20,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 25,
    },
    navbar: {
        backgroundColor: '#4a686a',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height:60,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 25,
    },
    search: {
        alignItems: 'center',
        marginTop: 10,
    },
    textField: {
        borderRadius: 100, 
        color: "white", 
        width: "80%", 
        height: 40,
        backgroundColor: '#F6F8E2', 
        fontSize: 19, 
        marginVertical:15,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5,

    },
    body: {
        borderRadius: 20,
        width: 380,
        height:460,
        backgroundColor: '#FCBC58',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 25,
    },
    alertBox: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        width: 280,
        height:150,
        backgroundColor: '#F6F8E2',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
    },
    mapComponent: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        width: 340,
        height:200,
        backgroundColor: '#F6F8E2',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
    },
    map: {
        position: 'absolute'
    }
})

export default userHomeStyle;