'use client';

import MarkdownUpload from '@/components/MarkdownUpload';
import TopicList from '@/components/TopicList';
import ProgressTracker from '@/components/ProgressTracker';
import { useState } from 'react';

interface Topic {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  completed: boolean;
}

interface AdminPanelProps {
  topics: Topic[];
  onTopicUpload: (title: string, content: string) => void;
  onTopicDelete: (topicId: string) => void;
  onTopicComplete: (topicId: string) => void;
}

export default function AdminPanel({ 
  topics, 
  onTopicUpload, 
  onTopicDelete, 
  onTopicComplete 
}: AdminPanelProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-gray-600">Manage onboarding content and track team progress</p>
          </div>
          <ProgressTracker topics={topics} />
        </div>
      </div>

      {/* Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <MarkdownUpload onUpload={onTopicUpload} />
        </div>

        {/* Topics List */}
        <div className="lg:col-span-1">
          <TopicList 
            topics={topics}
            selectedTopic={selectedTopic}
            onTopicSelect={setSelectedTopic}
            onTopicComplete={onTopicComplete}
            onTopicDelete={onTopicDelete}
          />
        </div>

        {/* Topic Viewer */}
        <div className="lg:col-span-1">
          {selectedTopic ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTopic.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTopic.completed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedTopic.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                  {selectedTopic.content}
                </pre>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Uploaded: {new Date(selectedTopic.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm font-medium">Select a topic to view</p>
                <p className="text-xs">Choose a topic from the list to see its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
