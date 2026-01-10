import { FaInstagram, FaTiktok, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Platform icon mapping
export const getPlatformIcon = (platform) => {
    const platformName = platform?.toLowerCase();
    switch (platformName) {
        case 'instagram':
            return <FaInstagram />;
        case 'tiktok':
            return <FaTiktok />;
        case 'twitter':
        case 'x':
            return <FaXTwitter />;
        case 'facebook':
            return <FaFacebook />;
        case 'youtube':
            return <FaYoutube />;
        default:
            return null;
    }
};

// Platform color mapping
export const getPlatformColor = (platform) => {
    const platformName = platform?.toLowerCase();
    switch (platformName) {
        case 'instagram':
            return '#E4405F';
        case 'tiktok':
            return '#000000';
        case 'twitter':
        case 'x':
            return '#1DA1F2';
        case 'facebook':
            return '#1877F2';
        case 'youtube':
            return '#FF0000';
        default:
            return '#666666';
    }
};
