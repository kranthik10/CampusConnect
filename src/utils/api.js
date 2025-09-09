// Utility functions for CampusConnect app

import {
  mockUsers,
  mockCommunities,
  mockPosts,
  mockEvents,
  mockMessages,
  mockNotifications,
  mockInterests,
  mockColleges,
} from './mockData';

// User authentication and management
export const authenticateUser = (email, password) => {
  // In a real app, this would call an API
  // For mock, we'll just check if the email exists in our mock data
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        major: user.major,
        year: user.year,
        avatar: user.avatar,
      },
    };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const registerUser = (userData) => {
  // In a real app, this would create a new user
  // For mock, we'll just simulate successful registration
  return {
    success: true,
    user: {
      id: (mockUsers.length + 1).toString(),
      ...userData,
    },
  };
};

export const verifyCollegeEmail = (email) => {
  // Check if email ends with .edu
  const isEduEmail = email.endsWith('.edu');
  
  // Check if it's from one of our mock colleges
  const isFromMockCollege = mockColleges.some(college => 
    email.includes(college.toLowerCase().replace(/\s+/g, ''))
  );
  
  return {
    isValid: isEduEmail,
    isFromPartnerCollege: isFromMockCollege,
    message: isEduEmail 
      ? isFromMockCollege 
        ? 'Valid college email' 
        : 'Valid email but not from a partner college'
      : 'Please use a valid college email address (.edu)'
  };
};

// User data retrieval
export const getUserById = (userId) => {
  return mockUsers.find(user => user.id === userId) || null;
};

export const getUserConnections = (userId) => {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return [];
  
  return mockUsers.filter(u => user.connections.includes(u.id));
};

export const searchUsers = (query) => {
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.major.toLowerCase().includes(query.toLowerCase()) ||
    user.interests.some(interest => 
      interest.toLowerCase().includes(query.toLowerCase())
    )
  );
};

// Community functions
export const getAllCommunities = () => {
  return mockCommunities;
};

export const getCommunityById = (communityId) => {
  return mockCommunities.find(community => community.id === communityId) || null;
};

export const getCommunitiesByCategory = (category) => {
  return mockCommunities.filter(community => 
    community.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchCommunities = (query) => {
  return mockCommunities.filter(community => 
    community.name.toLowerCase().includes(query.toLowerCase()) ||
    community.description.toLowerCase().includes(query.toLowerCase()) ||
    community.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const joinCommunity = (userId, communityId) => {
  // In a real app, this would update the database
  // For mock, we'll just simulate the action
  const community = mockCommunities.find(c => c.id === communityId);
  if (!community) return { success: false, message: 'Community not found' };
  
  return {
    success: true,
    message: `Successfully joined ${community.name}`,
    updatedCommunity: {
      ...community,
      memberCount: community.memberCount + 1,
      members: [...community.members, userId],
    },
  };
};

// Post functions
export const getFeedPosts = (userId) => {
  // For mock, return all posts (in real app, would filter by user's connections/communities)
  return mockPosts;
};

export const createPost = (postData) => {
  // In a real app, this would save the post to database
  // For mock, we'll just simulate creating a post
  const newPost = {
    id: (mockPosts.length + 1).toString(),
    ...postData,
    timestamp: new Date().toISOString(),
  };
  
  return {
    success: true,
    post: newPost,
  };
};

// Event functions
export const getAllEvents = () => {
  return mockEvents;
};

export const getEventById = (eventId) => {
  return mockEvents.find(event => event.id === eventId) || null;
};

export const searchEvents = (query) => {
  return mockEvents.filter(event => 
    event.title.toLowerCase().includes(query.toLowerCase()) ||
    event.description.toLowerCase().includes(query.toLowerCase()) ||
    event.location.toLowerCase().includes(query.toLowerCase())
  );
};

export const joinEvent = (userId, eventId) => {
  const event = mockEvents.find(e => e.id === eventId);
  if (!event) return { success: false, message: 'Event not found' };
  
  if (event.attendees.includes(userId)) {
    return { success: false, message: 'Already registered for this event' };
  }
  
  if (event.attendees.length >= event.maxAttendees) {
    return { success: false, message: 'Event is full' };
  }
  
  return {
    success: true,
    message: `Successfully registered for ${event.title}`,
    updatedEvent: {
      ...event,
      attendees: [...event.attendees, userId],
    },
  };
};

// Messaging functions
export const getUserMessages = (userId) => {
  return mockMessages.filter(message => 
    message.senderId === userId || message.receiverId === userId
  );
};

export const sendMessage = (messageData) => {
  // In a real app, this would save the message to database
  // For mock, we'll just simulate sending a message
  const newMessage = {
    id: (mockMessages.length + 1).toString(),
    ...messageData,
    timestamp: new Date().toISOString(),
  };
  
  return {
    success: true,
    message: newMessage,
  };
};

// Notification functions
export const getUserNotifications = (userId) => {
  return mockNotifications.filter(notification => 
    notification.userId === userId
  );
};

export const markNotificationAsRead = (notificationId) => {
  // In a real app, this would update the database
  // For mock, we'll just simulate the action
  return {
    success: true,
    message: 'Notification marked as read',
  };
};

// Interest and matching functions
export const getAllInterests = () => {
  return mockInterests;
};

export const findUsersWithSimilarInterests = (userId, maxResults = 5) => {
  const currentUser = mockUsers.find(u => u.id === userId);
  if (!currentUser) return [];
  
  const similarUsers = mockUsers
    .filter(user => user.id !== userId) // Exclude current user
    .map(user => {
      // Calculate similarity score based on shared interests
      const sharedInterests = user.interests.filter(interest => 
        currentUser.interests.includes(interest)
      );
      
      return {
        ...user,
        similarityScore: sharedInterests.length,
        sharedInterests,
      };
    })
    .filter(user => user.similarityScore > 0) // Only users with shared interests
    .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by similarity
    .slice(0, maxResults);
  
  return similarUsers;
};

// College functions
export const getAllColleges = () => {
  return mockColleges;
};

export const searchColleges = (query) => {
  return mockColleges.filter(college => 
    college.toLowerCase().includes(query.toLowerCase())
  );
};