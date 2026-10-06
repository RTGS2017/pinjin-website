import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { LocaleLink } from '@/i18n/navigation';
import { contactInquiryPath, getWhatsAppHref } from '@/config/site';
import { categoryMeta, getCategoryPath, getProductBySlug, type ProductCategory } from '@/data/products';
import { siteFaqs } from '@/data/faq';
import {
  afterContact,
  australiaChecks,
  buyerConcerns,
  confirmFields,
  factoryProof,
  familyIds,
  heroPhoto,
  homeFaqIds,
  jobCards,
  journey,
  replyExpectation,
  shipmentCards,
  trustPoints,
  whyReasons,
  type ProofPhoto,
} from '@/data/homeTrust';
import { useI18n } from '@/i18n/I18nContext';

function Photo({
  photo,
  priority = false,
  className = '',
}: {
  photo: ProofPhoto;
  priority?: boolean;
  className?: string;
}) {
  const { tx } = useI18n();
  return (
    <figure className={`buyer-figure ${className}`}>
      <ImagePlaceholder
        src={photo.src}
        alt={tx(photo.alt)}
        width={photo.width}
        height={photo.height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="buyer-figure-media"
        imgClassName="buyer-figure-img object-cover"
        label=""
        hint=""
      />
      <figcaption className="buyer-figure-cap">
        <span>{tx(photo.kicker)}</span>
        <span>{tx(photo.place)}</span>
        <span>{tx(photo.tag)}</span>
      </figcaption>
    </figure>
  );
}

export function BuyerHome() {
  const { t, tx } = useI18n();
  const faqs = homeFaqIds
    .map((id) => siteFaqs.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="buyer-home">
      <section className="buyer-hero container-site">
        <div>
          <p className="buyer-kicker">Pinjin Machinery · Xingtai</p>
          <h1 className="heading-display buyer-h1">
            {tx({
              en: 'Concrete Pumps Built for Your Job.',
              zh: '为这项工程制造的混凝土泵。',
            })}
          </h1>
          <p className="buyer-lead">
            {tx({
              en: 'From compact residential pours to long-distance concrete conveying, Pinjin manufactures electric, diesel and mixer pumps in Xingtai, China. Output, pressure and conveying distance are published on each model page.',
              zh: '从住宅小浇筑到长距离输送，品锦在中国邢台制造电动泵、柴油泵和搅拌泵。产量、压力和输送距离写在每个型号页上。',
            })}
          </p>
          <div className="buyer-actions">
            <Button to="/product-selection-guide" size="lg">
              {tx({ en: 'Find the Right Pump', zh: '找到合适的泵' })}
            </Button>
            <Button to={contactInquiryPath} variant="ghost" size="lg">
              {tx({ en: 'Request a Factory Quote', zh: '向工厂询价' })}
            </Button>
          </div>
          <ul className="buyer-trust-strip">
            {trustPoints.map((point) => (
              <li key={point.en}>{tx(point)}</li>
            ))}
          </ul>
        </div>
        <Photo photo={heroPhoto} priority />
      </section>

      <section className="buyer-band" id="trust">
        <div className="container-site">
          <p className="buyer-kicker">
            {tx({ en: 'Why buy from a factory you have not used before?', zh: '为什么向一家没合作过的工厂买？' })}
          </p>
          <h2 className="heading-display buyer-h2">
            {tx({
              en: 'Buying machinery from overseas is a trust decision.',
              zh: '从海外买机器，首先是信任问题。',
            })}
          </h2>
          <div className="buyer-concerns">
            {buyerConcerns.map((item) => (
              <article key={item.concern.en} className="buyer-concern">
                <Photo photo={item.photo} />
                <div>
                  <p className="buyer-kicker">{tx({ en: 'Concern', zh: '你担心的' })}</p>
                  <h3 className="heading-display buyer-h3">{tx(item.concern)}</h3>
                  <p className="buyer-kicker mt-4">{tx({ en: 'What we can show', zh: '我们能给出的' })}</p>
                  <p className="buyer-copy">{tx(item.proof)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site buyer-section" id="why-pinjin">
        <p className="buyer-kicker">{tx({ en: 'Why Pinjin', zh: '为什么是品锦' })}</p>
        <h2 className="heading-display buyer-h2">
          {tx({
            en: 'Why buyers work directly with Pinjin',
            zh: '采购方为什么直接找品锦',
          })}
        </h2>
        <ol className="buyer-reasons">
          {whyReasons.map((reason, index) => (
            <li key={reason.title.en}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3 className="heading-display buyer-h3">{tx(reason.title)}</h3>
              <p>{tx(reason.body)}</p>
            </li>
          ))}
        </ol>
        <p className="buyer-closer">
          {tx({
            en: 'You are not buying from a catalogue alone. You are buying from the factory behind it.',
            zh: '你买的不是一份目录。你买的是目录后面的那家工厂。',
          })}
        </p>
      </section>

      <section className="buyer-band" id="factory-proof">
        <div className="container-site">
          <p className="buyer-kicker">{tx({ en: 'Factory proof', zh: '工厂证据' })}</p>
          <h2 className="heading-display buyer-h2">
            {tx({ en: 'See where your machine is made.', zh: '看看机器是在哪里造的。' })}
          </h2>
          <p className="buyer-lead">
            {tx({
              en: 'Pinjin machines are manufactured and prepared for shipment in Xingtai, Hebei, China. The point of these photos is simple: the machine on the page can be traced back to this factory.',
              zh: '品锦的机器在中国河北邢台制造，并在这里做好发运准备。这些照片只说明一件事：网页上的机器能对回这家工厂。',
            })}
          </p>
          <div className="buyer-proof-grid">
            {factoryProof.map((photo) => (
              <Photo key={photo.src + photo.kicker.en} photo={photo} />
            ))}
          </div>
          <p className="mt-6">
            <LocaleLink to="/factory" className="buyer-text-link">
              {tx({ en: 'Open the factory page', zh: '打开工厂页' })} →
            </LocaleLink>
          </p>
        </div>
      </section>

      <section className="container-site buyer-section" id="from-factory">
        <p className="buyer-kicker">{tx({ en: 'From the factory to your jobsite', zh: '从工厂到你的工地' })}</p>
        <h2 className="heading-display buyer-h2">
          {tx({ en: 'From our factory to your jobsite', zh: '从我们工厂到你的工地' })}
        </h2>
        <ol className="buyer-timeline">
          {journey.map((item) => (
            <li key={item.step}>
              <div>
                <p className="buyer-kicker">{item.step}</p>
                <h3 className="heading-display buyer-h3">{tx(item.title)}</h3>
                <p className="buyer-copy">{tx(item.body)}</p>
              </div>
              {item.photo ? <Photo photo={item.photo} /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="buyer-band" id="shipments">
        <div className="container-site">
          <p className="buyer-kicker">{tx({ en: 'Real machines', zh: '真实机器' })}</p>
          <h2 className="heading-display buyer-h2">
            {tx({ en: 'Real machines. Real shipments.', zh: '真实的机器。真实的发运。' })}
          </h2>
          <p className="buyer-lead">
            {tx({
              en: 'See how Pinjin machines leave the factory. These photos do not name a destination country, because the frame does not show one.',
              zh: '看品锦的机器怎样离开工厂。照片里看不出目的国，所以不写运往哪里。',
            })}
          </p>
          <div className="buyer-cards cols-2">
            {shipmentCards.map((card) => (
              <article key={card.title.en}>
                <Photo photo={card.photo} />
                <h3 className="heading-display buyer-h3">{tx(card.title)}</h3>
                <p className="buyer-copy">{tx(card.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site buyer-section" id="jobs">
        <p className="buyer-kicker">{tx({ en: 'The work comes first', zh: '先看工程' })}</p>
        <h2 className="heading-display buyer-h2">
          {tx({ en: 'Different jobs need different machines.', zh: '不同的工程，用不同的机器。' })}
        </h2>
        <p className="buyer-lead">
          {tx({
            en: 'Start with the work. Then choose the machine. Specifications stay on the product page.',
            zh: '先看要做的活，再选机器。参数留在产品页。',
          })}
        </p>
        <div className="buyer-cards cols-2">
          {jobCards.map((card) => (
            <article key={card.title.en} className="buyer-job">
              {card.photo ? (
                <Photo photo={card.photo} />
              ) : (
                <MixerPhoto />
              )}
              <h3 className="heading-display buyer-h3">{tx(card.title)}</h3>
              <p className="buyer-copy">{tx(card.body)}</p>
              <LocaleLink to={card.href} className="buyer-text-link">
                {tx({ en: 'View equipment', zh: '查看设备' })} →
              </LocaleLink>
            </article>
          ))}
        </div>
      </section>

      <section className="buyer-band" id="families">
        <div className="container-site">
          <p className="buyer-kicker">{tx({ en: 'Choose a family', zh: '先选一条产品线' })}</p>
          <h2 className="heading-display buyer-h2">
            {tx({
              en: 'Which type of concrete pump fits your job?',
              zh: '哪一类泵适合你的工程？',
            })}
          </h2>
          <div className="buyer-cards cols-2">
            {familyIds.map((id) => (
              <FamilyCard key={id} id={id} />
            ))}
          </div>
          <p className="buyer-closer">
            {tx({ en: 'Not sure which one?', zh: '还不确定是哪一类？' })}{' '}
            <LocaleLink to="/product-selection-guide" className="buyer-text-link">
              {tx({ en: 'Use the Product Selection Guide', zh: '打开产品选型指南' })} →
            </LocaleLink>
          </p>
        </div>
      </section>

      <section className="container-site buyer-section" id="before-you-buy">
        <p className="buyer-kicker">{tx({ en: 'Before you buy', zh: '下单前先确认' })}</p>
        <h2 className="heading-display buyer-h2">
          {tx({ en: 'What should you confirm?', zh: '下单前要对上哪些条件？' })}
        </h2>
        <ul className="buyer-checks">
          {confirmFields.map((field) => (
            <li key={field.en}>
              <LocaleLink to="/product-selection-guide">{tx(field)}</LocaleLink>
            </li>
          ))}
        </ul>
        <p className="buyer-copy">
          {tx({
            en: 'These are questions, not new numbers. The figures live on the model page and in the selection guide.',
            zh: '这里只列要确认的问题，不新写数字。数字在型号页和选型指南里。',
          })}
        </p>
      </section>

      <section className="buyer-band">
        <div className="container-site buyer-split">
          <div>
            <h2 className="heading-display buyer-h2">
              {tx({
                en: 'The cheapest pump is not always the cheapest project.',
                zh: '标价最低的泵，不一定是这个工程最省的选择。',
              })}
            </h2>
            <p className="buyer-copy">
              {tx({
                en: 'A concrete pump has to match the mix, the output, the pipeline, the power on site and the job. A machine that looks cheaper on paper may not be able to do that work. We compare the machine with the pour before you order.',
                zh: '混凝土泵必须对上配合比、产量、管路、现场动力和这个工程。纸面更便宜的机器，可能做不了这件活。下单前，我们把机器和浇筑对一下。',
              })}
            </p>
            <Button to="/product-selection-guide">
              {tx({ en: 'Compare your project', zh: '对照你的工程' })}
            </Button>
          </div>
          <div id="australia">
            <p className="buyer-kicker">{tx({ en: 'For Australian buyers', zh: '给澳大利亚采购方' })}</p>
            <h2 className="heading-display buyer-h2">
              {tx({
                en: 'Confirm the job before you order from China.',
                zh: '从中国下单之前，先把工程确认清楚。',
              })}
            </h2>
            <p className="buyer-copy">
              {tx({
                en: 'Pinjin is a factory in Xingtai. This site does not claim an Australian warehouse, dealer, service centre or local certificate.',
                zh: '品锦是邢台的工厂。本站不声称在澳大利亚有仓库、经销商、服务中心或本地认证。',
              })}
            </p>
            <ul className="buyer-checks">
              {australiaChecks.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
            <Button to={contactInquiryPath} variant="ghost">
              {tx({ en: 'Send your project details', zh: '发送工程条件' })}
            </Button>
          </div>
        </div>
      </section>

      <section className="container-site buyer-section" id="after-contact">
        <p className="buyer-kicker">{tx({ en: 'After you write to us', zh: '你联系之后' })}</p>
        <h2 className="heading-display buyer-h2">
          {tx({
            en: 'What happens after you contact Pinjin?',
            zh: '联系品锦之后会发生什么？',
          })}
        </h2>
        <ol className="buyer-steps">
          {afterContact.map((step, index) => (
            <li key={step.en}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {tx(step)}
            </li>
          ))}
        </ol>
      </section>

      <section className="buyer-band" id="resources">
        <div className="container-site">
          <p className="buyer-kicker">{tx({ en: 'Read before you enquire', zh: '询价前可以先看' })}</p>
          <h2 className="heading-display buyer-h2">{t.knowledge.title}</h2>
          <div className="buyer-links">
            <LocaleLink to="/product-selection-guide">{t.nav.selectionGuide}</LocaleLink>
            <LocaleLink to="/blog">{t.nav.blog}</LocaleLink>
            <LocaleLink to="/faq">{t.nav.faq}</LocaleLink>
            <LocaleLink to="/factory">{t.nav.factory}</LocaleLink>
            <LocaleLink to="/solutions">{t.nav.solutions}</LocaleLink>
          </div>
          <div className="buyer-faqs">
            {faqs.map((faq) => (
              <details key={faq.id}>
                <summary>{tx(faq.question)}</summary>
                <p>{tx(faq.answer)}</p>
              </details>
            ))}
          </div>
          <LocaleLink to="/faq" className="buyer-text-link">
            {tx({ en: 'All questions', zh: '全部问题' })} →
          </LocaleLink>
        </div>
      </section>

      <section className="buyer-final container-site" id="contact">
        <h2 className="heading-display buyer-h2">
          {tx({ en: 'Have a concrete pump project?', zh: '有一个混凝土泵工程？' })}
        </h2>
        <p className="buyer-lead">
          {tx({
            en: 'Tell us what you need to pump: project type, output, pumping distance, aggregate size, power on site, and country. We will tell you which Pinjin models are worth comparing.',
            zh: '告诉我你要泵什么：工程类型、产量、泵送距离、骨料粒径、现场动力，以及所在国家。我们会告诉你哪些品锦型号值得对照。',
          })}
        </p>
        <p className="buyer-copy">{tx(replyExpectation)}</p>
        <div className="buyer-actions">
          <Button to={contactInquiryPath} size="lg">
            {tx({ en: 'Talk to Pinjin', zh: '和品锦谈' })}
          </Button>
          <Button to="/product-selection-guide" variant="ghost" size="lg">
            {tx({ en: 'Find a pump', zh: '找一台泵' })}
          </Button>
          <Button to="/products" variant="ghost" size="lg">
            {tx({ en: 'View products', zh: '查看产品' })}
          </Button>
          <a className="buyer-wa" href={getWhatsAppHref()}>
            WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

function MixerPhoto() {
  const { tx } = useI18n();
  const product = getProductBySlug('integrated-mixer-pump');
  if (!product) return null;
  return (
    <figure className="buyer-figure">
      <ImagePlaceholder
        src={product.image}
        alt={tx({
          en: 'Integrated mixer pump, factory product photo, Hebei Pinjin Machinery, Xingtai',
          zh: '搅拌泵一体机工厂产品图，河北品锦机械，邢台',
        })}
        width={1536}
        height={1024}
        className="buyer-figure-media"
        imgClassName="buyer-figure-img object-contain"
        label=""
        hint=""
      />
      <figcaption className="buyer-figure-cap">
        <span>{tx({ en: 'Catalogue machine', zh: '目录机器' })}</span>
        <span>{tx({ en: 'Xingtai, Hebei, China', zh: '中国河北邢台' })}</span>
        <span>{tx({ en: 'Factory product photo', zh: '工厂产品图' })}</span>
      </figcaption>
    </figure>
  );
}

function FamilyCard({ id }: { id: (typeof familyIds)[number] }) {
  const { tx } = useI18n();
  const meta = categoryMeta[id as ProductCategory];
  const showcase: Record<string, string> = {
    'electric-concrete-pump': 'electric-40-concrete-pump',
    'diesel-concrete-pump': 'diesel-50-concrete-pump',
    'mixer-pump': 'integrated-mixer-pump',
    'spraying-machine': 'hydraulic-concrete-spraying-machine',
  };
  const product = getProductBySlug(showcase[id] ?? '');
  return (
    <article className="buyer-family">
      {product ? (
        <ImagePlaceholder
          src={product.image}
          alt={tx(product.name)}
          width={1536}
          height={1024}
          className="buyer-figure-media"
          imgClassName="buyer-figure-img object-contain"
          label=""
          hint=""
        />
      ) : null}
      <h3 className="heading-display buyer-h3">{tx(meta.label)}</h3>
      <p className="buyer-copy">{tx(meta.description)}</p>
      <LocaleLink to={getCategoryPath(id)} className="buyer-text-link">
        {tx({ en: 'View equipment', zh: '查看设备' })} →
      </LocaleLink>
    </article>
  );
}
