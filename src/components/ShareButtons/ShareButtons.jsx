import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa';
import {
  Link2,
  Share2,
  Check,
} from 'lucide-react';

import { getMyReferralData } from '../../utils/api';
import { useWebShare } from '../../hooks/useWebShare';

import styles from './ShareButtons.module.css';

function ShareButtons() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [referralInfo, setReferralInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { share } = useWebShare();

  useEffect(() => {
    async function loadReferralData() {
      try {
        const data = await getMyReferralData();

        setReferralInfo({
          code: data.user.referralCode,
          link: data.referralLink,
        });
      } catch (err) {
        console.error(
          'Unable to load referral data:',
          err
        );
      } finally {
        setLoading(false);
      }
    }

    loadReferralData();
  }, []);

  if (loading || !referralInfo) {
    return null;
  }

  const shareUrl = referralInfo.link;

  const shareText =
    'Join VELoop Rewards using my referral code ' +
    referralInfo.code +
    ' and start earning today!';

  const whatsappMessage =
    shareText + ' ' + shareUrl;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);

      setLinkCopied(true);

      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }

  async function handleNativeShare() {
    try {
      const result = await share({
        title: 'VELoop Rewards',
        text: shareText,
        url: shareUrl,
      });

      if (result?.unsupported) {
        handleCopyLink();
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  }

  const buttons = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <FaWhatsapp size={20} />,
      href:
        'https://wa.me/?text=' +
        encodeURIComponent(whatsappMessage),
      colorClass: styles.whatsapp,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <FaInstagram size={20} />,
      href: 'https://instagram.com',
      colorClass: styles.instagram,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: <FaFacebookF size={20} />,
      href:
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(shareUrl),
      colorClass: styles.facebook,
    },
  ];

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>
            Share & Earn
          </h3>

          <p className={styles.subtitle}>
            Invite friends using your referral link
          </p>
        </div>
      </div>

      <div className={styles.buttons}>
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.href}
            target="_blank"
            rel="noreferrer"
            className={`${styles.button} ${button.colorClass}`}
          >
            {button.icon}
            <span>{button.label}</span>
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopyLink}
          className={styles.button}
        >
          {linkCopied ? (
            <Check size={20} />
          ) : (
            <Link2 size={20} />
          )}

          <span>
            {linkCopied
              ? 'Copied!'
              : 'Copy Link'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleNativeShare}
          className={styles.button}
        >
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
}

export default ShareButtons;