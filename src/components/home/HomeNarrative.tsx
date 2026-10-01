import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeScrollRoot } from './homeScroll';
import { SceneHero } from './SceneHero';
import { SceneCatalogue, SceneGuideEntry, SceneProductFamilies } from './SceneEquipment';
import { SceneCompare } from './SceneCompare';
import { SceneFactoryProof } from './SceneProof';
import { SceneKnowledge } from './SceneKnowledge';
import { SceneContact } from './SceneContact';

export function HomeNarrative() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  return (
    <HomeScrollRoot>
      <SceneHero />
      <SceneProductFamilies />
      <SceneCatalogue />
      <SceneCompare />
      <SceneFactoryProof />
      <SceneGuideEntry />
      <SceneKnowledge />
      <SceneContact />
    </HomeScrollRoot>
  );
}
