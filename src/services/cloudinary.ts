import cloudinary from 'cloudinary'

import { CLOUDINARY_FOLDER_NAME } from '../constants'

const options = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folder: CLOUDINARY_FOLDER_NAME,
}

export const Cloudinary = {
  uploadImage: async (imageBase64: string) => {
    const res = await cloudinary.v2.uploader.upload(imageBase64, options)
    return res.secure_url
  },
  removeImage: (publicId: string) => {
    cloudinary.v2.uploader.destroy(publicId, options as any)
  },
}
