import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSession } from '@/ctx';
import UserSnapCard from '@/components/userSnapCard';

const AllSnap = () => {
    const api_k = process.env.EXPO_PUBLIC_API_KEY;
    const {session} = useSession();
    const [snaps, setSnaps] = useState([]);
    useEffect(() => {
        const fetchSnaps = async () => {
            try {
                const headers = {
                    'x-api-key': api_k,
                    'Authorization': 'Bearer ' + session
                };
                const response = await axios.get('https://snapchat.epidoc.eu/snap',{headers});
                setSnaps(response.data.data);  
            } catch (error) {
                console.error(error);
            }
        };

        fetchSnaps();
    }, []);

    return (
        <FlatList
            data={snaps}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <UserSnapCard id={item._id}  from={item.from} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        width:"full",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor:"white"
    },
    text: {
        fontSize: 18,
        color:'white'
    }
});

export default AllSnap;
