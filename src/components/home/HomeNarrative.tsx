import { HomeScrollRoot, SectionNavigator } from './homeScroll';
import { SceneHero } from './SceneHero';
import { SceneProductSystem } from './SceneProductSystem';
import { SceneSelection } from './SceneSelection';
import { SceneApplications } from './SceneApplications';
import { SceneFactory } from './SceneFactory';
import { SceneEvidence } from './SceneEvidence';
import { SceneProcess } from './SceneProcess';
import { SceneKnowledge } from './SceneKnowledge';
import { SceneContact } from './SceneContact';

export function HomeNarrative() {
  return (
    <HomeScrollRoot>
      <SectionNavigator />
      <SceneHero />
      <SceneProductSystem />
      <SceneSelection />
      <SceneApplications />
      <SceneFactory />
      <SceneEvidence />
      <SceneProcess />
      <SceneKnowledge />
      <SceneContact />
    </HomeScrollRoot>
  );
}
