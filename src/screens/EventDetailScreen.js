// Event detail screen for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getEventById, getUserById } from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EventDetailScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    loadEventData();
  }, [eventId]);

  const loadEventData = () => {
    const eventData = getEventById(eventId);
    setEvent(eventData);
    
    // For mock, we'll just use a placeholder organizer
    setOrganizer({
      name: eventData.organizer,
      avatar: 'https://randomuser.me/api/portraits/lego/6.jpg',
    });
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="calendar-today" size={20} color="#2e6ff2" />
          <Text style={styles.detailText}>
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="access-time" size={20} color="#2e6ff2" />
          <Text style={styles.detailText}>{event.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="location-on" size={20} color="#2e6ff2" />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="people" size={20} color="#2e6ff2" />
          <Text style={styles.detailText}>
            {event.attendees.length} of {event.maxAttendees} spots taken
          </Text>
        </View>
      </View>
      
      <View style={styles.organizerContainer}>
        <Text style={styles.sectionTitle}>Organized by</Text>
        <View style={styles.organizerInfo}>
          <Image source={{ uri: organizer?.avatar }} style={styles.organizerAvatar} />
          <Text style={styles.organizerName}>{organizer?.name}</Text>
        </View>
      </View>
      
      <View style={styles.attendeesContainer}>
        <Text style={styles.sectionTitle}>Who's Attending</Text>
        <View style={styles.attendeesList}>
          {/* For mock, we'll show placeholder avatars */}
          {[1, 2, 3, 4, 5].map((item) => (
            <Image 
              key={item}
              source={{ uri: `https://randomuser.me/api/portraits/lego/${item}.jpg` }} 
              style={styles.attendeeAvatar} 
            />
          ))}
          {event.attendees.length > 5 && (
            <View style={styles.moreAttendees}>
              <Text style={styles.moreAttendeesText}>+{event.attendees.length - 5}</Text>
            </View>
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.rsvpButton}>
        <Text style={styles.rsvpButtonText}>RSVP for this event</Text>
      </TouchableOpacity>
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
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  organizerContainer: {
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
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  attendeesContainer: {
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
  attendeesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  moreAttendees: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3eeff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  moreAttendeesText: {
    color: '#2e6ff2',
    fontWeight: 'bold',
  },
  rsvpButton: {
    backgroundColor: '#2e6ff2',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetailScreen;