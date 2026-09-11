// ============================================
// Dummy data for VELoop Referral Page
// (Backend integration not required per task spec)
// ============================================

export const referralInfo = {
  code: '18642076',
  link: 'velooprewards.vercel.app/register?ref=18642076',
  totalReferrals: 18,
  earnings: 35000,
  earningsUnit: 'SVE',
  pendingRewards: 4,
};

export const statistics = [
  { id: 'total', label: 'Total Referrals', value: 18 },
  { id: 'success', label: 'Successful Referrals', value: 14 },
  { id: 'pending', label: 'Pending Referrals', value: 4 },
  { id: 'earnings', label: 'Total Rewards Earned', value: 35000, unit: 'SVE' },
  { id: 'xp', label: 'Total XP Earned', value: 280 },
  { id: 'gems', label: 'Total Gems Earned', value: 40 },
];


export const referralRules = [
  'Rewards are unlocked only after the referred user completes the required number of Ad Watch tasks.',
  'Each referral reward is milestone-based and can only be claimed after the respective condition is met.',
  'Multiple successful referrals can unlock multiple rewards.',
  'Self-referrals are not allowed.',
  'Fraudulent or fake referrals will result in reward cancellation.',
  'Referral progress should be tracked clearly through the UI.',
];

export const faqData = [
  {
    id: 'faq1',
    question: 'How do I earn rewards from referrals?',
    answer:
      'Share your referral code or link with friends. Once they sign up and complete the required Ad Watch tasks, you unlock the corresponding milestone rewards.',
  },
  {
    id: 'faq2',
    question: 'When do I receive my reward?',
    answer:
      'Rewards are credited automatically once your referred friend completes the task threshold for that milestone.',
  },
  {
    id: 'faq3',
    question: 'Is there a limit to how many friends I can refer?',
    answer:
      'No limit. Every successful referral earns you XP, and each one can unlock multiple milestone rewards.',
  },
];
