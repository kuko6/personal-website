<script lang="ts">
  // import Project from "../../components/Project.svelte";
  type Project = {
    name: string;
    description: string;
    ref: string;
    used_tech: string[];
    open_source: boolean;
  };

  const project: Project[] = [
    {
      name: "Simple Pixelart Filter",
      description:
        "An app that allows you to pixelate images, quantize colors and display color palettes.",
      ref: "https://github.com/kuko6/pixel-filter",
      used_tech: ["Python", "OpenCV", "Gradio"],
      open_source: true,
    },
    {
      name: "Advent of Code",
      description: "Solutions for Advent of Code in TypeScript.",
      ref: "https://github.com/kuko6/advent-of-code",
      used_tech: ["Deno", "TypeScript"],
      open_source: true,
    },
    {
      name: "Click Correction",
      description:
        "Method for Segmentation of Vestibular Schwannomas from Brain MRI Scans. The method is based on an auxilarly correction network, which utilises user-defined clicks to refines inaccurate segmentation.",
      ref: "https://github.com/kuko6/click-correction",
      used_tech: ["Pytorch", "OpenCV", "AzureML", "Docker"],
      open_source: true,
    },
    {
      name: "Style Transfer",
      description:
        "Implementation of style transfer using Adaptive Instance Normalization (AdaIN) with a VGG-19-based architecture, trained on WikiArt and COCO datasets.",
      ref: "https://github.com/kuko6/style-transfer",
      used_tech: ["Pytorch", "Gradio"],
      open_source: true,
    },
    {
      name: "Various Computer Vision Assignments",
      description:
        "Collection of various computer vision assignments (contour analysis, image correction, segmentation and classification).",
      ref: "https://github.com/kuko6/cv-assignments",
      used_tech: ["Pytorch", "OpenCV"],
      open_source: true,
    },
    {
      name: "Rezervi",
      description:
        "Mobile app for a room reservation system. Allows users to view, create or edit room reservations aswell as to create listings for new rooms. The app also includes a custom chating service, which enables direct communication between users and room owner.",
      ref: "https://github.com/mtaa-rezervi",
      used_tech: [
        "Node.js",
        "MongoDB",
        "Express",
        "React-native",
        "Expo",
        "WebSockets",
      ],
      open_source: true,
    },
    {
      name: "Application for Management of Scientific Research Projects",
      description:
        "Team project for the Slovak Center of Scientific and Technical Information. The application aimed to improve registration, monitoring, and overall management of research projects. Our team contributed to both the frontend and backend development of the application.",
      ref: "javascript:void(0)",
      used_tech: [
        "Node.js",
        "React",
        "Next.js",
        "Django",
        "PostgreSQL",
        "Docker",
      ],
      open_source: false,
    },
  ];
</script>

<svelte:head>
  <title>Projects | Jakub Povinec</title>
</svelte:head>
<div class="space-y-5">
  <h1><span class="rotated-underline">Projects</span></h1>
  <div class="flex flex-col gap-3">
    <!-- {#each project as p}
      <Project project={p} />
    {/each} -->
    <ul class="list-disc mx-6 space-y-2">
      {#each project as p}
        <li>
          {#if p.open_source}
            <a
              class="project text-indigo-500 dark:text-indigo-400"
              href={p.ref}
            >
              [{p.name}]
            </a>
          {:else}
            <span class="text-slate-400 dark:text-slate-300"
              >[{p.name}] <span class="">(closed source)</span></span
            >
          {/if}
          <span>- {p.description}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  @reference "../../app.css";

  .project {
  }

  .project:hover {
    @apply bg-indigo-500 text-white py-0.5;
  }

  .rotated-underline {
    @apply relative;
  }

  .rotated-underline::after {
    @apply absolute left-0 bottom-[-8px] w-full h-[6px] bg-current text-indigo-400;
    content: "";
    transform: rotate(1deg);
    transform-origin: right bottom;
  }
</style>
