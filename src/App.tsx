import { Suspense, lazy } from 'react';
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

function PageLoader() {
  return (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
    </div>
  );
}

/** GitHub Pages serves both /path and /path/ from the same index.html. Keep the SPA URL slashless. */
function StripTrailingSlash() {
  const location = useLocation();
  if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
    return (
      <Navigate
        to={`${location.pathname.replace(/\/+$/, '')}${location.search}${location.hash}`}
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
          <Route element={<StripTrailingSlash />}>
          <Route path='/' element={<RootRedirect />} />
          <Route path='/:lang' element={<LanguageRoot />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='products' element={<Products />} />
              <Route path='products/category/:categorySlug' element={<LegacyCategoryRedirect />} />
              <Route path='products/electric-concrete-pumps' element={<ProductCategoryPage />} />
              <Route path='products/diesel-concrete-pumps' element={<ProductCategoryPage />} />
              <Route path='products/mixer-pumps' element={<ProductCategoryPage />} />
              <Route path='products/concrete-pump-parts' element={<ProductCategoryPage />} />
              <Route path='products/concrete-pumps' element={<LegacyConcretePumpHubRedirect />} />
              <Route path='products/spraying-machines' element={<LegacySprayingHubRedirect />} />
              <Route path='products/material-handling' element={<LegacySprayingHubRedirect />} />
              <Route path='products/rebar-equipment' element={<LegacySprayingHubRedirect />} />
              <Route path='products/custom-machinery' element={<CustomMachineryPage />} />
              <Route path='products/concrete-pump' element={<LegacyConcretePumpHubRedirect />} />
              <Route path='products/concrete-spraying-machine' element={<LegacySprayingHubRedirect />} />
              <Route path='products/concrete-mixing-plant' element={<LegacyMixingPlantRedirect />} />
              <Route path='products/:slug' element={<ProductDetail />} />
              <Route path='product-selection-guide' element={<SelectionGuidePage />} />
              <Route path='solutions' element={<SolutionsIndex />} />
              <Route path='solutions/:slug' element={<SolutionDetail />} />
              <Route path='cases' element={<LegacyCasesRedirect />} />
              <Route path='cases/:slug' element={<LegacyCasesRedirect />} />
              <Route path='applications' element={<LegacyApplicationsRedirect />} />
              <Route path='about' element={<About />} />
              <Route path='company' element={<LegacyCompanyRedirect />} />
              <Route path='company/factory' element={<LegacyCompanyFactoryRedirect />} />
              <Route path='company/manufacturing-capability' element={<LegacyCompanyFactoryRedirect />} />
              <Route path='factory' element={<FactoryPage />} />
              <Route path='resources' element={<ResourcesPage />} />
              <Route path='resources/blog' element={<LegacyResourcesBlogRedirect />} />
              <Route path='resources/blog/:slug' element={<LegacyResourcesBlogRedirect />} />
              <Route path='resources/downloads' element={<ResourcesPage />} />
              <Route path='faq' element={<Faq />} />
              <Route path='blog' element={<BlogList />} />
              <Route path='blog/:slug' element={<BlogDetail />} />
              <Route path='contact' element={<ContactPage />} />
              <Route path='copyright' element={<CopyrightPage />} />
              <Route path='*' element={<LangHomeRedirect />} />
            </Route>
          </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

