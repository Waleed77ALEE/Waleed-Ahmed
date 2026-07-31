import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface MobileAppDevelopmentPageProps {
  onOpenContact: () => void;
}

export const MobileAppDevelopmentPage: React.FC<MobileAppDevelopmentPageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="mobile-app-development" onOpenContact={onOpenContact} />;
};
