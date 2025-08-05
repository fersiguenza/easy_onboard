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

    const items = await fs.readdir(topicsDir, { withFileTypes: true });
    const topics = [];

    for (const item of items) {
      if (item.isDirectory()) {
        // Handle directory-based topics with sections
        const dirPath = path.join(topicsDir, item.name);
        const dirFiles = await fs.readdir(dirPath);
        const markdownFiles = dirFiles.filter(file => file.endsWith('.md')).sort();
        
        if (markdownFiles.length > 0) {
          const sections = await Promise.all(
            markdownFiles.map(async (file, index) => {
              const filePath = path.join(dirPath, file);
              const content = await fs.readFile(filePath, 'utf-8');
              
              // Extract title from first heading or filename
              const titleMatch = content.match(/^#\s+(.+)$/m);
              const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
              
              return {
                id: `${item.name}-${file.replace('.md', '')}`,
                title,
                content,
                filename: file,
                order: index
              };
            })
          );

          // Combine all section content
          const combinedContent = sections.map(section => section.content).join('\n\n---\n\n');
          
          // Use directory name or first section title as topic title
          const topicTitle = sections[0]?.title || item.name.replace(/^\d+-/, '').replace(/-/g, ' ');
          
          topics.push({
            id: item.name,
            title: topicTitle,
            content: combinedContent,
            filename: item.name,
            isDirectory: true,
            sections,
            uploadedAt: new Date().toISOString()
          });
        }
      } else if (item.name.endsWith('.md')) {
        // Handle single file topics (legacy support)
        const filePath = path.join(topicsDir, item.name);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract title from first heading or filename
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : item.name.replace('.md', '');
        
        topics.push({
          id: item.name.replace('.md', ''),
          title,
          content,
          filename: item.name,
          isDirectory: false,
          uploadedAt: new Date().toISOString()
        });
      }
    }

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
    const { title, content, isDirectory = false, sectionTitle } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const customTopicsPath = process.env.TOPICS_STORAGE_PATH;
    const topicsDir = customTopicsPath || path.join(process.cwd(), 'content', 'topics');
    
    // Ensure topics directory exists
    await fs.mkdir(topicsDir, { recursive: true });

    if (isDirectory) {
      // Create a new topic directory
      const dirName = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50);
      
      const dirPath = path.join(topicsDir, dirName);
      
      // Check if directory already exists
      try {
        await fs.access(dirPath);
        return NextResponse.json(
          { error: 'A topic directory with this name already exists' },
          { status: 409 }
        );
      } catch {
        // Directory doesn't exist, which is what we want
      }

      // Create the directory
      await fs.mkdir(dirPath, { recursive: true });

      // Create an initial README.md file if content is provided
      if (content) {
        const readmeContent = `# ${title}\n\n${content}`;
        const readmePath = path.join(dirPath, '01-overview.md');
        await fs.writeFile(readmePath, readmeContent, 'utf-8');
      }

      return NextResponse.json({ 
        message: 'Topic directory created successfully',
        directoryName: dirName
      });

    } else if (sectionTitle) {
      // Add a section to an existing directory
      if (!content) {
        return NextResponse.json(
          { error: 'Content is required for sections' },
          { status: 400 }
        );
      }

      const dirPath = path.join(topicsDir, title);
      
      // Check if directory exists
      try {
        await fs.access(dirPath);
      } catch {
        return NextResponse.json(
          { error: 'Topic directory does not exist' },
          { status: 404 }
        );
      }

      // Get existing files to determine next number
      const existingFiles = await fs.readdir(dirPath);
      const markdownFiles = existingFiles.filter(f => f.endsWith('.md'));
      const nextNumber = String(markdownFiles.length + 1).padStart(2, '0');

      const sectionFilename = `${nextNumber}-${sectionTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 40)}.md`;

      const sectionPath = path.join(dirPath, sectionFilename);
      const markdownContent = `# ${sectionTitle}\n\n${content}`;
      
      await fs.writeFile(sectionPath, markdownContent, 'utf-8');

      return NextResponse.json({ 
        message: 'Section added successfully',
        filename: sectionFilename
      });

    } else {
      // Create a single file topic (legacy support)
      if (!content) {
        return NextResponse.json(
          { error: 'Content is required' },
          { status: 400 }
        );
      }

      const filename = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50) + '.md';

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
    }
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}
