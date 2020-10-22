import { CLOUDINARY_FOLDER_NAME } from '../constants'

export const getImagePublicId = (image: string) => {
  return `${CLOUDINARY_FOLDER_NAME}/${image?.split('/')[8].split('.')[0]}`
}
