// Community detail screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getCommunityById, getFeedPosts, getUserById } from '../utils/api';

const CommunityDetailScreen = ({ route, navigation }) => {
  const { communityId } = route.params;
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadCommunityData();
  }, [communityId]);

  const loadCommunityData = () => {
    const communityData = getCommunityById(communityId);
    setCommunity(communityData);
    
    // For mock, we'll show all posts in this community
    const communityPosts = getFeedPosts().filter(post => post.communityId === communityId);
    setPosts(communityPosts);
  };

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

  if (!community) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.communityInfo}>
          <View style={styles.communityIcon}>
            <Text style={styles.communityIconText}>👥</Text>
          </View>
          <View>
            <Text style={styles.communityName}>{community.name}</Text>
            <Text style={styles.communityCategory}>{community.category}</Text>
          </View>
        </View>
        <Text style={styles.communityDescription}>{community.description}</Text>
        <View style={styles.communityStats}>
          <Text style={styles.memberCount}>{community.memberCount} members</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Community</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.postsContainer}>
        <Text style={styles.sectionTitle}>Community Posts</Text>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No posts yet. Be the first to post!</Text>
            <TouchableOpacity style={styles.createPostButton}>
              <Text style={styles.createPostButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        )}
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
  communityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  communityIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3eeff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  communityIconText: {
    fontSize: 28,
  },
  communityName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  communityCategory: {
    fontSize: 16,
    color: '#2e6ff2',
  },
  communityDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  communityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 16,
    color: '#999',
  },
  joinButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postsContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  createPostButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  createPostButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommunityDetailScreen;