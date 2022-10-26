export interface IndexProps {
  homeImageArr: image[];
  homeLandScapeImageArr: image[];
}

export interface image {
  id: string;
  imageurl: string;
  imagename: string;
}

export interface MainImageSwiperProps {
  homeImageArr: image[];
}

export interface LandscapeImageSwiperProps {
  homeLandScapeImageArr: image[];
}

export interface GalleryProps {
  galleryImages: image[];
}

export interface PackageSwiperProps {
  images: image[];
}

export interface BookingPageProps {
  individualSwiper: string;
  coupleSwiper: string;
  weddingSwiper: string;
}
