import { getSecretKey } from "../config/apiKey";

const axios = require('axios');

const requests = {
    "model": "gpt-3.5-turbo",
    "messages": [{ "role": "user", "content": "" }],
    "temperature": 0.7
}

// const token = process.env.GPT_SECRET_KEY; 
// const token = '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';
const token = getSecretKey();

// Axios request configuration
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
};


const BaseService = 'https://api.openai.com/v1/chat/completions';

export async function postApi(stringFunction: string) {
    let result = {
        error: true,
        data: ""
    };
    // console.log(token);
    const requestData = requests;
    requestData.messages[0].content = "please create unit test of this function " + stringFunction;

    const data = await axios.post(BaseService, requestData, config)
        .then((response: any) => {
            // Handle the successful response
            result.error = false;
            const realContent = response.data.choices[0].message.content;
            console.log(realContent);
            const content = realContent.split("```");
            console.log(content);
            result.data = content[1];

            return result;
        })
        .catch((error: any) => {
            // Handle any errors that occur during the request
            console.error(error);
            result.error = true;
            result.data = error;

            return result;
        });
    result = data;
    console
    return result;
}