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

function P({ path, element }: { path: string; element: ReactElement }) {
  return (
    <>
      <Route path={path} element={element} />
      <Route path={`${path}/`} element={element} />
    </>
  );
}

function LocalePages() {
  return (
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <P path='products' element={<Products />} />
      <P path='products/category/:categorySlug' element={<LegacyCategoryRedirect />} />
      <P path='products/electric-concrete-pumps' element={<ProductCategoryPage />} />
      <P path='products/diesel-concrete-pumps' element={<ProductCategoryPage />} />
      <P path='products/mixer-pumps' element={<ProductCategoryPage />} />
      <P path='products/concrete-pump-parts' element={<ProductCategoryPage />} />
      <P path='products/concrete-pumps' element={<LegacyConcretePumpHubRedirect />} />
      <P path='products/spraying-machines' element={<LegacySprayingHubRedirect />} />
      <P path='products/material-handling' element={<LegacySprayingHubRedirect />} />
      <P path='products/rebar-equipment' element={<LegacySprayingHubRedirect />} />
      <P path='products/custom-machinery' element={<CustomMachineryPage />} />
      <P path='products/concrete-pump' element={<LegacyConcretePumpHubRedirect />} />
      <P path='products/concrete-spraying-machine' element={<LegacySprayingHubRedirect />} />
      <P path='products/concrete-mixing-plant' element={<LegacyMixingPlantRedirect />} />
      <P path='products/:slug' element={<ProductDetail />} />
      <P path='product-selection-guide' element={<SelectionGuidePage />} />
      <P path='solutions' element={<SolutionsIndex />} />
      <P path='solutions/:slug' element={<SolutionDetail />} />
      <P path='cases' element={<LegacyCasesRedirect />} />
      <P path='cases/:slug' element={<LegacyCasesRedirect />} />
      <P path='applications' element={<LegacyApplicationsRedirect />} />
      <P path='about' element={<About />} />
      <P path='company' element={<LegacyCompanyRedirect />} />
      <P path='company/factory' element={<LegacyCompanyFactoryRedirect />} />
      <P path='company/manufacturing-capability' element={<LegacyCompanyFactoryRedirect />} />
      <P path='factory' element={<FactoryPage />} />
      <P path='resources' element={<ResourcesPage />} />
      <P path='resources/blog' element={<LegacyResourcesBlogRedirect />} />
      <P path='resources/blog/:slug' element={<LegacyResourcesBlogRedirect />} />
      <P path='resources/downloads' element={<ResourcesPage />} />
      <P path='faq' element={<Faq />} />
      <P path='blog' element={<BlogList />} />
      <P path='blog/:slug' element={<BlogDetail />} />
      <P path='contact' element={<ContactPage />} />
      <P path='copyright' element={<CopyrightPage />} />
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
              {LocalePages()}
            </Route>
            <Route path='/:lang/' element={<LanguageRoot />}>
              {LocalePages()}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

