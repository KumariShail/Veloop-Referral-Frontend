import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Megaphone } from 'lucide-react';
import { getMyReferralData } from '../../utils/api';
import styles from './ReferralProgress.module.css';
import CoinScatterBackground from '../common/CoinScatterBackground';

function ReferralProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReferralProgress() {
      try {
        const data = await getMyReferralData();

        setProgress(data.referralProgress);
      } catch (err) {
        console.error(err);
        setError('Unable to load referral progress');
      } finally {
        setLoading(false);
      }
    }

    loadReferralProgress();
  }, []);

  if (loading) {
    return (
      <div className={styles.panel}>
        Loading referral progress...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.panel}>
        {error}
      </div>
    );
  }

  if (!progress) {
    return (
      <div className={styles.panel}>
        Referral progress is not available.
      </div>
    );
  }

  const current = progress.current;
  const target = progress.target;
  const remaining = progress.remaining;
  const percent = progress.percent;
  const rewardTitle = progress.nextReward;

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <CoinScatterBackground />

      <motion.div
        className={styles.megaphoneWrap}
        animate={{ scale: [1, 1.18, 1], rotate: [0, -8, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      >
        <Megaphone size={22} />

        <motion.span
          className={styles.pulseRing}
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      <div className={styles.top}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBadge}>
            <Target size={20} />
          </div>

          <div>
            <h3 className={styles.title}>Next Milestone</h3>

            <p className={styles.subtitle}>
              {remaining > 0
                ? `${remaining} more Ad Watch tasks to unlock ${rewardTitle}`
                : 'Milestone reached!'}
            </p>
          </div>
        </div>

        <div className={styles.rewardChip}>
          <Trophy size={16} />
          <span>{rewardTitle}</span>
        </div>
      </div>

      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />

        <motion.div
          className={styles.barGlowDot}
          initial={{ left: '0%', opacity: 0 }}
          whileInView={{
            left: `${percent}%`,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />
      </div>

      <div className={styles.bottom}>
        <span className={styles.countLabel}>
          <strong>{current}</strong> / {target} Ad Watch tasks
        </span>

        <span className={styles.percentLabel}>
          {percent}%
        </span>
      </div>
    </motion.div>
  );
}

export default ReferralProgress;