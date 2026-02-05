
import React from 'react';
import { AvatarConfig } from '../types';

interface AvatarRendererProps {
  config: AvatarConfig;
  className?: string;
  size?: number;
  bg?: string;
}

const AvatarRenderer: React.FC<AvatarRendererProps> = ({ config, className = "", size = 100, bg = "transparent" }) => {
  // Construct DiceBear URL based on config
  // Base style is 'avataaars'
  const baseUrl = "https://api.dicebear.com/7.x/avataaars/svg";
  
  // Convert config to query params
  const params = new URLSearchParams();
  params.append('seed', config.baseSeed);
  params.append('backgroundColor', bg);
  
  // Mappings from Item ID to DiceBear values (This is a simplified simulation)
  // In a real app, you might look up the item in a database to get the asset value.
  
  // HAT MAPPING
  if (config.hatId) {
      if (config.hatId === 'hat_1') params.append('top', 'hat');
      else if (config.hatId === 'hat_2') params.append('top', 'winterHat03');
      // default fallbacks or others
  }
  
  // OUTFIT MAPPING
  if (config.outfitId) {
      if (config.outfitId === 'outfit_1') params.append('clothing', 'overall');
      else if (config.outfitId === 'outfit_2') params.append('clothing', 'blazerAndShirt');
  } else {
      params.append('clothing', 'collarAndSweater'); // Default
  }

  // ACCESSORY MAPPING
  if (config.accessoryId) {
      if (config.accessoryId === 'acc_1') params.append('accessories', 'prescription02');
      else if (config.accessoryId === 'acc_2') params.append('accessories', 'kurt');
  } else {
      params.append('accessories', 'none');
  }

  const avatarUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
    </div>
  );
};

export default AvatarRenderer;
