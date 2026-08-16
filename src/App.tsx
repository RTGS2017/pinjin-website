import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import {
  LegacyCategoryRedirect,
  ProductCategoryPage,
} from '@/pages/ProductCategoryPage';
import { SelectionGuidePage } from '@/pages/SelectionGuidePage';
import { About } from '@/pages/About';
import { ContactPage } from '@/pages/ContactPage';
import { Faq } from '@/pages/Faq';
import { SolutionDetail, SolutionsIndex } from '@/pages/Solutions';
import { FactoryPage } from '@/pages/FactoryPage';
import { ResourcesPage } from '@/pages/Resources';
import { BlogList } from '@/pages/blog/BlogList';
import { BlogDetail } from '@/pages/blog/BlogDetail';
import {
  LegacyApplicationsRedirect,
  LegacyCompanyFactoryRedirect,
  LegacyCompanyRedirect,
  LegacyResourcesBlogRedirect,
} from '@/pages/LegacyRedirects';
import {
  LangHomeRedirect,
  LanguageRoot,
  RootRedirect,
} from '@/i18n/LanguageRoot';

export default function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}
    >
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<LanguageRoot />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route
              path="products/category/:categorySlug"
              element={<LegacyCategoryRedirect />}
            />
            <Route
              path="products/concrete-pumps"
              element={<ProductCategoryPage />}
            />
            <Route
              path="products/spraying-machines"
              element={<ProductCategoryPage />}
            />
            <Route
              path="products/material-handling"
              element={<ProductCategoryPage />}
            />
            <Route
              path="products/rebar-equipment"
              element={<ProductCategoryPage />}
            />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route
              path="product-selection-guide"
              element={<SelectionGuidePage />}
            />
            <Route path="solutions" element={<SolutionsIndex />} />
            <Route path="solutions/:slug" element={<SolutionDetail />} />
            <Route
              path="applications"
              element={<LegacyApplicationsRedirect />}
            />
            <Route path="about" element={<About />} />
            <Route path="company" element={<LegacyCompanyRedirect />} />
            <Route
              path="company/factory"
              element={<LegacyCompanyFactoryRedirect />}
            />
            <Route
              path="company/manufacturing-capability"
              element={<LegacyCompanyFactoryRedirect />}
            />
            <Route path="factory" element={<FactoryPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route
              path="resources/blog"
              element={<LegacyResourcesBlogRedirect />}
            />
            <Route
              path="resources/blog/:slug"
              element={<LegacyResourcesBlogRedirect />}
            />
            <Route path="resources/downloads" element={<ResourcesPage />} />
            <Route path="faq" element={<Faq />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<LangHomeRedirect />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
