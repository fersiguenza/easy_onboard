'use client';

import { useTranslation } from 'react-i18next';
import { themeConfig } from '@/lib/theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CongratulationsProps {
  onBackToHome: () => void;
  completedTopicsCount: number;
}

export default function Congratulations({ onBackToHome, completedTopicsCount }: CongratulationsProps) {
  const { t } = useTranslation();

  const congratulationsMessage = `# ${t('congratulations.title')}

${t('congratulations.subtitle')}

## ${t('congratulations.accomplishments')}
- ✅ ${t('congratulations.topicsCompleted', { count: completedTopicsCount })}
- ✅ ${t('congratulations.knowledgeGained')}
- ✅ ${t('congratulations.readyToContribute')}

## ${t('congratulations.nextSteps')}
1. ${t('congratulations.applyKnowledge')}
2. ${t('congratulations.askQuestions')}
3. ${t('congratulations.keepLearning')}

## ${t('congratulations.welcome')}

${t('congratulations.finalMessage')}

---

${t('congratulations.helpNote')}`;

  return (
    <div className="min-h-screen bg-gradient-theme">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="mx-auto h-32 w-32 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          {/* Animated confetti effect */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎊</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-8 py-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-4xl prose-h1:text-center prose-h1:mb-8 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-strong:text-primary">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-3 mb-6">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{children}</span>
                    </li>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-6">
                      {children}
                    </ol>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-primary font-semibold">
                      {children}
                    </strong>
                  ),
                  hr: () => (
                    <hr className="my-8 border-gray-300" />
                  ),
                }}
              >
                {congratulationsMessage}
              </ReactMarkdown>
            </div>
          </div>

          {/* Action Button */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={onBackToHome}
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                🏠 {t('onboarding.backToHome')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
