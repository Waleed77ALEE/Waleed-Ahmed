import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface EcommerceDevelopmentPageProps {
  onOpenContact: () => void;
}

export const EcommerceDevelopmentPage: React.FC<EcommerceDevelopmentPageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="ecommerce-development" onOpenContact={onOpenContact} />;
};
