import { CLOUDINARY_FOLDER_NAME } from '../constants'

export const getPublicId = (image: string) => {
  return `${CLOUDINARY_FOLDER_NAME}/${image?.split('/')[8].split('.')[0]}`
}
