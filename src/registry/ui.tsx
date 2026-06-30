import {
  ArrowRight,
  Bell,
  Compass,
  Heart,
  Home,
  LogOut,
  Music,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Carousel } from "@/components/ui/carousel";
import { Dock } from "@/components/ui/dock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { RippleButton } from "@/components/ui/ripple-button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Switch } from "@/components/ui/switch";
import { Tabs } from "@/components/ui/tabs";
import { TiltCard } from "@/components/ui/tilt-card";
import { Tooltip } from "@/components/ui/tooltip";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { ImageCompare } from "@/components/ui/image-compare";
import { OTPInput } from "@/components/ui/otp-input";
import { Popover } from "@/components/ui/popover";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Rating } from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Combobox } from "@/components/ui/combobox";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Pagination } from "@/components/ui/pagination";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TagInput } from "@/components/ui/tag-input";
import { ToggleGroup } from "@/components/ui/toggle-group";
import {
  CommandPaletteDemo,
  DrawerDemo,
  ModalDemo,
  ScrollProgressDemo,
  StepperDemo,
  ToastDemo,
} from "@/components/showcase/demos";
import type { Category } from "@/registry/types";

const MARQUEE_CHIPS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Motion",
  "Canvas",
];

const CAROUSEL_SLIDES = [
  "from-brand to-brand-2",
  "from-brand-2 to-brand-3",
  "from-brand-3 to-brand",
].map((grad, i) => (
  <div
    key={i}
    className={`flex h-44 items-center justify-center bg-gradient-to-br ${grad} text-2xl font-semibold text-white`}
  >
    Slide {i + 1}
  </div>
));

