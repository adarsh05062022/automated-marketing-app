import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-ai-query-dialog',
  templateUrl: './ai-query-dialog.component.html',
  styleUrl: './ai-query-dialog.component.css',
})
export class AiQueryDialogComponent {
  userQuery: string = '';
  aiResponse: string = ''; // To store AI response
  loading: boolean = false;
  private apiKey: string = ''; //  your API Key Gemini API Key

  constructor(
    public modalRef: MdbModalRef<AiQueryDialogComponent>,
    private http: HttpClient
  ) {}

  generate() {
    if (!this.userQuery.trim()) return;

    this.loading = true;
    this.aiResponse = ''; // Clear old response

    // Set up the request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text:
                `You are an expert digital marketing strategist.

I want to run a digital advertisement campaign using agents on different social media platforms like Facebook, Instagram, and LinkedIn.

Given the following topic: "${this.userQuery}", generate the following: 1. **Title**: A short, catchy title for the ad campaign.
2. **Description**: A detailed and engaging description for the campaign that appeals to the target audience.
3. **Final Budget Suggestion**: A realistic final budget for running the ads on these platforms, along with a 2-3 line explanation justifying the suggested budget.

Please format the output clearly with headings for Title, Description, and Final Budget.` 
            },
          ],
        },
      ],
    };

    // Make the POST request to the Gemini API
    this.http
      .post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        requestBody
      )
      .subscribe(
        (response: any) => {
          console.log('Full response:', response); // Log the entire response to inspect its structure

          // Check if there are candidates and parts available
          if (
            response &&
            response.candidates &&
            response.candidates.length > 0
          ) {
            // Extract the generated content from the first candidate
            const content = response.candidates[0].content;
            const text = content?.parts?.[0]?.text;

            // Display the content
            if (text) {
              this.aiResponse = `🚀 Campaign generated based on: "${this.userQuery}"\n\n${text}`;
            } else {
              this.aiResponse = 'No campaign details generated.';
            }
          } else {
            this.aiResponse = 'No content available in response.';
          }

          this.loading = false;
        },
        (error) => {
          // Handle the error response here
          console.error('Error occurred:', error);
          this.aiResponse = 'Error generating content. Please try again.';
          this.loading = false;
        }
      );
  }

  useResponse() {
    this.modalRef.close(this.aiResponse); // Close the modal and return the AI response
  }

  cancel() {
    this.modalRef.close(null); // Cancel and close the modal
  }
}
