import { IMessageItem, IMessageToApi } from "../interfaces/chat";


export const createChat = async (input: string, messages: IMessageToApi[]): Promise<IMessageItem> => {
  let Authorization = `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`; 
  try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: Authorization ? Authorization : '' //'Bearer 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',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages,
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await response.json();
      return {...data.choices[0].message, date: new Date()};
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      throw new Error('Error al obtener los datos de la API');
    }
};