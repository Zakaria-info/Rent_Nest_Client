const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProperty = async (propertyId, status = 'approved') => {
    const res = await fetch(`${baseUrl}/api/properties?propertyId=${propertyId}&status=${status}`);
    return res.json();
}