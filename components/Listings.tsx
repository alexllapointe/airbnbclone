import { useRouter } from 'expo-router';
import React, { useState, useEffect, FC } from 'react';
import categoryImages from './categoryImages';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ListingsProps {
    category: string;
}

interface ImageInfo {
    id: string,
    source: any;
    imageName: string;
    title: string;
    description: string;
}


const getImageForCategory = (category: string): ImageInfo[] => {
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
    const images: ImageInfo[] = [];

    Object.entries(categoryImages).forEach(([key, value]) => {
        const keyNormalized = key.toLowerCase().replace(/\s+/g, '');
        if (keyNormalized === normalizedCategory) {
            value.forEach((imageInfo: ImageInfo) => {
                if (imageInfo.imageName.toLowerCase().includes(normalizedCategory)) {
                    images.push(imageInfo);
                }
            });
        }
    });

    return images;
};

const Listings: FC<ListingsProps> = ({ category }) => {
    const [images, setImages] = useState<ImageInfo[]>([]);
    const router = useRouter();

    useEffect(() => {
        const newImages = getImageForCategory(category);
        setImages(newImages);
    }, [category]);

    return (
        <ScrollView style={styles.scrollView}>
            {images.map((imageInfo, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => {
                        router.push({
                            pathname: `/listing/${imageInfo.id}`,
                            params: { id: imageInfo.id },
                        });
                    }}
                >
                    <Image source={imageInfo.source} style={styles.image} />
                    <Text style={styles.title}>{imageInfo.title}</Text>
                    <Text style={styles.description}>{imageInfo.description}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        paddingBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        margin: 10,
    },
    description: {
        marginHorizontal: 10,
    },
});

export default Listings;