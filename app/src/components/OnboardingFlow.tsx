'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { themeConfig, getButtonStyles } from '@/lib/theme';

interface Topic {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  completed: boolean;
}

interface OnboardingFlowProps {
  topics: Topic[];
  onTopicComplete: (topicId: string) => void;
}

export default function OnboardingFlow({ topics, onTopicComplete }: OnboardingFlowProps) {
  const { t } = useTranslation();
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  if (topics.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-primary-light rounded-full flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('home.welcome')} {t('app.title')}!</h1>
          <p className="text-lg text-gray-600">
            {t('home.noTopics')}
          </p>
        </div>
      </div>
    );
  }

  const currentTopic = topics[currentTopicIndex];
  const totalTopics = topics.length;
  const completedTopics = topics.filter(topic => topic.completed).length;
  const progressPercentage = (completedTopics / totalTopics) * 100;

  const goToNext = () => {
    // Mark current topic as complete before moving to next
    if (!currentTopic.completed) {
      onTopicComplete(currentTopic.id);
    }
    
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-theme">
      {/* Left Navigation Sidebar */}
      <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200 flex flex-col shadow-lg">
        {/* Progress Header */}
        <div className="p-6 border-b border-gray-200 bg-white/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Progress</h2>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">
              {completedTopics} of {totalTopics} completed
            </span>
            <span className="text-lg font-bold text-primary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Topic Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Onboarding Topics</h3>
            <div className="space-y-2">
              {topics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => setCurrentTopicIndex(index)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    index === currentTopicIndex
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mr-2 ${
                          topic.completed 
                            ? 'bg-green-500 text-white' 
                            : index === currentTopicIndex
                            ? 'bg-primary text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {topic.completed ? '✓' : index + 1}
                        </span>
                        <span className={`text-sm font-medium truncate ${
                          index === currentTopicIndex ? 'text-primary-dark' : 'text-gray-900'
                        }`}>
                          {topic.title}
                        </span>
                      </div>
                      <div className={`text-xs ml-8 ${
                        topic.completed 
                          ? 'text-green-600' 
                          : index === currentTopicIndex
                          ? 'text-primary'
                          : 'text-gray-500'
                      }`}>
                        {topic.completed ? 'Completed' : index === currentTopicIndex ? 'Current' : 'Pending'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Completion Celebration in Sidebar */}
        {completedTopics === totalTopics && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-4 text-center text-white shadow-lg">
              <div className="mb-2">
                <svg className="mx-auto h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">Congratulations! 🎉</h3>
              <p className="text-xs opacity-90">Onboarding Complete!</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Current Topic */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              {/* Topic Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {currentTopic.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('onboarding.step', { current: currentTopicIndex + 1, total: totalTopics })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentTopic.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {currentTopic.completed ? `✓ ${t('onboarding.completed')}` : t('onboarding.inProgress')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Topic Content */}
              <div className="px-6 py-8">
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Custom styling for code blocks
                      pre: ({ children }) => (
                        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
                          {children}
                        </pre>
                      ),
                      // Custom styling for inline code
                      code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                          return (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                              {children}
                            </code>
                          );
                        }
                        return <code className={className}>{children}</code>;
                      },
                      // Custom styling for headers
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8 first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                          {children}
                        </h3>
                      ),
                      // Custom styling for lists
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1 mb-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1 mb-4">
                          {children}
                        </ol>
                      ),
                      // Custom styling for paragraphs
                      p: ({ children }) => (
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {currentTopic.content}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={goToPrevious}
                    disabled={currentTopicIndex === 0}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← {t('onboarding.previous')}
                  </button>
                  
                  <button
                    onClick={goToNext}
                    disabled={currentTopicIndex === topics.length - 1}
                    className="px-6 py-2 text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    style={getButtonStyles('primary')}
                  >
                    {currentTopicIndex === topics.length - 1 ? t('onboarding.complete') : `${t('onboarding.next')} →`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
