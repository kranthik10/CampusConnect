// Viral growth mechanisms for CampusConnect

// Mock data for referrals
const mockReferrals = [
  {
    id: '1',
    userId: '1',
    referredUserId: '6',
    reward: 'Premium features for 1 month',
    status: 'completed',
    createdAt: '2024-04-15',
  },
  {
    id: '2',
    userId: '1',
    referredUserId: '7',
    reward: 'CampusConnect T-shirt',
    status: 'pending',
    createdAt: '2024-05-01',
  },
];

// Referral functions
export const getUserReferrals = (userId) => {
  return mockReferrals.filter(referral => referral.userId === userId);
};

export const generateReferralLink = (userId) => {
  // In a real app, this would generate a unique referral link
  return `https://campusconnect.app/referral/${userId}`;
};

export const getReferralRewards = () => {
  return [
    {
      id: '1',
      name: 'Premium Features',
      description: 'Unlock premium features for 1 month',
      pointsRequired: 100,
    },
    {
      id: '2',
      name: 'CampusConnect T-shirt',
      description: 'Exclusive CampusConnect merchandise',
      pointsRequired: 250,
    },
    {
      id: '3',
      name: 'Event Tickets',
      description: 'Free tickets to popular campus events',
      pointsRequired: 500,
    },
  ];
};

// Points system
const mockUserPoints = {
  '1': 150,
  '2': 75,
  '3': 200,
  '4': 50,
  '5': 300,
};

export const getUserPoints = (userId) => {
  return mockUserPoints[userId] || 0;
};

export const addPoints = (userId, points) => {
  // In a real app, this would update the database
  // For mock, we'll just simulate adding points
  const currentPoints = getUserPoints(userId);
  mockUserPoints[userId] = currentPoints + points;
  
  return {
    success: true,
    newTotal: mockUserPoints[userId],
  };
};

// Achievements system
const mockAchievements = [
  {
    id: '1',
    name: 'First Connection',
    description: 'Connect with your first peer',
    points: 10,
    icon: '🔗',
  },
  {
    id: '2',
    name: 'Community Builder',
    description: 'Join 3 communities',
    points: 25,
    icon: '👥',
  },
  {
    id: '3',
    name: 'Event Attendee',
    description: 'Attend your first event',
    points: 20,
    icon: '🎉',
  },
  {
    id: '4',
    name: 'Active Poster',
    description: 'Create 5 posts',
    points: 30,
    icon: '📝',
  },
  {
    id: '5',
    name: 'Referral King',
    description: 'Refer 5 friends',
    points: 100,
    icon: '👑',
  },
];

export const getAllAchievements = () => {
  return mockAchievements;
};

const mockUserAchievements = {
  '1': ['1', '2', '3'], // User 1 has achievements 1, 2, and 3
  '2': ['1', '2'],      // User 2 has achievements 1 and 2
  '3': ['1'],           // User 3 has achievement 1
};

export const getUserAchievements = (userId) => {
  const achievementIds = mockUserAchievements[userId] || [];
  return mockAchievements.filter(achievement => 
    achievementIds.includes(achievement.id)
  );
};

export const unlockAchievement = (userId, achievementId) => {
  // In a real app, this would update the database
  // For mock, we'll just simulate unlocking an achievement
  if (!mockUserAchievements[userId]) {
    mockUserAchievements[userId] = [];
  }
  
  if (!mockUserAchievements[userId].includes(achievementId)) {
    mockUserAchievements[userId].push(achievementId);
    
    // Add points for achievement
    const achievement = mockAchievements.find(a => a.id === achievementId);
    if (achievement) {
      addPoints(userId, achievement.points);
    }
    
    return {
      success: true,
      message: `Achievement unlocked: ${achievement.name}`,
      pointsEarned: achievement.points,
    };
  }
  
  return {
    success: false,
    message: 'Achievement already unlocked',
  };
};

// Streak system
const mockUserStreaks = {
  '1': {
    currentStreak: 7,
    longestStreak: 15,
    lastActiveDate: '2024-05-15',
  },
  '2': {
    currentStreak: 3,
    longestStreak: 10,
    lastActiveDate: '2024-05-14',
  },
  '3': {
    currentStreak: 12,
    longestStreak: 12,
    lastActiveDate: '2024-05-15',
  },
};

export const getUserStreak = (userId) => {
  return mockUserStreaks[userId] || {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
  };
};

export const updateStreak = (userId) => {
  // In a real app, this would check if user was active today
  // For mock, we'll just simulate updating streak
  if (!mockUserStreaks[userId]) {
    mockUserStreaks[userId] = {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
  } else {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (mockUserStreaks[userId].lastActiveDate === yesterday) {
      // Continue streak
      mockUserStreaks[userId].currentStreak += 1;
      if (mockUserStreaks[userId].currentStreak > mockUserStreaks[userId].longestStreak) {
        mockUserStreaks[userId].longestStreak = mockUserStreaks[userId].currentStreak;
      }
      mockUserStreaks[userId].lastActiveDate = today;
    } else if (mockUserStreaks[userId].lastActiveDate !== today) {
      // Reset streak if missed a day
      mockUserStreaks[userId].currentStreak = 1;
      mockUserStreaks[userId].lastActiveDate = today;
    }
  }
  
  return mockUserStreaks[userId];
};