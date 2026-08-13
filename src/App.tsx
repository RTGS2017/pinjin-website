import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import { ProductCategoryPage } from '@/pages/ProductCategoryPage';
import { SelectionGuidePage } from '@/pages/SelectionGuidePage';
import { About } from '@/pages/About';
import { ContactPage } from '@/pages/ContactPage';
import { Faq } from '@/pages/Faq';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { BlogList } from '@/pages/blog/BlogList';
import { BlogDetail } from '@/pages/blog/BlogDetail';
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
              element={<ProductCategoryPage />}
            />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route
              path="product-selection-guide"
              element={<SelectionGuidePage />}
            />
            <Route path="about" element={<About />} />
            <Route path="applications" element={<ApplicationsPage />} />
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
