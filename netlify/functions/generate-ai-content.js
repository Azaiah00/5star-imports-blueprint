/* ===================================
   NETLIFY SERVERLESS FUNCTION
   Securely handles OpenAI API calls
   
   This function runs on Netlify's servers (not client-side)
   keeping your API key safe and secure.
   =================================== */

// Handler function that Netlify calls for each request
exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // Parse the incoming request body
        const { prompt } = JSON.parse(event.body);

        // Validate that a prompt was provided
        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Prompt is required' })
            };
        }

        // Get OpenAI API key from environment variable (set in Netlify dashboard)
        const apiKey = process.env.OPENAI_API_KEY;

        // Check if API key is configured
        if (!apiKey) {
            console.error('OPENAI_API_KEY not configured in Netlify environment variables');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration error' })
            };
        }

        // Call OpenAI API from the server side
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Fast and cost-effective model
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 300
            })
        });

        // Check if OpenAI API request was successful
        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI API error:', errorData);
            return {
                statusCode: response.status,
                body: JSON.stringify({ 
                    error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}` 
                })
            };
        }

        // Parse OpenAI response
        const data = await response.json();
        const generatedText = data.choices[0].message.content;

        // Return successful response to client
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // Allow requests from your domain (CORS)
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ 
                result: generatedText 
            })
        };

    } catch (error) {
        // Handle any unexpected errors
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Internal server error',
                details: error.message 
            })
        };
    }
};

