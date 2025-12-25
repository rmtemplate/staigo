export interface PropertyRooms {
  propertiesRoomsSid: string
  propertiesRoomsId: string
  propertiesSid: string
  propertiesTypeRoomsSid: string
  propertiesTypeRoomsName: string
  propertiesTypeRoomsSlug: string
  propertiesRoomsThumbnail: string
  propertiesRoomsName: string
  propertiesRoomsSlug: string
  adults: number
  children: number
  basePrice: number
  numberOfRooms: number
  discountType: string
  discountValue: number
  priceAvailability: PriceAvailability[]
  description: string
  photos: Photo[]
  amenities: Amenity[]
}

export interface PriceAvailability {
  date: string
  basePrice: number
  numberOfRooms: number
  discountValue: number
}

export interface Photo {
  propertiesRoomsPhotoSid: string
  photoCategoriesSid: string
  photoCategoriesName: string
  images: string
}

export interface Amenity {
  propertiesRoomsAmenitiesSid: string
  amenitiesSid: string
  amenitiesName: string
  amenitiesSlug: string
  amenitiesIcon: string
}
