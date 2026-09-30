import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeScrollRoot } from './homeScroll';
import { SceneHero } from './SceneHero';
import { SceneHowItWorks, SceneRequirements, SceneWhyMatch } from './SceneProjectPath';
import { SceneGuideEntry, SceneProductFamilies, SceneUseCases } from './SceneEquipment';
import {
  SceneBuyerTypes,
  SceneFactoryProof,
  ScenePumpingSystem,
  SceneTransparency,
} from './SceneProof';
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
      <SceneRequirements />
      <SceneWhyMatch />
      <SceneHowItWorks />
      <SceneUseCases />
      <SceneProductFamilies />
      <SceneGuideEntry />
      <ScenePumpingSystem />
      <SceneFactoryProof />
      <SceneTransparency />
      <SceneBuyerTypes />
      <SceneKnowledge />
      <SceneContact />
    </HomeScrollRoot>
  );
}
