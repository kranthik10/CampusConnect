// User profile screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getUserById } from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = () => {
    const userData = getUserById(userId);
    setUser(userData);
    
    // For mock, we'll check if user is in current user's connections
    // In a real app, this would check actual connection status
    setIsConnected(userId === '2' || userId === '3' || userId === '5');
  };

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
        
        <View style={styles.actionButtons}>
          {isConnected ? (
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-horiz" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>
      
      <View style={styles.interestsContainer}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsGrid}>
          {user.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.connections.length}</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Communities</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
      </View>
      
      <View style={styles.commonConnectionsContainer}>
        <Text style={styles.sectionTitle}>Common Connections</Text>
        <View style={styles.commonConnections}>
          {/* For mock, we'll show placeholder connections */}
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.commonConnectionItem}>
              <Image 
                source={{ uri: `https://randomuser.me/api/portraits/lego/${item + 5}.jpg` }} 
                style={styles.commonConnectionAvatar} 
              />
              <Text style={styles.commonConnectionName}>User {item + 5}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  connectButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageButton: {
    backgroundColor: '#e3eeff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#2e6ff2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  moreButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
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
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#e3eeff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#2e6ff2',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  commonConnectionsContainer: {
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
  commonConnections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commonConnectionItem: {
    alignItems: 'center',
    width: '33%',
    marginBottom: 20,
  },
  commonConnectionAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  commonConnectionName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default UserProfileScreen;