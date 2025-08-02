'use client';

interface Topic {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  completed: boolean;
}

interface TopicListProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onTopicSelect: (topic: Topic) => void;
  onTopicComplete: (topicId: string) => void;
  onTopicDelete: (topicId: string) => void;
}

export default function TopicList({ 
  topics, 
  selectedTopic, 
  onTopicSelect, 
  onTopicComplete, 
  onTopicDelete 
}: TopicListProps) {
  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Topics</h2>
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-sm">No topics uploaded yet</p>
          <p className="text-gray-400 text-xs mt-1">Upload your first Markdown file to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Onboarding Topics ({topics.length})
      </h2>
      
      <div className="space-y-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              selectedTopic?.id === topic.id
                ? 'border-primary bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onTopicSelect(topic)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm mb-1">
                  {topic.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(topic.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-2">
                {/* Complete/Incomplete Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTopicComplete(topic.id);
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    topic.completed
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={topic.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </button>
                
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this topic?')) {
                      onTopicDelete(topic.id);
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete topic"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-2">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                topic.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {topic.completed ? (
                  <>
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    In Progress
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
