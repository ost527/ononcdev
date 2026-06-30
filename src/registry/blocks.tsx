import { BentoGrid } from "@/components/blocks/bento-grid";
import { CTASection } from "@/components/blocks/cta-section";
import { FAQBlock } from "@/components/blocks/faq-block";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { FooterBlock } from "@/components/blocks/footer-block";
import { HeroBlock } from "@/components/blocks/hero-block";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { NavbarBlock } from "@/components/blocks/navbar-block";
import { NewsletterBlock } from "@/components/blocks/newsletter-block";
import { Pricing } from "@/components/blocks/pricing";
import { StatsBand } from "@/components/blocks/stats-band";
import { StepsBlock } from "@/components/blocks/steps-block";
import { Testimonials } from "@/components/blocks/testimonials";
import { Timeline } from "@/components/blocks/timeline";
import { ComparisonTable } from "@/components/blocks/comparison-table";
import { BannerBlock } from "@/components/blocks/banner-block";
import { TeamGrid } from "@/components/blocks/team-grid";
import type { Category } from "@/registry/types";

export const blocks: Category = {
  id: "blocks",
  label: "Section Blocks",
  blurb:
    "Composed, drop-in page sections built from the primitives above — from navbar to footer.",
  items: [
    {
      id: "navbar-block",
      name: "Navbar",
      description: "Responsive navigation that collapses to a mobile menu.",
      sourcePath: "components/blocks/navbar-block.tsx",
      tags: ["composed", "responsive"],
      preview: <NavbarBlock />,
    },
    {
      id: "hero-block",
      name: "Hero",
      description: "Animated marketing hero over an aurora field.",
      sourcePath: "components/blocks/hero-block.tsx",
      tags: ["composed", "motion"],
      preview: <HeroBlock />,
    },
    {
      id: "logo-cloud",
      name: "Logo Cloud",
      description: "A quiet marquee of customer wordmarks.",
      sourcePath: "components/blocks/logo-cloud.tsx",
      tags: ["composed", "loop"],
      preview: <LogoCloud />,
    },
    {
      id: "bento-grid",
      name: "Bento Grid",
      description: "Editorial asymmetric grid of spotlight feature cards.",
      sourcePath: "components/blocks/bento-grid.tsx",
      tags: ["layout", "pointer"],
      preview: <BentoGrid />,
    },
    {
      id: "feature-grid",
      name: "Feature Grid",
      description: "Titled three-column grid of capabilities.",
      sourcePath: "components/blocks/feature-grid.tsx",
      tags: ["layout"],
      preview: <FeatureGrid />,
    },
    {
      id: "steps-block",
      name: "Steps",
      description: "Numbered how-it-works sequence with a connector line.",
      sourcePath: "components/blocks/steps-block.tsx",
      tags: ["layout"],
      preview: <StepsBlock />,
    },
    {
      id: "stats-band",
      name: "Stats Band",
      description: "Headline metrics that count up on view.",
      sourcePath: "components/blocks/stats-band.tsx",
      tags: ["composed", "scroll"],
      preview: <StatsBand />,
    },
    {
      id: "pricing",
      name: "Pricing",
      description: "Three comparable tiers with a highlighted plan.",
      sourcePath: "components/blocks/pricing.tsx",
      tags: ["layout"],
      preview: <Pricing />,
    },
    {
      id: "testimonials",
      name: "Testimonials",
      description: "Opposing marquee rows of quote cards.",
      sourcePath: "components/blocks/testimonials.tsx",
      tags: ["composed", "loop"],
      preview: <Testimonials />,
    },
    {
      id: "faq-block",
      name: "FAQ",
      description: "Frequently-asked questions built on the Accordion.",
      sourcePath: "components/blocks/faq-block.tsx",
      tags: ["composed", "a11y"],
      preview: <FAQBlock />,
    },
    {
      id: "newsletter-block",
      name: "Newsletter",
      description: "Subscribe form with validation (front-end only).",
      sourcePath: "components/blocks/newsletter-block.tsx",
      tags: ["composed", "form"],
      preview: <NewsletterBlock />,
    },
    {
      id: "comparison-table",
      name: "Comparison Table",
      description: "Feature matrix comparing plans with a highlighted column.",
      sourcePath: "components/blocks/comparison-table.tsx",
      tags: ["layout"],
      preview: <ComparisonTable />,
    },
    {
      id: "timeline",
      name: "Timeline",
      description: "A vertical rail-and-node timeline of milestones.",
      sourcePath: "components/blocks/timeline.tsx",
      tags: ["layout"],
      preview: <Timeline />,
    },
    {
      id: "banner-block",
      name: "Banner",
      description: "Dismissible announcement bar with a CTA.",
      sourcePath: "components/blocks/banner-block.tsx",
      tags: ["composed"],
      preview: <BannerBlock />,
    },
    {
      id: "team-grid",
      name: "Team Grid",
      description: "Responsive grid of team member cards with avatars.",
      sourcePath: "components/blocks/team-grid.tsx",
      tags: ["layout"],
      preview: <TeamGrid />,
    },
    {
      id: "cta-section",
      name: "CTA Section",
      description: "Closing call-to-action over an animated mesh.",
      sourcePath: "components/blocks/cta-section.tsx",
      tags: ["composed"],
      preview: <CTASection />,
    },
    {
      id: "footer-block",
      name: "Footer",
      description: "Four-region footer with brand, links, and socials.",
      sourcePath: "components/blocks/footer-block.tsx",
      tags: ["layout"],
      preview: <FooterBlock />,
    },
  ],
};
