// src/lib/actions.js
'use server';

import { connectToDatabase } from './db';
import { revalidatePath } from 'next/cache';

export async function createNewRentPost(payload) {
    try {
        const { db } = await connectToDatabase();
        const propertiesCollection = db.collection('properties');

        const result = await propertiesCollection.insertOne({
            propertyTitle: payload.propertyTitle,
            description: payload.description,
            location: payload.location,
            propertyType: payload.propertyType,
            rentPrice: payload.rentPrice,
            rentType: payload.rentType,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            propertySize: payload.propertySize,
            amenities: payload.amenities,
            images: payload.images,
            extraFeatures: payload.extraFeatures,
            owner: payload.owner,
            status: payload.status,
            createdAt: new Date(),
        });

        revalidatePath('/dashboard/owner/my-properties');

        return {
            insertedId: result.insertedId.toString(),
        };
    } catch (error) {
        console.error('Error creating new rent post:', error);
        return {
            error: 'Failed to create new rent post.',
        };
    }
}
