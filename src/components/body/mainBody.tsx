import React from 'react';
import { useAppSelector } from '../../state/hooks';
import {
  selectedMenu
} from '../../state/slices/menuSlice';
import BodyRight from './bodyParts/bodyRight';
import BodyLeft from './bodyParts/bodyLeft';
import './mainBody.css';

const MiSitio: React.FC = () => {
  const result = useAppSelector(selectedMenu);
  return (
    <div className="root">
      {result.open && <BodyLeft />}
      <BodyRight />
    </div>
  );
}

export default MiSitio;
