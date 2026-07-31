import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface WebsiteMaintenancePageProps {
  onOpenContact: () => void;
}

export const WebsiteMaintenancePage: React.FC<WebsiteMaintenancePageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="website-maintenance" onOpenContact={onOpenContact} />;
};
