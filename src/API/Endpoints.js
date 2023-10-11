
// export const baseUrl = `https://laravelservice.agileidc.com/api`;
export const baseUrl = `http://192.168.2.126:8000/api`;

// This URL is used to append in images along with the path that we get in
// export const imageBaseUrl = `https://laravelservice.agileidc.com`;

export const imageBaseUrl = `http://192.168.2.126:8000`;


export const URL_CONSTANTS = {
    // Authentication
    login_URL :`${baseUrl}/login`,
    reset_Password :`${baseUrl}/reset_password`,
    change_password :`${baseUrl}/reset/password`,

    // Category CRUD
    fetch_Category : `${baseUrl}/fetch_all_categories_employee`,
    create_Category : `${baseUrl}/create_categories`,
    update_Category : `${baseUrl}/fetch_category_by_slug`,

    // Transaction CRUD
    add_Transaction:`${baseUrl}/create_transaction`,
    fetch_Transaction :`${baseUrl}/fetch_transaction_data`,
    update_Transaction :`${baseUrl}/fetch_transaction_slug`,
    delete_Transaction : `${baseUrl}/delete_transaction`,

    // Download and Upload Image
    upload_Image :`${baseUrl}/imageupload`,
    multiImage:`${baseUrl}/multiple_image_upload`,
    download_Excel :`${baseUrl}/transaction_excel_data`


}















