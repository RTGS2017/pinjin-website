import { HomeScrollRoot, SectionNavigator } from './homeScroll';
import { SceneHero } from './SceneHero';
import { SceneProductSystem } from './SceneProductSystem';
import { SceneSelection } from './SceneSelection';
import { SceneApplications } from './SceneApplications';
import { SceneFactory } from './SceneFactory';
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
      <SceneProcess />
      <SceneKnowledge />
      <SceneContact />
    </HomeScrollRoot>
  );
}
