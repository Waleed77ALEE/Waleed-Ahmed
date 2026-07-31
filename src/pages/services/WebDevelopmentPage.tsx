import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface WebDevelopmentPageProps {
  onOpenContact: () => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="web-development" onOpenContact={onOpenContact} />;
};
