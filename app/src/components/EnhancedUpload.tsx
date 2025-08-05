'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { topicsService } from '@/lib/topicsService';

interface Topic {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  completed: boolean;
  isDirectory?: boolean;
  sections?: any[];
}

interface EnhancedUploadProps {
  topics: Topic[];
  onUpload: (title: string, content: string) => void;
  onCreateDirectory: (title: string, content?: string) => void;
  onAddSection: (topicId: string, sectionTitle: string, content: string) => void;
}

export default function EnhancedUpload({ 
  topics, 
  onUpload, 
  onCreateDirectory, 
  onAddSection 
}: EnhancedUploadProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'file' | 'directory' | 'section'>('file');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const directoryTopics = topics.filter(topic => topic.isDirectory);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const fileName = file.name.replace('.md', '').replace(/[-_]/g, ' ');
      setTitle(fileName);
      setContent(content);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const mdFile = files.find(file => file.name.endsWith('.md'));
    
    if (mdFile) {
      handleFileRead(mdFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.md')) {
      handleFileRead(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (activeTab === 'file' && title && content) {
        await topicsService.createTopic(title, content);
        onUpload(title, content); // Still call the prop for consistency
        setTitle('');
        setContent('');
        window.location.reload(); // Refresh to show new content
      } else if (activeTab === 'directory' && title) {
        await topicsService.createTopicDirectory(title, content);
        onCreateDirectory(title, content);
        setTitle('');
        setContent('');
        window.location.reload();
      } else if (activeTab === 'section' && selectedTopic && sectionTitle && content) {
        await topicsService.addTopicSection(selectedTopic, sectionTitle, content);
        onAddSection(selectedTopic, sectionTitle, content);
        setSectionTitle('');
        setContent('');
        setSelectedTopic('');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still try the callback as fallback
      if (activeTab === 'file' && title && content) {
        onUpload(title, content);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSectionTitle('');
    setSelectedTopic('');
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Content</h3>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => { setActiveTab('file'); resetForm(); }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'file'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📄 Single Topic
            </button>
            <button
              onClick={() => { setActiveTab('directory'); resetForm(); }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'directory'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📁 Topic Directory
            </button>
            <button
              onClick={() => { setActiveTab('section'); resetForm(); }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'section'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ➕ Add Section
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'file' && (
            <>
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="font-medium text-primary hover:text-primary-dark"
                    >
                      Upload a markdown file
                    </button>
                    <span> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">MD files only</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".md"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Topic Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter topic title..."
                  required
                />
              </div>
            </>
          )}

          {activeTab === 'directory' && (
            <>
              <div>
                <label htmlFor="dir-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Directory Name
                </label>
                <input
                  type="text"
                  id="dir-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Git Workflow, API Documentation..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This will create a directory that can contain multiple sections</p>
              </div>

              <div>
                <label htmlFor="dir-overview" className="block text-sm font-medium text-gray-700 mb-1">
                  Overview Content <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="dir-overview"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Write an overview for this topic directory..."
                />
                <p className="text-xs text-gray-500 mt-1">This will be saved as the first section (01-overview.md)</p>
              </div>
            </>
          )}

          {activeTab === 'section' && (
            <>
              <div>
                <label htmlFor="topic-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Topic Directory
                </label>
                <select
                  id="topic-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Choose a topic directory...</option>
                  {directoryTopics.map(topic => (
                    <option key={topic.id} value={topic.id}>
                      📁 {topic.title}
                    </option>
                  ))}
                </select>
                {directoryTopics.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">No topic directories found. Create one first using the "Topic Directory" tab.</p>
                )}
              </div>

              <div>
                <label htmlFor="section-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  id="section-title"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Basic Commands, Best Practices..."
                  required
                />
              </div>
            </>
          )}

          {/* Content Textarea (for all tabs except when adding to existing directory without overview) */}
          {(activeTab !== 'directory' || content !== undefined) && (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Write your markdown content here..."
                required={activeTab === 'section'}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={
                (activeTab === 'file' && (!title || !content)) ||
                (activeTab === 'directory' && !title) ||
                (activeTab === 'section' && (!selectedTopic || !sectionTitle || !content))
              }
              className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {activeTab === 'file' && 'Create Topic'}
              {activeTab === 'directory' && 'Create Directory'}
              {activeTab === 'section' && 'Add Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
