import {
  ArrowRight,
  Bell,
  Bold,
  ClipboardPaste,
  Compass,
  Copy,
  Heart,
  Home,
  Inbox,
  Italic,
  List,
  LogOut,
  Music,
  Plus,
  Scissors,
  Search,
  Settings,
  Strikethrough,
  Trash2,
  Underline,
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
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ContextMenu } from "@/components/ui/context-menu";
import { DatePicker } from "@/components/ui/date-picker";
import { HoverCard } from "@/components/ui/hover-card";
import { NumberInput } from "@/components/ui/number-input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "@/components/ui/stat-card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { ColorPicker } from "@/components/ui/color-picker";
import { DataTable } from "@/components/ui/data-table";
import { Kbd } from "@/components/ui/kbd";
import { Menubar } from "@/components/ui/menubar";
import { Resizable } from "@/components/ui/resizable";
import { Toolbar } from "@/components/ui/toolbar";
import { TreeView } from "@/components/ui/tree-view";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";
import { EmptyState } from "@/components/ui/empty-state";
import { MultiSelect } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TimePicker } from "@/components/ui/time-picker";
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
            { title: "What is ONONC?", content: "An original animated component kit." },
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
    {
      id: "checkbox",
      name: "Checkbox",
      description: "Tri-state checkbox with an indeterminate option and labels.",
      sourcePath: "components/ui/checkbox.tsx",
      tags: ["a11y", "form"],
      frameClassName: "min-h-72 w-full items-center justify-center p-6",
      preview: (
        <div className="space-y-3">
          <Checkbox
            defaultChecked
            label="Email notifications"
            description="Get notified when something happens."
          />
          <Checkbox
            indeterminate
            label="Select all"
            description="Some items are selected."
          />
          <Checkbox label="Disabled option" disabled />
        </div>
      ),
    },
    {
      id: "radio-group",
      name: "Radio Group",
      description: "Single-select with roving focus and arrow-key navigation.",
      sourcePath: "components/ui/radio-group.tsx",
      tags: ["a11y", "form"],
      frameClassName: "min-h-72 w-full items-center justify-center p-6",
      preview: (
        <RadioGroup
          aria-label="Plan"
          className="w-64"
          defaultValue="pro"
          options={[
            { value: "free", label: "Free", description: "For trying things out." },
            { value: "pro", label: "Pro", description: "For growing teams." },
            { value: "ent", label: "Enterprise", description: "Advanced controls." },
          ]}
        />
      ),
    },
    {
      id: "select",
      name: "Select",
      description: "Listbox-style picker with type-ahead and full keyboard nav.",
      sourcePath: "components/ui/select.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <Select
          aria-label="Framework"
          placeholder="Choose a framework"
          options={[
            { value: "next", label: "Next.js" },
            { value: "remix", label: "Remix" },
            { value: "astro", label: "Astro" },
            { value: "nuxt", label: "Nuxt", disabled: true },
            { value: "sveltekit", label: "SvelteKit" },
          ]}
        />
      ),
    },
    {
      id: "number-input",
      name: "Number Input",
      description: "Numeric stepper with clamp, step, and keyboard control.",
      sourcePath: "components/ui/number-input.tsx",
      tags: ["a11y", "form"],
      preview: (
        <NumberInput aria-label="Quantity" defaultValue={2} min={0} max={10} />
      ),
    },
    {
      id: "textarea",
      name: "Textarea",
      description: "Auto-resizing multiline field with an optional counter.",
      sourcePath: "components/ui/textarea.tsx",
      tags: ["form"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <Textarea
          className="w-72"
          placeholder="Write a short bio…"
          defaultValue="ONONC is an original, motion-first component library."
          maxLength={160}
          showCount
        />
      ),
    },
    {
      id: "badge",
      name: "Badge",
      description: "Compact status label in solid, soft, and outline variants.",
      sourcePath: "components/ui/badge.tsx",
      tags: ["display"],
      preview: (
        <div className="flex max-w-xs flex-wrap items-center justify-center gap-2">
          <Badge tone="brand">Brand</Badge>
          <Badge tone="success" dot>
            Live
          </Badge>
          <Badge tone="warning" variant="soft">
            Beta
          </Badge>
          <Badge tone="danger" variant="outline">
            Deprecated
          </Badge>
          <Badge tone="neutral" variant="solid">
            v2.0
          </Badge>
        </div>
      ),
    },
    {
      id: "alert",
      name: "Alert",
      description: "Semantic callouts for info, success, warning, and errors.",
      sourcePath: "components/ui/alert.tsx",
      tags: ["feedback", "a11y"],
      frameClassName: "min-h-72 w-full items-center justify-center p-6",
      preview: (
        <div className="w-80 space-y-3">
          <Alert variant="success" title="Payment received" dismissible>
            Your invoice has been paid in full.
          </Alert>
          <Alert variant="warning" title="Storage almost full">
            You have used 92% of your quota.
          </Alert>
        </div>
      ),
    },
    {
      id: "spinner",
      name: "Spinner",
      description: "Accessible loading indicator in three sizes.",
      sourcePath: "components/ui/spinner.tsx",
      tags: ["feedback", "loading"],
      preview: (
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner label="Loading…" />
        </div>
      ),
    },
    {
      id: "hover-card",
      name: "Hover Card",
      description: "Rich preview revealed on hover or keyboard focus, with delay.",
      sourcePath: "components/ui/hover-card.tsx",
      tags: ["overlay", "hover"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <HoverCard
          trigger={
            <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground">
              @ononc
            </button>
          }
        >
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-sm font-semibold text-white">
              L
            </div>
            <div>
              <p className="font-semibold text-foreground">ONONC</p>
              <p className="text-xs">Motion-first React components.</p>
            </div>
          </div>
          <p className="mt-3">Hover cards reveal extra context without a click.</p>
        </HoverCard>
      ),
    },
    {
      id: "context-menu",
      name: "Context Menu",
      description: "Right-click menu at the pointer with keyboard navigation.",
      sourcePath: "components/ui/context-menu.tsx",
      tags: ["a11y", "pointer", "portal"],
      preview: (
        <ContextMenu
          items={[
            { label: "Copy", icon: <Copy className="size-4" />, shortcut: "⌘C" },
            { label: "Cut", icon: <Scissors className="size-4" />, shortcut: "⌘X" },
            {
              label: "Paste",
              icon: <ClipboardPaste className="size-4" />,
              shortcut: "⌘V",
            },
            { separator: true },
            { label: "Delete", icon: <Trash2 className="size-4" />, danger: true },
          ]}
        >
          <div className="grid h-32 w-64 place-items-center rounded-xl border border-dashed border-border-strong text-sm text-muted">
            Right-click here
          </div>
        </ContextMenu>
      ),
    },
    {
      id: "date-picker",
      name: "Date Picker",
      description: "Calendar popover with WAI-ARIA grid keyboard navigation.",
      sourcePath: "components/ui/date-picker.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-96 w-full items-start justify-center p-6",
      preview: <DatePicker aria-label="Date" />,
    },
    {
      id: "stat-card",
      name: "Stat Card",
      description: "KPI tile with a trend delta and an animated sparkline.",
      sourcePath: "components/ui/stat-card.tsx",
      tags: ["display", "motion"],
      preview: (
        <StatCard
          label="Revenue"
          value="$48.2k"
          delta={12.4}
          hint="vs last week"
          data={[8, 12, 9, 15, 13, 19, 17, 24]}
        />
      ),
    },
    {
      id: "resizable",
      name: "Resizable",
      description: "Split panels with a draggable, keyboard-resizable divider.",
      sourcePath: "components/ui/resizable.tsx",
      tags: ["pointer", "a11y"],
      frameClassName: "min-h-72 w-full items-center p-6",
      preview: (
        <Resizable
          aria-label="Resize demo"
          className="h-44 w-full max-w-md"
          first={
            <div className="grid h-full place-items-center bg-gradient-to-br from-brand/15 to-transparent text-sm text-muted">
              Sidebar
            </div>
          }
          second={
            <div className="grid h-full place-items-center text-sm text-muted">
              Content
            </div>
          }
        />
      ),
    },
    {
      id: "tree-view",
      name: "Tree View",
      description: "Expandable hierarchy with roving focus and arrow-key nav.",
      sourcePath: "components/ui/tree-view.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-80 w-full items-start justify-center p-6",
      preview: (
        <TreeView
          aria-label="Files"
          className="w-60"
          defaultExpanded={["src", "components"]}
          data={[
            {
              id: "src",
              label: "src",
              children: [
                {
                  id: "components",
                  label: "components",
                  children: [
                    { id: "button", label: "button.tsx" },
                    { id: "card", label: "card.tsx" },
                  ],
                },
                { id: "lib", label: "lib", children: [{ id: "utils", label: "utils.ts" }] },
                { id: "index", label: "index.ts" },
              ],
            },
            { id: "readme", label: "README.md" },
          ]}
        />
      ),
    },
    {
      id: "toolbar",
      name: "Toolbar",
      description: "Grouped controls with roving focus and aria-pressed toggles.",
      sourcePath: "components/ui/toolbar.tsx",
      tags: ["a11y", "keyboard"],
      preview: (
        <Toolbar
          aria-label="Text formatting"
          items={[
            { type: "toggle", id: "bold", label: "Bold", icon: <Bold className="size-4" />, defaultPressed: true },
            { type: "toggle", id: "italic", label: "Italic", icon: <Italic className="size-4" /> },
            { type: "toggle", id: "underline", label: "Underline", icon: <Underline className="size-4" /> },
            { type: "toggle", id: "strike", label: "Strikethrough", icon: <Strikethrough className="size-4" /> },
            { type: "separator", id: "s1" },
            { id: "list", label: "Bulleted list", icon: <List className="size-4" /> },
          ]}
        />
      ),
    },
    {
      id: "menubar",
      name: "Menubar",
      description: "Application menu bar with arrow-key navigation between menus.",
      sourcePath: "components/ui/menubar.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-80 w-full items-start justify-center p-6",
      preview: (
        <Menubar
          aria-label="Main menu"
          menus={[
            {
              label: "File",
              items: [
                { label: "New File", shortcut: "⌘N" },
                { label: "Open…", shortcut: "⌘O" },
                { label: "Save", shortcut: "⌘S" },
              ],
            },
            {
              label: "Edit",
              items: [
                { label: "Undo", shortcut: "⌘Z" },
                { label: "Redo", shortcut: "⇧⌘Z" },
                { label: "Cut", disabled: true },
              ],
            },
            {
              label: "View",
              items: [
                { label: "Zoom In" },
                { label: "Zoom Out" },
                { label: "Full Screen", shortcut: "⌃⌘F" },
              ],
            },
          ]}
        />
      ),
    },
    {
      id: "data-table",
      name: "Data Table",
      description: "Sortable columns with aria-sort and optional row selection.",
      sourcePath: "components/ui/data-table.tsx",
      tags: ["a11y", "data"],
      frameClassName: "min-h-80 w-full items-start p-6",
      preview: (
        <DataTable
          className="w-full max-w-lg"
          caption="Team members"
          selectable
          rowKey="name"
          columns={[
            { key: "name", header: "Name", sortable: true },
            { key: "role", header: "Role", sortable: true },
            { key: "commits", header: "Commits", sortable: true, align: "right" },
          ]}
          rows={[
            { name: "Mara Vance", role: "Engineer", commits: 482 },
            { name: "Devon Park", role: "Designer", commits: 197 },
            { name: "Iris Cho", role: "PM", commits: 88 },
            { name: "Leo Mendez", role: "Engineer", commits: 341 },
          ]}
        />
      ),
    },
    {
      id: "color-picker",
      name: "Color Picker",
      description: "HSV picker with a hue slider, hex input, and swatches.",
      sourcePath: "components/ui/color-picker.tsx",
      tags: ["pointer", "form"],
      frameClassName: "min-h-80 w-full items-start justify-center p-6",
      preview: <ColorPicker defaultValue="#8b5cf6" />,
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Inline month grid for single or range selection (range shown).",
      sourcePath: "components/ui/calendar.tsx",
      tags: ["a11y", "keyboard"],
      frameClassName: "min-h-96 w-full items-start justify-center p-6",
      preview: <Calendar mode="range" aria-label="Date range" />,
    },
    {
      id: "kbd",
      name: "Kbd",
      description: "Keyboard key caps for documenting shortcuts.",
      sourcePath: "components/ui/kbd.tsx",
      tags: ["display"],
      preview: (
        <div className="flex flex-col items-center gap-3">
          <Kbd keys={["⌘", "K"]} />
          <Kbd keys={["Ctrl", "Shift", "P"]} />
          <Kbd keys={["Esc"]} />
        </div>
      ),
    },
    {
      id: "card",
      name: "Card",
      description: "Composable content surface with header, content, and footer.",
      sourcePath: "components/ui/card.tsx",
      tags: ["layout", "display"],
      preview: (
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock advanced analytics and priority support.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted">
            Everything in Free, plus unlimited projects and team seats.
          </CardContent>
          <CardFooter>
            <button
              type="button"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              Upgrade
            </button>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: "avatar",
      name: "Avatar",
      description: "User image with initials fallback and an optional status dot.",
      sourcePath: "components/ui/avatar.tsx",
      tags: ["display"],
      preview: (
        <div className="flex items-center gap-4">
          <Avatar name="Mara Vance" status="online" />
          <Avatar name="Devon Park" size="lg" status="busy" />
          <Avatar name="Iris Cho" size="sm" status="away" />
        </div>
      ),
    },
    {
      id: "separator",
      name: "Separator",
      description: "Thin divider, horizontal or vertical, with an optional label.",
      sourcePath: "components/ui/separator.tsx",
      tags: ["layout"],
      frameClassName: "min-h-72 w-full items-center justify-center p-6",
      preview: (
        <div className="w-64 space-y-4 text-sm text-muted">
          <p>Account settings</p>
          <Separator />
          <p>Billing</p>
          <Separator label="or" />
          <div className="flex items-center gap-3">
            <span>Email</span>
            <Separator orientation="vertical" className="h-5" />
            <span>SMS</span>
          </div>
        </div>
      ),
    },
    {
      id: "collapsible",
      name: "Collapsible",
      description: "A single show/hide disclosure with an animated height.",
      sourcePath: "components/ui/collapsible.tsx",
      tags: ["a11y", "disclosure"],
      frameClassName: "min-h-72 w-full items-start justify-center p-6",
      preview: (
        <Collapsible
          label="What's included?"
          defaultOpen
          className="max-w-sm rounded-xl border border-border bg-surface p-2"
        >
          Unlimited projects, advanced analytics, and priority support — all in
          one plan.
        </Collapsible>
      ),
    },
    {
      id: "scroll-area",
      name: "Scroll Area",
      description: "A bounded scroll container with a custom, themed scrollbar.",
      sourcePath: "components/ui/scroll-area.tsx",
      tags: ["pointer", "layout"],
      preview: (
        <ScrollArea className="h-48 w-64 rounded-xl border border-border bg-surface">
          <div className="space-y-2 p-4 text-sm text-muted">
            <p className="font-medium text-foreground">Changelog</p>
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i}>
                v1.{12 - i} — improvements and bug fixes across the board.
              </p>
            ))}
          </div>
        </ScrollArea>
      ),
    },
    {
      id: "empty-state",
      name: "Empty State",
      description: "A centered placeholder for empty content with an action.",
      sourcePath: "components/ui/empty-state.tsx",
      tags: ["display", "feedback"],
      frameClassName: "min-h-72 w-full items-center justify-center p-6",
      preview: (
        <EmptyState
          className="max-w-sm"
          icon={<Inbox className="size-6" />}
          title="No messages yet"
          description="When you receive messages, they'll show up here."
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              <Plus className="size-4" />
              New message
            </button>
          }
        />
      ),
    },
    {
      id: "multi-select",
      name: "Multi-Select",
      description: "Searchable multi-select with removable chips and keyboard nav.",
      sourcePath: "components/ui/multi-select.tsx",
      tags: ["a11y", "form"],
      frameClassName: "min-h-80 w-full items-start justify-center p-6",
      preview: (
        <MultiSelect
          aria-label="Technologies"
          defaultValue={["React", "TypeScript"]}
          options={[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "GraphQL",
            "Prisma",
            "Vite",
          ]}
        />
      ),
    },
    {
      id: "time-picker",
      name: "Time Picker",
      description: "Pick an hour, minute, and AM/PM with spinbutton segments.",
      sourcePath: "components/ui/time-picker.tsx",
      tags: ["a11y", "form"],
      preview: <TimePicker defaultValue={{ hour: 9, minute: 30, period: "AM" }} />,
    },
  ],
};
