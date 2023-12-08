
interface ImageInfo {
    id: string,
    source: any;
    imageName: string;
    title: string;
    description: string;
}

interface CategoryImagesType {
    [key: string]: ImageInfo[];
    Cabins: ImageInfo[];
    Countryside: ImageInfo[];
    Play: ImageInfo[];
    TinyHomes: ImageInfo[];
    Trending: ImageInfo[];
    Beachfront: ImageInfo[];
    City: ImageInfo[];
}

const categoryImages: CategoryImagesType = {
    'Cabins': [
        {
            id: 'cabins1',
            source: require('../assets/images/cabins2.jpeg'),
            imageName: 'cabins2',
            title: 'Cozy Cabin',
            description: 'A cozy cabin in the woods',
        },
        {
            id: 'cabins2',
            source: require('../assets/images/cabins3.jpeg'),
            imageName: 'cabins3',
            title: 'Mountain Retreat',
            description: 'A serene mountain retreat',
        },
    ],
    'Countryside': [
        {
            id: 'countryside1',
            source: require('../assets/images/countryside1.jpeg'),
            imageName: 'countryside1',
            title: 'Countryside Escape',
            description: 'A peaceful escape in the countryside',
        },
    ],
    'Play': [
        {
            id: 'play1',
            source: require('../assets/images/play1.jpeg'),
            imageName: 'play1',
            title: 'Fun Playground',
            description: 'A colorful and fun playground for kids',
        },
    ],
    'TinyHomes': [
        {
            id: 'tinyhomes1',
            source: require('../assets/images/tinyhomes1.jpeg'),
            imageName: 'tinyhomes1',
            title: 'Blue Home',
            description: 'A fun blue tiny home.',
        },
        {
            id: 'tinyhomes2',
            source: require('../assets/images/tinyhomes2.jpeg'),
            imageName: 'tinyhomes2',
            title: 'Grey Home',
            description: 'A fun grey tiny home.',
        },
        {
            id: 'tinyhomes3',
            source: require('../assets/images/tinyhomes3.jpeg'),
            imageName: 'tinyhomes3',
            title: 'Black Home',
            description: 'A fun black tiny home.',
        },

    ],
    'Trending': [
        {
            id: 'trending1',
            source: require('../assets/images/trending1.jpeg'),
            imageName: 'trending1',
            title: 'Trending house.',
            description: 'A trending house.',
        },
    ],
    'Beachfront': [
        {
            id: 'beachfront1',
            source: require('../assets/images/beachfront1.jpeg'),
            imageName: 'beachfront1',
            title: 'Beach Home',
            description: 'A beautiful beach home.',
        },
    ],
    'City': [
        {
            id: 'city1',
            source: require('../assets/images/city1.jpeg'),
            imageName: 'city1',
            title: 'City Home',
            description: 'An elegant city home.',
        },
    ],
};

export default categoryImages;