import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface AiAutomationPageProps {
  onOpenContact: () => void;
}

export const AiAutomationPage: React.FC<AiAutomationPageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="ai-automation" onOpenContact={onOpenContact} />;
};
