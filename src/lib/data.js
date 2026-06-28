import { connectToDatabase } from './db';

export async function getPropertiesByOwner(ownerId) {
    try {
        const { db } = await connectToDatabase();
        const propertiesCollection = db.collection('properties');

        const properties = await propertiesCollection.find({ owner: ownerId }).toArray();

        // MongoDB returns _id as an ObjectId. We need to convert it to a string
        // so it can be serialized for the client component if needed.
        return properties.map(property => ({
            ...property,
            id: property._id.toString(),
            _id: undefined, // remove _id
            owner: property.owner.toString(), // Also ensure owner is a string
        }));
    } catch (error) {
        console.error('Error fetching properties by owner:', error);
        return [];
    }
}
