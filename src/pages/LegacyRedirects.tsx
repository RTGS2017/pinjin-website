import { useParams } from 'react-router-dom';
import { LocaleNavigate } from '@/i18n/navigation';

/** 旧应用页 hash slug → 解决方案路径 */
const APPLICATION_TO_SOLUTION: Record<string, string> = {
  'building-construction': 'construction',
  'infrastructure-projects': 'infrastructure',
  'spraying-applications': 'spraying',
  'material-handling': 'industrial-projects',
};

export function LegacyApplicationsRedirect() {
  return <LocaleNavigate to="/solutions" replace />;
}

export function LegacyCompanyRedirect() {
  return <LocaleNavigate to="/about" replace />;
}

export function LegacyCompanyFactoryRedirect() {
  return <LocaleNavigate to="/factory" replace />;
}

export function LegacyXingjiawanRedirect() {
  return (
    <LocaleNavigate
      to="/blog/xingjiawan-concrete-machinery-manufacturing"
      replace
    />
  );
}

export function LegacyResourcesBlogRedirect() {
  const { slug } = useParams<{ slug: string }>();
  if (slug === 'xingjiawan-concrete-machinery') {
    return (
      <LocaleNavigate
        to="/blog/xingjiawan-concrete-machinery-manufacturing"
        replace
      />
    );
  }
  if (slug) {
    return <LocaleNavigate to={`/blog/${slug}`} replace />;
  }
  return <LocaleNavigate to="/blog" replace />;
}

export function mapApplicationHash(hash: string): string | undefined {
  const key = hash.replace(/^#/, '');
  const solution = APPLICATION_TO_SOLUTION[key];
  return solution ? `/solutions/${solution}` : undefined;
}
