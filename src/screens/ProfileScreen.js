// Profile screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { getUserById, getUserConnections, findUsersWithSimilarInterests } from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    // For mock, we'll use the first user as the current user
    const userData = getUserById('1');
    setUser(userData);
    
    // Load connections
    const userConnections = getUserConnections('1');
    setConnections(userConnections);
    
    // Load similar users
    const similar = findUsersWithSimilarInterests('1', 5);
    setSimilarUsers(similar);
  };

  const ConnectionItem = ({ user }) => (
    <TouchableOpacity 
      style={styles.connectionItem}
      onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
    >
      <Image source={{ uri: user.avatar }} style={styles.connectionAvatar} />
      <Text style={styles.connectionName}>{user.name}</Text>
    </TouchableOpacity>
  );

  const SimilarUserItem = ({ user }) => (
    <View style={styles.similarUserItem}>
      <Image source={{ uri: user.avatar }} style={styles.similarUserAvatar} />
      <View style={styles.similarUserInfo}>
        <Text style={styles.similarUserName}>{user.name}</Text>
        <Text style={styles.similarUserCollege}>{user.college}</Text>
        <View style={styles.sharedInterestsContainer}>
          <Text style={styles.sharedInterestsTitle}>Shared interests:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.sharedInterests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userCollege}>{user.college}</Text>
        <Text style={styles.userMajor}>{user.major} • {user.year}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{connections.length}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>
      
      <View style={styles.interestsContainer}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.interestsScroll}>
          {user.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.connectionsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Connections</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={connections}
          renderItem={({ item }) => <ConnectionItem user={item} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.similarUsersContainer}>
        <Text style={styles.sectionTitle}>People You Might Know</Text>
        {similarUsers.map((user, index) => (
          <SimilarUserItem key={index} user={user} />
        ))}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="edit" size={20} color="#2e6ff2" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="settings" size={20} color="#2e6ff2" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="logout" size={20} color="#2e6ff2" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userCollege: {
    fontSize: 16,
    color: '#2e6ff2',
    marginBottom: 5,
  },
  userMajor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioContainer: {
    backgroundColor: 'white',
    padding: 20,
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
  bioText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  interestsContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  interestsScroll: {
    flexDirection: 'row',
  },
  interestTag: {
    backgroundColor: '#e3eeff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  interestText: {
    color: '#2e6ff2',
    fontWeight: '600',
  },
  connectionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#2e6ff2',
    fontWeight: '600',
  },
  connectionItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  connectionAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  connectionName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  similarUsersContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  similarUserItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  similarUserAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  similarUserInfo: {
    flex: 1,
  },
  similarUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  similarUserCollege: {
    fontSize: 14,
    color: '#2e6ff2',
    marginBottom: 10,
  },
  sharedInterestsContainer: {
    marginBottom: 10,
  },
  sharedInterestsTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  connectButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});

export default ProfileScreen;