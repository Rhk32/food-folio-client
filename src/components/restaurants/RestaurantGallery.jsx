import Image from 'next/image';

export default function RestaurantGallery({ images, restaurantName }) {
    if (!images.length) return <p className="rounded-2xl bg-white p-6 text-sm text-gray-500">No community photos yet.</p>;

    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {images.slice(0, 12).map((image) => (
                <div key={image.id} className="relative aspect-square overflow-hidden rounded-2xl bg-orange-50">
                    <Image src={image.image_url} alt={`${restaurantName} community photo`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-300 hover:scale-105" />
                </div>
            ))}
        </div>
    );
}
