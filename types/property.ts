export interface Property {
  propertiesSid: string
  propertiesId: string
  propertiesTypeSid: string
  propertiesTypeName: string
  propertiesTypeSlug: string
  propertiesThumbnail: string
  propertiesName: string
  propertiesSlug: string
  propertiesAddress: string
  minPrice: number
  lat: number
  long: number
  subDistrictsName: string
  regenciesName: string
  provincesName: string
  ratingAvg: number
  ratingCount: number
  discountType: string | null
  discountValue: number
  photos: Photo[]
  amenities: Amenity[]
}

export interface Photo {
  propertiesPhotoSid: string
  photoCategoriesSid: string
  photoCategoriesName: string
  images: string
}

export interface Amenity {
  propertiesAmenitiesSid: string
  amenitiesSid: string
  amenitiesName: string
  amenitiesSlug: string
  amenitiesIcon: string
}
