import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Button, Linking} from 'react-native';
import axios from 'axios';


export default function Products() {
    const [products, setProducts] = useState([]);

    //Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        axios.get('http://192.168.0.175:3334/products/')
        .then(response => setProducts(response.data.docs))
    }, [products])


    async function handleSubmit(event) {
        await axios.post('http://192.168.0.175:3334/products/', {
            title,
            description,
            url
        })
        .then(() => {
            alert("Sucessfully added!")
            setTitle('');
            setDescription('');
            setUrl('');
          })
        .catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>

        <View>
            <TextInput style={styles.inputTitle}
                placeholder="Title"
                onChangeText={title => setTitle(title)}
                value={title}
            />
            <TextInput style={styles.inputDescription}
            placeholder="Description"
                onChangeText={description => setDescription(description)}
                value={description}
            />
            <TextInput style={styles.inputUrl}
            placeholder="Url"
                onChangeText={url => setUrl(url)}
                value={url}
            />
            <Text style={styles.submitBtn} onPress={handleSubmit}>Add</Text>
        </View>

            <FlatList 
                data={products}
                renderItem={({item}) => 
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                        <Text style={styles.cardLink} onPress={() => Linking.openURL(item.url)}>{item.url}</Text>
                        <Text style={styles.editBtn} >Edit</Text>
                        <Text style={styles.deleteBtn}>Delete</Text>
                    </View>
                }
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#000',
        alignSelf: 'stretch',  
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#ffffff',
        padding: 10,
        fontWeight: 'bold'
    },
    form: {
        marginTop: 20
    },
    inputTitle: {
        backgroundColor: '#ffffff',
        fontSize: 14,
        padding: 3,
        marginVertical: 1
    },
    inputDescription: {
        backgroundColor: '#ffffff',
        fontSize: 14,
        padding: 3,
        marginVertical: 1
    },
    inputUrl: {
        backgroundColor: '#ffffff',
        fontSize: 14,
        padding: 3,
        marginVertical: 1
    },
    submitBtn: {
        backgroundColor: '#fff333',
        fontSize: 14,
        padding: 5,
        marginVertical: 1
    },
    card: {
        backgroundColor: '#141414',
        padding: 10,
        marginVertical: 10,
        borderColor: '#fff333',
        borderStyle: 'solid',
        borderWidth: 1
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    cardDescription: {
        color: '#fff',
        fontSize: 14,
        marginVertical: 5,
    },
    cardLink: {
        color: '#fff333',
        fontSize: 14,
        marginVertical: 5,
    },
    editBtn: {
        backgroundColor: '#484848',
        color: "#ffffff",
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 5
    },
    deleteBtn: {
        backgroundColor: '#464646',
        color: "#ffffff",
        color: "#141414",
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    }

});