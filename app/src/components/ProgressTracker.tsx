'use client';

interface Topic {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  topics: Topic[];
}

export default function ProgressTracker({ topics }: ProgressTrackerProps) {
  const totalTopics = topics.length;
  const completedTopics = topics.filter(topic => topic.completed).length;
  const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  if (totalTopics === 0) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">No topics yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Progress Text */}
      <div className="text-sm text-gray-600">
        <span className="font-medium text-primary">{completedTopics}</span>
        {' of '}
        <span className="font-medium">{totalTopics}</span>
        {' completed'}
      </div>
      
      {/* Progress Bar */}
      <div className="w-32 bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Percentage */}
      <div className="text-sm font-medium text-gray-700 min-w-[3rem]">
        {Math.round(progressPercentage)}%
      </div>
      
      {/* Completion Badge */}
      {progressPercentage === 100 && (
        <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>Complete!</span>
        </div>
      )}
    </div>
  );
}
