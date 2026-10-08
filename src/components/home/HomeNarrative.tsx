import { HomeScrollRoot, SectionNavigator } from './homeScroll';
import { SceneHero } from './SceneHero';
import { SceneProductSystem } from './SceneProductSystem';
import { SceneSelection } from './SceneSelection';
import { SceneApplications } from './SceneApplications';
import { SceneFactory } from './SceneFactory';
import { SceneKnowledge } from './SceneKnowledge';
import { SceneContact } from './SceneContact';

export function HomeNarrative() {
  return (
    <HomeScrollRoot>
      <SectionNavigator />
      <SceneHero />
      <SceneApplications />
      <SceneProductSystem />
      <SceneFactory />
      <SceneSelection />
      <SceneKnowledge />
      <SceneContact />
    </HomeScrollRoot>
  );
}
