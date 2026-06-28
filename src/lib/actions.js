// src/lib/actions.js
'use server';

import { connectToDatabase } from './db';
import { revalidatePath } from 'next/cache';

export async function createNewRentPost(payload) {
    try {
        const { db } = await connectToDatabase();
        const propertiesCollection = db.collection('properties');

        const result = await propertiesCollection.insertOne({
            ...payload,
            price: parseFloat(payload.price),
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
