import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: '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',
    });
  }

  async generateParty(prompt: string) {
    try {
      const response = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an elite event planning AI for Hookin, India's premium event planning platform. 
The user will give you a prompt. Reply with a highly curated party plan. 
Return ONLY a valid JSON object matching this exact schema, without markdown formatting:
{
  "title": "A catchy title",
  "theme": "Event theme name",
  "budget": "Approximate budget in INR",
  "vendors": [{"category": "Venue/Decor/etc", "recommendation": "What to look for"}],
  "itinerary": ["18:00 - Arrival", "19:00 - Drinks"]
}`
          },
          {
            role: 'user',
            content: prompt,
          }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      return JSON.parse(response.choices[0]?.message?.content || '{}');
    } catch (error) {
      console.error('Groq AI Error:', error);
      throw new HttpException('Failed to generate AI plan', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
