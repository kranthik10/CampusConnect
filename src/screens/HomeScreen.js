// Home screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getFeedPosts, getUserById } from '../utils/api';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Mock current user (in real app, this would come from auth context)
    const user = getUserById('1');
    setCurrentUser(user);
    
    // Load posts
    const feedPosts = getFeedPosts();
    setPosts(feedPosts);
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const PostItem = ({ post }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={() => navigation.navigate('UserProfile', { userId: post.userId })}
        >
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.postUserInfo}>
          <Text style={styles.username}>{post.userName}</Text>
          <Text style={styles.postTime}>{formatTime(post.timestamp)}</Text>
        </View>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>👍 Like ({post.likes})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 Comment ({post.comments})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>↗️ Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CampusConnect</Text>
        <Text style={styles.headerSubtitle}>Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'}!</Text>
      </View>
      
      <View style={styles.suggestionsContainer}>
        <Text style={styles.sectionTitle}>Suggestions For You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.suggestionIcon}>
              <Text style={styles.suggestionIconText}>👥</Text>
            </View>
            <Text style={styles.suggestionText}>Find Connections</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.suggestionIcon}>
              <Text style={styles.suggestionIconText}>🎓</Text>
            </View>
            <Text style={styles.suggestionText}>Study Groups</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.suggestionIcon}>
              <Text style={styles.suggestionIconText}>💼</Text>
            </View>
            <Text style={styles.suggestionText}>Career Network</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.suggestionItem}
            onPress={() => navigation.navigate('Viral')}
          >
            <View style={styles.suggestionIcon}>
              <Text style={styles.suggestionIconText}>📈</Text>
            </View>
            <Text style={styles.suggestionText}>Growth</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.feedContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6ff2',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  suggestionsScroll: {
    flexDirection: 'row',
  },
  suggestionItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  suggestionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3eeff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  suggestionIconText: {
    fontSize: 24,
  },
  suggestionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  feedContainer: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  postUserInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    color: '#666',
  },
});

export default HomeScreen;