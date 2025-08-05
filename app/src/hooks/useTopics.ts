import { useState, useEffect, useCallback } from 'react';
import { topicsService } from '@/lib/topicsService';
import { Topic, UseTopicsReturn } from '@/types';
import { config } from '@/config';

export function useTopics(): UseTopicsReturn {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTopics = useCallback(async () => {
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
  }, []);

  const createTopic = useCallback(async (title: string, content: string) => {
    try {
      setError(null);
      const newTopic = await topicsService.createTopic(title, content);
      setTopics(prev => [...prev, newTopic]);
    } catch (err) {
      console.error('Error creating topic:', err);
      setError('Failed to create topic');
      throw err;
    }
  }, []);

  const deleteTopic = useCallback(async (id: string) => {
    try {
      setError(null);
      await topicsService.deleteTopic(id);
      setTopics(prev => prev.filter(topic => topic.id !== id));
    } catch (err) {
      console.error('Error deleting topic:', err);
      setError('Failed to delete topic');
      throw err;
    }
  }, []);

  const updateTopicCompletion = useCallback(async (id: string, completed: boolean) => {
    try {
      setError(null);
      await topicsService.updateTopicCompletion(id, completed);
      setTopics(prev => {
        const topic = prev.find(t => t.id === id);
        if (!topic) return prev;
        
        return prev.map(topic => 
          topic.id === id 
            ? { ...topic, completed }
            : topic
        );
      });
    } catch (err) {
      console.error('Error updating topic completion:', err);
      setError('Failed to update topic');
      throw err;
    }
  }, []);

  const clearTopics = useCallback(() => {
    setTopics([]);
    localStorage.removeItem(config.storage.topics);
  }, []);

  // Only load topics on mount, not when callbacks change
  useEffect(() => {
    let mounted = true;
    const loadInitialTopics = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedTopics = await topicsService.getTopics();
        if (mounted) {
          setTopics(fetchedTopics);
        }
      } catch (err) {
        console.error('Error loading topics:', err);
        if (mounted) {
          setError('Failed to load topics');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadInitialTopics();

    return () => {
      mounted = false;
    };
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
    clearTopics,
    createTopic,
    deleteTopic,
    updateTopicCompletion,
  };
}
