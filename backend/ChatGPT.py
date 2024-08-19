from openai import OpenAI
from .Constants import API_KEY


def ChatGPT(message):
    client = OpenAI(api_key=API_KEY)
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f'Is this message considered offensive (please give a concise yes or no answer and then a description why with a line break inbetween): "{message}"'
            }
        ]
    )

    result = completion.choices[0].message.content
    
    ans = True if 'Yes' in result.split('\n')[0] else False
    reason = result.split('\n')[-1]

    return ans, reason