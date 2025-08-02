import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check for custom topics directory first (for Docker deployments)
    const customTopicsPath = process.env.TOPICS_STORAGE_PATH;
    
    // Default to project content/topics directory
    const topicsDir = customTopicsPath || path.join(process.cwd(), 'content', 'topics');
    
    // Check if topics directory exists
    try {
      await fs.access(topicsDir);
    } catch {
      return NextResponse.json({ topics: [] });
    }

    const files = await fs.readdir(topicsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const topics = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(topicsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract title from first heading or filename
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
        
        return {
          id: file.replace('.md', ''),
          title,
          content,
          filename: file
        };
      })
    );

    // Sort topics by filename for consistent ordering
    topics.sort((a, b) => a.filename.localeCompare(b.filename));

    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Error loading topics:', error);
    return NextResponse.json(
      { error: 'Failed to load topics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate filename from title
    const filename = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50) + '.md';

    const customTopicsPath = process.env.TOPICS_STORAGE_PATH;
    const topicsDir = customTopicsPath || path.join(process.cwd(), 'content', 'topics');
    
    // Ensure topics directory exists
    await fs.mkdir(topicsDir, { recursive: true });
    
    const filePath = path.join(topicsDir, filename);
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: 'A topic with this title already exists' },
        { status: 409 }
      );
    } catch {
      // File doesn't exist, which is what we want
    }

    // Create the content with proper markdown format
    const markdownContent = `# ${title}\n\n${content}`;
    await fs.writeFile(filePath, markdownContent, 'utf-8');

    return NextResponse.json({ 
      message: 'Topic created successfully',
      filename 
    });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}
