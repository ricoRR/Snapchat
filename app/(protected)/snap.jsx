import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '@/ctx';

const Snap = () => {
    const api_k = process.env.EXPO_PUBLIC_API_KEY;
    const {session} = useSession();
    const params = useLocalSearchParams();
    const { id  } = params;

    console.log(id,"id")

    const [snapData, setSnapData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState();

    let router = useRouter()

    const headers = {
        'x-api-key': api_k,
        'Authorization': 'Bearer ' + session
    };

    useEffect(() => {
        const fetchSnap = async () => {
            try {
              
                const response = await axios.get(`https://snapchat.epidoc.eu/snap/${id}`,{headers});

                await axios.put(`https://snapchat.epidoc.eu/snap/seen/${id}`,{},{headers});

                setSnapData(response.data.data);
                setTimeLeft(response.data.data.duration);  

                const interval = setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1);
                }, 1000);

                setTimeout(async (id) => {
                    clearInterval(interval);  

                    console.log('Snap MArk as seen')
                    router.replace('/allsnap')
                }, response.data.data.duration * 1000);

                return () => clearInterval(interval);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchSnap();
    }, [id]);


    

 

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            {snapData ? (
                <Image
                    style={styles.snapImage}
                    source={{ uri: snapData.image }}
                    resizeMode="contain"
                />
            ) : (
                <Text>No snap found</Text>
            )}
            <Text style={styles.timer}>{timeLeft} second</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    snapImage: {
        width: 300,
        height: 500
    },
    errorText: {
        color: 'red'
    },
    timer: {
        position: 'absolute',
        bottom: 10,
        color: 'white',
        fontSize: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 5,
    }
});

export default Snap;
