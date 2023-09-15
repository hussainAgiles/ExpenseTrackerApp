
export const baseUrl = `https://laravelservice.agileidc.com/api`;



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
    Upload_Image :`${baseUrl}/imageupload`,
    download_Excel :`${baseUrl}/transaction_excel_data`


}















