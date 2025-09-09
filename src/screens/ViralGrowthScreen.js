// Viral growth features component for CampusConnect

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';
import {
  getUserPoints,
  getUserAchievements,
  getUserStreak,
  generateReferralLink,
  getUserReferrals,
  getReferralRewards,
} from '../utils/viralMechanisms';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ViralGrowthScreen = () => {
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [streak, setStreak] = useState(null);
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    loadViralData();
  }, []);

  const loadViralData = () => {
    // For mock, we'll use user ID '1'
    const userId = '1';
    
    // Load points
    const userPoints = getUserPoints(userId);
    setPoints(userPoints);
    
    // Load achievements
    const userAchievements = getUserAchievements(userId);
    setAchievements(userAchievements);
    
    // Load streak
    const userStreak = getUserStreak(userId);
    setStreak(userStreak);
    
    // Generate referral link
    const link = generateReferralLink(userId);
    setReferralLink(link);
    
    // Load referrals
    const userReferrals = getUserReferrals(userId);
    setReferrals(userReferrals);
    
    // Load rewards
    const availableRewards = getReferralRewards();
    setRewards(availableRewards);
  };

  const copyReferralLink = () => {
    Clipboard.setString(referralLink);
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  const RewardItem = ({ reward }) => (
    <View style={styles.rewardItem}>
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardName}>{reward.name}</Text>
        <Text style={styles.rewardDescription}>{reward.description}</Text>
      </View>
      <View style={styles.rewardPoints}>
        <Text style={styles.pointsText}>{reward.pointsRequired} pts</Text>
        <TouchableOpacity 
          style={[styles.claimButton, points < reward.pointsRequired && styles.disabledButton]}
          disabled={points < reward.pointsRequired}
        >
          <Text style={styles.claimButtonText}>Claim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Viral Features</Text>
        <Text style={styles.headerSubtitle}>Earn rewards and grow your network</Text>
      </View>
      
      <View style={styles.pointsContainer}>
        <View style={styles.pointsHeader}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <Text style={styles.pointsValue}>{points}</Text>
        </View>
        <Text style={styles.pointsDescription}>
          Earn points by connecting with others, joining communities, and participating in events.
        </Text>
      </View>
      
      <View style={styles.streakContainer}>
        <View style={styles.streakHeader}>
          <Icon name="local-fire-department" size={24} color="#FF5722" />
          <Text style={styles.streakTitle}>Daily Streak</Text>
        </View>
        <Text style={styles.streakValue}>{streak?.currentStreak || 0} days</Text>
        <Text style={styles.streakDescription}>
          Your longest streak: {streak?.longestStreak || 0} days
        </Text>
      </View>
      
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.length > 0 ? (
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementPoints}>+{achievement.points} pts</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No achievements yet. Start connecting to earn achievements!</Text>
        )}
      </View>
      
      <View style={styles.referralContainer}>
        <Text style={styles.sectionTitle}>Refer Friends</Text>
        <Text style={styles.referralDescription}>
          Invite friends to join CampusConnect and earn rewards for each successful referral.
        </Text>
        
        <View style={styles.referralStats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{referrals.length}</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {referrals.filter(r => r.status === 'completed').length}
            </Text>
            <Text style={styles.statLabel}>Successful</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {referrals.filter(r => r.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
        
        <View style={styles.referralLinkContainer}>
          <Text style={styles.linkLabel}>Your Referral Link</Text>
          <View style={styles.linkBox}>
            <Text style={styles.linkText} numberOfLines={1}>
              {referralLink}
            </Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyReferralLink}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.rewardsContainer}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        {rewards.map((reward, index) => (
          <RewardItem key={index} reward={reward} />
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
  pointsContainer: {
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
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6ff2',
  },
  pointsDescription: {
    fontSize: 14,
    color: '#666',
  },
  streakContainer: {
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
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  streakValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 5,
  },
  streakDescription: {
    fontSize: 14,
    color: '#666',
  },
  achievementsContainer: {
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
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementPoints: {
    fontSize: 12,
    color: '#2e6ff2',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  referralContainer: {
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
  referralDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  referralStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  referralLinkContainer: {
    marginBottom: 10,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  linkBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
  },
  copyButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rewardsContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
  },
  rewardPoints: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 14,
    color: '#2e6ff2',
    fontWeight: '600',
    marginBottom: 5,
  },
  claimButton: {
    backgroundColor: '#2e6ff2',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  claimButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ViralGrowthScreen;