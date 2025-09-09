// Messages screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { getUserMessages, getUserById } from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MessagesScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = () => {
    // For mock, we'll create some sample conversations
    const messages = getUserMessages('1');
    
    // Group messages by user to create conversations
    const conversationMap = {};
    
    messages.forEach(message => {
      const otherUserId = message.senderId === '1' ? message.receiverId : message.senderId;
      if (!conversationMap[otherUserId]) {
        const user = getUserById(otherUserId);
        conversationMap[otherUserId] = {
          id: otherUserId,
          user: user,
          lastMessage: message,
          unread: !message.isRead,
        };
      } else {
        // Update with latest message
        conversationMap[otherUserId].lastMessage = message;
        if (!message.isRead) {
          conversationMap[otherUserId].unread = true;
        }
      }
    });
    
    setConversations(Object.values(conversationMap));
  };

  const ConversationItem = ({ conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('UserProfile', { userId: conversation.user.id })}
    >
      <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={styles.userName}>{conversation.user.name}</Text>
          <Text style={styles.timestamp}>
            {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <Text 
          style={[styles.lastMessage, conversation.unread && styles.unreadMessage]}
          numberOfLines={1}
        >
          {conversation.lastMessage.content}
        </Text>
      </View>
      {conversation.unread && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={conversations}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.conversationsList}
      />
      
      <TouchableOpacity style={styles.newMessageButton}>
        <Icon name="edit" size={24} color="white" />
      </TouchableOpacity>
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  conversationsList: {
    padding: 10,
  },
  conversationItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#333',
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2e6ff2',
  },
  newMessageButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2e6ff2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MessagesScreen;