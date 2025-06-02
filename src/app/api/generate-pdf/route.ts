import generatePDF from '@/utils/generate-pdf';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the template type from query parameters
    const { searchParams } = new URL(request.url);
    const template = searchParams.get('template') || 'premium-summary';
    
    let data = {};
    let filename = 'document.pdf';
    
    // Set template-specific data
    if (template === 'questions') {
      data = {
        title: "Questions & Answers",
        paginationTitle: "Q&A",
        paginationNumber: "01"
      };
      filename = 'questions.pdf';
    } else {
      // Default to premium summary
      data = {
        title: "Premium Summary",
        paginationTitle: "Premium Details",
        paginationNumber: "01"
      };
      filename = 'premium-summary.pdf';
    }
    
    const result = await generatePDF({
      colors: {
        primary: '#fff',   
        accent: '#214850',     
        background: '#f6f7f8', 
      },
      template,
      data
    });

    
    return new NextResponse(result, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

