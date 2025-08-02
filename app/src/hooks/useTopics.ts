import { useState, useEffect } from 'react';
import { topicsService } from '@/lib/topicsService';
import { Topic, UseTopicsReturn } from '@/types';
import { config } from '@/config';

export function useTopics(): UseTopicsReturn {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTopics = await topicsService.getTopics();
      setTopics(fetchedTopics);
    } catch (err) {
      console.error('Error loading topics:', err);
      setError('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async (title: string, content: string) => {
    try {
      setError(null);
      const newTopic = await topicsService.createTopic(title, content);
      setTopics(prev => [...prev, newTopic]);
    } catch (err) {
      console.error('Error creating topic:', err);
      setError('Failed to create topic');
      throw err;
    }
  };

  const deleteTopic = async (id: string) => {
    try {
      setError(null);
      await topicsService.deleteTopic(id);
      setTopics(prev => prev.filter(topic => topic.id !== id));
    } catch (err) {
      console.error('Error deleting topic:', err);
      setError('Failed to delete topic');
      throw err;
    }
  };

  const updateTopicCompletion = async (id: string, completed: boolean) => {
    const topic = topics.find(t => t.id === id);
    if (!topic) return;

    try {
      setError(null);
      await topicsService.updateTopicCompletion(id, completed);
      setTopics(prev => 
        prev.map(topic => 
          topic.id === id 
            ? { ...topic, completed }
            : topic
        )
      );
    } catch (err) {
      console.error('Error updating topic completion:', err);
      setError('Failed to update topic');
      throw err;
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  // Save topics to localStorage as backup
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem(config.storage.topics, JSON.stringify(topics));
    }
  }, [topics]);

  return {
    topics,
    loading,
    error,
    loadTopics,
    createTopic,
    deleteTopic,
    updateTopicCompletion,
  };
}
