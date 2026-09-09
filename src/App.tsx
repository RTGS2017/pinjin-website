import { Suspense, lazy, type ReactElement } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import {
  LangHomeRedirect,
  LanguageRoot,
  RootRedirect,
} from '@/i18n/LanguageRoot';
import {
  LegacyApplicationsRedirect,
  LegacyCasesRedirect,
  LegacyCompanyFactoryRedirect,
  LegacyCompanyRedirect,
  LegacyConcretePumpHubRedirect,
  LegacyMixingPlantRedirect,
  LegacyResourcesBlogRedirect,
  LegacySprayingHubRedirect,
} from '@/pages/LegacyRedirects';

/* ---------- lazy-loaded pages ---------- */
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const Products = lazy(() => import('@/pages/Products').then((m) => ({ default: m.Products })));
const ProductDetail = lazy(() => import('@/pages/ProductDetail').then((m) => ({ default: m.ProductDetail })));
const ProductCategoryPage = lazy(() => import('@/pages/ProductCategoryPage').then((m) => ({ default: m.ProductCategoryPage })));
const LegacyCategoryRedirect = lazy(() => import('@/pages/ProductCategoryPage').then((m) => ({ default: m.LegacyCategoryRedirect })));
const SelectionGuidePage = lazy(() => import('@/pages/SelectionGuidePage').then((m) => ({ default: m.SelectionGuidePage })));
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const CopyrightPage = lazy(() => import('@/pages/CopyrightPage').then((m) => ({ default: m.CopyrightPage })));
const Faq = lazy(() => import('@/pages/Faq').then((m) => ({ default: m.Faq })));
const SolutionsIndex = lazy(() => import('@/pages/Solutions').then((m) => ({ default: m.SolutionsIndex })));
const SolutionDetail = lazy(() => import('@/pages/Solutions').then((m) => ({ default: m.SolutionDetail })));
const FactoryPage = lazy(() => import('@/pages/FactoryPage').then((m) => ({ default: m.FactoryPage })));
const ResourcesPage = lazy(() => import('@/pages/Resources').then((m) => ({ default: m.ResourcesPage })));
const BlogList = lazy(() => import('@/pages/blog/BlogList').then((m) => ({ default: m.BlogList })));
const BlogDetail = lazy(() => import('@/pages/blog/BlogDetail').then((m) => ({ default: m.BlogDetail })));
const CustomMachineryPage = lazy(() => import('@/pages/CustomMachineryPage').then((m) => ({ default: m.CustomMachineryPage })));

/** Direct <Route> / Fragment only — a custom <P> component crashes React Router. */
function r(path: string, element: ReactElement) {
  return (
    <>
      <Route path={path} element={element} />
      <Route path={`${path}/`} element={element} />
    </>
  );
}

function localePages() {
  return (
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      {r('products', <Products />)}
      {r('products/category/:categorySlug', <LegacyCategoryRedirect />)}
      {r('products/electric-concrete-pumps', <ProductCategoryPage />)}
      {r('products/diesel-concrete-pumps', <ProductCategoryPage />)}
      {r('products/mixer-pumps', <ProductCategoryPage />)}
      {r('products/concrete-pump-parts', <ProductCategoryPage />)}
      {r('products/concrete-pumps', <LegacyConcretePumpHubRedirect />)}
      {r('products/spraying-machines', <LegacySprayingHubRedirect />)}
      {r('products/material-handling', <LegacySprayingHubRedirect />)}
      {r('products/rebar-equipment', <LegacySprayingHubRedirect />)}
      {r('products/custom-machinery', <CustomMachineryPage />)}
      {r('products/concrete-pump', <LegacyConcretePumpHubRedirect />)}
      {r('products/concrete-spraying-machine', <LegacySprayingHubRedirect />)}
      {r('products/concrete-mixing-plant', <LegacyMixingPlantRedirect />)}
      {r('products/:slug', <ProductDetail />)}
      {r('product-selection-guide', <SelectionGuidePage />)}
      {r('solutions', <SolutionsIndex />)}
      {r('solutions/:slug', <SolutionDetail />)}
      {r('cases', <LegacyCasesRedirect />)}
      {r('cases/:slug', <LegacyCasesRedirect />)}
      {r('applications', <LegacyApplicationsRedirect />)}
      {r('about', <About />)}
      {r('company', <LegacyCompanyRedirect />)}
      {r('company/factory', <LegacyCompanyFactoryRedirect />)}
      {r('company/manufacturing-capability', <LegacyCompanyFactoryRedirect />)}
      {r('factory', <FactoryPage />)}
      {r('resources', <ResourcesPage />)}
      {r('resources/blog', <LegacyResourcesBlogRedirect />)}
      {r('resources/blog/:slug', <LegacyResourcesBlogRedirect />)}
      {r('resources/downloads', <ResourcesPage />)}
      {r('faq', <Faq />)}
      {r('blog', <BlogList />)}
      {r('blog/:slug', <BlogDetail />)}
      {r('contact', <ContactPage />)}
      {r('copyright', <CopyrightPage />)}
      <Route path='*' element={<LangHomeRedirect />} />
    </Route>
  );
}

function PageLoader() {
  return (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
    </div>
  );
}

/** GitHub Pages only 200s directory URLs with a trailing slash. Keep the SPA on that form. */
function EnsureTrailingSlash() {
  const location = useLocation();
  if (location.pathname !== '/' && !location.pathname.endsWith('/')) {
    return (
      <Navigate
        to={`${location.pathname}/${location.search}${location.hash}`}
        replace
      />
    );
  }
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<EnsureTrailingSlash />}>
            <Route path='/' element={<RootRedirect />} />
            <Route path='/:lang' element={<LanguageRoot />}>
              {localePages()}
            </Route>
            <Route path='/:lang/' element={<LanguageRoot />}>
              {localePages()}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