export const ui: Category = {
  id: "ui",
  label: "Components",
  blurb:
    "Interactive building blocks — cards, buttons, disclosure, tabs, toasts and more. Keyboard and reduced-motion aware.",
  items: [
    {
      id: "magnetic-button",
      name: "Magnetic Button",
      description: "Springs toward the cursor, then snaps back on leave.",
      sourcePath: "components/ui/magnetic-button.tsx",
      tags: ["motion", "hover"],
      preview: (
        <MagneticButton aria-label="Magnetic demo button">
          Hover me
          <ArrowRight className="size-4" />
        </MagneticButton>
      ),
    },
    {
      id: "shimmer-button",
      name: "Shimmer Button",
      description: "A band of light orbits the border continuously.",
      sourcePath: "components/ui/shimmer-button.tsx",
      tags: ["CSS"],
      preview: <ShimmerButton>Get started</ShimmerButton>,
    },
    {
      id: "ripple-button",
      name: "Ripple Button",
      description: "Emits a ripple from the exact press point.",
      sourcePath: "components/ui/ripple-button.tsx",
      tags: ["pointer"],
      preview: <RippleButton>Press me</RippleButton>,
    },
    {
      id: "tilt-card",
      name: "Tilt Card",
      description: "Tilts in 3D toward the pointer with a tracking glare.",
      sourcePath: "components/ui/tilt-card.tsx",
      tags: ["motion", "3D"],
      preview: (
        <TiltCard className="w-60">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="h-2 w-12 rounded-full bg-brand" />
            <h4 className="mt-4 font-semibold">Tilt me around</h4>
            <p className="mt-1 text-sm text-muted">
              Move your cursor across the card.
            </p>
          </div>
        </TiltCard>
      ),
    },
    {
      id: "spotlight-card",
      name: "Spotlight Card",
      description: "A radial glow follows the cursor across the surface.",
      sourcePath: "components/ui/spotlight-card.tsx",
      tags: ["pointer"],
      preview: (
        <SpotlightCard className="w-64">
          <h4 className="font-semibold">Spotlight</h4>
          <p className="mt-1 text-sm text-muted">Hover to sweep the highlight.</p>
        </SpotlightCard>
      ),
    },
    {
      id: "dock",
      name: "Dock",
      description: "macOS-style icons that magnify by cursor proximity.",
      sourcePath: "components/ui/dock.tsx",
      tags: ["motion"],
      preview: (
        <Dock
          items={[
            { icon: <Home className="size-full" />, label: "Home" },
            { icon: <Search className="size-full" />, label: "Search" },
            { icon: <Compass className="size-full" />, label: "Explore" },
            { icon: <Music className="size-full" />, label: "Music" },
            { icon: <Bell className="size-full" />, label: "Alerts" },
            { icon: <Settings className="size-full" />, label: "Settings" },
          ]}
        />
      ),
    },
    {
      id: "marquee",
      name: "Marquee",
      description: "A seamless infinite scroller that pauses on hover.",
      sourcePath: "components/ui/marquee.tsx",
      tags: ["CSS", "loop"],
      frameClassName: "h-64 w-full px-0",
      preview: (
        <Marquee className="py-2">
          {MARQUEE_CHIPS.map((chip) => (
            <span
              key={chip}
              className="mx-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm"
            >
              <Heart className="size-4 text-brand-3" />
              {chip}
            </span>
          ))}
        </Marquee>
      ),
    },
    {
      id: "carousel",
      name: "Carousel",
      description: "Looping slides with arrows, dots, and arrow-key support.",
      sourcePath: "components/ui/carousel.tsx",
      tags: ["a11y", "keyboard"],
      preview: <Carousel slides={CAROUSEL_SLIDES} className="w-80" />,
    },
    {
      id: "accordion",
      name: "Accordion",
      description: "Accessible disclosure list with smooth height transitions.",
      sourcePath: "components/ui/accordion.tsx",
      tags: ["a11y", "disclosure"],
      frameClassName: "min-h-72 w-full items-start p-6",
      preview: (
        <Accordion
          className="w-full max-w-sm"
          defaultIndex={0}
          items={[
            { title: "What is Lumen UI?", content: "An original animated component kit." },
            { title: "Is it accessible?", content: "Yes — ARIA wiring and keyboard support throughout." },
            { title: "Can I theme it?", content: "Everything reads from CSS variables." },
          ]}
        />
      ),
    },
    {
      id: "tabs",
      name: "Tabs",
      description: "Accessible tablist with a sliding underline indicator.",
      sourcePath: "components/ui/tabs.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-72 w-full items-start p-6",
      preview: (
        <Tabs
          className="w-full max-w-sm"
          items={[
            { label: "Overview", content: "A quick summary lives in this panel." },
            { label: "Features", content: "Tabs roving focus with arrow keys." },
            { label: "Pricing", content: "Switch tabs to slide the indicator." },
          ]}
        />
      ),
    },
    {
      id: "tooltip",
      name: "Tooltip",
      description: "Shows on hover and keyboard focus, linked via aria.",
      sourcePath: "components/ui/tooltip.tsx",
      tags: ["a11y", "hover"],
      preview: (
        <Tooltip label="Helpful context appears here">
          <button className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">
            Hover or focus me
          </button>
        </Tooltip>
      ),
    },
    {
      id: "switch",
      name: "Switch",
      description: "Accessible toggle with a spring thumb.",
      sourcePath: "components/ui/switch.tsx",
      tags: ["a11y", "form"],
      preview: (
        <div className="flex items-center gap-3">
          <Switch defaultChecked label="Enable notifications" />
          <span className="text-sm text-muted">Notifications</span>
        </div>
      ),
    },
    {
      id: "segmented-control",
      name: "Segmented Control",
      description: "Single-select with a pill that slides to the choice.",
      sourcePath: "components/ui/segmented-control.tsx",
      tags: ["a11y", "motion"],
      preview: <SegmentedControl options={["Day", "Week", "Month"]} />,
    },
    {
      id: "modal",
      name: "Modal",
      description: "Portaled dialog with focus management and Escape to close.",
      sourcePath: "components/ui/modal.tsx",
      tags: ["a11y", "portal"],
      preview: <ModalDemo />,
    },
    {
      id: "toast",
      name: "Toast",
      description: "Imperative toasts via a tiny store and a Toaster.",
      sourcePath: "components/ui/toast.tsx",
      tags: ["store", "aria-live"],
      preview: <ToastDemo />,
    },
    {
      id: "command-palette",
      name: "Command Palette",
      description: "⌘K launcher with live filtering and full keyboard nav.",
      sourcePath: "components/ui/command-palette.tsx",
      tags: ["a11y", "keyboard", "portal"],
      preview: <CommandPaletteDemo />,
    },
    {
      id: "dropdown-menu",
      name: "Dropdown Menu",
      description: "Menu button with roving focus, Escape, and outside-click.",
      sourcePath: "components/ui/dropdown-menu.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <DropdownMenu
          label="Options"
          items={[
            { label: "Profile", icon: <User className="size-4" /> },
            { label: "Settings", icon: <Settings className="size-4" /> },
            { label: "Sign out", icon: <LogOut className="size-4" />, danger: true },
          ]}
        />
      ),
    },
    {
      id: "popover",
      name: "Popover",
      description: "Floating panel of arbitrary content with focus return.",
      sourcePath: "components/ui/popover.tsx",
      tags: ["a11y", "overlay"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <Popover label="Open popover">
          <h4 className="font-semibold text-foreground">Dimensions</h4>
          <p className="mt-1 text-muted">
            Put any content in here — forms, menus, or details.
          </p>
        </Popover>
      ),
    },
    {
      id: "drawer",
      name: "Drawer",
      description: "Slide-in side panel with focus management and Escape.",
      sourcePath: "components/ui/drawer.tsx",
      tags: ["a11y", "portal"],
      preview: <DrawerDemo />,
    },
    {
      id: "otp-input",
      name: "OTP Input",
      description: "Segmented code entry with auto-advance and paste.",
      sourcePath: "components/ui/otp-input.tsx",
      tags: ["form", "keyboard"],
      preview: <OTPInput />,
    },
    {
      id: "slider",
      name: "Slider",
      description: "Range input with pointer drag and keyboard control.",
      sourcePath: "components/ui/slider.tsx",
      tags: ["a11y", "form"],
      preview: <Slider aria-label="Volume" defaultValue={60} />,
    },
    {
      id: "rating",
      name: "Rating",
      description: "Star rating with hover preview and arrow-key adjust.",
      sourcePath: "components/ui/rating.tsx",
      tags: ["a11y", "form"],
      preview: <Rating defaultValue={3} />,
    },
    {
      id: "stepper",
      name: "Stepper",
      description: "Multi-step progress with completed and active states.",
      sourcePath: "components/ui/stepper.tsx",
      tags: ["progress"],
      frameClassName: "min-h-72 w-full items-center p-6",
      preview: <StepperDemo />,
    },
    {
      id: "progress-ring",
      name: "Progress Ring",
      description: "Radial dial that eases to its value on view.",
      sourcePath: "components/ui/progress-ring.tsx",
      tags: ["motion", "scroll"],
      preview: <ProgressRing value={78} />,
    },
    {
      id: "scroll-progress",
      name: "Scroll Progress",
      description: "Gradient bar tied to scroll position (window or container).",
      sourcePath: "components/ui/scroll-progress.tsx",
      tags: ["motion", "scroll"],
      preview: <ScrollProgressDemo />,
    },
    {
      id: "image-compare",
      name: "Image Compare",
      description: "Before/after wipe with a draggable, keyboardable handle.",
      sourcePath: "components/ui/image-compare.tsx",
      tags: ["pointer", "keyboard"],
      frameClassName: "min-h-72 w-full items-center p-6",
      preview: (
        <ImageCompare
          className="max-w-sm"
          before={
            <div className="grid h-full place-items-center bg-gradient-to-br from-brand to-brand-2 text-lg font-semibold text-white">
              Before
            </div>
          }
          after={
            <div className="grid h-full place-items-center bg-gradient-to-br from-brand-3 to-brand text-lg font-semibold text-white">
              After
            </div>
          }
        />
      ),
    },
    {
      id: "avatar-stack",
      name: "Avatar Stack",
      description: "Overlapping avatars with an overflow +N chip.",
      sourcePath: "components/ui/avatar-stack.tsx",
      tags: ["layout"],
      preview: (
        <AvatarStack
          names={["Mara Vance", "Devon Park", "Iris Cho", "Leo Mendez", "Sana Rao", "Tom Reyes"]}
        />
      ),
    },
    {
      id: "breadcrumbs",
      name: "Breadcrumbs",
      description: "Accessible trail with chevrons and aria-current.",
      sourcePath: "components/ui/breadcrumbs.tsx",
      tags: ["a11y", "nav"],
      preview: (
        <Breadcrumbs
          items={[{ label: "Home" }, { label: "Components" }, { label: "Breadcrumbs" }]}
        />
      ),
    },
    {
      id: "skeleton",
      name: "Skeleton",
      description: "Shimmering placeholders for loading states.",
      sourcePath: "components/ui/skeleton.tsx",
      tags: ["loading"],
      preview: (
        <div className="w-64 space-y-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ),
    },
    {
      id: "combobox",
      name: "Combobox",
      description: "Accessible autocomplete with live filtering and keyboard nav.",
      sourcePath: "components/ui/combobox.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <Combobox
          placeholder="Pick a framework"
          options={["Next.js", "React", "Svelte", "Vue", "Solid", "Astro", "Remix"]}
        />
      ),
    },
    {
      id: "toggle-group",
      name: "Toggle Group",
      description: "Single or multiple selection of toggle buttons.",
      sourcePath: "components/ui/toggle-group.tsx",
      tags: ["a11y", "form"],
      preview: (
        <ToggleGroup
          type="multiple"
          defaultValue={["bold"]}
          options={[
            { value: "bold", label: <span className="font-bold">B</span> },
            { value: "italic", label: <span className="italic">I</span> },
            { value: "underline", label: <span className="underline">U</span> },
          ]}
        />
      ),
    },
    {
      id: "tag-input",
      name: "Tag Input",
      description: "Add chips with Enter, remove with × or Backspace.",
      sourcePath: "components/ui/tag-input.tsx",
      tags: ["form", "keyboard"],
      preview: <TagInput defaultTags={["React", "Next.js", "Tailwind"]} />,
    },
    {
      id: "pagination",
      name: "Pagination",
      description: "Numbered pages with prev/next and ellipsis collapsing.",
      sourcePath: "components/ui/pagination.tsx",
      tags: ["a11y", "nav"],
      preview: <Pagination count={10} defaultPage={4} />,
    },
    {
      id: "progress-bar",
      name: "Progress Bar",
      description: "Linear meter that fills to its value on view.",
      sourcePath: "components/ui/progress-bar.tsx",
      tags: ["motion", "scroll"],
      preview: <ProgressBar value={68} label="Storage" />,
    },
    {
      id: "file-dropzone",
      name: "File Dropzone",
      description: "Drag-and-drop file picker with a list (front-end only).",
      sourcePath: "components/ui/file-dropzone.tsx",
      tags: ["form", "pointer"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: <FileDropzone />,
    },
  ],
};
