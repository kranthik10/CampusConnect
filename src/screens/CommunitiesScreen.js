// Communities screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { getAllCommunities, searchCommunities } from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CommunitiesScreen = ({ navigation }) => {
  const [communities, setCommunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = () => {
    const allCommunities = getAllCommunities();
    setCommunities(allCommunities);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchCommunities(query);
      setCommunities(results);
    } else {
      loadCommunities();
    }
  };

  const CommunityItem = ({ community }) => (
    <TouchableOpacity 
      style={styles.communityItem}
      onPress={() => navigation.navigate('CommunityDetail', { communityId: community.id })}
    >
      <View style={styles.communityHeader}>
        <View style={styles.communityIcon}>
          <Text style={styles.communityIconText}>👥</Text>
        </View>
        <View style={styles.communityInfo}>
          <Text style={styles.communityName}>{community.name}</Text>
          <Text style={styles.communityCategory}>{community.category}</Text>
        </View>
      </View>
      <Text style={styles.communityDescription}>{community.description}</Text>
      <View style={styles.communityStats}>
        <Text style={styles.memberCount}>{community.memberCount} members</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const categories = ['All', 'Technology', 'Business', 'Arts', 'Science', 'Sports & Outdoors'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communities</Text>
        <Text style={styles.headerSubtitle}>Join groups based on your interests</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search communities..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.communitiesContainer}>
        <Text style={styles.sectionTitle}>Popular Communities</Text>
        {communities.map(community => (
          <CommunityItem key={community.id} community={community} />
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
  categoriesContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
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
  categoryItem: {
    backgroundColor: '#e3eeff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#2e6ff2',
    fontWeight: '600',
  },
  communitiesContainer: {
    padding: 10,
  },
  communityItem: {
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
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3eeff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  communityIconText: {
    fontSize: 24,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  communityCategory: {
    fontSize: 14,
    color: '#2e6ff2',
  },
  communityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  communityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 14,
    color: '#999',
  },
  joinButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommunitiesScreen;