export interface USER_INTERFACE {
    customer_id: number,
    full_name: string,
    email: string,
    phone_number: string,
    profile_image: string,
    profile_images_name: string,
    about: string,
    address: number
}

export interface API_RESPONSE {
    settings?: {
        success: number,
        message: string,
        status: number,
        access_token?: string
    },
    data?: any
}

export interface APP_SORE {
    user: USER_INTERFACE,
    loader: {
        value: boolean
    }
}